/* ============================================
   utils.js – Drawing Utilities & Helpers
   ============================================ */

var Utils = {

    // ── Pixel Art Drawing Helpers ─────────────

    // Draw a "pixel block" (rounded at given scale)
    px: function(ctx, x, y, w, h, color) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    },

    // Draw styled text with stroke outline (pixel-font feel)
    text: function(ctx, str, x, y, opts) {
        opts = opts || {};
        var size    = opts.size    || 13;
        var color   = opts.color   || CONFIG.UI.TEXT;
        var align   = opts.align   || 'left';
        var stroke  = opts.stroke  || null;
        var shadow  = opts.shadow  || false;

        ctx.font = 'bold ' + size + 'px "Courier New", monospace';
        ctx.textAlign = align;
        ctx.textBaseline = 'top';

        if (shadow) {
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillText(str, x + 1, y + 1);
        }
        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.lineWidth = 2;
            ctx.strokeText(str, x, y);
        }
        ctx.fillStyle = color;
        ctx.fillText(str, x, y);
    },

    // Draw wrapped text, returns next y
    textWrap: function(ctx, str, x, y, maxW, lineH, opts) {
        opts = opts || {};
        var size = opts.size || 13;
        ctx.font = 'bold ' + size + 'px "Courier New", monospace';

        var words = str.split(' ');
        var line = '';
        var cy = y;

        for (var i = 0; i < words.length; i++) {
            var test = line ? line + ' ' + words[i] : words[i];
            if (ctx.measureText(test).width > maxW && line) {
                this.text(ctx, line, x, cy, opts);
                line = words[i];
                cy += lineH;
            } else {
                line = test;
            }
        }
        if (line) {
            this.text(ctx, line, x, cy, opts);
            cy += lineH;
        }
        return cy;
    },

    // Draw a stone-textured rectangle
    stoneRect: function(ctx, x, y, w, h, baseColor, highlightColor, shadowColor) {
        highlightColor = highlightColor || this.lighten(baseColor, 20);
        shadowColor    = shadowColor    || this.darken(baseColor, 20);

        // Base
        ctx.fillStyle = baseColor;
        ctx.fillRect(x, y, w, h);

        // Top / left highlight
        ctx.fillStyle = highlightColor;
        ctx.fillRect(x, y, w, 2);
        ctx.fillRect(x, y, 2, h);

        // Bottom / right shadow
        ctx.fillStyle = shadowColor;
        ctx.fillRect(x, y + h - 2, w, 2);
        ctx.fillRect(x + w - 2, y, 2, h);
    },

    // Draw a stone wall tiled pattern
    stoneWall: function(ctx, x, y, w, h, colorA, colorB) {
        colorA = colorA || '#2e221a';
        colorB = colorB || '#261c14';
        var bW = 40, bH = 20;
        var row = 0;

        for (var ry = y; ry < y + h; ry += bH, row++) {
            var offsetX = (row % 2 === 0) ? 0 : bW / 2;
            for (var rx = x - offsetX; rx < x + w; rx += bW) {
                var bx = Math.max(rx, x);
                var bw = Math.min(rx + bW, x + w) - bx;
                if (bw <= 0) continue;
                var by = ry;
                var bh = Math.min(bH, y + h - ry);
                var col = (row + Math.floor((rx - x) / bW)) % 2 === 0 ? colorA : colorB;
                this.stoneRect(ctx, bx, by, bw, bh, col, this.lighten(col, 8), this.darken(col, 12));
            }
        }
    },

    // Draw a stone floor tiled pattern
    stoneFloor: function(ctx, x, y, w, h, colorA, colorB) {
        colorA = colorA || '#1e1812';
        colorB = colorB || '#1a140e';
        var tW = 60, tH = 30;
        var row = 0;
        for (var ry = y; ry < y + h; ry += tH, row++) {
            for (var rx = x; rx < x + w; rx += tW) {
                var col = (row + Math.floor((rx - x) / tW)) % 2 === 0 ? colorA : colorB;
                var bw = Math.min(tW, x + w - rx);
                var bh = Math.min(tH, y + h - ry);
                ctx.fillStyle = col;
                ctx.fillRect(rx, ry, bw, bh);
                // grout lines
                ctx.fillStyle = this.darken(col, 15);
                ctx.fillRect(rx, ry, bw, 1);
                ctx.fillRect(rx, ry, 1, bh);
            }
        }
    },

    // Draw flickering torch
    torch: function(ctx, cx, y, time) {
        var flicker = 0.7 + 0.3 * Math.sin(time * 12 + cx);
        var flicker2 = 0.7 + 0.3 * Math.sin(time * 17 + cx * 0.5);

        // Wall bracket
        ctx.fillStyle = '#2a1a0e';
        ctx.fillRect(cx - 4, y + 14, 8, 18);
        ctx.fillRect(cx - 7, y + 24, 14, 6);

        // Glow aura
        var gr = ctx.createRadialGradient(cx, y, 2, cx, y, 60 * flicker);
        gr.addColorStop(0, 'rgba(255,180,40,0.35)');
        gr.addColorStop(0.4, 'rgba(255,120,10,0.15)');
        gr.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(cx, y, 60 * flicker, 0, Math.PI * 2);
        ctx.fill();

        // Flame layers
        var fh = (18 + 6 * flicker2);
        // outer flame
        ctx.fillStyle = 'rgba(255,100,0,' + (0.6 * flicker) + ')';
        this.drawFlame(ctx, cx, y, 10, fh);
        // mid flame
        ctx.fillStyle = 'rgba(255,180,0,' + (0.8 * flicker) + ')';
        this.drawFlame(ctx, cx, y, 6, fh * 0.7);
        // inner flame
        ctx.fillStyle = 'rgba(255,240,180,' + (0.9 * flicker2) + ')';
        this.drawFlame(ctx, cx, y, 3, fh * 0.4);
    },

    drawFlame: function(ctx, cx, cy, hw, fh) {
        ctx.beginPath();
        ctx.moveTo(cx - hw, cy);
        ctx.quadraticCurveTo(cx - hw * 1.5, cy - fh * 0.5, cx, cy - fh);
        ctx.quadraticCurveTo(cx + hw * 1.5, cy - fh * 0.5, cx + hw, cy);
        ctx.closePath();
        ctx.fill();
    },

    // ── Color Helpers ─────────────────────────

    // Parse hex color to RGB
    hexToRgb: function(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        return {
            r: parseInt(hex.substr(0, 2), 16),
            g: parseInt(hex.substr(2, 2), 16),
            b: parseInt(hex.substr(4, 2), 16),
        };
    },

    // RGB to hex
    rgbToHex: function(r, g, b) {
        return '#' + [r, g, b].map(function(v) {
            return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
        }).join('');
    },

    lighten: function(hex, amount) {
        var c = this.hexToRgb(hex);
        return this.rgbToHex(c.r + amount, c.g + amount, c.b + amount);
    },

    darken: function(hex, amount) {
        var c = this.hexToRgb(hex);
        return this.rgbToHex(c.r - amount, c.g - amount, c.b - amount);
    },

    // ── Geometry Helpers ─────────────────────

    pointInRect: function(px, py, rx, ry, rw, rh) {
        return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
    },

    dist: function(x1, y1, x2, y2) {
        var dx = x2 - x1, dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },

    lerp: function(a, b, t) {
        return a + (b - a) * t;
    },

    clamp: function(val, min, max) {
        return Math.max(min, Math.min(max, val));
    },

    // ── Misc ─────────────────────────────────

    // Easing function
    easeInOut: function(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },

    // Draw a rounded rect path
    roundRect: function(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.closePath();
    },
};
