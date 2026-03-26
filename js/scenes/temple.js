/* ============================================
   scenes/temple.js
   Kapitel 1: Der Tempel des Chachapoyan-Kriegers
   Südamerika, 1936
   ============================================ */

SceneManager.register('temple', {

    // ── Sub-scene state ───────────────────────
    subScene: 'idol_chamber',   // 'idol_chamber' | 'escape'
    boulderX: -100,
    boulderRolling: false,

    // ── Hotspots ─────────────────────────────
    hotspots: [
        {
            id: 'sandBag',
            name: 'Lederbeutel',
            x: 55, y: 290, w: 60, h: 40,
            walkX: 90, walkY: 330,
            condition: function() { return !GameState.flag('temple_sandBagTaken'); },
            verbs: {
                'look': function() {
                    GameState.showMessage("Ein schwerer Lederbeutel voller Sand. Jemand war vor mir hier.");
                },
                'pick up': function() {
                    GameState.addItem('sand_bag');
                    GameState.setFlag('temple_sandBagTaken');
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Ein Sandsack. Das kommt mir bekannt vor... Das muss ich als Gegengewicht benutzen!' }
                    ]);
                },
                'use': function() {
                    GameState.addItem('sand_bag');
                    GameState.setFlag('temple_sandBagTaken');
                    GameState.showMessage("Indiana nimmt den Sandsack auf.");
                }
            }
        },
        {
            id: 'bones',
            name: 'Menschliche Knochen',
            x: 35, y: 310, w: 60, h: 40,
            walkX: 90, walkY: 330,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Überreste eines unglücklichen Schatzsuchers. Eine Warnung - oder einfach schlechte Planung.' }
                    ]);
                }
            }
        },
        {
            id: 'goldIdol',
            name: 'Goldenes Idol',
            x: 358, y: 188, w: 84, h: 70,
            walkX: 400, walkY: 330,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Das Chachapoyan-Fruchtbarkeitsidol. Reines Gold, ca. 1 kg - ich muss das Gewicht exakt ausgleichen.' }
                    ]);
                },
                'pick up': function() {
                    if (!GameState.flag('temple_sandBagTaken')) {
                        Dialog.start([
                            { speaker: 'Indiana', text: 'Das Podest ist druckempfindlich. Wenn ich das Idol einfach nehme...' },
                            { speaker: 'Indiana', text: '...löse ich alle Fallen aus. Ich brauche ein Gegengewicht vom gleichen Gewicht.' }
                        ]);
                    } else {
                        SceneManager.current.takeIdol();
                    }
                },
                'use': function() {
                    if (!GameState.flag('temple_sandBagTaken')) {
                        GameState.showMessage("Ich brauche etwas als Gegengewicht.");
                    } else {
                        SceneManager.current.takeIdol();
                    }
                }
            }
        },
        {
            id: 'pressurePlate',
            name: 'Druckplatte',
            x: 350, y: 280, w: 100, h: 30,
            walkX: 400, walkY: 330,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Eine Steindruckplatte. Sie trägt das Gewicht des Idols. Wenn der Druck nachlässt...' },
                        { speaker: 'Indiana', text: '..aktivieren sich die Fallen. Clever.' }
                    ]);
                },
                'use': function() {
                    if (GameState.hasItem('sand_bag')) {
                        SceneManager.current.takeIdol();
                    } else {
                        GameState.showMessage("Ich müsste das Gewicht ersetzen können.");
                    }
                },
                'use_sand_bag': function() {
                    SceneManager.current.takeIdol();
                }
            }
        },
        {
            id: 'pedestal',
            name: 'Steinsockel',
            x: 330, y: 250, w: 140, h: 80,
            walkX: 400, walkY: 330,
            verbs: {
                'look': function() {
                    GameState.showMessage("Ein alter Opfersockel. Das Idol sitzt auf einer versteckten Waage.");
                }
            }
        },
        {
            id: 'wallCarvings',
            name: 'Wandschnitzereien',
            x: 190, y: 100, w: 140, h: 160,
            walkX: 260, walkY: 310,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Erstaunliche Schnitzereien. Sie zeigen Krieger, die das Idol bewachen.' },
                        { speaker: 'Indiana', text: 'Und hier... eine Warnung: "Wer das Idol ohne Ehrerbietung nimmt, wird verschlungen werden."' },
                        { speaker: 'Indiana', text: 'Das klingt nach meinem üblichen Dienstag.' }
                    ]);
                }
            }
        },
        {
            id: 'rightCarvings',
            name: 'Wandschnitzereien',
            x: 480, y: 100, w: 130, h: 160,
            walkX: 540, walkY: 310,
            verbs: {
                'look': function() {
                    GameState.showMessage("Weitere Schnitzereien zeigen die Strafe für Grabräuber. Sehr eindrücklich.");
                }
            }
        },
        {
            id: 'torchLeft',
            name: 'Wandfackel',
            x: 60, y: 150, w: 30, h: 80,
            walkX: 100, walkY: 310,
            verbs: {
                'look': function() {
                    GameState.showMessage("Eine noch brennende Fackel. Die Luft hier muss frischer sein als erwartet.");
                },
                'pick up': function() {
                    if (!GameState.hasItem('torch')) {
                        GameState.addItem('torch');
                        GameState.showMessage("Indiana nimmt die Fackel von der Wand.");
                    } else {
                        GameState.showMessage("Ich habe schon eine Fackel.");
                    }
                }
            }
        },
        {
            id: 'torchRight',
            name: 'Wandfackel',
            x: 700, y: 150, w: 30, h: 80,
            walkX: 700, walkY: 310,
            verbs: {
                'look': function() {
                    GameState.showMessage("Eine brennende Fackel. Das warme Licht lässt das Gold des Idols glänzen.");
                }
            }
        },
        {
            id: 'spikePit',
            name: 'Stachel-Grube',
            x: 0, y: 260, w: 35, h: 60,
            walkX: 50, walkY: 330,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Eine mit Holzpfählen gespickte Grube. Sehr effektiv, sehr endgültig.' },
                        { speaker: 'Indiana', text: 'Ich bleibe lieber auf der sicheren Seite.' }
                    ]);
                }
            }
        },
        {
            id: 'exitDoor',
            name: 'Steintor',
            x: 690, y: 200, w: 110, h: 160,
            walkX: 700, walkY: 330,
            condition: function() { return GameState.flag('temple_idolTaken'); },
            verbs: {
                'look': function() {
                    GameState.showMessage("Der Ausweg. Der einzige Weg raus aus diesem Tempel.");
                },
                'use': function() {
                    SceneManager.current.startEscape();
                },
                'pick up': function() {
                    SceneManager.current.startEscape();
                }
            }
        },
        {
            id: 'entrance',
            name: 'Tempeleingang',
            x: 690, y: 200, w: 110, h: 160,
            walkX: 700, walkY: 330,
            condition: function() { return !GameState.flag('temple_idolTaken'); },
            verbs: {
                'look': function() {
                    GameState.showMessage("Der Eingang - und Ausgang. Ich sollte zuerst das Idol sichern.");
                },
                'use': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Ich kann nicht gehen - nicht ohne das Idol.' }
                    ]);
                }
            }
        },
        {
            id: 'satipo',
            name: 'Sapito',
            x: 660, y: 240, w: 60, h: 110,
            walkX: 640, walkY: 330,
            condition: function() { return !GameState.flag('temple_idolTaken'); },
            verbs: {
                'look': function() {
                    GameState.showMessage("Sapito, mein nervöser Führer. Er wartet auf das Idol.");
                },
                'talk to': function() {
                    Dialog.start([
                        { speaker: 'Sapito', text: 'Señor Jones, por favor! Wir müssen uns beeilen - Belloq und seine Männer könnten uns folgen!' },
                        { speaker: 'Indiana', text: 'Relax, Sapito. Ich hab alles unter Kontrolle.' },
                        { speaker: 'Sapito', text: 'Das sagen Sie immer kurz bevor alles schiefgeht...' },
                    ]);
                }
            }
        },
    ],

    // ── Scene Entry ──────────────────────────
    onEnter: function(opts) {
        this.subScene = 'idol_chamber';
        this.boulderX = -100;
        this.boulderRolling = false;

        Character.place(200, 320, 'right');

        if (!GameState.flag('temple_sapitoMet')) {
            GameState.setFlag('temple_sapitoMet');
            // Opening cutscene
            Cutscene.play([
                { type: 'caption', text: 'Südamerika – 1936', duration: 3.0 },
                { type: 'caption', text: 'Irgendwo im Dschungel Perus...', duration: 2.5 },
                { type: 'dialog', lines: [
                    { speaker: 'Indiana', text: 'Geschafft. Der Tempel des Chachapoyan-Kriegers. Ich hab zwanzig Jahre darauf gewartet.' },
                    { speaker: 'Sapito', text: 'Señor Jones! Das Idol - es ist wirklich da!' },
                    { speaker: 'Indiana', text: 'Natürlich ist es da. Ich war mir immer sicher. Fast immer.' },
                    { speaker: 'Sapito', text: 'Aber die Fallen... die Schnitzereien warnen-' },
                    { speaker: 'Indiana', text: 'Ich weiß, ich weiß. Bleib am Eingang. Ich hol das Ding.' }
                ]},
            ]);
        }
    },

    // ── Idol Swap Sequence ───────────────────
    takeIdol: function() {
        if (GameState.flag('temple_idolTaken')) return;

        Cutscene.play([
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Okay Jones... ruhige Hand. Das Gewicht muss exakt stimmen.' }
            ]},
            { type: 'walk', x: 400, y: 310 },
            { type: 'wait', duration: 0.5 },
            { type: 'flag', key: 'temple_idolTaken' },
            { type: 'item_give', item: 'golden_idol' },
            { type: 'item_remove', item: 'sand_bag' },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Perfekt. Identisches Gewicht. Ich bin ein Genie.' }
            ]},
            { type: 'wait', duration: 0.3 },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: '...Ah.' },
                { speaker: 'Indiana', text: 'Das war nicht perfekt.' }
            ]},
            { type: 'custom', fn: function() {
                SceneManager.current.startBoulder();
            }},
        ]);
    },

    // ── Boulder Sequence ─────────────────────
    startBoulder: function() {
        this.boulderRolling = true;
        this.boulderX = -80;

        Cutscene.play([
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'LAUFEN!' }
            ]},
            { type: 'walk', x: 750, y: 320 },
            { type: 'wait', duration: 0.5 },
            { type: 'fade_out', duration: 0.6 },
            { type: 'wait', duration: 0.3 },
            { type: 'caption', text: 'Draußen...', duration: 2.0 },
            { type: 'fade_in', duration: 0.6 },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Geschafft! Das Idol gehört jetzt der Wissenschaft!' },
                { speaker: 'Sapito',  text: 'Señor Jones! ... Gib mir das Idol.' },
                { speaker: 'Indiana', text: 'Was?! Sapito, du bist-' },
                { speaker: 'Sapito',  text: 'Das Seil, Señor Jones. Gib mir das Idol - oder ich lasse dich fallen.' },
                { speaker: 'Indiana', text: 'Okay. Hier.' },
                { speaker: 'Sapito',  text: '*Greift nach dem Idol*' },
                { speaker: 'Indiana', text: 'Adios, Sapito.' },
            ]},
            { type: 'flag', key: 'temple_escaped' },
            { type: 'item_remove', item: 'golden_idol' },
            { type: 'dialog', lines: [
                { speaker: 'Belloq',  text: 'Doktor Jones. Wieder einmal zeige ich Ihnen, wie der Hase läuft.' },
                { speaker: 'Indiana', text: 'Belloq!' },
                { speaker: 'Belloq',  text: 'Das Idol gehört jetzt mir. Und Sie... nun, die Einheimischen sind sehr ungeduldig.' }
            ]},
            { type: 'wait', duration: 0.5 },
            { type: 'fade_out', duration: 1.0 },
            { type: 'travel_map', from: 'peru', to: 'usa', label: 'Marshall College, Connecticut' },
            { type: 'scene', scene: 'university' },
        ]);
    },

    startEscape: function() {
        if (!GameState.flag('temple_idolTaken')) return;
        this.startBoulder();
    },

    // ── Update ───────────────────────────────
    update: function(dt) {
        if (this.boulderRolling) {
            this.boulderX += dt * 350;
            if (this.boulderX > CONFIG.CANVAS_W + 100) {
                this.boulderRolling = false;
            }
        }
    },

    // ── Draw Scene ───────────────────────────
    draw: function(ctx, time) {
        this.drawBackground(ctx, time);
        this.drawObjects(ctx, time);
        if (this.boulderRolling) {
            this.drawBoulder(ctx);
        }
        if (!GameState.flag('temple_idolTaken')) {
            this.drawSatipo(ctx, time);
        }
    },

    drawBackground: function(ctx, time) {
        var W = CONFIG.CANVAS_W, H = CONFIG.SCENE_H;

        // === Ceiling (very dark stone) ===
        ctx.fillStyle = '#0d0905';
        ctx.fillRect(0, 0, W, 90);

        // Ceiling cracks
        ctx.strokeStyle = '#1a1208';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(100, 0); ctx.lineTo(140, 80); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(350, 0); ctx.lineTo(310, 60); ctx.lineTo(380, 90); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(600, 10); ctx.lineTo(580, 70); ctx.stroke();

        // Sunlight shafts from ceiling cracks
        ctx.fillStyle = 'rgba(255,240,160,0.04)';
        ctx.beginPath();
        ctx.moveTo(350, 0); ctx.lineTo(280, 90); ctx.lineTo(430, 90); ctx.lineTo(400, 0);
        ctx.fill();

        // === Back wall ===
        Utils.stoneWall(ctx, 140, 80, 520, 210, '#2a1e14', '#221810');

        // Wall torch glow ambient
        Utils.torch(ctx, 95, 185, time);
        Utils.torch(ctx, 705, 185, time);

        // === Left wall ===
        Utils.stoneWall(ctx, 0, 80, 165, 260, '#241a10', '#1e1408');

        // === Right wall ===
        Utils.stoneWall(ctx, 635, 80, 165, 260, '#241a10', '#1e1408');

        // === Columns ===
        this.drawColumn(ctx, 130, 80, 55, 250, time);
        this.drawColumn(ctx, 615, 80, 55, 250, time);

        // === Back wall carvings ===
        this.drawWallCarvings(ctx, 190, 95, 140, 160);
        this.drawWallCarvings(ctx, 480, 95, 130, 160);

        // === Pedestal area background ===
        // Deeper alcove behind pedestal
        ctx.fillStyle = '#100b06';
        ctx.fillRect(290, 82, 220, 210);
        ctx.fillStyle = '#1a120a';
        ctx.fillRect(295, 86, 210, 204);

        // Alcove carvings
        ctx.strokeStyle = '#2a1e10';
        ctx.lineWidth = 1;
        for (var ci = 0; ci < 5; ci++) {
            ctx.strokeRect(298 + ci * 40, 90, 36, 100);
        }

        // === Stone Floor ===
        Utils.stoneFloor(ctx, 0, 290, W, H - 290, '#1c1610', '#18120c');

        // Spike pit (left side, near edge)
        this.drawSpikePit(ctx, 0, 260, 35);

        // Floor dirt / dust
        ctx.fillStyle = 'rgba(80,60,20,0.15)';
        ctx.fillRect(0, 320, W, 20);

        // === Pedestal & Idol ===
        this.drawPedestal(ctx, 350, 260, time);

        // === Exit doorway ===
        this.drawExitDoor(ctx, 695, 200, time);
    },

    drawColumn: function(ctx, x, y, w, h, time) {
        // Column body (stone blocks)
        var col1 = '#2e2218', col2 = '#261c12';
        Utils.stoneWall(ctx, x, y, w, h, col1, col2);

        // Capital (top)
        ctx.fillStyle = '#3a2a1c';
        ctx.fillRect(x - 6, y, w + 12, 16);
        ctx.fillStyle = '#4a3828';
        ctx.fillRect(x - 4, y, w + 8, 4);

        // Base
        ctx.fillStyle = '#3a2a1c';
        ctx.fillRect(x - 6, y + h - 14, w + 12, 14);
        ctx.fillStyle = '#4a3828';
        ctx.fillRect(x - 8, y + h - 8, w + 16, 8);

        // Column shadow (right side darker)
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(x + w - 14, y + 16, 14, h - 28);

        // Torch flicker color on column
        var flicker = 0.15 + 0.05 * Math.sin(time * 8 + x);
        ctx.fillStyle = 'rgba(255,150,50,' + flicker + ')';
        ctx.fillRect(x, y + 20, w, h - 30);
    },

    drawWallCarvings: function(ctx, x, y, w, h) {
        // Stone panel background
        ctx.fillStyle = '#1e1610';
        ctx.fillRect(x, y, w, h);

        // Border
        ctx.strokeStyle = '#3a2a18';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);

        // Figure carvings (simplified pixel art)
        var figX = x + 20;
        // Human-like figure
        ctx.fillStyle = '#3a2818';
        // Head
        ctx.fillRect(figX + 8, y + 16, 10, 10);
        // Body
        ctx.fillRect(figX + 6, y + 26, 14, 20);
        // Arms raised
        ctx.fillRect(figX, y + 26, 6, 10);
        ctx.fillRect(figX + 20, y + 26, 6, 10);
        // Legs
        ctx.fillRect(figX + 6, y + 46, 5, 12);
        ctx.fillRect(figX + 15, y + 46, 5, 12);

        // Second figure (with offering)
        var figX2 = x + w - 44;
        ctx.fillRect(figX2 + 8, y + 20, 8, 8);
        ctx.fillRect(figX2 + 6, y + 28, 12, 18);
        // Idol offering
        ctx.fillStyle = '#4a3818';
        ctx.fillRect(figX2 + 4, y + 16, 8, 8);
        ctx.fillStyle = '#3a2818';
        ctx.fillRect(figX2 + 6, y + 46, 4, 10);
        ctx.fillRect(figX2 + 14, y + 46, 4, 10);

        // Hieroglyphics lines
        ctx.fillStyle = '#2e2010';
        for (var hi = 0; hi < 4; hi++) {
            ctx.fillRect(x + 4, y + h - 60 + hi * 12, w - 8, 2);
        }
        ctx.fillRect(x + 4, y + h - 60, 2, 48);
        ctx.fillRect(x + w - 6, y + h - 60, 2, 48);
    },

    drawSpikePit: function(ctx, x, y, w) {
        var h = CONFIG.SCENE_H - y;
        // Dark pit
        ctx.fillStyle = '#06040200';
        ctx.fillStyle = '#050302';
        ctx.fillRect(x, y, w, h);

        // Spikes
        ctx.fillStyle = '#4a3820';
        for (var si = 0; si < 4; si++) {
            var sx = x + 4 + si * 7;
            // Spike shape
            ctx.beginPath();
            ctx.moveTo(sx, y + h);
            ctx.lineTo(sx + 3, y + 20);
            ctx.lineTo(sx + 6, y + h);
            ctx.closePath();
            ctx.fill();
        }

        // Border
        ctx.fillStyle = '#2a1e10';
        ctx.fillRect(x + w - 2, y, 2, h);
        ctx.fillRect(x, y, w, 2);
    },

    drawPedestal: function(ctx, x, y, time) {
        var pw = 100, ph = 80;
        var cx = x + pw / 2;

        // Pedestal steps
        ctx.fillStyle = '#2a1e12';
        ctx.fillRect(x - 10, y + 30, pw + 20, ph - 30);
        Utils.stoneRect(ctx, x, y + 10, pw, ph - 20, '#322418', '#3e2e1c', '#1e1410');
        Utils.stoneRect(ctx, x + 10, y, pw - 20, ph - 30, '#3a2c1e', '#483820', '#261c12');

        // Pressure plate top
        ctx.fillStyle = GameState.flag('temple_idolTaken') ? '#2a1e12' : '#3e2e1e';
        ctx.fillRect(x + 20, y + 4, pw - 40, 12);
        if (!GameState.flag('temple_idolTaken')) {
            ctx.fillStyle = '#4a3828';
            ctx.fillRect(x + 22, y + 6, pw - 44, 4);
        }

        // Pedestal glyphs
        ctx.strokeStyle = '#4a3620';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 5, y + 18, pw - 10, 30);
        ctx.fillStyle = '#3a2810';
        for (var gi = 0; gi < 3; gi++) {
            ctx.fillRect(x + 10 + gi * 28, y + 22, 8, 4);
            ctx.fillRect(x + 10 + gi * 28, y + 30, 14, 2);
        }

        // Idol on pedestal (if not taken)
        if (!GameState.flag('temple_idolTaken')) {
            this.drawIdol(ctx, cx, y);
        }
    },

    drawIdol: function(ctx, cx, y) {
        var t = Date.now() / 1000;
        var flicker = 0.85 + 0.15 * Math.sin(t * 3);

        // Gold glow
        var g = ctx.createRadialGradient(cx, y - 18, 2, cx, y - 18, 50);
        g.addColorStop(0, 'rgba(255,210,0,0.4)');
        g.addColorStop(0.5, 'rgba(255,160,0,0.15)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(cx - 50, y - 68, 100, 100);

        // Idol base
        ctx.fillStyle = '#cc8800';
        ctx.fillRect(cx - 10, y - 8, 20, 8);

        // Body
        ctx.fillStyle = '#e6a800';
        ctx.fillRect(cx - 8, y - 30, 16, 24);

        // Chest detail
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(cx - 5, y - 28, 10, 8);

        // Shoulders
        ctx.fillStyle = '#e6a800';
        ctx.fillRect(cx - 12, y - 30, 6, 10);
        ctx.fillRect(cx + 6, y - 30, 6, 10);

        // Head
        ctx.fillStyle = '#f0b800';
        ctx.fillRect(cx - 7, y - 44, 14, 16);

        // Eyes
        ctx.fillStyle = '#1a1000';
        ctx.fillRect(cx - 4, y - 40, 3, 4);
        ctx.fillRect(cx + 1, y - 40, 3, 4);

        // Headdress
        ctx.fillStyle = '#cc8800';
        ctx.fillRect(cx - 9, y - 52, 18, 10);
        ctx.fillStyle = '#e6a000';
        ctx.fillRect(cx - 7, y - 60, 14, 10);
        ctx.fillRect(cx - 4, y - 68, 8, 10);

        // Shine highlights
        ctx.fillStyle = 'rgba(255,255,180,0.7)';
        ctx.fillRect(cx - 6, y - 44, 4, 6);
        ctx.fillRect(cx - 6, y - 28, 3, 4);
    },

    drawExitDoor: function(ctx, x, y, time) {
        var w = 105, h = 170;

        // Door frame (stone)
        Utils.stoneRect(ctx, x, y, w, h, '#1e1610', '#2a2018', '#140e08');

        // Door opening (or stone if closed)
        if (GameState.flag('temple_escaped') || GameState.flag('temple_idolTaken')) {
            // Dark opening
            ctx.fillStyle = '#04020100';
            ctx.fillStyle = '#030201';
            ctx.fillRect(x + 6, y + 4, w - 12, h - 6);

            // Jungle glimpse behind
            ctx.fillStyle = '#0d1a08';
            ctx.fillRect(x + 8, y + 6, w - 16, h - 10);
            ctx.fillStyle = '#152806';
            ctx.fillRect(x + 12, y + 20, w - 24, h - 30);

            // Light from outside
            ctx.fillStyle = 'rgba(100,200,50,0.1)';
            ctx.fillRect(x + 8, y + 6, w - 16, h - 10);
        } else {
            // Stone door (closed)
            Utils.stoneWall(ctx, x + 6, y + 4, w - 12, h - 6, '#2a1e14', '#221810');

            // Door bars/mechanism
            ctx.fillStyle = '#3a2a18';
            ctx.fillRect(x + 20, y + 20, 4, h - 30);
            ctx.fillRect(x + w - 30, y + 20, 4, h - 30);
            ctx.fillRect(x + 10, y + h / 2, w - 20, 4);
        }

        // Arch top
        ctx.fillStyle = '#1a120a';
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + 4, w / 2 - 4, 20, 0, Math.PI, 0);
        ctx.fill();
    },

    drawSatipo: function(ctx, time) {
        // Sapito at the doorway
        Character.drawNPC(ctx, 700, 330, {
            scale: 0.9,
            skin:   '#b87048',
            jacket: '#3a5a3a',
            pants:  '#2a3a2a',
            facing: 'left',
            frame:  Math.floor(time * 2) % 2,
        });
        // Name label
        Utils.text(ctx, 'Sapito', 700, 342, { size: 9, color: '#80c080', align: 'center', shadow: true });
    },

    drawBoulder: function(ctx) {
        var bx = this.boulderX;
        var by = 280;
        var br = 55;

        // Rolling animation
        var angle = (bx / (2 * Math.PI * br)) * (2 * Math.PI);

        ctx.save();
        ctx.translate(bx + br, by + br);
        ctx.rotate(angle);

        // Boulder body
        ctx.fillStyle = '#3a2e20';
        ctx.beginPath();
        ctx.arc(0, 0, br, 0, Math.PI * 2);
        ctx.fill();

        // Boulder texture (cracks)
        ctx.strokeStyle = '#2a2018';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-20, -20); ctx.lineTo(15, 10); ctx.lineTo(-5, 30);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(20, -15); ctx.lineTo(-8, 5); ctx.lineTo(10, 25);
        ctx.stroke();

        // Highlight
        ctx.fillStyle = 'rgba(255,240,200,0.15)';
        ctx.beginPath();
        ctx.arc(-15, -15, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Dust cloud
        ctx.fillStyle = 'rgba(150,120,60,0.2)';
        ctx.fillRect(bx - 20, by + br * 1.5, 40, 20);
    },
});
