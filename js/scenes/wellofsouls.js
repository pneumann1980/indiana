/* ============================================
   scenes/wellofsouls.js
   Kapitel 5: Der Kartenraum & die Quelle der Seelen
   ============================================ */

SceneManager.register('wellofsouls', {

    snakeTimer: 0,
    snakes: [],
    mapRoomPhase: true,  // true = kartenraum, false = wos chamber

    initSnakes: function() {
        this.snakes = [];
        for (var i = 0; i < 12; i++) {
            this.snakes.push({
                x: 50 + Math.random() * 700,
                y: 280 + Math.random() * 80,
                dx: (Math.random() - 0.5) * 60,
                dy: (Math.random() - 0.5) * 20,
                len: 30 + Math.random() * 40,
                phase: Math.random() * Math.PI * 2,
            });
        }
    },

    hotspots: [
        {
            id: 'sunbeam',
            name: 'Lichtstahl',
            x: 330, y: 120, w: 140, h: 180,
            walkX: 400, walkY: 310,
            condition: function() { return SceneManager.current.mapRoomPhase; },
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Der Sonnenstrahl... er fällt genau durch die Öffnung!' },
                        { speaker: 'Indiana', text: 'Wenn ich den Stab in den Boden stelle, zeigt der Lichtreflex...' },
                        { speaker: 'Indiana', text: 'Da! Die genaue Position der Bundeslade unter Tanis!' }
                    ]);
                },
                'use': function() {
                    if (SceneManager.current.mapRoomPhase) {
                        SceneManager.current.activateMapRoom();
                    }
                }
            }
        },
        {
            id: 'ark_of_covenant',
            name: 'Bundeslade',
            x: 310, y: 180, w: 180, h: 120,
            walkX: 400, walkY: 310,
            condition: function() { return !SceneManager.current.mapRoomPhase && GameState.flag('wos_arkFound'); },
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Die Bundeslade der Verbündeten. Tausende Jahre alt.' },
                        { speaker: 'Indiana', text: 'Ich spüre... etwas. Eine Energie. Das ist real.' },
                        { speaker: 'Indiana', text: 'Wir müssen sie rausholen, bevor Belloq sie findet.' }
                    ]);
                },
                'pick up': function() {
                    if (!GameState.flag('wos_capturedByNazis')) {
                        SceneManager.current.capturedByNazis();
                    }
                },
                'use': function() {
                    if (!GameState.flag('wos_capturedByNazis')) {
                        SceneManager.current.capturedByNazis();
                    }
                }
            }
        },
        {
            id: 'snakes',
            name: 'Schlangen!',
            x: 0, y: 260, w: 800, h: 120,
            walkX: 400, walkY: 300,
            condition: function() { return !SceneManager.current.mapRoomPhase; },
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Schlangen. Warum mussten es Schlangen sein.' },
                        { speaker: 'Indiana', text: '...' },
                        { speaker: 'Indiana', text: 'Ich hasse Schlangen.' }
                    ]);
                },
                'use': function() {
                    GameState.showMessage("Ich gehe da nicht rein. Da sind Schlangen.");
                }
            }
        },
        {
            id: 'torch_wos',
            name: 'Fackel',
            x: 50, y: 200, w: 35, h: 80,
            walkX: 100, walkY: 310,
            condition: function() { return !SceneManager.current.mapRoomPhase; },
            verbs: {
                'look': function() {
                    GameState.showMessage("Eine Fackel an der Wand. Licht und Wärme gegen die Dunkelheit.");
                },
                'pick up': function() {
                    if (!GameState.hasItem('torch')) {
                        GameState.addItem('torch');
                        GameState.showMessage("Fackel aufgenommen. Licht ist mein bester Freund hier unten.");
                    }
                },
                'use': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Mit der Fackel kann ich die Schlangen auf Abstand halten!' }
                    ]);
                }
            }
        },
        {
            id: 'map_floor',
            name: 'Kartenraum-Boden',
            x: 50, y: 200, w: 700, h: 120,
            walkX: 400, walkY: 310,
            condition: function() { return SceneManager.current.mapRoomPhase; },
            verbs: {
                'look': function() {
                    Dialog.start([
                        { speaker: 'Indiana', text: 'Ein miniaturisiertes Modell von Tanis. Erstaunlich detailliert.' },
                        { speaker: 'Indiana', text: 'Tausende kleine Gebäude, Straßen, Plätze... und irgendwo hier unten ist die Bundeslade.' }
                    ]);
                }
            }
        },
        {
            id: 'exit_wos',
            name: 'Ausgang',
            x: 700, y: 200, w: 100, h: 180,
            walkX: 710, walkY: 315,
            condition: function() { return GameState.flag('wos_capturedByNazis'); },
            verbs: {
                'look': function() {
                    GameState.showMessage("Der Weg weiter - zum Schiff.");
                },
                'use': function() {
                    SceneManager.current.goToShip();
                }
            }
        },
    ],

    onEnter: function(opts) {
        Character.place(100, 310, 'right');
        this.mapRoomPhase = true;
        this.initSnakes();

        Cutscene.play([
            { type: 'caption', text: 'Der unterirdische Kartenraum von Tanis', duration: 2.5 },
            { type: 'dialog', lines: [
                { speaker: 'Sallah',  text: 'Hier, Indy! Das muss es sein!' },
                { speaker: 'Indiana', text: 'Der Kartenraum. Sallah - ich fasse es nicht.' },
                { speaker: 'Indiana', text: 'Stelle ich den Stab ins Licht... zeigt er mir die Position der Lade.' },
            ]},
        ]);
    },

    activateMapRoom: function() {
        Cutscene.play([
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Der Stab... das Licht bricht sich durch das Kopfteil...' },
                { speaker: 'Indiana', text: 'Dort! Sektor J, Reihe 6! Die Quelle der Seelen!' },
                { speaker: 'Sallah',  text: 'Belloq gräbt an der falschen Stelle! Habibi, wir haben gewonnen!' },
                { speaker: 'Indiana', text: 'Noch nicht. Wir müssen da rein und die Lade holen.' },
                { speaker: 'Indiana', text: 'Grabungsmannschaft zusammenstellen. Und beeilt euch - wenn die Deutschen-' }
            ]},
            { type: 'flag', key: 'wos_caveFound' },
            { type: 'wait', duration: 0.5 },
            { type: 'caption', text: 'Später – Die Quelle der Seelen', duration: 2.5 },
            { type: 'custom', fn: function() {
                SceneManager.current.mapRoomPhase = false;
                SceneManager.current.initSnakes();
            }},
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Schlangen. Eine Grube voll Schlangen. Natürlich.' },
                { speaker: 'Sallah',  text: 'Asps. Sehr giftig.' },
                { speaker: 'Indiana', text: 'Danke, Sallah. Das hilft sehr.' }
            ]},
            { type: 'flag', key: 'wos_arkFound' },
        ]);
    },

    capturedByNazis: function() {
        Cutscene.play([
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Die Lade. Wir haben sie gefunden!' },
                { speaker: 'Belloq',  text: 'Doktor Jones! Wie praktisch. Sie haben die Arbeit für uns erledigt.' },
                { speaker: 'Indiana', text: 'Belloq! Und... viele Nazis.' },
                { speaker: 'Belloq',  text: 'Schnappt sie. Und die Lade... transportiert sie zum Schiff.' },
                { speaker: 'Marion',  text: 'Indy!' },
                { speaker: 'Indiana', text: 'Marion! Du lebst!' },
                { speaker: 'Belloq',  text: 'Für jetzt. Werft sie zurück in die Grube.' }
            ]},
            { type: 'flag', key: 'wos_capturedByNazis' },
            { type: 'caption', text: 'Gefangen! – Aber Indy findet immer einen Weg...', duration: 3.0 },
            { type: 'dialog', lines: [
                { speaker: 'Indiana', text: 'Okay. Die Lade ist futsch. Marion ist weg. Es gibt nur einen Weg: Das Schiff verfolgen.' }
            ]},
        ]);
    },

    goToShip: function() {
        Cutscene.play([
            { type: 'fade_out', duration: 0.8 },
            { type: 'travel_map', from: 'cairo', to: 'aegean_sea', label: 'Ägäisches Meer – An Bord' },
            { type: 'scene', scene: 'ship' },
        ]);
    },

    update: function(dt) {
        this.snakeTimer += dt;
        if (!this.mapRoomPhase) {
            for (var i = 0; i < this.snakes.length; i++) {
                var s = this.snakes[i];
                s.phase += dt * 2;
                s.x += s.dx * dt * 0.3;
                if (s.x < 20)  { s.x = 20;  s.dx = Math.abs(s.dx); }
                if (s.x > 780) { s.x = 780; s.dx = -Math.abs(s.dx); }
            }
        }
    },

    draw: function(ctx, time) {
        if (this.mapRoomPhase) {
            this.drawMapRoom(ctx, time);
        } else {
            this.drawWellOfSouls(ctx, time);
        }
    },

    drawMapRoom: function(ctx, time) {
        var W = CONFIG.CANVAS_W, H = CONFIG.SCENE_H;

        // Underground chamber ceiling
        Utils.stoneWall(ctx, 0, 0, W, 110, '#1a1410', '#141008');

        // Opening in ceiling (sunbeam)
        ctx.fillStyle = '#5a8ab0';
        ctx.fillRect(350, 0, 100, 40);
        // Sunbeam shaft
        ctx.fillStyle = 'rgba(255,240,180,0.25)';
        ctx.beginPath();
        ctx.moveTo(350, 0); ctx.lineTo(320, 300); ctx.lineTo(460, 300); ctx.lineTo(450, 0);
        ctx.fill();

        // More subtle sunbeam
        ctx.fillStyle = 'rgba(255,240,200,0.15)';
        ctx.fillRect(355, 0, 90, 200);

        // Wall (deep stone)
        Utils.stoneWall(ctx, 0, 108, W, 200, '#1e1810', '#181408');

        // Columns
        for (var col = 0; col < 4; col++) {
            var cx = 100 + col * 200;
            Utils.stoneRect(ctx, cx - 20, 100, 40, 210, '#2e2418', '#3a2e1e', '#1e1610');
            ctx.fillStyle = '#3a2c1c';
            ctx.fillRect(cx - 24, 100, 48, 12);
            ctx.fillRect(cx - 24, 296, 48, 12);
        }

        // Kartenraum floor (miniature model of Tanis)
        ctx.fillStyle = '#3a2c1a';
        ctx.fillRect(40, 200, W - 80, 110);

        // Sand floor of model
        ctx.fillStyle = '#c8a860';
        ctx.fillRect(44, 204, W - 88, 100);

        // Miniature buildings on map floor
        var buildingColors = ['#b09050','#a08040','#c0a860'];
        for (var mb = 0; mb < 30; mb++) {
            var bx2 = 50 + (mb * 67) % (W - 100);
            var by2 = 206 + Math.floor(mb / 10) * 28;
            var bw2 = 8 + (mb * 13) % 20;
            var bh2 = 6 + (mb * 7) % 12;
            ctx.fillStyle = buildingColors[mb % 3];
            ctx.fillRect(bx2, by2, bw2, bh2);
        }

        // Grid lines
        ctx.strokeStyle = 'rgba(100,80,30,0.4)';
        ctx.lineWidth = 0.5;
        for (var gx = 50; gx < W - 40; gx += 40) {
            ctx.beginPath(); ctx.moveTo(gx, 204); ctx.lineTo(gx, 300); ctx.stroke();
        }
        for (var gy = 210; gy < 300; gy += 20) {
            ctx.beginPath(); ctx.moveTo(44, gy); ctx.lineTo(W - 44, gy); ctx.stroke();
        }

        // Highlighted spot where ark is
        ctx.fillStyle = 'rgba(255,100,0,0.4)';
        ctx.fillRect(376, 235, 50, 30);

        // Floor (actual floor of map room)
        Utils.stoneFloor(ctx, 0, 308, W, H - 308, '#1a1610', '#16120c');

        // Torches
        Utils.torch(ctx, 50,  180, time);
        Utils.torch(ctx, 750, 180, time + 0.7);

        // Sallah (draw as NPC)
        Character.drawNPC(ctx, 560, 320, {
            scale: 0.9,
            skin: '#b87040',
            jacket: '#c8a050',
            pants: '#8a6030',
            hat: '#aa2020',
            facing: 'left',
        });
    },

    drawWellOfSouls: function(ctx, time) {
        var W = CONFIG.CANVAS_W, H = CONFIG.SCENE_H;

        // Deep dark chamber
        ctx.fillStyle = '#060402';
        ctx.fillRect(0, 0, W, H);

        // Rough stone walls
        Utils.stoneWall(ctx, 0, 0, W, 280, '#0e0a06', '#0a0804');

        // Deeper darkness at top
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, 0, W, 130);

        // Torch holders
        Utils.torch(ctx, 60,  200, time);
        Utils.torch(ctx, 740, 200, time + 1.1);

        // Serpent hieroglyphics on walls
        ctx.fillStyle = '#2a1e10';
        for (var hg = 0; hg < 5; hg++) {
            ctx.fillRect(80 + hg * 130, 120, 40, 2);
            ctx.fillRect(80 + hg * 130, 130, 2, 40);
            ctx.fillRect(110 + hg * 130, 130, 2, 40);
            ctx.fillRect(80 + hg * 130, 168, 32, 2);
        }

        // Pit of snakes (floor area)
        ctx.fillStyle = '#080602';
        ctx.fillRect(0, 270, W, H - 270);

        // Sand floor hints
        ctx.fillStyle = '#1a1208';
        ctx.fillRect(0, 310, W, H - 310);

        // Draw snakes
        for (var si = 0; si < this.snakes.length; si++) {
            this.drawSnake(ctx, this.snakes[si], time);
        }

        // Ark of the Covenant (if found)
        if (GameState.flag('wos_arkFound')) {
            this.drawArk(ctx, 360, 195, time);
        }

        // Fog/haze
        ctx.fillStyle = 'rgba(20,15,5,0.3)';
        ctx.fillRect(0, 0, W, H);
    },

    drawSnake: function(ctx, snake, time) {
        var segments = Math.ceil(snake.len / 8);
        var headX = snake.x;
        var headY = snake.y + 6 * Math.sin(snake.phase + time * 2);

        ctx.strokeStyle = '#3a5a20';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        for (var sg = 1; sg <= segments; sg++) {
            var t = sg / segments;
            var sx = headX - snake.len * t * Math.sign(snake.dx || 1);
            var sy = headY + 8 * Math.sin(snake.phase + t * 4 + time * 2);
            ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        // Snake head
        ctx.fillStyle = '#4a7028';
        ctx.fillRect(headX - 5, headY - 4, 10, 8);
        // Tongue
        ctx.strokeStyle = '#cc2020';
        ctx.lineWidth = 1.5;
        var tongX = headX + (snake.dx > 0 ? 5 : -5);
        ctx.beginPath();
        ctx.moveTo(tongX, headY);
        ctx.lineTo(tongX + (snake.dx > 0 ? 6 : -6), headY - 2);
        ctx.moveTo(tongX, headY);
        ctx.lineTo(tongX + (snake.dx > 0 ? 6 : -6), headY + 2);
        ctx.stroke();

        // Eyes
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(headX - 2, headY - 2, 2, 2);
        ctx.fillRect(headX + 1, headY - 2, 2, 2);
    },

    drawArk: function(ctx, x, y, time) {
        var glow = 0.3 + 0.1 * Math.sin(time * 2);

        // Golden glow
        var g = ctx.createRadialGradient(x + 90, y + 60, 10, x + 90, y + 60, 120);
        g.addColorStop(0, 'rgba(255,200,0,' + glow + ')');
        g.addColorStop(0.5, 'rgba(255,150,0,' + (glow * 0.3) + ')');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(x - 30, y - 40, 240, 200);

        // Ark chest (acacia wood)
        ctx.fillStyle = '#8a5a20';
        ctx.fillRect(x, y + 20, 180, 80);
        // Gold overlaid
        ctx.fillStyle = '#c8960c';
        ctx.fillRect(x + 4, y + 24, 172, 72);

        // Lid
        ctx.fillStyle = '#c8960c';
        ctx.fillRect(x - 4, y + 10, 188, 16);

        // Carrying poles
        ctx.fillStyle = '#6a4010';
        ctx.fillRect(x - 20, y + 40, 220, 10);
        ctx.fillRect(x - 20, y + 65, 220, 10);

        // Cherubim on lid
        // Left cherub
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(x + 20, y - 30, 30, 40);  // wing
        ctx.fillRect(x + 30, y - 40, 20, 12);  // head
        ctx.fillRect(x + 10, y - 50, 40, 24);  // upper wing
        // Right cherub
        ctx.fillRect(x + 130, y - 30, 30, 40);
        ctx.fillRect(x + 130, y - 40, 20, 12);
        ctx.fillRect(x + 130, y - 50, 40, 24);

        // Engraved gold borders
        ctx.fillStyle = '#aa7a00';
        ctx.fillRect(x + 4, y + 24, 172, 4);
        ctx.fillRect(x + 4, y + 92, 172, 4);
        ctx.fillRect(x + 4, y + 24, 4, 72);
        ctx.fillRect(x + 172, y + 24, 4, 72);

        // Name/inscription
        ctx.fillStyle = '#886000';
        ctx.font = '8px monospace';
        ctx.fillText('✡', x + 82, y + 68);
    },
});
