/* ============================================
   scenes/cairo.js
   Kapitel 4: Kairo – Der Markt
   ============================================ */

SceneManager.register('cairo', {

    hotspots: [
        {
            id: 'sallah',
            name: 'Sallah',
            x: 560, y: 190, w: 75, h: 160,
            walkX: 540, walkY: 330,
            verbs: {
                'look': function() {
                    GameState.showMessage("Sallah – der beste Schaufelmann in Ägypten und Indys bester Freund.");
                },
                'talk to': function() {
                    SceneManager.current.talkToSallah();
                }
            }
        },
        {
            id: 'merchant_carpet',
            name: 'Teppichhändler',
            x: 60, y: 210, w: 120, h: 150,
            walkX: 120, walkY: 330,
            verbs: {
                'look': function() {
                    GameState.showMessage("Ein ägyptischer Teppichhändler. Er hat auch... andere Dinge zu verkaufen.");
                },
                'talk to': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Entschuldigung – haben Sie gesehen, wo sie Marion hingebracht haben?' },
                        { speaker: 'Indiana', text: 'Der Händler tut so, als ob er kein Englisch versteht. Vielleicht tut er es wirklich nicht.' },
                        { speaker: 'Indiana', text: 'Ich brauche Sallah.' }
                    ]);
                }
            }
        },
        {
            id: 'market_stall',
            name: 'Gewürzstand',
            x: 200, y: 220, w: 150, h: 80,
            walkX: 275, walkY: 330,
            verbs: {
                'look': function() {
                    GameState.showMessage("Farbenfrohe Gewürze: Kurkuma, Saffran, Koriander. Und ein Geruch von... Gefahr?");
                }
            }
        },
        {
            id: 'dates_stall',
            name: 'Datteln-Stand',
            x: 390, y: 230, w: 130, h: 80,
            walkX: 455, walkY: 330,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Datteln. Frisch aus der Ernte. Die sehen verlockend aus-' }
                    ]);
                },
                'pick up': function() {
                    if (!GameState.flag('cairo_datesGiven')) {
                        Dialog.start([
                            { speaker: 'Indiana', text: 'Ich greife nach den Datteln... aber ein Affe schnappt sie mir weg!' },
                            { speaker: 'Indiana', text: 'Warte mal... dieser Affe. Er trägt einen... einen Hut. Das ist ein Spitzel-Affe!' }
                        ]);
                    } else {
                        GameState.showMessage("Die Datteln sind vergiftet gewesen. Kein Hunger mehr.");
                    }
                }
            }
        },
        {
            id: 'spy_monkey',
            name: 'Verdächtiger Affe',
            x: 430, y: 270, w: 50, h: 60,
            walkX: 455, walkY: 330,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Ein Affe mit einem Fez. In Kairo gibt es Dinge, die man einfach akzeptieren muss.' },
                        { speaker: 'Indiana', text: 'Aber dieser Affe beobachtet uns. Das ist kein normaler Affe.' }
                    ]);
                },
                'talk to': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Heil Hitler.' },
                        { speaker: 'Indiana', text: '...Der Affe salutiert. Bestätigt meinen Verdacht.' }
                    ]);
                }
            }
        },
        {
            id: 'map_room_entrance',
            name: 'Kartenraum-Eingang',
            x: 0, y: 150, w: 60, h: 230,
            walkX: 70, walkY: 330,
            condition: function() { return GameState.flag('cairo_foundSallah') && GameState.hasItem('headpiece_ra'); },
            verbs: {
                'look': function() {
                    GameState.showMessage("Der Eingang zum unterirdischen Kartenraum von Tanis.");
                },
                'use': function() {
                    SceneManager.current.enterWellOfSouls();
                }
            }
        },
        {
            id: 'nazi_soldier',
            name: 'Deutscher Soldat',
            x: 680, y: 200, w: 80, h: 180,
            walkX: 650, walkY: 330,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Ein Deutscher. In Uniform. Bewaffnet. Einer von vielen, die Belloq helfen.' }
                    ]);
                },
                'talk to': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Guten Tag. Ich bin ein... Gewürzhändler.' },
                        { speaker: 'Indiana', text: 'Er glaubt mir nicht. Verständlich.' }
                    ]);
                }
            }
        },
    ],

    onEnter: function(opts) {
        Character.place(380, 320, 'right');
        GameState.setFlag('cairo_basemarketVisited');

        Cutscene.play([
            { type: 'caption', text: 'Kairo, Ägypten – 1936', duration: 2.5 },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Kairo. Schmutziger, lauter und gefährlicher als je zuvor.' },
                { speaker: 'Indiana', text: 'Die Deutschen haben Marion irgendwo. Ich muss Sallah finden.' }
            ]},
        ]);
    },

    talkToSallah: function() {
        if (!GameState.flag('cairo_foundSallah')) {
            GameState.setFlag('cairo_foundSallah');
            Dialog.start([
                { speaker: 'Sallah',  text: 'Indy! Habibi! Ich wusste, dass du kommen würdest!' },
                { speaker: 'Indiana', text: 'Sallah, die Deutschen - sie haben Marion!' },
                { speaker: 'Sallah',  text: 'Ja, ja. Das weiß ich. Aber Indy - ich habe etwas herausgefunden.' },
                { speaker: 'Sallah',  text: 'Belloq benutzt eine Kopie des Kopfteils. Aber er kennt nur eine Seite!' },
                { speaker: 'Indiana', text: 'Was meinst du damit?' },
                { speaker: 'Sallah',  text: 'Das echte Kopfteil - dein Kopfteil - hat eine Inschrift auf der Rückseite!' },
                { speaker: 'Sallah',  text: 'Die Deutschen graben an der falschen Stelle! Wir können den echten Kartenraum benutzen.' },
                { speaker: 'Indiana', text: 'Der Kartenraum. Mit dem Stab des Ra. Wo ist er?' },
                { speaker: 'Sallah',  text: 'Ich zeige dir den Eingang. Aber erst brauchen wir den Stab!' },
            ], function() {
                GameState.setFlag('cairo_mapRoomOpen');
                if (!GameState.hasItem('staff_part1')) {
                    GameState.addItem('staff_part1');
                    GameState.addItem('staff_part2');
                    GameState.showMessage("Sallah gibt Indiana beide Teile des Stabs von Ra.");
                }
            });
        } else if (!GameState.flag('cairo_gotStaff')) {
            Dialog.start([
                { speaker: 'Sallah',  text: 'Wir müssen die Teile des Stabs zusammensetzen, Indy.' },
                { speaker: 'Indiana', text: 'Und dann? Den Kartenraum benutzen.' },
                { speaker: 'Sallah',  text: 'Genau! Der Eingang ist dort links.' }
            ]);
        } else {
            Dialog.start([
                { speaker: 'Sallah',  text: 'Die Quelle der Seelen wartet, mein Freund. Gehen wir!' }
            ]);
        }
    },

    enterWellOfSouls: function() {
        if (!GameState.hasItem('headpiece_ra') || !GameState.hasItem('staff_part1')) {
            Dialog.start([
                { speaker: 'Indiana', text: 'Ich brauche das Kopfteil und den Stab. Hab ich beides?' }
            ]);
            return;
        }

        Cutscene.play([
            { type: 'dialog', lines: [
                { speaker: 'Sallah',  text: 'Hier! Der Kartenraum liegt darunter.' },
                { speaker: 'Indiana', text: 'Okay. Setzen wir den Stab zusammen und lassen das Licht arbeiten.' }
            ]},
            { type: 'flag', key: 'cairo_gotStaff' },
            { type: 'item_remove', item: 'staff_part1' },
            { type: 'item_remove', item: 'staff_part2' },
            { type: 'item_remove', item: 'headpiece_ra' },
            { type: 'fade_out', duration: 0.8 },
            { type: 'scene', scene: 'wellofsouls' },
        ]);
    },

    update: function(dt) {},

    draw: function(ctx, time) {
        this.drawBackground(ctx, time);
        this.drawSallah(ctx, time);
        this.drawNaziSoldier(ctx, time);
        this.drawMonkey(ctx, time);
    },

    drawBackground: function(ctx, time) {
        var W = CONFIG.CANVAS_W, H = CONFIG.SCENE_H;

        // === Egyptian market street ===

        // Sky (hot blue desert sky)
        ctx.fillStyle = '#5a8fc8';
        ctx.fillRect(0, 0, W, 90);

        // Haze/heat effect
        ctx.fillStyle = 'rgba(255,200,100,0.12)';
        ctx.fillRect(0, 50, W, 50);

        // Far background buildings (silhouettes)
        ctx.fillStyle = '#c8a060';
        ctx.fillRect(0, 60, W, 50);

        // Distant minaret
        ctx.fillStyle = '#b8904a';
        ctx.fillRect(340, 20, 16, 70);
        ctx.fillRect(332, 62, 32, 12);
        ctx.fillRect(336, 16, 24, 8);

        // Market building facades
        // Left building (sand brick)
        ctx.fillStyle = '#d4a860';
        ctx.fillRect(0, 78, 280, 240);
        // Window details
        ctx.fillStyle = '#1a1408';
        ctx.fillRect(30, 100, 60, 80);   // arch window
        ctx.fillStyle = '#c8a040';
        ctx.fillRect(32, 102, 56, 40);
        // Window arch
        ctx.fillStyle = '#1a1408';
        ctx.beginPath();
        ctx.ellipse(60, 142, 28, 20, 0, Math.PI, 0);
        ctx.fill();

        // Middle building
        ctx.fillStyle = '#c8a050';
        ctx.fillRect(280, 78, 180, 230);
        // Decorative inlay
        ctx.fillStyle = '#b89040';
        ctx.fillRect(290, 88, 160, 6);
        ctx.fillRect(290, 104, 160, 4);
        // Window
        ctx.fillStyle = '#2a1a08';
        ctx.fillRect(330, 110, 80, 100);
        ctx.fillStyle = '#c0a040';
        ctx.fillRect(334, 114, 36, 70);
        ctx.fillRect(370, 114, 36, 70);
        ctx.fillStyle = '#2a1a08';
        ctx.fillRect(365, 114, 8, 70);

        // Right side alley / building
        ctx.fillStyle = '#be9848';
        ctx.fillRect(460, 78, 340, 230);
        ctx.fillStyle = '#b08840';
        ctx.fillRect(462, 82, 336, 4);

        // Hanging lanterns
        this.drawLantern(ctx, 150, 95, time);
        this.drawLantern(ctx, 350, 90, time + 1.2);
        this.drawLantern(ctx, 550, 95, time + 0.6);
        this.drawLantern(ctx, 700, 90, time + 0.9);

        // Rope with lanterns across alley
        ctx.strokeStyle = '#5a3a10';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 90); ctx.bezierCurveTo(200, 96, 300, 88, 400, 92);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(400, 92); ctx.bezierCurveTo(500, 96, 620, 86, 800, 92);
        ctx.stroke();

        // Market stalls (awnings)
        // Left stall (carpet merchant)
        ctx.fillStyle = '#aa2020';
        ctx.fillRect(30, 188, 160, 16);
        ctx.fillStyle = '#881a1a';
        ctx.fillRect(30, 198, 160, 6);
        // Striped awning
        for (var as = 0; as < 16; as++) {
            if (as % 2 === 0) {
                ctx.fillStyle = '#aa2020';
                ctx.fillRect(30 + as * 10, 188, 10, 16);
            }
        }
        // Carpet display
        for (var cp2 = 0; cp2 < 4; cp2++) {
            ctx.fillStyle = ['#8a1010','#102a8a','#0a5a0a','#6a5010'][cp2];
            ctx.fillRect(35 + cp2 * 36, 205, 32, 50);
            // Carpet border
            ctx.fillStyle = '#c0a020';
            ctx.fillRect(35 + cp2 * 36, 205, 32, 2);
            ctx.fillRect(35 + cp2 * 36, 205, 2, 50);
        }

        // Middle stall (spices)
        ctx.fillStyle = '#206020';
        ctx.fillRect(190, 192, 180, 14);
        // Spice piles
        var spiceColors = ['#ff8800','#ffff00','#cc2200','#804a00','#804000'];
        for (var sp = 0; sp < 5; sp++) {
            ctx.fillStyle = spiceColors[sp];
            ctx.fillRect(195 + sp * 34, 206, 30, 24);
            ctx.fillStyle = Utils.darken(spiceColors[sp], 10);
            ctx.fillRect(195 + sp * 34 + 8, 206, 14, 8); // pile highlight
        }

        // Date palm stall
        ctx.fillStyle = '#8a5a10';
        ctx.fillRect(370, 195, 160, 14);
        // Dates
        ctx.fillStyle = '#5a2a08';
        ctx.fillRect(380, 210, 60, 30);
        ctx.fillStyle = '#7a4010';
        ctx.fillRect(445, 208, 50, 32);

        // Ground (dusty sand/stone)
        ctx.fillStyle = '#c8a850';
        ctx.fillRect(0, 290, W, H - 290);
        // Ground texture
        for (var gt = 0; gt < 20; gt++) {
            ctx.fillStyle = 'rgba(0,0,0,0.06)';
            ctx.fillRect(gt * 42, 290, 2, H - 290);
        }
        // Shadow under stalls
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(0, 285, W, 15);

        // Dust motes
        ctx.fillStyle = 'rgba(255,220,100,0.15)';
        ctx.fillRect(0, 290, W, 30);

        // Left entrance (to map room)
        ctx.fillStyle = '#1a1208';
        ctx.fillRect(0, 150, 62, 230);
        ctx.fillStyle = '#0e0a04';
        ctx.fillRect(2, 152, 58, 228);
        // Steps down
        ctx.fillStyle = '#2a1a08';
        ctx.fillRect(0, 355, 62, 12);
        ctx.fillRect(0, 367, 62, 9);
        // Entrance arch
        ctx.fillStyle = '#c8a050';
        ctx.fillRect(0, 146, 65, 8);
        ctx.fillStyle = '#d4b060';
        ctx.fillRect(0, 138, 65, 10);

        // Sunlight beam (top right)
        ctx.fillStyle = 'rgba(255,220,100,0.06)';
        ctx.beginPath();
        ctx.moveTo(W, 0); ctx.lineTo(W - 200, 0); ctx.lineTo(W, 200);
        ctx.fill();
    },

    drawLantern: function(ctx, x, y, time) {
        var swing = 4 * Math.sin(time * 1.5 + x * 0.02);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(swing * Math.PI / 180);

        // Rope
        ctx.strokeStyle = '#5a3a10';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -10); ctx.lineTo(0, 0);
        ctx.stroke();

        // Lantern body
        ctx.fillStyle = '#aa5500';
        ctx.fillRect(-8, 0, 16, 22);
        // Glass
        var glowAlpha = 0.6 + 0.2 * Math.sin(time * 7 + x);
        ctx.fillStyle = 'rgba(255,200,50,' + glowAlpha + ')';
        ctx.fillRect(-6, 2, 12, 18);
        // Glow
        ctx.fillStyle = 'rgba(255,150,30,0.2)';
        ctx.fillRect(-16, -4, 32, 32);
        // Top/bottom caps
        ctx.fillStyle = '#7a3a00';
        ctx.fillRect(-9, -2, 18, 4);
        ctx.fillRect(-9, 22, 18, 4);

        ctx.restore();
    },

    drawSallah: function(ctx, time) {
        Character.drawNPC(ctx, 595, 330, {
            scale: 1.05,
            skin:   '#b87040',
            jacket: '#c8a050',
            pants:  '#8a6030',
            hat:    '#aa2020',   // fez
            facing: 'left',
            frame:  0,
        });
        Utils.text(ctx, 'Sallah', 595, 342, { size: 9, color: '#c0a060', align: 'center', shadow: true });
    },

    drawNaziSoldier: function(ctx, time) {
        Character.drawNPC(ctx, 718, 330, {
            scale: 1.0,
            skin:   '#c0b090',
            jacket: '#3a4020',
            pants:  '#2a3018',
            hat:    '#2a3018',
            facing: 'left',
            frame:  0,
        });
    },

    drawMonkey: function(ctx, time) {
        var mx = 460, my = 310;
        var bounce = Math.abs(Math.sin(time * 3)) * 6;
        ctx.save();
        ctx.translate(mx, my - bounce);

        // Monkey body
        ctx.fillStyle = '#7a5030';
        ctx.fillRect(-8, -20, 16, 22);
        // Head
        ctx.fillStyle = '#8a6040';
        ctx.fillRect(-7, -34, 14, 16);
        // Ears
        ctx.fillRect(-11, -31, 6, 8);
        ctx.fillRect(7,   -31, 6, 8);
        // Face (lighter)
        ctx.fillStyle = '#c0a070';
        ctx.fillRect(-5, -30, 10, 10);
        // Eyes
        ctx.fillStyle = '#1a0e04';
        ctx.fillRect(-3, -28, 3, 3);
        ctx.fillRect(1,  -28, 3, 3);
        // Fez hat!
        ctx.fillStyle = '#aa2020';
        ctx.fillRect(-7, -40, 14, 8);
        ctx.fillRect(-5, -44, 10, 6);
        ctx.fillStyle = '#1a0a08';
        ctx.fillRect(-1, -44, 2, 8);
        // Tail
        ctx.strokeStyle = '#7a5030';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(8, -5); ctx.quadraticCurveTo(20, 0, 18, 12);
        ctx.stroke();

        ctx.restore();
    },
});
