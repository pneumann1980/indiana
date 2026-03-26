/* ============================================
   scenes/ship.js
   Kapitel 6: Das Schiff & das U-Boot
   ============================================ */

SceneManager.register('ship', {

    hotspots: [
        {
            id: 'sailor',
            name: 'Griechischer Seemann',
            x: 500, y: 200, w: 80, h: 160,
            walkX: 480, walkY: 315,
            verbs: {
                'look': function() {
                    GameState.showMessage("Ein griechischer Seemann. Auf diesem Schiff ist er unser Verbündeter.");
                },
                'talk to': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Wir müssen die Lade verfolgen. Wo geht das U-Boot hin?' },
                        { speaker: 'Indiana', text: '"Geheime Insel" sagt er. Irgendwo in der Ägäis.' },
                        { speaker: 'Indiana', text: 'Na toll.' }
                    ]);
                }
            }
        },
        {
            id: 'marion_cabin',
            name: 'Marions Kabine',
            x: 80, y: 210, w: 160, h: 150,
            walkX: 160, walkY: 315,
            verbs: {
                'look': function() {
                    GameState.showMessage("Marions Kabine. Sie ist endlich in Sicherheit... vorerst.");
                },
                'use': function() {
                    Dialog.start([
                        { speaker: 'Marion',  text: 'Indy! Du hast mich befreit!' },
                        { speaker: 'Indiana', text: 'Die Nacht ist noch jung, Marion.' },
                        { speaker: 'Marion',  text: 'Was machen wir jetzt?' },
                        { speaker: 'Indiana', text: 'Wir folgen der Lade. Auf die Insel. Und dann... schauen wir weiter.' }
                    ]);
                }
            }
        },
        {
            id: 'horizon',
            name: 'Meer-Horizont',
            x: 0, y: 0, w: 800, h: 180,
            walkX: 400, walkY: 300,
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Das Ägäische Meer. Irgendwo da draußen - ein U-Boot mit der Bundeslade an Bord.' },
                        { speaker: 'Indiana', text: 'Und wir verfolgen es auf diesem Fischerboot. Was für ein Plan.' }
                    ]);
                }
            }
        },
        {
            id: 'continue_island',
            name: 'Zur Insel',
            x: 680, y: 200, w: 120, h: 180,
            walkX: 720, walkY: 315,
            condition: function() { return GameState.flag('ship_boarded'); },
            verbs: {
                'look': function() {
                    GameState.showMessage("Der Weg zur Insel.");
                },
                'use': function() {
                    SceneManager.current.goToIsland();
                }
            }
        },
        {
            id: 'begin_island',
            name: 'Zur Insel aufbrechen',
            x: 680, y: 200, w: 120, h: 180,
            walkX: 720, walkY: 315,
            condition: function() { return !GameState.flag('ship_boarded'); },
            verbs: {
                'look': function() {
                    GameState.showMessage("Die Insel liegt irgendwo voraus.");
                },
                'use': function() {
                    GameState.setFlag('ship_boarded');
                    SceneManager.current.goToIsland();
                },
                'talk to': function() {
                    GameState.setFlag('ship_boarded');
                    SceneManager.current.goToIsland();
                }
            }
        },
    ],

    onEnter: function(opts) {
        Character.place(350, 310, 'right');

        Cutscene.play([
            { type: 'caption', text: 'An Bord eines griechischen Frachters', duration: 2.5 },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Wir haben das U-Boot in der Spur. Irgendwie.' },
                { speaker: 'Marion',  text: 'Irgendwie? Das klingt nicht beruhigend, Indy.' },
                { speaker: 'Indiana', text: 'Vertrau mir.' },
                { speaker: 'Marion',  text: 'Das letzte Mal als ich dir vertraut habe, landete ich in einer Schlangengrube.' },
                { speaker: 'Indiana', text: '...Das war eine außergewöhnliche Situation.' }
            ]},
        ]);
    },

    goToIsland: function() {
        Cutscene.play([
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Da. Die Insel.' },
                { speaker: 'Marion',  text: 'Wir müssen unbemerkt an Land kommen.' },
                { speaker: 'Indiana', text: 'Ich hab einen Plan.' },
                { speaker: 'Marion',  text: 'Kein Plan ist auch ein Plan, oder?' },
                { speaker: 'Indiana', text: 'Genau.' }
            ]},
            { type: 'fade_out', duration: 0.8 },
            { type: 'travel_map', from: 'aegean_sea', to: 'aegean_sea', label: 'Die geheime Insel – Finale' },
            { type: 'scene', scene: 'island' },
        ]);
    },

    update: function(dt) {},

    draw: function(ctx, time) {
        this.drawBackground(ctx, time);
        this.drawMarion(ctx);
    },

    drawBackground: function(ctx, time) {
        var W = CONFIG.CANVAS_W, H = CONFIG.SCENE_H;

        // Ocean / evening sky
        var skyGrad = ctx.createLinearGradient(0, 0, 0, 180);
        skyGrad.addColorStop(0, '#102040');
        skyGrad.addColorStop(1, '#204870');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, 180);

        // Sunset clouds
        ctx.fillStyle = 'rgba(255,150,50,0.2)';
        ctx.fillRect(0, 60, 300, 40);
        ctx.fillRect(500, 40, 250, 50);
        ctx.fillStyle = 'rgba(255,100,30,0.15)';
        ctx.fillRect(150, 45, 400, 60);

        // Sun setting
        ctx.fillStyle = 'rgba(255,180,60,0.7)';
        ctx.beginPath();
        ctx.arc(680, 100, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,220,100,0.5)';
        ctx.beginPath();
        ctx.arc(680, 100, 35, 0, Math.PI * 2);
        ctx.fill();

        // Sun reflection on water
        ctx.fillStyle = 'rgba(255,160,50,0.15)';
        ctx.fillRect(550, 180, 250, 100);

        // Ocean waves
        ctx.fillStyle = '#1a3850';
        ctx.fillRect(0, 178, W, H - 178);

        // Wave patterns
        ctx.strokeStyle = 'rgba(100,180,220,0.25)';
        ctx.lineWidth = 1.5;
        for (var wy = 0; wy < 6; wy++) {
            var waveY = 190 + wy * 28;
            var offset = Math.sin(time + wy * 0.7) * 10;
            ctx.beginPath();
            for (var wx = 0; wx <= W; wx += 40) {
                var wh = Math.sin(wx * 0.02 + time * 1.5 + wy) * 4 + waveY + offset;
                if (wx === 0) ctx.moveTo(wx, wh);
                else ctx.lineTo(wx, wh);
            }
            ctx.stroke();
        }

        // Distant island silhouette
        ctx.fillStyle = '#0a1820';
        ctx.fillRect(200, 140, 400, 45);
        ctx.fillRect(230, 120, 80, 70);
        ctx.fillRect(340, 110, 100, 75);
        ctx.fillRect(460, 125, 60, 65);

        // Ship deck (foreground)
        ctx.fillStyle = '#3a2810';
        ctx.fillRect(0, 280, W, H - 280);

        // Deck planks
        for (var dp = 0; dp < 14; dp++) {
            ctx.fillStyle = dp % 2 === 0 ? '#3a2810' : '#321e08';
            ctx.fillRect(dp * 58, 280, 56, H - 280);
            ctx.fillStyle = '#1e1006';
            ctx.fillRect(dp * 58, 280, 2, H - 280);
        }

        // Ship rail
        ctx.fillStyle = '#2a1a08';
        ctx.fillRect(0, 275, W, 8);
        // Rail posts
        for (var rp = 0; rp < 12; rp++) {
            ctx.fillRect(rp * 68, 248, 6, 30);
        }
        // Top rail
        ctx.fillStyle = '#3a2010';
        ctx.fillRect(0, 244, W, 6);

        // Cabin doors (left = Marion's)
        ctx.fillStyle = '#2a1808';
        ctx.fillRect(80, 210, 160, 155);
        ctx.fillStyle = '#241408';
        ctx.fillRect(84, 214, 152, 151);
        // Porthole
        ctx.fillStyle = '#1a2840';
        ctx.beginPath();
        ctx.arc(160, 250, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#4a3010';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(160, 250, 22, 0, Math.PI * 2);
        ctx.stroke();
        // Light inside porthole
        ctx.fillStyle = 'rgba(255,200,100,0.3)';
        ctx.beginPath();
        ctx.arc(160, 250, 20, 0, Math.PI * 2);
        ctx.fill();
        // Marion cabin sign
        ctx.fillStyle = '#6a4020';
        ctx.font = '9px monospace';
        ctx.fillText('KABINE', 130, 295);

        // Right passage to island
        ctx.fillStyle = '#1a2030';
        ctx.fillRect(688, 208, 112, 162);
        ctx.fillStyle = '#243050';
        ctx.fillRect(692, 212, 106, 156);
        // Stars through passage
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        for (var st = 0; st < 10; st++) {
            ctx.fillRect(695 + (st * 37) % 100, 215 + (st * 23) % 140, 2, 2);
        }
        // Arrow indicator
        ctx.fillStyle = '#c0a040';
        ctx.font = 'bold 18px monospace';
        ctx.fillText('→ INSEL', 696, 300);

        // Mast and rigging
        ctx.fillStyle = '#2a1a08';
        ctx.fillRect(394, 50, 12, 230);
        ctx.strokeStyle = '#3a2a10';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(400, 50); ctx.lineTo(100, 280);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(400, 50); ctx.lineTo(700, 280);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(400, 120); ctx.lineTo(160, 280);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(400, 120); ctx.lineTo(640, 280);
        ctx.stroke();
    },

    drawMarion: function(ctx) {
        if (GameState.flag('ship_boarded')) return;
        Character.drawNPC(ctx, 160, 315, {
            scale: 0.9,
            skin:   '#c8a078',
            jacket: '#3a2830',
            pants:  '#2a1a20',
            facing: 'right',
        });
        Utils.text(ctx, 'Marion', 160, 342, { size: 9, color: '#ffb0c0', align: 'center', shadow: true });
    },
});
