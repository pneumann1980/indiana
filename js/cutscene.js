/* ============================================
   cutscene.js – Scripted Cutscene System
   ============================================ */

var Cutscene = {

    // Play a sequence of steps
    // steps: array of step objects (see step types below)
    // onComplete: called after last step
    play: function(steps, onComplete) {
        GameState.cutscene = {
            active: true,
            steps: steps,
            currentStep: 0,
            stepTimer: 0,
            onComplete: onComplete || null,
            blackout: 0,
            caption: '',
            captionTimer: 0,
            overlay: null,      // { type, ... }
        };
        this.startStep(0);
    },

    startStep: function(idx) {
        var cs = GameState.cutscene;
        if (idx >= cs.steps.length) {
            cs.active = false;
            if (cs.onComplete) cs.onComplete();
            return;
        }
        cs.currentStep = idx;
        cs.stepTimer   = 0;
        var step = cs.steps[idx];

        switch (step.type) {
            case 'caption':
                cs.caption      = step.text;
                cs.captionTimer = step.duration || 3;
                break;

            case 'dialog':
                Dialog.start(step.lines, function() {
                    Cutscene.nextStep();
                });
                break;

            case 'walk':
                Character.walkTo(step.x, step.y, function() {
                    Cutscene.nextStep();
                });
                break;

            case 'wait':
                // just timer
                break;

            case 'fade_out':
                cs.blackout = 0;
                break;

            case 'fade_in':
                cs.blackout = 1;
                break;

            case 'scene':
                SceneManager.loadScene(step.scene);
                setTimeout(function() { Cutscene.nextStep(); }, 100);
                break;

            case 'travel_map':
                TravelMap.show(step.from, step.to, step.label || '', function() {
                    Cutscene.nextStep();
                });
                break;

            case 'hide_player':
                GameState.player.visible = false;
                this.nextStep();
                break;

            case 'show_player':
                GameState.player.visible = true;
                this.nextStep();
                break;

            case 'place_player':
                Character.place(step.x, step.y, step.facing);
                this.nextStep();
                break;

            case 'flag':
                GameState.setFlag(step.key, step.value !== undefined ? step.value : true);
                this.nextStep();
                break;

            case 'item_give':
                GameState.addItem(step.item);
                this.nextStep();
                break;

            case 'item_remove':
                GameState.removeItem(step.item);
                this.nextStep();
                break;

            case 'custom':
                step.fn();
                this.nextStep();
                break;

            default:
                this.nextStep();
                break;
        }
    },

    nextStep: function() {
        var cs = GameState.cutscene;
        if (!cs.active) return;
        this.startStep(cs.currentStep + 1);
    },

    update: function(dt) {
        var cs = GameState.cutscene;
        if (!cs.active) return;
        if (Dialog.isActive()) return; // Wait for dialog

        cs.stepTimer += dt;
        var step = cs.steps[cs.currentStep];
        if (!step) return;

        switch (step.type) {
            case 'wait':
                if (cs.stepTimer >= (step.duration || 1)) {
                    this.nextStep();
                }
                break;

            case 'caption':
                cs.captionTimer -= dt;
                if (cs.captionTimer <= 0) {
                    cs.caption = '';
                    this.nextStep();
                }
                break;

            case 'fade_out':
                cs.blackout = Math.min(1, cs.stepTimer / (step.duration || 0.8));
                if (cs.blackout >= 1) this.nextStep();
                break;

            case 'fade_in':
                cs.blackout = Math.max(0, 1 - cs.stepTimer / (step.duration || 0.8));
                if (cs.blackout <= 0) this.nextStep();
                break;
        }
    },

    // Draw cutscene overlays (called after scene render)
    draw: function(ctx) {
        var cs = GameState.cutscene;
        if (!cs.active && cs.blackout <= 0 && !cs.caption) return;

        // Blackout overlay
        if (cs.blackout > 0) {
            ctx.fillStyle = 'rgba(0,0,0,' + cs.blackout + ')';
            ctx.fillRect(0, 0, CONFIG.CANVAS_W, CONFIG.SCENE_H);
        }

        // Caption text (title-card style)
        if (cs.caption) {
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(0, CONFIG.SCENE_H / 2 - 30, CONFIG.CANVAS_W, 60);

            Utils.text(ctx, cs.caption,
                CONFIG.CANVAS_W / 2, CONFIG.SCENE_H / 2 - 18,
                { size: 22, color: '#ffd700', align: 'center', stroke: '#0a0600', shadow: true });
        }
    },

    isActive: function() {
        return GameState.cutscene.active;
    },
};

/* ============================================
   TravelMap – Animated map travel sequences
   ============================================ */

var TravelMap = {

    active:   false,
    from:     null,
    to:       null,
    label:    '',
    progress: 0,
    onComplete: null,

    // Location screen positions on map
    locations: {
        'peru':       { x: 160, y: 240, name: 'Peru, Südamerika' },
        'usa':        { x: 240, y: 160, name: 'USA, Connecticut' },
        'nepal':      { x: 530, y: 200, name: 'Nepal, Himalaya' },
        'cairo':      { x: 470, y: 215, name: 'Kairo, Ägypten' },
        'tanis':      { x: 460, y: 230, name: 'Tanis, Ägypten' },
        'aegean_sea': { x: 490, y: 190, name: 'Ägäisches Meer' },
    },

    show: function(from, to, label, onComplete) {
        this.active     = true;
        this.from       = from;
        this.to         = to;
        this.label      = label;
        this.progress   = 0;
        this.onComplete = onComplete;
    },

    update: function(dt) {
        if (!this.active) return;
        this.progress += dt * 0.3;
        if (this.progress >= 1) {
            this.progress = 1;
            this.active   = false;
            if (this.onComplete) this.onComplete();
        }
    },

    draw: function(ctx) {
        if (!this.active) return;

        var W = CONFIG.CANVAS_W, H = CONFIG.SCENE_H;

        // Map background (aged parchment look)
        ctx.fillStyle = '#b09050';
        ctx.fillRect(0, 0, W, H);

        // Ocean / water texture
        ctx.fillStyle = '#7a9ab0';
        ctx.fillRect(0, 120, W, H - 120);

        // Draw simplified world map landmasses
        this.drawWorldMap(ctx, W, H);

        // Title
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, W, 40);
        Utils.text(ctx, '— REISE —', W / 2, 10,
            { size: 20, color: '#ffd700', align: 'center', stroke: '#1a1008' });

        // Draw route
        var fromLoc = this.locations[this.from];
        var toLoc   = this.locations[this.to];

        if (fromLoc && toLoc) {
            // Dashed line
            var t = Utils.easeInOut(this.progress);
            var curX = Utils.lerp(fromLoc.x, toLoc.x, t);
            var curY = Utils.lerp(fromLoc.y, toLoc.y, t);

            ctx.strokeStyle = '#cc2200';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            ctx.moveTo(fromLoc.x, fromLoc.y);
            ctx.lineTo(curX, curY);
            ctx.stroke();
            ctx.setLineDash([]);

            // Plane/plane indicator
            var angle = Math.atan2(toLoc.y - fromLoc.y, toLoc.x - fromLoc.x);
            ctx.save();
            ctx.translate(curX, curY);
            ctx.rotate(angle);
            // Simple plane icon
            ctx.fillStyle = '#1a1008';
            ctx.fillRect(-8, -3, 16, 6);
            ctx.fillRect(-2, -8, 6, 4);
            ctx.fillRect(4, -2, 4, 4);
            ctx.restore();

            // Location dots
            ctx.fillStyle = '#cc2200';
            ctx.fillRect(fromLoc.x - 4, fromLoc.y - 4, 8, 8);
            ctx.fillRect(toLoc.x - 4,   toLoc.y - 4,   8, 8);

            // Location names
            Utils.text(ctx, fromLoc.name, fromLoc.x, fromLoc.y - 14,
                { size: 10, color: '#1a0e04', align: 'center', stroke: '#c8a860' });
            Utils.text(ctx, toLoc.name,   toLoc.x,   toLoc.y   + 10,
                { size: 10, color: '#1a0e04', align: 'center', stroke: '#c8a860' });
        }

        // Destination label
        if (this.label) {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, H - 36, W, 36);
            Utils.text(ctx, this.label, W / 2, H - 28,
                { size: 14, color: '#ffd700', align: 'center', stroke: '#1a0e04' });
        }
    },

    drawWorldMap: function(ctx, W, H) {
        ctx.fillStyle = '#c8a860';

        // North America (simplified)
        ctx.fillRect(60, 80, 160, 130);
        ctx.fillRect(90, 210, 80, 60);

        // South America
        ctx.fillRect(130, 200, 80, 150);
        ctx.fillRect(150, 280, 60, 90);

        // Europe
        ctx.fillRect(350, 80, 100, 80);
        ctx.fillRect(380, 140, 60, 40);

        // Africa
        ctx.fillRect(380, 160, 90, 160);
        ctx.fillRect(395, 290, 70, 60);

        // Asia
        ctx.fillRect(460, 80, 200, 130);
        ctx.fillRect(500, 180, 150, 80);

        // Add Egypt specifically (important location)
        ctx.fillStyle = '#e0c080';
        ctx.fillRect(440, 180, 60, 50);

        // Grid lines (map feel)
        ctx.strokeStyle = 'rgba(100,70,20,0.2)';
        ctx.lineWidth = 0.5;
        for (var gx = 0; gx < W; gx += 40) {
            ctx.beginPath();
            ctx.moveTo(gx, 0); ctx.lineTo(gx, H);
            ctx.stroke();
        }
        for (var gy = 0; gy < H; gy += 40) {
            ctx.beginPath();
            ctx.moveTo(0, gy); ctx.lineTo(W, gy);
            ctx.stroke();
        }
    },
};
