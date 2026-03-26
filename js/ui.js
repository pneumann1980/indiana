/* ============================================
   ui.js – HUD, Verb Bar, Message System
   ============================================ */

var UI = {

    // ── Verb Bar ─────────────────────────────

    drawVerbBar: function(ctx, mouseX, mouseY) {
        var y0 = CONFIG.VERB_Y;
        var W  = CONFIG.CANVAS_W;
        var H  = CONFIG.VERB_H;

        // Background
        ctx.fillStyle = CONFIG.UI.VERB_BG;
        ctx.fillRect(0, y0, W, H);

        // Border top
        ctx.fillStyle = CONFIG.UI.BORDER;
        ctx.fillRect(0, y0, W, 2);

        // Border between verb and inv
        ctx.fillStyle = '#0e0604';
        ctx.fillRect(0, y0 + H - 1, W, 1);

        // Verb buttons layout
        var verbs   = CONFIG.VERBS;
        var btnW    = Math.floor(W / verbs.length);
        var btnH    = H - 4;
        var btnY    = y0 + 2;

        for (var i = 0; i < verbs.length; i++) {
            var verb  = verbs[i];
            var btnX  = i * btnW;
            var isHov = mouseX >= btnX && mouseX < btnX + btnW &&
                        mouseY >= y0  && mouseY < y0 + H;
            var isSel = GameState.selectedVerb === verb;

            // Button bg
            ctx.fillStyle = isSel ? CONFIG.UI.VERB_ACTIVE :
                            isHov ? CONFIG.UI.VERB_HOVER  : CONFIG.UI.VERB_BG;
            ctx.fillRect(btnX + 1, btnY, btnW - 2, btnH);

            // Active indicator bar
            if (isSel) {
                ctx.fillStyle = '#ffd700';
                ctx.fillRect(btnX + 1, btnY, btnW - 2, 2);
            }

            // Separator
            if (i > 0) {
                ctx.fillStyle = CONFIG.UI.BORDER;
                ctx.fillRect(btnX, y0, 1, H);
            }

            // Label
            var label  = CONFIG.VERB_LABELS[verb] || verb;
            var tColor = isSel ? CONFIG.UI.VERB_TEXT_HL : CONFIG.UI.VERB_TEXT;
            Utils.text(ctx, label, btnX + btnW / 2, btnY + (btnH - 13) / 2 + 1,
                { size: 12, color: tColor, align: 'center' });
        }
    },

    // ── Action Line (top of verb bar) ────────
    drawActionLine: function(ctx) {
        var line = '';
        var p    = GameState;
        var verb = CONFIG.VERB_LABELS[p.selectedVerb] || p.selectedVerb;

        if (p.selectedItem && p.hoverHotspot) {
            line = verb + ' ' + (Inventory.items[p.selectedItem] ? Inventory.items[p.selectedItem].name : p.selectedItem) +
                   ' mit ' + p.hoverHotspot.name;
        } else if (p.selectedItem) {
            line = verb + ' ' + (Inventory.items[p.selectedItem] ? Inventory.items[p.selectedItem].name : p.selectedItem);
        } else if (p.hoverHotspot) {
            line = verb + ' ' + p.hoverHotspot.name;
        } else {
            line = verb;
        }

        // Draw at top of UI area
        ctx.fillStyle = 'rgba(10,6,2,0.85)';
        ctx.fillRect(0, CONFIG.VERB_Y - 22, CONFIG.CANVAS_W, 22);
        ctx.fillStyle = '#3a2810';
        ctx.fillRect(0, CONFIG.VERB_Y - 22, CONFIG.CANVAS_W, 1);

        Utils.text(ctx, line, CONFIG.CANVAS_W / 2, CONFIG.VERB_Y - 19,
            { size: 13, color: CONFIG.UI.TEXT_BRIGHT, align: 'center', shadow: true });
    },

    // ── Scene Message (floating text) ────────
    drawMessage: function(ctx) {
        if (!GameState.message || GameState.messageTimer <= 0) return;

        var alpha = Math.min(1, GameState.messageTimer / 0.5);
        var y     = CONFIG.SCENE_H - 50;

        ctx.fillStyle = 'rgba(0,0,0,' + (alpha * 0.75) + ')';
        ctx.fillRect(20, y - 6, CONFIG.CANVAS_W - 40, 40);

        Utils.text(ctx, GameState.message,
            CONFIG.CANVAS_W / 2, y,
            { size: 14, color: 'rgba(255,220,120,' + alpha + ')', align: 'center', shadow: true });
    },

    // ── Hotspot Name Tooltip ─────────────────
    drawHotspotName: function(ctx, mx, my) {
        if (!GameState.hoverHotspot) return;
        var name = GameState.hoverHotspot.name;
        if (!name) return;

        // Position above cursor
        var tx = Utils.clamp(mx, 80, CONFIG.CANVAS_W - 80);
        var ty = Math.max(20, my - 28);

        ctx.font = 'bold 11px "Courier New", monospace';
        var tw = ctx.measureText(name).width;

        ctx.fillStyle = 'rgba(10,6,2,0.85)';
        ctx.fillRect(tx - tw/2 - 6, ty - 2, tw + 12, 18);

        Utils.text(ctx, name, tx, ty,
            { size: 11, color: '#e0c880', align: 'center' });
    },

    // ── Chapter Title Card ───────────────────
    drawChapterCard: function(ctx, chapter, title, subtitle) {
        ctx.fillStyle = 'rgba(0,0,0,0.88)';
        ctx.fillRect(0, 0, CONFIG.CANVAS_W, CONFIG.SCENE_H);

        // Decorative lines
        ctx.fillStyle = '#5a3a10';
        ctx.fillRect(40, CONFIG.SCENE_H / 2 - 70, CONFIG.CANVAS_W - 80, 2);
        ctx.fillRect(40, CONFIG.SCENE_H / 2 + 50, CONFIG.CANVAS_W - 80, 2);

        Utils.text(ctx, chapter, CONFIG.CANVAS_W / 2, CONFIG.SCENE_H / 2 - 60,
            { size: 14, color: '#7a5a20', align: 'center' });

        Utils.text(ctx, title, CONFIG.CANVAS_W / 2, CONFIG.SCENE_H / 2 - 30,
            { size: 28, color: '#ffd700', align: 'center', stroke: '#1a0e04', shadow: true });

        if (subtitle) {
            Utils.text(ctx, subtitle, CONFIG.CANVAS_W / 2, CONFIG.SCENE_H / 2 + 20,
                { size: 14, color: '#c09040', align: 'center', shadow: true });
        }
    },

    // ── Separator / Decorative ───────────────
    drawUIDecoration: function(ctx) {
        // Corner ornaments
        var c = CONFIG.UI.BORDER;
        // Top-left of UI area
        ctx.fillStyle = c;
        ctx.fillRect(0,   CONFIG.VERB_Y - 22, 30, 1);
        ctx.fillRect(0,   CONFIG.VERB_Y - 22, 1,  22);
        // Top-right
        ctx.fillRect(CONFIG.CANVAS_W - 30, CONFIG.VERB_Y - 22, 30, 1);
        ctx.fillRect(CONFIG.CANVAS_W - 1,  CONFIG.VERB_Y - 22, 1,  22);
    },
};
