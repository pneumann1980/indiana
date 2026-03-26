/* ============================================
   main.js – Game Entry Point & Main Loop
   ============================================ */

var Game = {

    canvas:  null,
    ctx:     null,
    lastTime: 0,
    time:    0,     // total elapsed seconds
    running: false,

    init: function() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx    = this.canvas.getContext('2d');

        // Init subsystems
        Input.init(this.canvas);

        // Load the first scene
        SceneManager.loadScene('temple');

        // Start button
        var startBtn = document.getElementById('start-btn');
        var loadScreen = document.getElementById('loading-screen');
        var self = this;

        startBtn.addEventListener('click', function() {
            loadScreen.style.transition = 'opacity 0.8s';
            loadScreen.style.opacity = '0';
            setTimeout(function() {
                loadScreen.style.display = 'none';
                self.running = true;
            }, 800);
        });

        // Start loop regardless (but rendering won't show until screen is hidden)
        this.running = true;
        this.lastTime = performance.now();
        this.loop(this.lastTime);
    },

    loop: function(timestamp) {
        var dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
        this.lastTime = timestamp;
        this.time    += dt;

        this.update(dt);
        this.render();

        var self = this;
        requestAnimationFrame(function(ts) { self.loop(ts); });
    },

    update: function(dt) {
        // Update message timer
        if (GameState.messageTimer > 0) {
            GameState.messageTimer -= dt;
        }

        // Update character movement
        if (!GameState.cutscene.active || true) {
            Character.update(dt);
        }

        // Update cutscene
        Cutscene.update(dt);

        // Update travel map
        TravelMap.update(dt);

        // Update scene
        SceneManager.update(dt);
    },

    render: function() {
        var ctx = this.ctx;
        var W   = CONFIG.CANVAS_W;
        var H   = CONFIG.CANVAS_H;
        var mx  = Input.mouseX;
        var my  = Input.mouseY;
        var t   = this.time;

        // Clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);

        // === Draw Scene ===
        if (TravelMap.active) {
            // Travel map fullscreen (in scene area)
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, W, CONFIG.SCENE_H);
            ctx.clip();
            TravelMap.draw(ctx);
            ctx.restore();
        } else {
            SceneManager.draw(ctx, t);

            // Cutscene overlays
            Cutscene.draw(ctx);

            // Dialog box
            Dialog.draw(ctx);

            // Message text
            UI.drawMessage(ctx);

            // Hotspot name tooltip
            UI.drawHotspotName(ctx, mx, my);
        }

        // === Draw UI ===
        UI.drawActionLine(ctx);
        UI.drawVerbBar(ctx, mx, my);
        Inventory.draw(ctx, mx, my);
        UI.drawUIDecoration(ctx);

        // Chapter info (scene name bottom-right of scene area)
        var scene = SceneManager.current;
        if (scene && scene.id) {
            var sceneNames = {
                'temple':     'Kap. 1 – Tempel des Chachapoyan-Kriegers',
                'university': 'Kap. 2 – Marshall College',
                'nepal':      'Kap. 3 – Kathmandu, Nepal',
                'cairo':      'Kap. 4 – Kairo, Ägypten',
                'wellofsouls':'Kap. 5 – Quelle der Seelen',
                'ship':       'Kap. 6 – Ägäisches Meer',
                'island':     'Kap. 7 – Die Insel',
            };
            var sname = sceneNames[scene.id] || scene.id;
            Utils.text(ctx, sname,
                W - 10, CONFIG.SCENE_H - 20,
                { size: 10, color: '#5a4020', align: 'right' });
        }

        // Inventory item being held (follow mouse)
        if (GameState.selectedItem && !TravelMap.active) {
            var item = Inventory.items[GameState.selectedItem];
            if (item) {
                ctx.save();
                ctx.globalAlpha = 0.75;
                item.draw(ctx, mx - 28, my - 28, 56, 56);
                ctx.globalAlpha = 1;
                ctx.restore();
            }
        }
    },
};

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    Game.init();
});
