/* ============================================
   sceneManager.js – Scene Loading & Transitions
   ============================================ */

var SceneManager = {

    scenes: {},         // registered scenes
    current: null,      // current scene object
    currentId: null,

    // Fade transition state
    fade: {
        active: false,
        dir: 'out',     // 'out' (black) | 'in' (reveal)
        alpha: 0,
        speed: 1.8,
        onBlack: null,
    },

    // Register a scene
    register: function(id, scene) {
        scene.id = id;
        this.scenes[id] = scene;
    },

    // Load a scene (with fade transition)
    loadScene: function(id, opts) {
        opts = opts || {};
        var self = this;

        if (!this.scenes[id]) {
            console.error('Scene not found:', id);
            return;
        }

        // If already on this scene, just reinit
        if (this.currentId === id && !opts.force) {
            return;
        }

        if (this.current && this.current.onExit) {
            this.current.onExit();
        }

        // Start fade out
        this.fade.active = true;
        this.fade.dir    = 'out';
        this.fade.alpha  = 0;
        this.fade.onBlack = function() {
            // Switch scene while black
            GameState.previousScene = self.currentId;
            GameState.currentScene  = id;
            self.currentId = id;
            self.current   = self.scenes[id];

            // Reset player state
            GameState.hoverHotspot = null;
            GameState.dialog.active = false;
            GameState.player.walking = false;
            GameState.player.onArrival = null;
            GameState.player.visible = true;

            // Call scene enter
            if (self.current.onEnter) {
                self.current.onEnter(opts);
            }

            // Start fade in
            self.fade.dir   = 'in';
            self.fade.alpha = 1;
        };
    },

    update: function(dt) {
        // Update fade
        if (this.fade.active) {
            var spd = this.fade.speed * dt;
            if (this.fade.dir === 'out') {
                this.fade.alpha += spd;
                if (this.fade.alpha >= 1) {
                    this.fade.alpha = 1;
                    if (this.fade.onBlack) {
                        var cb = this.fade.onBlack;
                        this.fade.onBlack = null;
                        cb();
                    }
                }
            } else {
                this.fade.alpha -= spd;
                if (this.fade.alpha <= 0) {
                    this.fade.alpha  = 0;
                    this.fade.active = false;
                }
            }
        }

        // Update current scene
        if (this.current && this.current.update) {
            this.current.update(dt);
        }
    },

    draw: function(ctx, time) {
        if (!this.current) return;

        // Draw scene background & objects
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, CONFIG.CANVAS_W, CONFIG.SCENE_H);
        ctx.clip();

        if (this.current.draw) {
            this.current.draw(ctx, time);
        }

        // Draw player character (if visible and not in cutscene that hides it)
        if (GameState.player.visible && !TravelMap.active) {
            var p = GameState.player;
            Character.draw(ctx, p.x, p.y, p.facing, p.animFrame, 1.0);
        }

        ctx.restore();

        // Draw debug hotspots
        if (CONFIG.DEBUG_HOTSPOTS && this.current.hotspots) {
            this.current.hotspots.forEach(function(h) {
                if (h.condition && !h.condition()) return;
                ctx.strokeStyle = 'rgba(255,0,0,0.5)';
                ctx.lineWidth = 1;
                ctx.strokeRect(h.x, h.y, h.w, h.h);
                ctx.fillStyle = 'rgba(255,0,0,0.2)';
                ctx.fillRect(h.x, h.y, h.w, h.h);
            });
        }

        // Fade overlay
        if (this.fade.active && this.fade.alpha > 0) {
            ctx.fillStyle = 'rgba(0,0,0,' + this.fade.alpha + ')';
            ctx.fillRect(0, 0, CONFIG.CANVAS_W, CONFIG.SCENE_H);
        }
    },
};
