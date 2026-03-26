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
                // Bag body
                ctx.fillStyle = '#7a5220';
                ctx.fillRect(cx - 16, cy - 12, 32, 24);
                // Rope knot at top
                ctx.fillStyle = '#5a3810';
                ctx.fillRect(cx - 5, cy - 18, 10, 8);
                // Bag texture lines
                ctx.fillStyle = 'rgba(0,0,0,0.3)';
                ctx.fillRect(cx - 14, cy - 4, 28, 2);
                ctx.fillRect(cx - 14, cy + 4, 28, 2);
                // Highlight
                ctx.fillStyle = 'rgba(255,200,80,0.2)';
                ctx.fillRect(cx - 14, cy - 10, 10, 8);
                // Label: SAND
                ctx.fillStyle = '#2a1808';
                ctx.font = 'bold 8px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('SAND', cx, cy + 2);
            }
        },
        'golden_idol': {
            name: 'Goldenes Idol',
            desc: 'Das Chachapoyan-Fruchtbarkkeitsidol. Massivgold. Wert: unbezahlbar.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                // Glow
                var g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 28);
                g.addColorStop(0, 'rgba(255,220,0,0.4)');
                g.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = g;
                ctx.fillRect(cx - 28, cy - 28, 56, 56);
                // Base
                ctx.fillStyle = '#cc8800';
                ctx.fillRect(cx - 10, cy + 8, 20, 6);
                // Body
                ctx.fillStyle = '#ffd700';
                ctx.fillRect(cx - 8, cy - 14, 16, 24);
                // Head
                ctx.fillStyle = '#ffcc00';
                ctx.fillRect(cx - 7, cy - 24, 14, 12);
                // Headdress
                ctx.fillStyle = '#ffaa00';
                ctx.fillRect(cx - 9, cy - 30, 18, 8);
                ctx.fillRect(cx - 6, cy - 36, 12, 8);
                // Eyes
                ctx.fillStyle = '#2a1800';
                ctx.fillRect(cx - 4, cy - 22, 3, 3);
                ctx.fillRect(cx + 1, cy - 22, 3, 3);
                // Shine
                ctx.fillStyle = 'rgba(255,255,200,0.6)';
                ctx.fillRect(cx - 6, cy - 24, 4, 4);
            }
        },
        'torch': {
            name: 'Fackel',
            desc: 'Eine brennende Fackel. Spendet Licht und wärmt die Seele.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                // Handle
                ctx.fillStyle = '#5a3010';
                ctx.fillRect(cx - 3, cy - 10, 6, 28);
                // Flame glow
                ctx.fillStyle = 'rgba(255,150,0,0.3)';
                ctx.fillRect(cx - 14, cy - 28, 28, 24);
                // Flame (outer)
                ctx.fillStyle = '#ff6600';
                ctx.fillRect(cx - 7, cy - 24, 14, 16);
                // Flame (inner)
                ctx.fillStyle = '#ffcc00';
                ctx.fillRect(cx - 4, cy - 20, 8, 10);
                // Flame tip
                ctx.fillStyle = '#fff0a0';
                ctx.fillRect(cx - 2, cy - 26, 4, 6);
                // Rag wrap
                ctx.fillStyle = '#6a4020';
                ctx.fillRect(cx - 5, cy - 10, 10, 8);
            }
        },
        'indy_journal': {
            name: 'Indys Tagebuch',
            desc: 'Indys Feldtagebuch. Voller Notizen, Karten und Hinweise.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                // Book cover
                ctx.fillStyle = '#5a2e10';
                ctx.fillRect(cx - 18, cy - 22, 36, 44);
                // Spine
                ctx.fillStyle = '#3a1e08';
                ctx.fillRect(cx - 18, cy - 22, 5, 44);
                // Pages
                ctx.fillStyle = '#e8d8b0';
                ctx.fillRect(cx - 12, cy - 20, 28, 40);
                // Lines on page
                ctx.fillStyle = '#b0a080';
                for (var i = 0; i < 5; i++) {
                    ctx.fillRect(cx - 10, cy - 14 + i * 8, 22, 1);
                }
                // Bookmark
                ctx.fillStyle = '#cc2200';
                ctx.fillRect(cx + 10, cy - 22, 4, 18);
                // Clasp
                ctx.fillStyle = '#c09020';
                ctx.fillRect(cx - 20, cy - 5, 4, 10);
            }
        },
        'headpiece_ra': {
            name: 'Kopfteil des Ra',
            desc: 'Das Kopfteil des Stabs von Ra. Mit Inschriften auf beiden Seiten.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                // Glow
                var g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 26);
                g.addColorStop(0, 'rgba(255,180,0,0.4)');
                g.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = g;
                ctx.fillRect(cx - 26, cy - 26, 52, 52);
                // Base disc
                ctx.fillStyle = '#cc9900';
                ctx.fillRect(cx - 18, cy - 18, 36, 36);
                // Inner disc
                ctx.fillStyle = '#ffbb00';
                ctx.fillRect(cx - 14, cy - 14, 28, 28);
                // Eye of Ra center
                ctx.fillStyle = '#cc6600';
                ctx.fillRect(cx - 8, cy - 5, 16, 10);
                ctx.fillStyle = '#1a1000';
                ctx.fillRect(cx - 4, cy - 3, 8, 6);
                ctx.fillStyle = '#ffee80';
                ctx.fillRect(cx - 2, cy - 2, 4, 4);
                // Engravings
                ctx.fillStyle = 'rgba(0,0,0,0.4)';
                ctx.fillRect(cx - 16, cy - 16, 32, 2);
                ctx.fillRect(cx - 16, cy + 12, 32, 2);
                ctx.fillRect(cx - 16, cy - 16, 2, 32);
                ctx.fillRect(cx + 12, cy - 16, 2, 32);
            }
        },
        'staff_part1': {
            name: 'Stab des Ra (Teil 1)',
            desc: 'Die untere Hälfte des Stabs von Ra. Aus Holz und Gold gefertigt.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#6a4010';
                ctx.fillRect(cx - 3, cy - 26, 6, 52);
                ctx.fillStyle = '#c09020';
                ctx.fillRect(cx - 4, cy + 18, 8, 6);
                ctx.fillRect(cx - 4, cy + 6,  8, 4);
                ctx.fillRect(cx - 4, cy - 10, 8, 4);
            }
        },
        'staff_part2': {
            name: 'Stab des Ra (Teil 2)',
            desc: 'Die obere Hälfte des Stabs von Ra. Die Inschrift gibt die genaue Länge an.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#6a4010';
                ctx.fillRect(cx - 3, cy - 26, 6, 52);
                ctx.fillStyle = '#c09020';
                ctx.fillRect(cx - 4, cy - 26, 8, 6);
                ctx.fillRect(cx - 4, cy - 14, 8, 4);
                ctx.fillRect(cx - 4, cy,      8, 4);
            }
        },
        'whip': {
            name: 'Peitsche',
            desc: 'Indys treuer Begleiter. Hat schon viele Probleme gelöst.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                // Handle
                ctx.fillStyle = '#4a2808';
                ctx.fillRect(cx - 4, cy - 4, 12, 8);
                ctx.fillStyle = '#1e0e04';
                ctx.fillRect(cx - 4, cy - 6, 12, 3);
                // Whip coil
                ctx.strokeStyle = '#2a1408';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(cx - 6, cy + 6, 14, 0, Math.PI * 1.5);
                ctx.stroke();
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(cx - 6, cy + 6, 9, 0.2, Math.PI * 1.3);
                ctx.stroke();
                // Tip
                ctx.fillStyle = '#1a0e04';
                ctx.fillRect(cx - 18, cy + 4, 3, 2);
            }
        },
        'rope': {
            name: 'Seil',
            desc: 'Ein robustes Seil. Nützlich zum Klettern und Fesseln.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.strokeStyle = '#c8a050';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(cx, cy, 18, 0, Math.PI * 2);
                ctx.stroke();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#a07030';
                ctx.beginPath();
                ctx.arc(cx, cy, 14, 0.3, Math.PI * 2.1);
                ctx.stroke();
            }
        },
        'map_piece': {
            name: 'Kartenbruchstück',
            desc: 'Ein Fragment einer alten Karte. Zeigt den Weg nach Tanis.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#c8a860';
                ctx.fillRect(cx - 20, cy - 16, 40, 32);
                ctx.fillStyle = '#b09040';
                ctx.fillRect(cx - 18, cy - 14, 36, 28);
                // Map lines
                ctx.fillStyle = '#7a5a20';
                ctx.fillRect(cx - 14, cy - 8, 18, 2);
                ctx.fillRect(cx - 6,  cy + 2, 14, 2);
                ctx.fillRect(cx - 10, cy - 4, 2, 14);
                // X marks the spot
                ctx.fillStyle = '#cc2200';
                ctx.fillRect(cx + 6, cy + 4, 4, 4);
                ctx.fillRect(cx + 8, cy + 2, 2, 8);
                ctx.fillRect(cx + 4, cy + 6, 10, 2);
                // Torn edges
                ctx.fillStyle = '#a08040';
                ctx.fillRect(cx + 18, cy - 16, 2, 8);
                ctx.fillRect(cx + 16, cy - 8,  2, 8);
            }
        },
        'canteen': {
            name: 'Feldflasche',
            desc: 'Eine Feldflasche. Immer nützlich in der Wüste.',
            draw: function(ctx, x, y, w, h) {
                var cx = x + w/2, cy = y + h/2;
                ctx.fillStyle = '#4a6a2a';
                ctx.fillRect(cx - 12, cy - 16, 24, 32);
                ctx.fillStyle = '#3a5a20';
                ctx.fillRect(cx - 10, cy - 14, 20, 28);
                ctx.fillStyle = '#8aa870';
                ctx.fillRect(cx - 8, cy - 12, 8, 12);
                ctx.fillStyle = '#7a7a5a';
                ctx.fillRect(cx - 6, cy - 20, 12, 5);
                ctx.fillStyle = '#5a5a4a';
                ctx.fillRect(cx - 2, cy - 22, 4, 5);
            }
        },
    },

    // ── Render Inventory Bar ─────────────────

    draw: function(ctx, mouseX, mouseY) {
        var x0 = 0, y0 = CONFIG.INV_Y;
        var W  = CONFIG.CANVAS_W, H = CONFIG.INV_H;
        var sW = CONFIG.INV_SLOT_W, sH = CONFIG.INV_SLOT_H;

        // Background
        ctx.fillStyle = CONFIG.UI.INV_BG;
        ctx.fillRect(x0, y0, W, H);

        // Border top
        ctx.fillStyle = CONFIG.UI.BORDER;
        ctx.fillRect(x0, y0, W, 2);

        // Calculate layout: center slots
        var totalSlots = CONFIG.INV_SLOTS_VISIBLE;
        var startX = (W - totalSlots * sW) / 2;
        var slotY  = y0 + (H - sH) / 2;

        var inv    = GameState.inventory;
        var scroll = GameState.invScrollOffset;

        for (var i = 0; i < totalSlots; i++) {
            var slotX  = startX + i * sW;
            var itemIdx = i + scroll;
            var itemId  = inv[itemIdx] || null;

            var isHov = Utils.pointInRect(mouseX, mouseY, slotX, slotY, sW, sH);
            var isSel = itemId && GameState.selectedItem === itemId;

            // Slot background
            ctx.fillStyle = isSel ? CONFIG.UI.INV_SLOT_SEL :
                            isHov ? CONFIG.UI.INV_SLOT_HV  : CONFIG.UI.INV_SLOT;
            ctx.fillRect(slotX, slotY, sW - 2, sH - 2);

            // Slot border
            ctx.fillStyle = isSel ? '#a06020' : CONFIG.UI.BORDER;
            ctx.fillRect(slotX, slotY, sW - 2, 1);
            ctx.fillRect(slotX, slotY, 1, sH - 2);
            ctx.fillStyle = '#0e0604';
            ctx.fillRect(slotX, slotY + sH - 3, sW - 2, 1);
            ctx.fillRect(slotX + sW - 3, slotY, 1, sH - 2);

            if (itemId && this.items[itemId]) {
                var item = this.items[itemId];
                // Draw item icon
                item.draw(ctx, slotX + 2, slotY + 2, sW - 4, sH - 20);
                // Item name label
                Utils.text(ctx, item.name, slotX + (sW - 2) / 2, slotY + sH - 18,
                    { size: 9, color: isSel ? CONFIG.UI.TEXT_BRIGHT : CONFIG.UI.TEXT_DIM, align: 'center' });
            }
        }

        // Scroll arrows if needed
        if (scroll > 0) {
            ctx.fillStyle = CONFIG.UI.VERB_TEXT;
            ctx.fillText('◄', startX - 20, slotY + sH / 2);
        }
        if (scroll + totalSlots < inv.length) {
            ctx.fillStyle = CONFIG.UI.VERB_TEXT;
            ctx.fillText('►', startX + totalSlots * sW + 4, slotY + sH / 2);
        }
    },

    // Get item ID at mouse position
    getItemAt: function(mx, my) {
        var y0 = CONFIG.INV_Y, H = CONFIG.INV_H;
        var sW = CONFIG.INV_SLOT_W, sH = CONFIG.INV_SLOT_H;
        var totalSlots = CONFIG.INV_SLOTS_VISIBLE;
        var startX = (CONFIG.CANVAS_W - totalSlots * sW) / 2;
        var slotY  = y0 + (H - sH) / 2;

        if (!Utils.pointInRect(mx, my, startX, slotY, totalSlots * sW, sH)) return null;

        var col    = Math.floor((mx - startX) / sW);
        var itemIdx = col + GameState.invScrollOffset;
        return GameState.inventory[itemIdx] || null;
    },
};
