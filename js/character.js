/* ============================================
   character.js – Indiana Jones Character
   Drawing & Animation
   ============================================ */

var Character = {

    // Draw Indiana Jones at (x, y) — y is feet position
    draw: function(ctx, x, y, facing, animFrame, scale) {
        scale = scale || 1.0;
        var w  = Math.round(24 * scale);   // body width
        var h  = Math.round(64 * scale);   // total height

        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        if (facing === 'left') ctx.scale(-1, 1);

        var s = scale;
        var f = animFrame % 4;  // 0,1,2,3 walk cycle

        // ── Legs ──────────────────────────────────
        var legSwing = (f === 1 || f === 3) ? 5 * s : 0;

        // Pants (khaki)
        ctx.fillStyle = '#9a8858';
        // Left leg
        ctx.fillRect(-7 * s, -22 * s, 7 * s, 22 * s);
        // Right leg
        ctx.fillRect(0,       -22 * s, 7 * s, 22 * s);

        // Walk animation: shift legs
        if (GameState.player.walking) {
            ctx.fillStyle = '#9a8858';
            // front leg
            ctx.fillRect(-7 * s, (-22 + legSwing) * s, 7 * s, (22 - legSwing) * s);
            // back leg
            ctx.fillRect(0,      (-22 - legSwing) * s, 7 * s, (22 + legSwing) * s);
        }

        // Boots
        ctx.fillStyle = '#2e1a08';
        ctx.fillRect(-9 * s, -6 * s, 9 * s, 6 * s);    // left boot
        ctx.fillRect(0,      -6 * s, 9 * s, 6 * s);    // right boot
        // boot toe
        ctx.fillRect(-10 * s, -4 * s, 4 * s, 4 * s);
        ctx.fillRect(7 * s,   -4 * s, 4 * s, 4 * s);

        // ── Body / Jacket ─────────────────────────
        ctx.fillStyle = '#6b3e1e';  // leather jacket
        ctx.fillRect(-10 * s, -44 * s, 20 * s, 22 * s);

        // Shirt (collar visible center)
        ctx.fillStyle = '#c8b07a';
        ctx.fillRect(-3 * s, -44 * s, 6 * s, 18 * s);

        // Jacket lapels
        ctx.fillStyle = '#7a4a28';
        ctx.fillRect(-10 * s, -44 * s, 6 * s, 14 * s);
        ctx.fillRect(4 * s,   -44 * s, 6 * s, 14 * s);

        // Belt
        ctx.fillStyle = '#2e1a08';
        ctx.fillRect(-10 * s, -22 * s, 20 * s, 4 * s);
        ctx.fillStyle = '#8a8040';
        ctx.fillRect(-2 * s, -22 * s, 4 * s, 4 * s);  // buckle

        // ── Arms ─────────────────────────────────
        var armSwing = GameState.player.walking ? (f % 2 === 0 ? 4 * s : -4 * s) : 0;

        // Left arm
        ctx.fillStyle = '#6b3e1e';
        ctx.fillRect(-16 * s, (-44 + armSwing) * s, 7 * s, 18 * s);
        // Left hand
        ctx.fillStyle = '#c4935a';
        ctx.fillRect(-16 * s, (-26 + armSwing) * s, 7 * s, 6 * s);

        // Right arm (whip arm)
        ctx.fillStyle = '#6b3e1e';
        ctx.fillRect(9 * s,  (-44 - armSwing) * s, 7 * s, 18 * s);
        // Right hand
        ctx.fillStyle = '#c4935a';
        ctx.fillRect(9 * s,  (-26 - armSwing) * s, 7 * s, 6 * s);

        // ── Head ─────────────────────────────────
        ctx.fillStyle = '#c4935a';  // skin
        ctx.fillRect(-8 * s, -60 * s, 16 * s, 16 * s);

        // Eyes
        ctx.fillStyle = '#1a1008';
        ctx.fillRect(-5 * s, -57 * s, 3 * s, 3 * s);
        ctx.fillRect(2 * s,  -57 * s, 3 * s, 3 * s);

        // Eye whites
        ctx.fillStyle = '#e0d0b0';
        ctx.fillRect(-5 * s, -58 * s, 3 * s, 2 * s);
        ctx.fillRect(2 * s,  -58 * s, 3 * s, 2 * s);

        // Nose
        ctx.fillStyle = '#b07840';
        ctx.fillRect(-1 * s, -54 * s, 2 * s, 3 * s);

        // Mouth (slight grin)
        ctx.fillStyle = '#7a4020';
        ctx.fillRect(-4 * s, -49 * s, 8 * s, 2 * s);
        ctx.fillStyle = '#d08050';
        ctx.fillRect(-3 * s, -49 * s, 2 * s, 2 * s);
        ctx.fillRect(1 * s,  -49 * s, 2 * s, 2 * s);

        // Stubble
        ctx.fillStyle = 'rgba(80,50,20,0.4)';
        ctx.fillRect(-7 * s, -50 * s, 3 * s, 2 * s);
        ctx.fillRect(4 * s,  -50 * s, 3 * s, 2 * s);

        // ── Fedora ────────────────────────────────
        // Brim
        ctx.fillStyle = '#3a2010';
        ctx.fillRect(-14 * s, -63 * s, 28 * s, 4 * s);
        // Crown
        ctx.fillStyle = '#4a2a14';
        ctx.fillRect(-9 * s,  -76 * s, 18 * s, 14 * s);
        // Crown indent (classic dent)
        ctx.fillStyle = '#3a2010';
        ctx.fillRect(-4 * s,  -76 * s, 8 * s, 4 * s);
        // Hat band
        ctx.fillStyle = '#1e0e06';
        ctx.fillRect(-9 * s, -65 * s, 18 * s, 3 * s);

        // ── Whip (clipped to belt) ────────────────
        ctx.fillStyle = '#1e0e06';
        ctx.fillRect(8 * s, -18 * s, 4 * s, 12 * s);

        ctx.restore();
    },

    // Draw an NPC sprite (simplified)
    drawNPC: function(ctx, x, y, opts) {
        opts = opts || {};
        var scale    = opts.scale    || 1.0;
        var skinTone = opts.skin     || '#c4935a';
        var jacketC  = opts.jacket   || '#3a4a5a';
        var pantsC   = opts.pants    || '#2a3040';
        var hatC     = opts.hat      || null;
        var facing   = opts.facing   || 'right';
        var frame    = opts.frame    || 0;
        var s = scale;

        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        if (facing === 'left') ctx.scale(-1, 1);

        // Legs
        ctx.fillStyle = pantsC;
        ctx.fillRect(-7 * s, -22 * s, 7 * s, 22 * s);
        ctx.fillRect(0,      -22 * s, 7 * s, 22 * s);

        // Shoes
        ctx.fillStyle = '#1a1008';
        ctx.fillRect(-8 * s, -5 * s, 8 * s, 5 * s);
        ctx.fillRect(0,      -5 * s, 8 * s, 5 * s);

        // Body
        ctx.fillStyle = jacketC;
        ctx.fillRect(-10 * s, -44 * s, 20 * s, 22 * s);

        // Shirt
        ctx.fillStyle = this.lighten(jacketC, 30);
        ctx.fillRect(-3 * s, -44 * s, 6 * s, 16 * s);

        // Arms
        ctx.fillStyle = jacketC;
        ctx.fillRect(-16 * s, -44 * s, 7 * s, 18 * s);
        ctx.fillRect(9 * s,   -44 * s, 7 * s, 18 * s);

        // Hands
        ctx.fillStyle = skinTone;
        ctx.fillRect(-16 * s, -27 * s, 7 * s, 5 * s);
        ctx.fillRect(9 * s,   -27 * s, 7 * s, 5 * s);

        // Head
        ctx.fillStyle = skinTone;
        ctx.fillRect(-8 * s, -60 * s, 16 * s, 16 * s);

        // Eyes
        ctx.fillStyle = '#1a1008';
        ctx.fillRect(-5 * s, -57 * s, 3 * s, 3 * s);
        ctx.fillRect(2 * s,  -57 * s, 3 * s, 3 * s);

        // Hat (optional)
        if (hatC) {
            ctx.fillStyle = this.darken(hatC, 10);
            ctx.fillRect(-13 * s, -63 * s, 26 * s, 4 * s);
            ctx.fillStyle = hatC;
            ctx.fillRect(-8 * s,  -75 * s, 16 * s, 13 * s);
        } else {
            // Hair
            ctx.fillStyle = '#1a0e04';
            ctx.fillRect(-8 * s, -62 * s, 16 * s, 4 * s);
        }

        ctx.restore();
    },

    lighten: function(hex, amt) { return Utils.lighten(hex, amt); },
    darken:  function(hex, amt) { return Utils.darken(hex, amt);  },

    // Update walking animation
    update: function(dt) {
        var p = GameState.player;
        if (!p.visible) return;

        // Move toward target
        if (p.walking) {
            var dx   = p.targetX - p.x;
            var dy   = p.targetY - p.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            var step = CONFIG.WALK_SPEED * dt;

            if (dist <= step) {
                p.x = p.targetX;
                p.y = p.targetY;
                p.walking = false;
                if (p.onArrival) {
                    var cb = p.onArrival;
                    p.onArrival = null;
                    cb();
                }
            } else {
                var nx = dx / dist;
                var ny = dy / dist;
                p.x += nx * step;
                p.y += ny * step;
                p.facing = dx < 0 ? 'left' : 'right';
            }

            // Animate walk cycle
            p.animTimer += dt;
            if (p.animTimer >= 1 / CONFIG.ANIM_FPS) {
                p.animTimer = 0;
                p.animFrame = (p.animFrame + 1) % 4;
            }
        } else {
            p.animFrame = 0;
        }
    },

    // Command player to walk to position
    walkTo: function(x, y, callback) {
        var p = GameState.player;
        p.targetX  = x;
        p.targetY  = y;
        p.walking  = true;
        p.onArrival = callback || null;
    },

    // Instantly place player
    place: function(x, y, facing) {
        var p = GameState.player;
        p.x = p.targetX = x;
        p.y = p.targetY = y;
        p.walking = false;
        if (facing) p.facing = facing;
    },
};
