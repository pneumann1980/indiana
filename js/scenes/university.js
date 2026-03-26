/* ============================================
   scenes/university.js
   Kapitel 2: Marshall College, Connecticut
   ============================================ */

SceneManager.register('university', {

    hotspots: [
        {
            id: 'marcus',
            name: 'Marcus Brody',
            x: 560, y: 200, w: 70, h: 150,
            walkX: 520, walkY: 330,
            verbs: {
                'look': function() {
                    GameState.showMessage("Marcus Brody, Indys alter Freund und Mentor. Stets besorgt, stets hilfsbereit.");
                },
                'talk to': function() {
                    SceneManager.current.talkToMarcus();
                }
            }
        },
        {
            id: 'desk',
            name: 'Schreibtisch',
            x: 180, y: 220, w: 200, h: 80,
            walkX: 280, walkY: 320,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Stapel alter Bücher, Notizen über... die Bundeslade? Marcus hat schon recherchiert.' }
                    ]);
                },
                'pick up': function() {
                    GameState.showMessage("Ich lasse Marcus\' Sachen in Ruhe. Vorerst.");
                }
            }
        },
        {
            id: 'chalkboard',
            name: 'Tafel – Karte des Nahen Ostens',
            x: 30, y: 90, w: 200, h: 160,
            walkX: 130, walkY: 330,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Eine Karte des Nahen Ostens. Marcus hat Tanis mit einem roten Kreuz markiert.' },
                        { speaker: 'Indiana', text: 'Tanis. Die verlorene Stadt. Wenn die Bundeslade wirklich dort liegt...' }
                    ]);
                }
            }
        },
        {
            id: 'bookshelf',
            name: 'Bücherregal',
            x: 640, y: 80, w: 150, h: 240,
            walkX: 680, walkY: 330,
            verbs: {
                'look': function() {
                    GameState.showMessage("Tausende Bücher. Archäologie, Geschichte, Mythologie. Ein Forscher-Paradies.");
                },
                'pick up': function() {
                    if (!GameState.hasItem('indy_journal')) {
                        GameState.addItem('indy_journal');
                        GameState.showMessage("Indiana nimmt sein Feldtagebuch aus dem Regal. Es wird nützlich sein.");
                    } else {
                        GameState.showMessage("Das Buch habe ich schon.");
                    }
                }
            }
        },
        {
            id: 'globus',
            name: 'Globus',
            x: 450, y: 220, w: 70, h: 80,
            walkX: 450, walkY: 330,
            verbs: {
                'look': function() {
                    GameState.showMessage("Ein großer Erdglobus. Mit einer Lupe könnte ich die Wüste von Tanis finden.");
                },
                'use': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Tanis... Tanis... hier! Am Rand der Libyschen Wüste. Nicht weit von Kairo.' }
                    ]);
                }
            }
        },
        {
            id: 'window',
            name: 'Fenster',
            x: 280, y: 80, w: 160, h: 140,
            walkX: 360, walkY: 310,
            verbs: {
                'look': function() {
                    GameState.showMessage("Ein ruhiger Herbsttag auf dem Campus. Wie friedlich. Das wird nicht lange so bleiben.");
                }
            }
        },
        {
            id: 'exit',
            name: 'Ausgang',
            x: 0, y: 200, w: 40, h: 180,
            walkX: 60, walkY: 330,
            condition: function() { return GameState.flag('uni_missionAccepted'); },
            verbs: {
                'look': function() {
                    GameState.showMessage("Die Tür hinaus. Mein Abenteuer wartet.");
                },
                'use': function() {
                    SceneManager.current.leaveToNepal();
                }
            }
        },
    ],

    onEnter: function(opts) {
        Character.place(350, 320, 'right');

        if (!GameState.flag('uni_talkedMarcus')) {
            Cutscene.play([
                { type: 'caption', text: 'Marshall College, Connecticut', duration: 2.5 },
                { type: 'dialog', lines: [
                    { speaker: 'Indiana', text: 'Zu Hause. Endlich. Auch wenn Belloq das Idol hat - ich bin noch am Leben.' }
                ]},
            ]);
        }
    },

    talkToMarcus: function() {
        if (!GameState.flag('uni_talkedMarcus')) {
            GameState.setFlag('uni_talkedMarcus');
            Dialog.start([
                { speaker: 'Marcus', text: 'Indiana! Ich bin so erleichtert, dass du heil zurück bist. Der Colonel möchte mit dir sprechen.' },
                { speaker: 'Indiana', text: 'Ein Colonel? Wovon redest du, Marcus?' },
                { speaker: 'Marcus', text: 'Es geht um die Bundeslade der Verbündeten. Die Deutschen suchen danach in Tanis.' },
                { speaker: 'Indiana', text: 'Die Bundeslade... du machst Witze, Marcus.' },
                { speaker: 'Marcus', text: 'Der Stab des Ra ist der Schlüssel. Und ich glaube, Marion Ravenwood hat das Kopfteil.' },
                { speaker: 'Indiana', text: 'Marion? Das war... eine komplizierte Beziehung.' },
                { speaker: 'Marcus', text: 'Sie ist in Nepal. Ihr Vater hat sie als Kind dort zurückgelassen. Indiana - bitte. Du musst sie finden.' },
                { speaker: 'Indiana', text: 'Marion Ravenwood. Ausgerechnet.' },
            ], function() {
                GameState.setFlag('uni_missionAccepted');
                GameState.addItem('indy_journal');
                GameState.showMessage("Mission akzeptiert: Finde Marion Ravenwood in Nepal.");
            });
        } else if (!GameState.flag('uni_missionAccepted')) {
            Dialog.start([
                { speaker: 'Marcus', text: 'Indiana, wir haben keine Zeit. Du musst nach Nepal!' },
            ]);
        } else {
            Dialog.start([
                { speaker: 'Marcus', text: 'Geh zur Tür links, Indiana. Nepal wartet!' },
                { speaker: 'Indiana', text: 'Ich weiß, ich weiß. Der Ausgang ist links.' },
            ]);
        }
    },

    leaveToNepal: function() {
        Cutscene.play([
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Nepal. Es war lange her, Marion.' }
            ]},
            { type: 'fade_out', duration: 0.8 },
            { type: 'travel_map', from: 'usa', to: 'nepal', label: 'Nepal – Die Berge des Himalaya' },
            { type: 'scene', scene: 'nepal' },
        ]);
    },

    update: function(dt) {},

    draw: function(ctx, time) {
        this.drawBackground(ctx, time);
        this.drawMarcus(ctx, time);
    },

    drawBackground: function(ctx, time) {
        var W = CONFIG.CANVAS_W, H = CONFIG.SCENE_H;

        // === Wood-paneled study ===

        // Ceiling
        ctx.fillStyle = '#1e1408';
        ctx.fillRect(0, 0, W, 70);

        // Wood beams on ceiling
        ctx.fillStyle = '#2a1c0c';
        for (var bi = 0; bi < 6; bi++) {
            ctx.fillRect(bi * 140, 0, 20, 70);
        }

        // Back wall (dark wood paneling)
        ctx.fillStyle = '#2a1c0c';
        ctx.fillRect(0, 70, W, 220);

        // Wood panel lines
        ctx.fillStyle = '#1e1408';
        for (var pi = 0; pi < 9; pi++) {
            ctx.fillRect(pi * 90, 70, 3, 220);
        }
        ctx.fillStyle = '#341e0e';
        for (var ph = 0; ph < 3; ph++) {
            ctx.fillRect(0, 70 + ph * 74, W, 2);
        }

        // Window (daylight)
        ctx.fillStyle = '#8ab8e0';
        ctx.fillRect(290, 90, 150, 130);
        // Window panes
        ctx.fillStyle = '#70a0d0';
        ctx.fillRect(290, 90, 150, 5);
        ctx.fillRect(290, 90, 5, 130);
        ctx.fillRect(363, 90, 4, 130);
        ctx.fillRect(440, 90, 2, 130);
        ctx.fillRect(290, 152, 150, 4);
        // Window light on floor
        ctx.fillStyle = 'rgba(160,200,255,0.08)';
        ctx.fillRect(260, 220, 220, 120);

        // Chalkboard (left)
        ctx.fillStyle = '#1e3018';
        ctx.fillRect(30, 90, 200, 160);
        ctx.strokeStyle = '#4a3018';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 90, 200, 160);

        // Chalk drawings on board
        ctx.strokeStyle = 'rgba(230,230,220,0.7)';
        ctx.lineWidth = 1;
        // Simplified map outline
        ctx.beginPath();
        ctx.moveTo(80, 130); ctx.lineTo(160, 120); ctx.lineTo(200, 140);
        ctx.lineTo(190, 170); ctx.lineTo(130, 180); ctx.lineTo(80, 160);
        ctx.closePath();
        ctx.stroke();
        // X mark
        ctx.strokeStyle = 'rgba(255,80,80,0.8)';
        ctx.beginPath();
        ctx.moveTo(155, 145); ctx.lineTo(165, 155);
        ctx.moveTo(165, 145); ctx.lineTo(155, 155);
        ctx.stroke();
        // Label
        ctx.fillStyle = 'rgba(220,220,200,0.6)';
        ctx.font = '9px monospace';
        ctx.fillText('TANIS', 142, 168);
        ctx.fillText('ÄGYPTEN', 55, 200);

        // Desk
        ctx.fillStyle = '#3a2010';
        ctx.fillRect(180, 240, 200, 12);  // desktop
        ctx.fillStyle = '#2e1808';
        ctx.fillRect(185, 252, 12, 80);   // left leg
        ctx.fillRect(358, 252, 12, 80);   // right leg
        ctx.fillStyle = '#2a1406';
        ctx.fillRect(188, 290, 170, 12);  // crossbar

        // Books on desk
        var bookColors = ['#8a3020', '#2a5a3a', '#5a4a20', '#3a3070'];
        for (var bk = 0; bk < 4; bk++) {
            ctx.fillStyle = bookColors[bk];
            ctx.fillRect(200 + bk * 28, 222, 24, 18);
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            ctx.fillRect(201 + bk * 28, 222, 4, 18);
        }

        // Papers on desk
        ctx.fillStyle = '#d8c890';
        ctx.fillRect(285, 228, 50, 12);
        ctx.fillRect(310, 225, 40, 15);
        ctx.fillStyle = '#7a5a20';
        ctx.font = '5px monospace';
        for (var pl = 0; pl < 5; pl++) {
            ctx.fillRect(287, 230 + pl * 2, 20, 1);
        }

        // Globe
        ctx.fillStyle = '#1a3a5a';
        ctx.beginPath();
        ctx.arc(490, 260, 32, 0, Math.PI * 2);
        ctx.fill();
        // Globe land
        ctx.fillStyle = '#2a6a2a';
        ctx.fillRect(470, 240, 14, 30);
        ctx.fillRect(494, 236, 20, 24);
        ctx.fillRect(472, 255, 8, 16);
        // Globe stand
        ctx.fillStyle = '#5a3010';
        ctx.fillRect(482, 290, 16, 12);
        ctx.fillRect(470, 298, 40, 6);
        // Globe lines
        ctx.strokeStyle = 'rgba(100,180,255,0.3)';
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.arc(490, 260, 32, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(458, 260); ctx.lineTo(522, 260); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(490, 228); ctx.lineTo(490, 292); ctx.stroke();

        // Bookshelf (right wall)
        ctx.fillStyle = '#2e1c0a';
        ctx.fillRect(640, 80, 160, 250);
        ctx.fillStyle = '#1e1206';
        for (var sh = 0; sh < 4; sh++) {
            ctx.fillRect(640, 80 + sh * 60, 160, 4);
        }
        // Books in shelves
        var shelfColors = ['#aa3030','#3030aa','#30aa30','#aa8030','#7030aa','#30aaaa'];
        for (var sb = 0; sb < 18; sb++) {
            var sc = shelfColors[sb % shelfColors.length];
            var row = Math.floor(sb / 6);
            var col = sb % 6;
            ctx.fillStyle = sc;
            ctx.fillRect(645 + col * 25, 86 + row * 60, 22, 52);
            ctx.fillStyle = Utils.darken(sc, 20);
            ctx.fillRect(645 + col * 25, 86 + row * 60, 3, 52);
        }

        // Carpet / floor
        ctx.fillStyle = '#3a1808';
        ctx.fillRect(0, 290, W, H - 290);

        // Carpet pattern
        ctx.fillStyle = '#2e1206';
        for (var cp = 0; cp < 8; cp++) {
            ctx.fillRect(cp * 100, 290, 2, H - 290);
        }
        ctx.fillStyle = '#4a2010';
        ctx.fillRect(0, 290, W, 4);

        // Left door/exit
        ctx.fillStyle = '#1e1206';
        ctx.fillRect(0, 200, 40, 180);
        ctx.fillStyle = '#2e1c0a';
        ctx.fillRect(0, 200, 38, 178);
        ctx.fillStyle = '#5a3a14';
        ctx.fillRect(30, 280, 8, 6); // door knob
        // Door frame
        ctx.fillStyle = '#3a2010';
        ctx.fillRect(38, 198, 4, 182);
        ctx.fillRect(0, 198, 40, 4);

        // Ambient torch light (warm study feel)
        var warmLight = 'rgba(255,200,100,0.04)';
        ctx.fillStyle = warmLight;
        ctx.fillRect(0, 70, W, 220);
    },

    drawMarcus: function(ctx, time) {
        // Draw Marcus at desk area
        Character.drawNPC(ctx, 590, 330, {
            scale: 1.0,
            skin:   '#c0a080',
            jacket: '#2a2a3a',
            pants:  '#1a1a2a',
            facing: 'left',
            frame:  0,
        });
        Utils.text(ctx, 'Marcus Brody', 590, 342, { size: 9, color: '#80a0d0', align: 'center', shadow: true });
    },
});
