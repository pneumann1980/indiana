/* ============================================
   scenes/nepal.js
   Kapitel 3: Der Rabe – Kathmandu, Nepal
   ============================================ */

SceneManager.register('nepal', {

    hotspots: [
        {
            id: 'marion',
            name: 'Marion Ravenwood',
            x: 300, y: 195, w: 70, h: 150,
            walkX: 280, walkY: 315,
            verbs: {
                'look': function() {
                    GameState.showMessage("Marion Ravenwood. Noch genauso schön und gefährlich wie ich sie in Erinnerung habe.");
                },
                'talk to': function() {
                    SceneManager.current.talkToMarion();
                }
            }
        },
        {
            id: 'bar_counter',
            name: 'Tresen',
            x: 70, y: 230, w: 220, h: 60,
            walkX: 180, walkY: 310,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Ein gut bestückter Tresen. Marion führt hier einen florierenden Betrieb. Irgendwie bewundernswert.' }
                    ]);
                },
                'use': function() {
                    GameState.showMessage("Ich könnte einen Schnaps gebrauchen. Aber jetzt nicht.");
                }
            }
        },
        {
            id: 'drinks',
            name: 'Glasflasche',
            x: 80, y: 200, w: 60, h: 80,
            walkX: 130, walkY: 310,
            verbs: {
                'look': function() {
                    GameState.showMessage("Starkes lokales Gebräu. Marion hat einen beeindruckenden Vorrat.");
                },
                'pick up': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Das wäre Diebstahl. Außerdem brauche ich einen klaren Kopf.' },
                        { speaker: 'Indiana', text: 'Fast.' }
                    ]);
                }
            }
        },
        {
            id: 'medallion',
            name: 'Das Kopfteil des Ra',
            x: 290, y: 230, w: 80, h: 50,
            walkX: 280, walkY: 310,
            condition: function() { return GameState.flag('nepal_metMarion') && !GameState.flag('nepal_medallionGiven'); },
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Das Kopfteil des Stabs von Ra. Es ist noch schöner als ich es mir vorgestellt habe.' },
                        { speaker: 'Indiana', text: 'Mit dem richtigen Stab kann man den Kartenraum benutzen, um die Bundeslade zu finden.' }
                    ]);
                },
                'pick up': function() {
                    if (!GameState.flag('nepal_metMarion')) {
                        GameState.showMessage("Ich muss erst mit Marion reden.");
                    } else {
                        SceneManager.current.takeMedallion();
                    }
                }
            }
        },
        {
            id: 'fireplace',
            name: 'Kaminfeuer',
            x: 590, y: 140, w: 120, h: 200,
            walkX: 630, walkY: 315,
            verbs: {
                'look': function() {
                    GameState.showMessage("Ein knisterndes Feuer. In der Kälte des Himalaya überlebensnotwendig.");
                }
            }
        },
        {
            id: 'nepali_patron',
            name: 'Einheimischer Gast',
            x: 470, y: 220, w: 70, h: 130,
            walkX: 500, walkY: 315,
            verbs: {
                'look': function() {
                    GameState.showMessage("Ein einheimischer Stammgast. Er beobachtet alles mit misstrauischen Augen.");
                },
                'talk to': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Entschuldigung - haben Sie heute Abend Fremde hier gesehen? Deutsche vielleicht?' },
                        { speaker: 'Indiana', text: '...Er versteht mich nicht. Oder er tut so.' }
                    ]);
                }
            }
        },
        {
            id: 'exit_out',
            name: 'Ausgang nach Kairo',
            x: 720, y: 200, w: 80, h: 180,
            walkX: 720, walkY: 315,
            condition: function() { return GameState.flag('nepal_medallionGiven'); },
            verbs: {
                'look': function() {
                    GameState.showMessage("Der Weg hinaus. Nach Ägypten. Nach Kairo.");
                },
                'use': function() {
                    SceneManager.current.leaveToCairo();
                }
            }
        },
    ],

    onEnter: function(opts) {
        Character.place(100, 315, 'right');
        GameState.setFlag('nepal_barEntered');

        if (!GameState.flag('nepal_metMarion')) {
            Cutscene.play([
                { type: 'caption', text: 'Kathmandu, Nepal', duration: 2.5 },
                { type: 'caption', text: 'Marions Bar – „Der Rabe"', duration: 2.0 },
                { type: 'dialog', lines: [
                    { speaker: 'Indiana', text: 'Da wäre ich also. Marions Bar. Das letzte Mal vor elf Jahren-' },
                    { speaker: 'Marion',  text: 'Indiana Jones. Was zum Teufel machst du hier?' },
                    { speaker: 'Indiana', text: 'Hallo, Marion. Du siehst... gut aus.' },
                    { speaker: 'Marion',  text: '\'Gut aus\'. Typisch. Komm mir nicht mit Schmeicheleien, Jones. Was willst du?' },
                    { speaker: 'Indiana', text: 'Dein Vater hinterlassen... das Kopfteil des Stabs von Ra.' },
                    { speaker: 'Marion',  text: 'Und wenn schon? Das gehört mir. Er hat es mir gegeben.' },
                ]},
            ]);
        }
    },

    talkToMarion: function() {
        if (!GameState.flag('nepal_metMarion')) {
            GameState.setFlag('nepal_metMarion');
            Dialog.start([
                { speaker: 'Marion',  text: 'Du kommst wegen dem Kopfteil? Warum sollte ich dir helfen, Indiana?' },
                { speaker: 'Indiana', text: 'Die Deutschen wollen es auch, Marion. Und die spielen nicht nach Queensberry-Regeln.' },
                { speaker: 'Marion',  text: 'Bah. Lass sie kommen. Ich hab schon schlimmeres überstanden.' },
                { speaker: 'Indiana', text: 'Marion-' },
                { speaker: 'Marion',  text: 'Ich will zuerst zahlen, Jones. Das Kopfteil hat seinen Preis.' },
                { speaker: 'Indiana', text: 'Natürlich. Wieviel?' },
                { speaker: 'Marion',  text: 'Dreitausend Dollar. Und ich komme mit.' },
                { speaker: 'Indiana', text: '...Deal.' },
            ], function() {
                GameState.showMessage("Marion zeigt das Kopfteil des Ra.");
            });
        } else if (!GameState.flag('nepal_medallionGiven')) {
            Dialog.start([
                { speaker: 'Marion',  text: 'Na? Nimmst du das Kopfteil oder nicht?' },
                { speaker: 'Indiana', text: 'Ja. Gib es mir, Marion.' }
            ], function() {
                SceneManager.current.takeMedallion();
            });
        } else {
            Dialog.start([
                { speaker: 'Marion',  text: 'Wir müssen uns beeilen, Indy. Kairo wartet.' },
                { speaker: 'Indiana', text: 'Ich weiß. Gehen wir.' }
            ]);
        }
    },

    takeMedallion: function() {
        Cutscene.play([
            { type: 'item_give', item: 'headpiece_ra' },
            { type: 'flag', key: 'nepal_medallionGiven' },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Das Kopfteil. Es ist... wunderschön.' },
                { speaker: 'Marion',  text: 'Ja. Und jetzt komme ich mit. Ein Deal ist ein Deal.' },
            ]},
            { type: 'wait', duration: 0.5 },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Warte - jemand kommt!' },
                { speaker: 'Toht',    text: 'Doktor Jones. Und Fräulein Ravenwood. Wie... überraschend angenehm.' },
                { speaker: 'Marion',  text: 'Toht! Was soll das bedeuten?!' },
                { speaker: 'Toht',    text: 'Das Kopfteil, wenn ich bitten darf. Und dann... nun, wir werden sehen.' },
                { speaker: 'Indiana', text: 'Marion - die Hintertür! Jetzt!' }
            ]},
            { type: 'flag', key: 'nepal_belloqAttacked' },
            { type: 'fade_out', duration: 0.5 },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Wir entkommen. Knapp, aber wir sind raus.' },
                { speaker: 'Marion',  text: 'Das nächste Mal warnst du mich vorher, wenn Nazis auftauchen!' },
                { speaker: 'Indiana', text: 'Entschuldigung. Nächstes Mal. Versprochen. Jetzt: Kairo.' }
            ]},
            { type: 'travel_map', from: 'nepal', to: 'cairo', label: 'Kairo, Ägypten' },
            { type: 'scene', scene: 'cairo' },
        ]);
    },

    leaveToCairo: function() {
        Cutscene.play([
            { type: 'fade_out', duration: 0.8 },
            { type: 'travel_map', from: 'nepal', to: 'cairo', label: 'Kairo, Ägypten' },
            { type: 'scene', scene: 'cairo' },
        ]);
    },

    update: function(dt) {},

    draw: function(ctx, time) {
        this.drawBackground(ctx, time);
        this.drawMarion(ctx, time);
        this.drawPatron(ctx, time);
    },

    drawBackground: function(ctx, time) {
        var W = CONFIG.CANVAS_W, H = CONFIG.SCENE_H;

        // === Nepal mountain bar interior ===

        // Ceiling (low beams)
        ctx.fillStyle = '#100a06';
        ctx.fillRect(0, 0, W, 80);
        // Wooden beams
        ctx.fillStyle = '#1e1208';
        ctx.fillRect(0, 30, W, 16);
        ctx.fillRect(0, 55, W, 14);
        // Beam texture
        ctx.fillStyle = '#16100600';
        ctx.fillStyle = '#160e06';
        for (var wb = 0; wb < 10; wb++) {
            ctx.fillRect(wb * 80, 30, 3, 16);
            ctx.fillRect(wb * 80, 55, 3, 14);
        }

        // Stone walls (cold Nepal stone)
        Utils.stoneWall(ctx, 0, 78, W, 230, '#2a2220', '#221c1a');

        // Fireplace (right side)
        ctx.fillStyle = '#1a1210';
        ctx.fillRect(590, 138, 120, 200);
        // Fireplace opening
        ctx.fillStyle = '#0e0806';
        ctx.fillRect(600, 180, 100, 140);
        // Fire
        Utils.torch(ctx, 650, 285, time);
        Utils.torch(ctx, 650, 295, time + 0.5);
        // Fireplace mantel
        ctx.fillStyle = '#3a2a1c';
        ctx.fillRect(585, 136, 130, 16);
        ctx.fillStyle = '#4a3828';
        ctx.fillRect(583, 130, 134, 8);
        // Chimney
        ctx.fillStyle = '#1a1210';
        ctx.fillRect(608, 80, 84, 55);

        // Fireplace objects on mantel
        ctx.fillStyle = '#5a4030';
        ctx.fillRect(592, 118, 24, 12); // vase
        ctx.fillStyle = '#3a2810';
        ctx.fillRect(680, 120, 14, 10); // small pot

        // Bar counter (left)
        ctx.fillStyle = '#3a2010';
        ctx.fillRect(30, 238, 250, 16);  // countertop
        ctx.fillStyle = '#2a1608';
        ctx.fillRect(35, 254, 240, 80);  // front panel
        ctx.fillStyle = '#4a2c12';
        ctx.fillRect(30, 234, 252, 6);   // counter edge

        // Bottles behind bar
        var bottleColors = ['#1a3a1a','#3a1010','#101a3a','#3a3010'];
        for (var btl = 0; btl < 8; btl++) {
            var bc  = bottleColors[btl % 4];
            var bx  = 38 + btl * 28;
            ctx.fillStyle = bc;
            ctx.fillRect(bx, 185, 16, 54);  // bottle body
            ctx.fillStyle = Utils.darken(bc, 10);
            ctx.fillRect(bx + 4, 170, 8, 18); // bottle neck
            ctx.fillStyle = '#1a0e06';
            ctx.fillRect(bx + 3, 168, 10, 5); // cork
            // Liquid level
            ctx.fillStyle = Utils.lighten(bc, 15);
            ctx.fillRect(bx + 2, 215, 12, 20);
        }

        // Bar stools
        for (var stool = 0; stool < 3; stool++) {
            var sx = 60 + stool * 80;
            ctx.fillStyle = '#4a2c12';
            ctx.fillRect(sx - 16, 254, 32, 6); // seat
            ctx.fillStyle = '#2a1608';
            ctx.fillRect(sx - 4, 260, 8, 40); // legs
        }

        // Nepal decorations on walls
        // Hanging tapestry
        ctx.fillStyle = '#6a1a1a';
        ctx.fillRect(420, 80, 100, 150);
        ctx.fillStyle = '#4a1010';
        ctx.fillRect(422, 82, 96, 3);
        // Tapestry pattern
        ctx.fillStyle = '#8a4a20';
        ctx.fillRect(425, 90, 90, 8);
        ctx.fillRect(425, 110, 90, 6);
        ctx.fillRect(425, 130, 90, 6);
        // Buddhist symbols
        ctx.fillStyle = '#c0a020';
        ctx.fillRect(462, 148, 26, 26);
        ctx.fillStyle = '#6a1a1a';
        ctx.fillRect(470, 150, 10, 10);
        ctx.fillRect(468, 160, 14, 6);

        // Snow outside (hint through shuttered window)
        ctx.fillStyle = '#2a3040';
        ctx.fillRect(340, 100, 80, 100);
        ctx.fillStyle = '#d8e8f0';
        ctx.fillRect(342, 102, 76, 96);
        // Shutters
        ctx.fillStyle = '#2a1a0c';
        ctx.fillRect(340, 100, 16, 100);
        ctx.fillRect(404, 100, 16, 100);
        ctx.fillStyle = '#1a1006';
        ctx.fillRect(344, 100, 3, 100);
        ctx.fillRect(404, 100, 3, 100);
        // Snow visible
        ctx.fillStyle = '#e8f0f8';
        ctx.fillRect(358, 102, 44, 20);
        ctx.fillStyle = '#f0f8ff';
        ctx.fillRect(360, 104, 40, 10);

        // Wooden floor (plank boards)
        ctx.fillStyle = '#2e1c0a';
        ctx.fillRect(0, 290, W, H - 290);
        for (var fp = 0; fp < 12; fp++) {
            ctx.fillStyle = fp % 2 === 0 ? '#2e1c0a' : '#281808';
            ctx.fillRect(fp * 68, 290, 66, H - 290);
            ctx.fillStyle = '#1e1006';
            ctx.fillRect(fp * 68, 290, 2, H - 290);
        }

        // Ambient warm light from fire
        ctx.fillStyle = 'rgba(255,150,50,0.05)';
        ctx.fillRect(0, 78, W, 220);

        // Outside door (right)
        ctx.fillStyle = '#1e1208';
        ctx.fillRect(720, 200, 80, 180);
        ctx.fillStyle = '#2e1c0c';
        ctx.fillRect(723, 202, 74, 176);
        ctx.fillStyle = '#6a3a16';
        ctx.fillRect(780, 285, 10, 8); // handle
        ctx.fillStyle = '#3a2010';
        ctx.fillRect(796, 200, 4, 180); // frame
        ctx.fillRect(720, 198, 80, 4);
        // Snow gap under door
        ctx.fillStyle = '#d0e0f0';
        ctx.fillRect(723, 374, 74, 4);
    },

    drawMarion: function(ctx, time) {
        // Marion at bar counter
        Character.drawNPC(ctx, 340, 315, {
            scale: 1.0,
            skin:   '#c8a078',
            jacket: '#3a2830',
            pants:  '#2a1a20',
            hat:    null,
            facing: 'right',
            frame:  0,
        });
        Utils.text(ctx, 'Marion Ravenwood', 340, 342, { size: 9, color: '#ffb0c0', align: 'center', shadow: true });

        // Medallion on the bar (if not yet taken)
        if (GameState.flag('nepal_metMarion') && !GameState.flag('nepal_medallionGiven')) {
            var mx2 = 320, my2 = 240;
            // Medallion glow
            var mg = ctx.createRadialGradient(mx2, my2, 2, mx2, my2, 30);
            mg.addColorStop(0, 'rgba(255,200,0,0.5)');
            mg.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = mg;
            ctx.fillRect(mx2 - 30, my2 - 30, 60, 60);
            // Draw small medallion
            ctx.fillStyle = '#cc9900';
            ctx.fillRect(mx2 - 18, my2 - 18, 36, 36);
            ctx.fillStyle = '#ffbb00';
            ctx.fillRect(mx2 - 14, my2 - 14, 28, 28);
            ctx.fillStyle = '#cc6600';
            ctx.fillRect(mx2 - 8, my2 - 5, 16, 10);
        }
    },

    drawPatron: function(ctx, time) {
        Character.drawNPC(ctx, 500, 315, {
            scale: 0.95,
            skin:   '#b87040',
            jacket: '#4a3020',
            pants:  '#2a1c10',
            facing: 'left',
            frame:  0,
        });
    },
});
