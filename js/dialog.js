/* ============================================
   dialog.js – Dialog & Speech System
   ============================================ */

var Dialog = {

    // Start a dialog sequence
    // lines: [{speaker, text, portrait?}, ...]
    // onComplete: function called when done
    start: function(lines, onComplete) {
        GameState.dialog = {
            active: true,
            lines: lines,
            currentLine: 0,
            onComplete: onComplete || null,
        };
    },

    // Advance to next line (called on click)
    advance: function() {
        var d = GameState.dialog;
        if (!d.active) return false;

        d.currentLine++;
        if (d.currentLine >= d.lines.length) {
            d.active = false;
            if (d.onComplete) d.onComplete();
            return true;
        }
        return true;
    },

    // Render the dialog box
    draw: function(ctx) {
        var d = GameState.dialog;
        if (!d.active || d.currentLine >= d.lines.length) return;

        var line = d.lines[d.currentLine];
        var speaker = line.speaker || '';
        var text    = line.text    || '';

        var boxX = 14, boxY = 12;
        var boxW = 772, boxH = 116;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(boxX + 4, boxY + 4, boxW, boxH);

        // Box background
        ctx.fillStyle = '#0e0804';
        ctx.fillRect(boxX, boxY, boxW, boxH);

        // Box border (gold/amber)
        ctx.fillStyle = '#7a5a20';
        ctx.fillRect(boxX,          boxY,          boxW, 2);
        ctx.fillRect(boxX,          boxY + boxH-2, boxW, 2);
        ctx.fillRect(boxX,          boxY,          2,    boxH);
        ctx.fillRect(boxX + boxW-2, boxY,          2,    boxH);

        // Inner border
        ctx.fillStyle = '#3a2810';
        ctx.fillRect(boxX + 4,      boxY + 4,      boxW-8, 1);
        ctx.fillRect(boxX + 4,      boxY+boxH-6,   boxW-8, 1);
        ctx.fillRect(boxX + 4,      boxY + 4,      1, boxH-8);
        ctx.fillRect(boxX+boxW-6,   boxY + 4,      1, boxH-8);

        // Portrait area (left side)
        var portX = boxX + 12, portY = boxY + 12;
        var portW = 68, portH = 86;

        ctx.fillStyle = '#1a1008';
        ctx.fillRect(portX, portY, portW, portH);
        ctx.fillStyle = '#3a2810';
        ctx.fillRect(portX, portY, portW, 1);
        ctx.fillRect(portX, portY, 1, portH);

        // Draw portrait based on speaker
        this.drawPortrait(ctx, portX, portY, portW, portH, speaker);

        // Speaker name
        var speakerColors = {
            'Indiana':  '#ffd700',
            'Sapito':   '#80c080',
            'Marcus':   '#80a0c0',
            'Marion':   '#ffb0c0',
            'Sallah':   '#c0a060',
            'Belloq':   '#ff8060',
            'Toht':     '#cc4040',
        };
        var spColor = speakerColors[speaker] || CONFIG.UI.TEXT_BRIGHT;

        Utils.text(ctx, speaker, portX + portW + 16, boxY + 14,
            { size: 14, color: spColor, stroke: '#1a0e04' });

        // Dialog text
        Utils.textWrap(ctx, text,
            portX + portW + 16,
            boxY + 34,
            boxW - portW - 36,
            18,
            { size: 13, color: CONFIG.UI.TEXT, stroke: '#0e0804' }
        );

        // "Click to continue" indicator
        var blink = Math.floor(Date.now() / 400) % 2 === 0;
        if (blink) {
            Utils.text(ctx, '▼', boxX + boxW - 24, boxY + boxH - 22,
                { size: 12, color: '#7a6040' });
        }
    },

    // Draw character portrait in dialog box
    drawPortrait: function(ctx, x, y, w, h, speaker) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + 2, y + 2, w - 4, h - 4);
        ctx.clip();

        switch(speaker) {
            case 'Indiana':
                // Indy portrait (head + hat)
                ctx.fillStyle = '#2a1a10';
                ctx.fillRect(x, y, w, h);
                // Jungle/stone bg hint
                ctx.fillStyle = '#1e1410';
                ctx.fillRect(x, y + h/2, w, h/2);
                // Hat
                ctx.fillStyle = '#3a2010';
                ctx.fillRect(x + 6, y + 8, w - 12, 8);   // brim
                ctx.fillStyle = '#4a2a14';
                ctx.fillRect(x + 12, y + 2, w - 24, 10);  // crown
                // Head
                ctx.fillStyle = '#c4935a';
                ctx.fillRect(x + 14, y + 14, w - 28, 24);
                // Eyes
                ctx.fillStyle = '#2a1a08';
                ctx.fillRect(x + 18, y + 18, 5, 5);
                ctx.fillRect(x + w - 23, y + 18, 5, 5);
                // Stubble shadow
                ctx.fillStyle = '#8a6040';
                ctx.fillRect(x + 14, y + 30, w - 28, 8);
                // Jacket
                ctx.fillStyle = '#6b3e1e';
                ctx.fillRect(x + 8, y + 36, w - 16, 24);
                break;

            case 'Sapito':
                ctx.fillStyle = '#1a2010';
                ctx.fillRect(x, y, w, h);
                // Head
                ctx.fillStyle = '#b8804a';
                ctx.fillRect(x + 14, y + 10, w - 28, 22);
                // Hair (dark)
                ctx.fillStyle = '#1a0e04';
                ctx.fillRect(x + 14, y + 8, w - 28, 8);
                // Eyes (nervous)
                ctx.fillStyle = '#1a1008';
                ctx.fillRect(x + 18, y + 16, 5, 5);
                ctx.fillRect(x + w - 23, y + 16, 5, 5);
                // Outfit (shirt)
                ctx.fillStyle = '#3a5a3a';
                ctx.fillRect(x + 8, y + 30, w - 16, 26);
                break;

            case 'Marcus':
                ctx.fillStyle = '#1a1a28';
                ctx.fillRect(x, y, w, h);
                // Grey hair
                ctx.fillStyle = '#b0a898';
                ctx.fillRect(x + 12, y + 8, w - 24, 10);
                // Head
                ctx.fillStyle = '#c0a080';
                ctx.fillRect(x + 12, y + 14, w - 24, 24);
                // Eyes (gentle)
                ctx.fillStyle = '#3a3060';
                ctx.fillRect(x + 16, y + 18, 5, 5);
                ctx.fillRect(x + w - 21, y + 18, 5, 5);
                // Glasses
                ctx.strokeStyle = '#7a6a40';
                ctx.lineWidth = 1.5;
                ctx.strokeRect(x + 14, y + 16, 10, 8);
                ctx.strokeRect(x + w - 24, y + 16, 10, 8);
                // Suit
                ctx.fillStyle = '#2a2a3a';
                ctx.fillRect(x + 6, y + 36, w - 12, 26);
                ctx.fillStyle = '#c8b060';
                ctx.fillRect(x + 16, y + 36, 6, 20);
                break;

            case 'Marion':
                ctx.fillStyle = '#1a1010';
                ctx.fillRect(x, y, w, h);
                // Hair (dark auburn)
                ctx.fillStyle = '#5a2810';
                ctx.fillRect(x + 10, y + 6, w - 20, 28);
                ctx.fillRect(x + 6, y + 12, 8, 20);
                ctx.fillRect(x + w - 14, y + 12, 8, 20);
                // Head
                ctx.fillStyle = '#c8a078';
                ctx.fillRect(x + 14, y + 12, w - 28, 22);
                // Eyes (determined)
                ctx.fillStyle = '#3a5a20';
                ctx.fillRect(x + 18, y + 16, 5, 5);
                ctx.fillRect(x + w - 23, y + 16, 5, 5);
                // Mouth (red lipstick)
                ctx.fillStyle = '#cc3030';
                ctx.fillRect(x + 18, y + 28, 14, 3);
                // Outfit
                ctx.fillStyle = '#3a2830';
                ctx.fillRect(x + 8, y + 32, w - 16, 26);
                break;

            case 'Sallah':
                ctx.fillStyle = '#20180e';
                ctx.fillRect(x, y, w, h);
                // Fez (red hat)
                ctx.fillStyle = '#aa2020';
                ctx.fillRect(x + 14, y + 6, w - 28, 14);
                ctx.fillStyle = '#1a1008';
                ctx.fillRect(x + 20, y + 6, 2, 12);
                // Head
                ctx.fillStyle = '#b87040';
                ctx.fillRect(x + 10, y + 16, w - 20, 22);
                // Bushy mustache
                ctx.fillStyle = '#1a0e04';
                ctx.fillRect(x + 12, y + 30, w - 24, 6);
                // Eyes (warm)
                ctx.fillStyle = '#5a3a18';
                ctx.fillRect(x + 16, y + 20, 5, 5);
                ctx.fillRect(x + w - 21, y + 20, 5, 5);
                // Outfit
                ctx.fillStyle = '#c8a050';
                ctx.fillRect(x + 8, y + 36, w - 16, 26);
                break;

            case 'Belloq':
                ctx.fillStyle = '#14101e';
                ctx.fillRect(x, y, w, h);
                // Slicked hair
                ctx.fillStyle = '#0e0a06';
                ctx.fillRect(x + 12, y + 8, w - 24, 12);
                // Head
                ctx.fillStyle = '#c4a870';
                ctx.fillRect(x + 12, y + 16, w - 24, 22);
                // Thin mustache
                ctx.fillStyle = '#1a1008';
                ctx.fillRect(x + 16, y + 30, w - 32, 3);
                // Eyes (sinister)
                ctx.fillStyle = '#1a1a3a';
                ctx.fillRect(x + 16, y + 20, 5, 5);
                ctx.fillRect(x + w - 21, y + 20, 5, 5);
                // Expensive suit
                ctx.fillStyle = '#1a1a2a';
                ctx.fillRect(x + 6, y + 36, w - 12, 26);
                ctx.fillStyle = '#c0b060';
                ctx.fillRect(x + 14, y + 36, 8, 20);
                break;

            case 'Toht':
                ctx.fillStyle = '#0a0a0a';
                ctx.fillRect(x, y, w, h);
                // SS officer hat
                ctx.fillStyle = '#0a0a0a';
                ctx.fillRect(x + 8, y + 6, w - 16, 8);
                ctx.fillRect(x + 4, y + 12, w - 8, 4);
                ctx.fillStyle = '#cc0000';
                ctx.fillRect(x + 12, y + 8, w - 24, 4);
                // Head (pale)
                ctx.fillStyle = '#c8c0b0';
                ctx.fillRect(x + 12, y + 14, w - 24, 22);
                // Round glasses
                ctx.strokeStyle = '#3a3020';
                ctx.lineWidth = 2;
                ctx.strokeRect(x + 14, y + 18, 10, 8);
                ctx.strokeRect(x + w - 24, y + 18, 10, 8);
                ctx.fillStyle = 'rgba(0,0,40,0.5)';
                ctx.fillRect(x + 15, y + 19, 9, 7);
                ctx.fillRect(x + w - 23, y + 19, 9, 7);
                // Black uniform
                ctx.fillStyle = '#0e0e0e';
                ctx.fillRect(x + 6, y + 34, w - 12, 28);
                ctx.fillStyle = '#cc0000';
                ctx.fillRect(x + 8, y + 36, 6, 10);
                break;

            default:
                ctx.fillStyle = '#1a1510';
                ctx.fillRect(x, y, w, h);
                // Generic NPC
                ctx.fillStyle = '#c0905a';
                ctx.fillRect(x + 14, y + 12, w - 28, 22);
                ctx.fillStyle = '#2a1810';
                ctx.fillRect(x + 12, y + 10, w - 24, 10);
                break;
        }
        ctx.restore();
    },

    isActive: function() {
        return GameState.dialog.active;
    },
};
