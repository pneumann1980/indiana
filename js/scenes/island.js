/* ============================================
   scenes/island.js
   Kapitel 7: Die Insel – Das Finale
   ============================================ */

SceneManager.register('island', {

    phase: 'bound',     // 'bound' | 'opening' | 'aftermath'
    flashTimer: 0,
    flashActive: false,
    boltTimer: 0,

    hotspots: [
        {
            id: 'ark_altar',
            name: 'Bundeslade auf dem Altar',
            x: 310, y: 150, w: 180, h: 130,
            walkX: 400, walkY: 320,
            condition: function() { return SceneManager.current.phase === 'opening'; },
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Die Bundeslade. Sie öffnen sie wirklich. Das ist... Wahnsinn.' },
                        { speaker: 'Marion',  text: 'Indy, was tun wir?' },
                        { speaker: 'Indiana', text: 'Schließ deine Augen, Marion. Was auch immer passiert - öffne sie nicht.' }
                    ]);
                }
            }
        },
        {
            id: 'pole',
            name: 'Pfahl',
            x: 100, y: 200, w: 30, h: 160,
            walkX: 150, walkY: 330,
            condition: function() { return SceneManager.current.phase === 'bound'; },
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Wir sind an diesen Pfahl gebunden. Die Nazis haben uns... na ja.' },
                        { speaker: 'Marion',  text: 'Großartiger Plan, Indy.' },
                        { speaker: 'Indiana', text: 'Ich arbeite noch daran.' }
                    ]);
                },
                'use': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Wenn ich mich genug drehe... und die Peitsche...' },
                        { speaker: 'Indiana', text: 'Nein, das klappt nicht. Wir müssen warten und die Augen schließen.' },
                        { speaker: 'Marion',  text: 'Das ist dein Plan? Augen schließen?' },
                        { speaker: 'Indiana', text: 'Vertrau der Physik. Und dem Alten Testament.' }
                    ], function() {
                        SceneManager.current.startOpening();
                    });
                }
            }
        },
        {
            id: 'belloq_ceremony',
            name: 'Belloq',
            x: 500, y: 180, w: 80, h: 160,
            walkX: 480, walkY: 320,
            condition: function() { return SceneManager.current.phase === 'bound'; },
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Belloq steht vor der Lade. Er trägt rabbinische Gewänder.' },
                        { speaker: 'Indiana', text: 'Er öffnet sie wirklich. Der Narr.' }
                    ]);
                },
                'talk to': function() {
                    Dialog.start([
                        { speaker: 'Belloq',  text: 'Ah, Jones. Sie werden Zeuge eines historischen Moments.' },
                        { speaker: 'Indiana', text: 'Belloq, das ist Wahnsinn. Was auch immer in dieser Lade ist-' },
                        { speaker: 'Belloq',  text: 'Ist der Beweis der Macht Gottes. Die Macht, die meiner sein wird.' },
                        { speaker: 'Indiana', text: 'Das gehört in ein Museum!' },
                        { speaker: 'Belloq',  text: 'Nach Ihnen, Doktor Jones.' }
                    ]);
                }
            }
        },
        {
            id: 'aftermath',
            name: 'Trümmer der Zeremonie',
            x: 100, y: 150, w: 600, h: 200,
            walkX: 400, walkY: 320,
            condition: function() { return SceneManager.current.phase === 'aftermath'; },
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Es ist vorbei. Die Lade... sie hat ihre eigene Entscheidung getroffen.' },
                        { speaker: 'Marion',  text: 'Ist es wirklich vorbei?' },
                        { speaker: 'Indiana', text: 'Für jetzt. Lass uns nach Hause gehen, Marion.' }
                    ]);
                }
            }
        },
        {
            id: 'exit_final',
            name: 'Zum Meer',
            x: 680, y: 200, w: 120, h: 180,
            walkX: 720, walkY: 330,
            condition: function() { return SceneManager.current.phase === 'aftermath'; },
            verbs: {
                'look': function() {
                    GameState.showMessage("Der Weg zur Küste. Nach Hause.");
                },
                'use': function() {
                    SceneManager.current.endGame();
                }
            }
        },
    ],

    onEnter: function(opts) {
        Character.place(150, 310, 'right');
        this.phase = 'bound';
        this.flashActive = false;
        this.boltTimer = 0;

        Cutscene.play([
            { type: 'caption', text: 'Die geheime Insel – Ägäis', duration: 2.5 },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Wir sind zu spät. Sie haben schon begonnen.' },
                { speaker: 'Marion',  text: 'Indy!' },
                { speaker: 'Toht',    text: 'Doktor Jones. Und die Frau. Bindet sie an den Pfahl.' },
                { speaker: 'Indiana', text: 'Das wird euch leid tun.' }
            ]},
            { type: 'place_player', x: 150, y: 320, facing: 'right' },
        ]);
    },

    startOpening: function() {
        this.phase = 'opening';

        Cutscene.play([
            { type: 'dialog', lines: [
                { speaker: 'Belloq',  text: 'Es beginnt! Die Lade öffnet sich!' },
                { speaker: 'Marion',  text: 'Indy!' },
                { speaker: 'Indiana', text: 'Augen zu, Marion! Schau nicht hin! Was auch immer passiert!' }
            ]},
            { type: 'wait', duration: 1.0 },
            { type: 'caption', text: '...', duration: 1.5 },
            { type: 'custom', fn: function() {
                SceneManager.current.flashActive = true;
                SceneManager.current.flashTimer = 0;
                SceneManager.current.boltTimer = 0;
            }},
            { type: 'wait', duration: 3.0 },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: '...' },
                { speaker: 'Indiana', text: 'Marion. Du kannst die Augen aufmachen.' },
                { speaker: 'Marion',  text: '...Sind wir... am Leben?' },
                { speaker: 'Indiana', text: 'Sieht so aus.' },
                { speaker: 'Marion',  text: 'Belloq... Toht... alle-' },
                { speaker: 'Indiana', text: 'Ja. Ich denke, die Lade hat selbst entschieden, wem sie gehört.' }
            ]},
            { type: 'flag', key: 'island_arkedOpened' },
            { type: 'flag', key: 'island_survived' },
            { type: 'custom', fn: function() {
                SceneManager.current.phase = 'aftermath';
                SceneManager.current.flashActive = false;
            }},
        ]);
    },

    endGame: function() {
        Cutscene.play([
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Wir sind nach Hause geflogen. Mit der Lade... oder was davon übrig war.' },
                { speaker: 'Marion',  text: 'Was machen sie damit, Indy?' },
                { speaker: 'Indiana', text: 'Die haben Leute, die das klären werden. Top-Männer.' },
                { speaker: 'Marion',  text: 'Top-Männer.' },
            ]},
            { type: 'caption', text: 'Ende.', duration: 2.0 },
            { type: 'caption', text: 'Die Bundeslade verschwand in einem Regierungslager – unauffindbar.', duration: 3.5 },
            { type: 'caption', text: 'Aber das ist eine andere Geschichte.', duration: 2.5 },
            { type: 'fade_out', duration: 1.5 },
            { type: 'custom', fn: function() {
                // Return to start
                setTimeout(function() {
                    location.reload();
                }, 2000);
            }},
        ]);
    },

    update: function(dt) {
        if (this.flashActive) {
            this.flashTimer += dt;
            this.boltTimer += dt;
        }
    },

    draw: function(ctx, time) {
        this.drawBackground(ctx, time);

        if (this.phase === 'bound') {
            this.drawBoundScene(ctx, time);
        } else if (this.phase === 'opening') {
            this.drawOpeningScene(ctx, time);
        } else {
            this.drawAftermathScene(ctx, time);
        }

        if (this.flashActive) {
            this.drawArkEffect(ctx, time);
        }
    },

    drawBackground: function(ctx, time) {
        var W = CONFIG.CANVAS_W, H = CONFIG.SCENE_H;

        // Night sky
        var skyGrad = ctx.createLinearGradient(0, 0, 0, 160);
        skyGrad.addColorStop(0, '#04080e');
        skyGrad.addColorStop(1, '#0a1428');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, 160);

        // Stars
        for (var st = 0; st < 60; st++) {
            var sx = (st * 137) % W;
            var sy = (st * 89) % 150;
            var sb = 0.5 + 0.5 * Math.sin(time * 2 + st);
            ctx.fillStyle = 'rgba(255,255,255,' + (sb * 0.8) + ')';
            ctx.fillRect(sx, sy, 2, 2);
        }

        // Full moon
        ctx.fillStyle = 'rgba(240,240,200,0.9)';
        ctx.beginPath();
        ctx.arc(680, 80, 38, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(200,200,160,0.5)';
        ctx.beginPath();
        ctx.arc(670, 72, 18, 0, Math.PI * 2);
        ctx.fill();

        // Moon glow
        ctx.fillStyle = 'rgba(220,220,180,0.08)';
        ctx.beginPath();
        ctx.arc(680, 80, 80, 0, Math.PI * 2);
        ctx.fill();

        // Rocky cliff / island terrain
        ctx.fillStyle = '#1a1208';
        ctx.fillRect(0, 130, W, 60);
        ctx.fillRect(0, 155, 200, 40);
        ctx.fillRect(600, 140, 200, 55);
        ctx.fillRect(0, 168, W, 30);

        // Torch lights (ceremony)
        Utils.torch(ctx, 250, 220, time);
        Utils.torch(ctx, 550, 220, time + 0.8);
        Utils.torch(ctx, 150, 240, time + 0.4);
        Utils.torch(ctx, 650, 240, time + 1.2);

        // Stone ceremonial floor
        ctx.fillStyle = '#1e1610';
        ctx.fillRect(0, 195, W, 145);
        Utils.stoneFloor(ctx, 0, 240, W, 100, '#1a1610', '#161210');

        // Ancient stone altar/platform
        Utils.stoneRect(ctx, 250, 165, 300, 90, '#2e2418', '#3a2e1e', '#1a1610');
        Utils.stoneRect(ctx, 270, 145, 260, 25, '#382c1c', '#443828', '#221a10');

        // Stone columns flanking altar
        for (var fc = 0; fc < 4; fc++) {
            var fcx = 60 + fc * 230;
            Utils.stoneRect(ctx, fcx, 120, 28, 180, '#2a1e14', '#362820', '#1e1610');
            ctx.fillStyle = '#3a2c1c';
            ctx.fillRect(fcx - 6, 118, 40, 10);
            ctx.fillRect(fcx - 6, 294, 40, 10);
        }

        // Hieroglyphics on columns
        ctx.fillStyle = '#4a3820';
        for (var hg = 0; hg < 4; hg++) {
            var hx = 66 + hg * 230;
            for (var hl = 0; hl < 4; hl++) {
                ctx.fillRect(hx, 135 + hl * 28, 14, 2);
                ctx.fillRect(hx, 140 + hl * 28, 7, 4);
            }
        }

        // Ground / rocky floor
        ctx.fillStyle = '#14100a';
        ctx.fillRect(0, 340, W, H - 340);
        // Ground texture
        ctx.fillStyle = '#1e1810';
        for (var gt = 0; gt < 15; gt++) {
            ctx.fillRect(gt * 55, 340, 50, 2);
            ctx.fillRect(gt * 55, 346, 30, 1);
        }

        // Atmospheric torch light
        ctx.fillStyle = 'rgba(255,130,30,0.06)';
        ctx.fillRect(0, 100, W, 250);
    },

    drawBoundScene: function(ctx, time) {
        // Tie posts
        ctx.fillStyle = '#2a1a08';
        ctx.fillRect(100, 190, 14, 160);
        ctx.fillRect(686, 190, 14, 160);
        ctx.fillStyle = '#5a3010';
        ctx.fillRect(88, 188, 38, 12);
        ctx.fillRect(675, 188, 38, 12);

        // Rope on posts
        ctx.strokeStyle = '#c8a050';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(114, 270); ctx.lineTo(130, 280);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(693, 270); ctx.lineTo(678, 280);
        ctx.stroke();

        // Marion at right post
        Character.drawNPC(ctx, 693, 340, {
            scale: 0.9,
            skin: '#c8a078',
            jacket: '#3a2830',
            pants: '#2a1a20',
            facing: 'left',
        });
        Utils.text(ctx, 'Marion', 693, 352, { size: 9, color: '#ffb0c0', align: 'center', shadow: true });

        // Belloq at altar (center)
        Character.drawNPC(ctx, 545, 330, {
            scale: 1.0,
            skin: '#c4a870',
            jacket: '#f0e8d0',
            pants: '#e8d8b8',
            hat: null,
            facing: 'left',
        });
        Utils.text(ctx, 'Belloq', 545, 342, { size: 9, color: '#ff8060', align: 'center', shadow: true });

        // Nazi soldiers in background
        for (var ns = 0; ns < 3; ns++) {
            Character.drawNPC(ctx, 580 + ns * 45, 320, {
                scale: 0.75,
                skin: '#c0b090',
                jacket: '#3a4020',
                pants: '#2a3018',
                hat: '#2a3018',
                facing: 'left',
            });
        }

        // The ark on altar (closed)
        this.drawArkClosed(ctx, 310, 148, time);
    },

    drawOpeningScene: function(ctx, time) {
        // Same as bound but ark is glowing
        this.drawArkOpening(ctx, 310, 148, time);

        // Belloq + soldiers
        Character.drawNPC(ctx, 545, 330, {
            scale: 1.0,
            skin: '#c4a870',
            jacket: '#f0e8d0',
            pants: '#e8d8b8',
            facing: 'left',
        });
    },

    drawAftermathScene: function(ctx, time) {
        // Scorched ground
        ctx.fillStyle = '#0a0804';
        ctx.fillRect(0, 200, CONFIG.CANVAS_W, 180);
        // Scorch marks
        ctx.fillStyle = '#1a1208';
        ctx.fillRect(260, 215, 280, 80);
        // Debris
        ctx.fillStyle = '#2a1e10';
        ctx.fillRect(280, 260, 40, 20);
        ctx.fillRect(460, 245, 60, 15);
        ctx.fillRect(350, 270, 100, 10);

        // Smoke hints
        ctx.fillStyle = 'rgba(80,70,60,0.15)';
        ctx.fillRect(200, 160, 400, 160);
        ctx.fillStyle = 'rgba(60,50,40,0.1)';
        ctx.fillRect(180, 140, 440, 200);

        // Marion free, standing
        Character.drawNPC(ctx, 350, 330, {
            scale: 0.9,
            skin: '#c8a078',
            jacket: '#3a2830',
            pants: '#2a1a20',
            facing: 'right',
        });
        Utils.text(ctx, 'Marion', 350, 342, { size: 9, color: '#ffb0c0', align: 'center', shadow: true });

        // Arrow to exit
        ctx.fillStyle = '#c0a040';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('→ AUSGANG', 690, 310);
    },

    drawArkEffect: function(ctx, time) {
        var t = this.flashTimer;

        // Blinding white flash (pulsing)
        var intensity = Math.abs(Math.sin(t * 8)) * 0.7;
        ctx.fillStyle = 'rgba(255,255,255,' + intensity + ')';
        ctx.fillRect(0, 0, CONFIG.CANVAS_W, CONFIG.SCENE_H);

        // Lightning bolts
        if (t > 0.5) {
            ctx.strokeStyle = 'rgba(200,220,255,' + (0.6 + 0.4 * Math.sin(t * 15)) + ')';
            ctx.lineWidth = 3;
            for (var lb = 0; lb < 4; lb++) {
                var lx = 280 + (lb * 80);
                ctx.beginPath();
                ctx.moveTo(400, 150);
                ctx.lineTo(lx, 200);
                ctx.lineTo(lx + 20, 250);
                ctx.lineTo(lx - 10, 300);
                ctx.stroke();
            }
        }

        // Gold fire from ark center
        if (t > 1.0) {
            ctx.fillStyle = 'rgba(255,200,0,' + (0.4 * Math.abs(Math.sin(t * 6))) + ')';
            ctx.fillRect(310, 150, 180, 130);
        }
    },

    drawArkClosed: function(ctx, x, y, time) {
        // Subtle golden glow
        var g = 0.1 + 0.05 * Math.sin(time);
        ctx.fillStyle = 'rgba(255,200,0,' + g + ')';
        ctx.fillRect(x - 20, y - 20, 220, 160);

        // Chest
        ctx.fillStyle = '#8a5a20';
        ctx.fillRect(x, y + 20, 180, 75);
        ctx.fillStyle = '#c0900c';
        ctx.fillRect(x + 4, y + 24, 172, 68);
        // Lid
        ctx.fillStyle = '#c0900c';
        ctx.fillRect(x - 4, y + 10, 188, 14);
        // Cherubim
        ctx.fillStyle = '#e0b800';
        ctx.fillRect(x + 20, y - 25, 28, 36);
        ctx.fillRect(x + 130, y - 25, 28, 36);
        ctx.fillRect(x + 10, y - 44, 38, 22);
        ctx.fillRect(x + 130, y - 44, 38, 22);
        ctx.fillRect(x + 30, y - 35, 18, 12);
        ctx.fillRect(x + 130, y - 35, 18, 12);
        // Poles
        ctx.fillStyle = '#6a4010';
        ctx.fillRect(x - 20, y + 36, 220, 8);
        ctx.fillRect(x - 20, y + 58, 220, 8);
    },

    drawArkOpening: function(ctx, x, y, time) {
        // Intense glow
        var g2 = 0.6 + 0.3 * Math.sin(time * 4);
        var arkGlow = ctx.createRadialGradient(x + 90, y + 50, 5, x + 90, y + 50, 150);
        arkGlow.addColorStop(0, 'rgba(255,220,100,' + g2 + ')');
        arkGlow.addColorStop(0.4, 'rgba(255,180,50,' + (g2 * 0.3) + ')');
        arkGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = arkGlow;
        ctx.fillRect(x - 60, y - 60, 300, 260);

        this.drawArkClosed(ctx, x, y, time);

        // Open lid angle
        ctx.fillStyle = 'rgba(255,240,180,0.9)';
        ctx.fillRect(x + 30, y - 60, 120, 60);

        // Light pillar from open ark
        ctx.fillStyle = 'rgba(255,255,200,0.2)';
        ctx.fillRect(x + 40, 0, 100, y);
    },
});
