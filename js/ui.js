/* ============================================
   ui.js – HUD, Verb Bar, Message System
   ============================================ */

var UI = {

    // ── Verb Bar ─────────────────────────────

    drawVerbBar: function(ctx, mouseX, mouseY) {
        var y0 = CONFIG.VERB_Y;
        var W  = CONFIG.CANVAS_W;
        var H  = CONFIG.VERB_H;

        // Panel background (clearly darker than scene)
        ctx.fillStyle = CONFIG.UI.VERB_BG;
        ctx.fillRect(0, y0, W, H);

        // Top border (gold line – separates scene from UI)
        ctx.fillStyle = CONFIG.UI.BORDER;
        ctx.fillRect(0, y0, W, 3);

        // Subtle inner highlight under border
        ctx.fillStyle = 'rgba(255,200,80,0.12)';
        ctx.fillRect(0, y0 + 3, W, 4);

        var verbs = CONFIG.VERBS;
        var btnW  = Math.floor(W / verbs.length);
        var btnH  = H - 8;
        var btnY  = y0 + 4;

        for (var i = 0; i < verbs.length; i++) {
            var verb  = verbs[i];
            var btnX  = i * btnW;
            var isHov = mouseX >= btnX && mouseX < btnX + btnW &&
                        mouseY >= y0  && mouseY < y0 + H;
            var isSel = GameState.selectedVerb === verb;

            // Button background
            if (isSel) {
                ctx.fillStyle = CONFIG.UI.VERB_ACTIVE;
                ctx.fillRect(btnX + 2, btnY, btnW - 4, btnH);
                // Active: gold top stripe
                ctx.fillStyle = '#ffe060';
                ctx.fillRect(btnX + 2, btnY, btnW - 4, 3);
            } else if (isHov) {
                ctx.fillStyle = CONFIG.UI.VERB_HOVER;
                ctx.fillRect(btnX + 2, btnY, btnW - 4, btnH);
            } else {
                ctx.fillStyle = '#381a08';
                ctx.fillRect(btnX + 2, btnY, btnW - 4, btnH);
            }

            // Button border (always visible)
            ctx.fillStyle = CONFIG.UI.VERB_BORDER;
            ctx.fillRect(btnX + 2, btnY, btnW - 4, 1);          // top
            ctx.fillRect(btnX + 2, btnY + btnH - 1, btnW - 4, 1); // bottom
            ctx.fillRect(btnX + 2, btnY, 1, btnH);               // left
            ctx.fillRect(btnX + btnW - 3, btnY, 1, btnH);        // right

            // Separator line between buttons
            if (i > 0) {
                ctx.fillStyle = '#5a2a08';
                ctx.fillRect(btnX, y0 + 3, 1, H - 3);
            }

            // Label text (clearly readable)
            var label  = CONFIG.VERB_LABELS[verb] || verb;
            var tColor = isSel ? CONFIG.UI.VERB_TEXT_HL : CONFIG.UI.VERB_TEXT;
            Utils.text(ctx, label,
                btnX + btnW / 2,
                btnY + Math.floor((btnH - 14) / 2),
                { size: 13, color: tColor, align: 'center', shadow: true });
        }

        // Panel label (right side)
        ctx.fillStyle = 'rgba(255,200,80,0.25)';
        ctx.fillRect(0, y0 + H - 1, W, 1);
    },

    // ── Action / Sentence Line ─────────────────

    drawActionLine: function(ctx) {
        var line = '';
        var verb = CONFIG.VERB_LABELS[GameState.selectedVerb] || GameState.selectedVerb;
        var selItem = GameState.selectedItem;
        var hs = GameState.hoverHotspot;

        if (selItem && hs) {
            var iname = Inventory.items[selItem] ? Inventory.items[selItem].name : selItem;
            line = verb + ' ' + iname + ' mit ' + hs.name;
        } else if (selItem) {
            var iname2 = Inventory.items[selItem] ? Inventory.items[selItem].name : selItem;
            line = verb + ' ' + iname2 + ' mit...';
        } else if (hs) {
            line = verb + ' ' + hs.name;
        } else {
            line = verb + '  ·  Klicken zum Laufen';
        }

        // Draw at very bottom of scene area
        ctx.fillStyle = 'rgba(0,0,0,0.82)';
        ctx.fillRect(0, CONFIG.SCENE_H - 24, CONFIG.CANVAS_W, 24);
        ctx.fillStyle = 'rgba(255,200,80,0.4)';
        ctx.fillRect(0, CONFIG.SCENE_H - 24, CONFIG.CANVAS_W, 1);

        Utils.text(ctx, line,
            CONFIG.CANVAS_W / 2, CONFIG.SCENE_H - 20,
            { size: 13, color: '#ffe060', align: 'center', shadow: true });
    },

    // ── Message Overlay ─────────────────────

    drawMessage: function(ctx) {
        if (!GameState.message || GameState.messageTimer <= 0) return;

        var alpha = Math.min(1, GameState.messageTimer / 0.6);
        var y = CONFIG.SCENE_H - 58;

        // Box
        ctx.fillStyle = 'rgba(0,0,0,' + (alpha * 0.88) + ')';
        ctx.fillRect(20, y, CONFIG.CANVAS_W - 40, 32);
        ctx.fillStyle = 'rgba(200,160,40,' + (alpha * 0.6) + ')';
        ctx.fillRect(20, y, CONFIG.CANVAS_W - 40, 1);

        Utils.text(ctx, GameState.message,
            CONFIG.CANVAS_W / 2, y + 10,
            { size: 13, color: 'rgba(255,230,130,' + alpha + ')', align: 'center', shadow: true });
    },

    // ── Hotspot Name ─────────────────────────

    drawHotspotName: function(ctx, mx, my) {
        var hs = GameState.hoverHotspot;
        if (!hs || !hs.name) return;

        var tx = Utils.clamp(mx, 80, CONFIG.CANVAS_W - 80);
        var ty = Math.max(14, my - 30);

        ctx.font = 'bold 12px "Courier New", monospace';
        var tw = ctx.measureText(hs.name).width;

        ctx.fillStyle = 'rgba(0,0,0,0.88)';
        ctx.fillRect(tx - tw / 2 - 8, ty - 2, tw + 16, 20);
        ctx.fillStyle = 'rgba(200,160,40,0.8)';
        ctx.fillRect(tx - tw / 2 - 8, ty - 2, tw + 16, 1);
        ctx.fillRect(tx - tw / 2 - 8, ty + 17, tw + 16, 1);

        Utils.text(ctx, hs.name, tx, ty + 2,
            { size: 12, color: '#ffe090', align: 'center' });
    },

    // ── Chapter Title Card ───────────────────

    drawChapterCard: function(ctx, chapter, title, subtitle) {
        ctx.fillStyle = 'rgba(0,0,0,0.9)';
        ctx.fillRect(0, 0, CONFIG.CANVAS_W, CONFIG.SCENE_H);

        ctx.fillStyle = '#5a3a10';
        ctx.fillRect(60, CONFIG.SCENE_H / 2 - 65, CONFIG.CANVAS_W - 120, 2);
        ctx.fillRect(60, CONFIG.SCENE_H / 2 + 55, CONFIG.CANVAS_W - 120, 2);

        Utils.text(ctx, chapter, CONFIG.CANVAS_W / 2, CONFIG.SCENE_H / 2 - 58,
            { size: 13, color: '#7a5a20', align: 'center' });
        Utils.text(ctx, title, CONFIG.CANVAS_W / 2, CONFIG.SCENE_H / 2 - 30,
            { size: 26, color: '#ffe060', align: 'center', stroke: '#1a0e04', shadow: true });
        if (subtitle) {
            Utils.text(ctx, subtitle, CONFIG.CANVAS_W / 2, CONFIG.SCENE_H / 2 + 22,
                { size: 14, color: '#c09040', align: 'center', shadow: true });
        }
    },

    // ── Decorative Divider ───────────────────

    drawUIDecoration: function(ctx) {
        // Small corner accents at verb bar top
        ctx.fillStyle = CONFIG.UI.BORDER;
        ctx.fillRect(0, CONFIG.VERB_Y, 40, 1);
        ctx.fillRect(CONFIG.CANVAS_W - 40, CONFIG.VERB_Y, 40, 1);
    },

    // ── Scene name (bottom-right of scene) ──

    drawSceneName: function(ctx, name) {
        if (!name) return;
        ctx.font = '10px "Courier New", monospace';
        var tw = ctx.measureText(name).width;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(CONFIG.CANVAS_W - tw - 16, CONFIG.SCENE_H - 36, tw + 12, 14);
        Utils.text(ctx, name, CONFIG.CANVAS_W - 10, CONFIG.SCENE_H - 35,
            { size: 10, color: '#6a4a18', align: 'right' });
    },
};
