/* ============================================
   inventory.js – Item Definitions & Rendering
   ============================================ */

var Inventory = {

    // ── Item Definitions ─────────────────────
    items: {
        'sand_bag': {
            name: 'Sandsack',
            desc: 'Ein schwerer Lederbeutel mit Sand. Perfektes Gegengewicht.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#8a6028';
                ctx.fillRect(cx - 18, cy - 14, 36, 28);
                ctx.fillStyle = '#6a4010';
                ctx.fillRect(cx - 6, cy - 22, 12, 10);
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(cx - 16, cy - 4, 32, 2);
                ctx.fillRect(cx - 16, cy + 4, 32, 2);
                ctx.fillStyle = 'rgba(255,200,80,0.25)';
                ctx.fillRect(cx - 16, cy - 12, 12, 10);
                ctx.fillStyle = '#2a1808';
                ctx.font = 'bold 9px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('SAND', cx, cy + 3);
            }
        },
        'golden_idol': {
            name: 'Goldenes Idol',
            desc: 'Das Chachapoyan-Fruchtbarkeitsidol. Reines Gold. Wert: unbezahlbar.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                var g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 30);
                g.addColorStop(0, 'rgba(255,220,0,0.5)');
                g.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = g;
                ctx.fillRect(cx - 30, cy - 30, 60, 60);
                ctx.fillStyle = '#cc8800';
                ctx.fillRect(cx - 11, cy + 10, 22, 7);
                ctx.fillStyle = '#ffd700';
                ctx.fillRect(cx - 9, cy - 16, 18, 28);
                ctx.fillStyle = '#ffcc00';
                ctx.fillRect(cx - 8, cy - 26, 16, 12);
                ctx.fillStyle = '#ffaa00';
                ctx.fillRect(cx - 10, cy - 34, 20, 10);
                ctx.fillRect(cx - 7, cy - 42, 14, 10);
                ctx.fillStyle = '#1a1000';
                ctx.fillRect(cx - 4, cy - 24, 3, 4);
                ctx.fillRect(cx + 1, cy - 24, 3, 4);
                ctx.fillStyle = 'rgba(255,255,200,0.7)';
                ctx.fillRect(cx - 7, cy - 26, 5, 6);
            }
        },
        'torch': {
            name: 'Fackel',
            desc: 'Eine brennende Fackel. Spendet Licht.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#5a3010';
                ctx.fillRect(cx - 3, cy - 10, 6, 30);
                ctx.fillStyle = 'rgba(255,150,0,0.35)';
                ctx.fillRect(cx - 16, cy - 30, 32, 26);
                ctx.fillStyle = '#ff6600';
                ctx.fillRect(cx - 8, cy - 26, 16, 18);
                ctx.fillStyle = '#ffcc00';
                ctx.fillRect(cx - 5, cy - 22, 10, 12);
                ctx.fillStyle = '#fff0a0';
                ctx.fillRect(cx - 2, cy - 28, 4, 8);
                ctx.fillStyle = '#6a4020';
                ctx.fillRect(cx - 5, cy - 10, 10, 8);
            }
        },
        'indy_journal': {
            name: 'Indys Tagebuch',
            desc: 'Indys Feldtagebuch. Voller Notizen und Hinweise.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#6a3a18';
                ctx.fillRect(cx - 20, cy - 24, 40, 48);
                ctx.fillStyle = '#4a2008';
                ctx.fillRect(cx - 20, cy - 24, 6, 48);
                ctx.fillStyle = '#ecdcb0';
                ctx.fillRect(cx - 13, cy - 22, 30, 44);
                ctx.fillStyle = '#c0a878';
                for (var i = 0; i < 6; i++) ctx.fillRect(cx - 11, cy - 16 + i * 7, 24, 1);
                ctx.fillStyle = '#cc2200';
                ctx.fillRect(cx + 12, cy - 24, 4, 20);
                ctx.fillStyle = '#c09020';
                ctx.fillRect(cx - 22, cy - 6, 4, 12);
            }
        },
        'headpiece_ra': {
            name: 'Kopfteil des Ra',
            desc: 'Das Kopfteil des Stabs von Ra. Mit Inschriften auf beiden Seiten.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                var g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 28);
                g.addColorStop(0, 'rgba(255,190,0,0.5)');
                g.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = g;
                ctx.fillRect(cx - 28, cy - 28, 56, 56);
                ctx.fillStyle = '#cc9900';
                ctx.fillRect(cx - 20, cy - 20, 40, 40);
                ctx.fillStyle = '#ffbb00';
                ctx.fillRect(cx - 16, cy - 16, 32, 32);
                ctx.fillStyle = '#cc6600';
                ctx.fillRect(cx - 9, cy - 6, 18, 12);
                ctx.fillStyle = '#1a1000';
                ctx.fillRect(cx - 5, cy - 4, 10, 8);
                ctx.fillStyle = '#ffe070';
                ctx.fillRect(cx - 3, cy - 2, 6, 4);
                ctx.fillStyle = 'rgba(0,0,0,0.35)';
                ctx.fillRect(cx - 18, cy - 18, 36, 2);
                ctx.fillRect(cx - 18, cy + 14, 36, 2);
                ctx.fillRect(cx - 18, cy - 18, 2, 36);
                ctx.fillRect(cx + 14, cy - 18, 2, 36);
            }
        },
        'staff_part1': {
            name: 'Stab des Ra (Teil 1)',
            desc: 'Die untere Hälfte des Stabs von Ra.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#7a4a18';
                ctx.fillRect(cx - 4, cy - 28, 8, 56);
                ctx.fillStyle = '#c09020';
                ctx.fillRect(cx - 5, cy + 22, 10, 7);
                ctx.fillRect(cx - 5, cy + 8, 10, 5);
                ctx.fillRect(cx - 5, cy - 8, 10, 5);
                ctx.fillStyle = 'rgba(255,200,80,0.3)';
                ctx.fillRect(cx - 2, cy - 28, 3, 56);
            }
        },
        'staff_part2': {
            name: 'Stab des Ra (Teil 2)',
            desc: 'Die obere Hälfte des Stabs von Ra.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#7a4a18';
                ctx.fillRect(cx - 4, cy - 28, 8, 56);
                ctx.fillStyle = '#c09020';
                ctx.fillRect(cx - 5, cy - 28, 10, 7);
                ctx.fillRect(cx - 5, cy - 14, 10, 5);
                ctx.fillRect(cx - 5, cy, 10, 5);
                ctx.fillStyle = 'rgba(255,200,80,0.3)';
                ctx.fillRect(cx - 2, cy - 28, 3, 56);
            }
        },
        'whip': {
            name: 'Peitsche',
            desc: 'Indys treuer Begleiter. Hat schon viele Probleme gelöst.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#5a3010';
                ctx.fillRect(cx - 5, cy - 6, 14, 10);
                ctx.fillStyle = '#1e0e04';
                ctx.fillRect(cx - 5, cy - 9, 14, 4);
                ctx.strokeStyle = '#2a1408';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(cx - 8, cy + 8, 16, 0, Math.PI * 1.5);
                ctx.stroke();
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(cx - 8, cy + 8, 10, 0.3, Math.PI * 1.3);
                ctx.stroke();
            }
        },
        'rope': {
            name: 'Seil',
            desc: 'Ein robustes Seil.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.strokeStyle = '#c8a050';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(cx, cy, 20, 0, Math.PI * 2);
                ctx.stroke();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#a07030';
                ctx.beginPath();
                ctx.arc(cx, cy, 15, 0.3, Math.PI * 2.1);
                ctx.stroke();
            }
        },
        'map_piece': {
            name: 'Kartenbruchstück',
            desc: 'Ein Fragment einer alten Karte. Zeigt den Weg nach Tanis.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#c8a860';
                ctx.fillRect(cx - 22, cy - 18, 44, 36);
                ctx.fillStyle = '#b09040';
                ctx.fillRect(cx - 20, cy - 16, 40, 32);
                ctx.fillStyle = '#7a5a20';
                ctx.fillRect(cx - 16, cy - 8, 20, 2);
                ctx.fillRect(cx - 8, cy + 2, 16, 2);
                ctx.fillRect(cx - 10, cy - 4, 2, 16);
                ctx.fillStyle = '#cc2200';
                ctx.fillRect(cx + 8, cy + 4, 4, 4);
                ctx.fillRect(cx + 10, cy + 2, 2, 8);
                ctx.fillRect(cx + 6, cy + 6, 10, 2);
            }
        },
        'canteen': {
            name: 'Feldflasche',
            desc: 'Immer nützlich in der Wüste.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#4a6a2a';
                ctx.fillRect(cx - 13, cy - 18, 26, 36);
                ctx.fillStyle = '#3a5a20';
                ctx.fillRect(cx - 11, cy - 16, 22, 32);
                ctx.fillStyle = '#8aa870';
                ctx.fillRect(cx - 8, cy - 14, 10, 14);
                ctx.fillStyle = '#7a7a5a';
                ctx.fillRect(cx - 6, cy - 22, 12, 6);
                ctx.fillStyle = '#5a5a4a';
                ctx.fillRect(cx - 2, cy - 25, 4, 6);
            }
        },
    },

    // ── Render Inventory Bar ─────────────────

    draw: function(ctx, mouseX, mouseY) {
        var x0 = 0, y0 = CONFIG.INV_Y;
        var W  = CONFIG.CANVAS_W, H = CONFIG.INV_H;
        var sW = CONFIG.INV_SLOT_W, sH = CONFIG.INV_SLOT_H;

        // Background panel
        ctx.fillStyle = CONFIG.UI.INV_BG;
        ctx.fillRect(x0, y0, W, H);

        // Top separator line (gold)
        ctx.fillStyle = CONFIG.UI.BORDER;
        ctx.fillRect(x0, y0, W, 2);

        // Inner subtle highlight
        ctx.fillStyle = 'rgba(255,200,80,0.08)';
        ctx.fillRect(x0, y0 + 2, W, 6);

        // "INVENTAR" label
        Utils.text(ctx, 'INVENTAR', 10, y0 + 8,
            { size: 9, color: '#7a5a20', align: 'left' });

        // Calculate slot layout (centered)
        var totalSlots = CONFIG.INV_SLOTS_VISIBLE;
        var totalW = totalSlots * sW;
        var startX = Math.floor((W - totalW) / 2);
        var slotY  = y0 + Math.floor((H - sH) / 2) + 4;

        var inv    = GameState.inventory;
        var scroll = GameState.invScrollOffset;

        for (var i = 0; i < totalSlots; i++) {
            var slotX  = startX + i * sW;
            var itemIdx = i + scroll;
            var itemId  = inv[itemIdx] || null;

            var isHov = mouseX >= slotX && mouseX < slotX + sW &&
                        mouseY >= slotY && mouseY < slotY + sH;
            var isSel = itemId && GameState.selectedItem === itemId;

            // Slot background
            ctx.fillStyle = isSel ? CONFIG.UI.INV_SLOT_SEL :
                            isHov ? CONFIG.UI.INV_SLOT_HV  : CONFIG.UI.INV_SLOT;
            ctx.fillRect(slotX + 1, slotY + 1, sW - 3, sH - 3);

            // Slot border (ALWAYS clearly visible)
            var borderColor = isSel ? '#cc8020' : (isHov ? '#8a5a20' : '#5a3a10');
            ctx.fillStyle = borderColor;
            ctx.fillRect(slotX + 1, slotY + 1, sW - 3, 1);          // top
            ctx.fillRect(slotX + 1, slotY + sH - 3, sW - 3, 1);     // bottom
            ctx.fillRect(slotX + 1, slotY + 1, 1, sH - 3);          // left
            ctx.fillRect(slotX + sW - 3, slotY + 1, 1, sH - 3);     // right

            // Slot number (subtle)
            if (!itemId) {
                ctx.fillStyle = 'rgba(120,80,30,0.3)';
                ctx.font = '10px monospace';
                ctx.textAlign = 'center';
                ctx.fillText((i + 1).toString(), slotX + sW / 2, slotY + sH / 2 + 4);
            }

            if (itemId && this.items[itemId]) {
                var item = this.items[itemId];
                // Draw item icon
                item.draw(ctx, slotX + 2, slotY + 2, sW - 4, sH - 20);
                // Item name label (at bottom of slot)
                Utils.text(ctx,
                    item.name,
                    slotX + (sW - 2) / 2,
                    slotY + sH - 18,
                    { size: 9,
                      color: isSel ? '#ffe060' : '#c09040',
                      align: 'center' });
            }

            // Selected glow
            if (isSel) {
                ctx.fillStyle = 'rgba(255,200,40,0.12)';
                ctx.fillRect(slotX + 2, slotY + 2, sW - 5, sH - 5);
            }
        }

        // Scroll indicators
        if (scroll > 0) {
            Utils.text(ctx, '◄', startX - 16, slotY + sH / 2 - 6,
                { size: 12, color: CONFIG.UI.TEXT_DIM, align: 'center' });
        }
        if (scroll + totalSlots < inv.length) {
            Utils.text(ctx, '►', startX + totalSlots * sW + 14, slotY + sH / 2 - 6,
                { size: 12, color: CONFIG.UI.TEXT_DIM, align: 'center' });
        }

        // Item count
        if (inv.length > 0) {
            Utils.text(ctx, inv.length + ' Item' + (inv.length !== 1 ? 's' : ''),
                W - 10, y0 + 8,
                { size: 9, color: '#7a5a20', align: 'right' });
        }
    },

    // Get item ID at mouse position
    getItemAt: function(mx, my) {
        var y0 = CONFIG.INV_Y;
        var sW = CONFIG.INV_SLOT_W, sH = CONFIG.INV_SLOT_H;
        var totalSlots = CONFIG.INV_SLOTS_VISIBLE;
        var startX = Math.floor((CONFIG.CANVAS_W - totalSlots * sW) / 2);
        var slotY  = y0 + Math.floor((CONFIG.INV_H - sH) / 2) + 4;

        if (!Utils.pointInRect(mx, my, startX, slotY, totalSlots * sW, sH)) return null;

        var col = Math.floor((mx - startX) / sW);
        if (col < 0 || col >= totalSlots) return null;
        var itemIdx = col + GameState.invScrollOffset;
        return GameState.inventory[itemIdx] || null;
    },
};
