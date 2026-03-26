/* ============================================
   main.js – Game Entry Point & Main Loop
   ============================================ */

var Game = {

    canvas:   null,
    ctx:      null,
    lastTime: 0,
    time:     0,

    init: function() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx    = this.canvas.getContext('2d');

        Input.init(this.canvas);
        SceneManager.loadScene('temple');

        var startBtn   = document.getElementById('start-btn');
        var loadScreen = document.getElementById('loading-screen');
        var self = this;

        startBtn.addEventListener('click', function() {
            loadScreen.style.transition = 'opacity 0.6s';
            loadScreen.style.opacity    = '0';
            setTimeout(function() {
                loadScreen.style.display = 'none';
            }, 650);
        });

        this.lastTime = performance.now();
        requestAnimationFrame(function(ts) { self.loop(ts); });
    },

    loop: function(timestamp) {
        var dt = Math.min((timestamp - this.lastTime) / 1000, 0.08);
        this.lastTime = timestamp;
        this.time    += dt;

        this.update(dt);
        this.render();

        var self = this;
        requestAnimationFrame(function(ts) { self.loop(ts); });
    },

    update: function(dt) {
        if (GameState.messageTimer > 0) {
            GameState.messageTimer -= dt;
        }
        Character.update(dt);
        Cutscene.update(dt);
        TravelMap.update(dt);
        SceneManager.update(dt);
    },

    render: function() {
        var ctx = this.ctx;
        var W   = CONFIG.CANVAS_W;
        var H   = CONFIG.CANVAS_H;
        var mx  = Input.mouseX;
        var my  = Input.mouseY;
        var t   = this.time;

        // Clear entire canvas with dark color
        ctx.fillStyle = '#0a0604';
        ctx.fillRect(0, 0, W, H);

        // ── Scene Area ────────────────────────
        if (TravelMap.active) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, W, CONFIG.SCENE_H);
            ctx.clip();
            TravelMap.draw(ctx);
            ctx.restore();
        } else {
            // Draw scene (clipped to scene area)
            SceneManager.draw(ctx, t);

            // Overlays within scene area
            Cutscene.draw(ctx);
            Dialog.draw(ctx);
            UI.drawMessage(ctx);
            UI.drawHotspotName(ctx, mx, my);
        }

        // ── Action Line (bottom of scene) ────
        UI.drawActionLine(ctx);

        // ── Verb Bar ─────────────────────────
        UI.drawVerbBar(ctx, mx, my);

        // ── Inventory ────────────────────────
        Inventory.draw(ctx, mx, my);

        // ── Scene Name ───────────────────────
        var sceneNames = {
            'temple':      'Kap. 1 – Tempel des Chachapoyan-Kriegers',
            'university':  'Kap. 2 – Marshall College',
            'nepal':       'Kap. 3 – Kathmandu, Nepal',
            'cairo':       'Kap. 4 – Kairo, Ägypten',
            'wellofsouls': 'Kap. 5 – Quelle der Seelen',
            'ship':        'Kap. 6 – Ägäisches Meer',
            'island':      'Kap. 7 – Die Insel',
        };
        if (SceneManager.currentId) {
            UI.drawSceneName(ctx, sceneNames[SceneManager.currentId] || '');
        }

        // ── Held item follows cursor ──────────
        if (GameState.selectedItem && !TravelMap.active) {
            var item = Inventory.items[GameState.selectedItem];
            if (item) {
                ctx.save();
                ctx.globalAlpha = 0.75;
                item.draw(ctx, mx - 30, my - 30, 60, 60);
                ctx.globalAlpha = 1;
                ctx.restore();
            }
        }

        // ── Controls hint (first 8 seconds) ──
        if (t < 8) {
            var hintAlpha = t < 6 ? 1 : (8 - t) / 2;
            ctx.fillStyle = 'rgba(0,0,0,' + (hintAlpha * 0.7) + ')';
            ctx.fillRect(10, 10, 380, 22);
            Utils.text(ctx,
                'Klicken = Laufen  |  Rechtsklick = Verb wechseln  |  Klick auf Objekte = Interaktion',
                14, 14,
                { size: 10, color: 'rgba(200,170,80,' + hintAlpha + ')' });
        }
    },
};

document.addEventListener('DOMContentLoaded', function() {
    Game.init();
});
