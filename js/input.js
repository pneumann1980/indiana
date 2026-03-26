/* ============================================
   input.js – Mouse & Click Handling
   ============================================ */

var Input = {

    mouseX: 0,
    mouseY: 0,
    canvas: null,

    init: function(canvas) {
        this.canvas = canvas;
        var self = this;

        canvas.addEventListener('mousemove', function(e) {
            var r  = canvas.getBoundingClientRect();
            self.mouseX = (e.clientX - r.left) * (CONFIG.CANVAS_W / r.width);
            self.mouseY = (e.clientY - r.top)  * (CONFIG.CANVAS_H / r.height);
            self.onMouseMove(self.mouseX, self.mouseY);
        });

        canvas.addEventListener('click', function(e) {
            var r  = canvas.getBoundingClientRect();
            var mx = (e.clientX - r.left) * (CONFIG.CANVAS_W / r.width);
            var my = (e.clientY - r.top)  * (CONFIG.CANVAS_H / r.height);
            self.onClick(mx, my);
        });

        canvas.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            // Right-click = cycle verbs
            var verbs = CONFIG.VERBS;
            var idx   = verbs.indexOf(GameState.selectedVerb);
            GameState.selectedVerb = verbs[(idx + 1) % verbs.length];
            GameState.selectedItem = null;
        });
    },

    onMouseMove: function(mx, my) {
        if (Dialog.isActive() || Cutscene.isActive()) {
            GameState.hoverHotspot = null;
            return;
        }

        // Check scene hotspots
        var scene = SceneManager.current;
        GameState.hoverHotspot = null;

        if (scene && my < CONFIG.SCENE_H) {
            var hs = scene.hotspots || [];
            for (var i = 0; i < hs.length; i++) {
                var h = hs[i];
                if (h.condition && !h.condition()) continue;
                if (Utils.pointInRect(mx, my, h.x, h.y, h.w, h.h)) {
                    GameState.hoverHotspot = h;
                    break;
                }
            }
        }

        // Check inventory hover
        if (my >= CONFIG.INV_Y) {
            GameState.hoverInvItem = Inventory.getItemAt(mx, my);
        } else {
            GameState.hoverInvItem = null;
        }
    },

    onClick: function(mx, my) {
        // Dialog click: advance
        if (Dialog.isActive()) {
            Dialog.advance();
            return;
        }

        // Cutscene caption: allow click-to-skip
        if (Cutscene.isActive()) {
            var cs = GameState.cutscene;
            if (cs.steps[cs.currentStep] && cs.steps[cs.currentStep].type === 'caption') {
                cs.captionTimer = 0; // skip immediately
            }
            return;
        }

        // Travel map: block
        if (TravelMap.active) return;

        // Verb bar click
        if (my >= CONFIG.VERB_Y && my < CONFIG.INV_Y) {
            this.handleVerbClick(mx, my);
            return;
        }

        // Inventory click
        if (my >= CONFIG.INV_Y) {
            this.handleInventoryClick(mx, my);
            return;
        }

        // Scene click (my < SCENE_H)
        if (my < CONFIG.SCENE_H) {
            this.handleSceneClick(mx, my);
        }
    },

    handleVerbClick: function(mx, my) {
        var verbs = CONFIG.VERBS;
        var btnW  = Math.floor(CONFIG.CANVAS_W / verbs.length);
        var idx   = Math.floor(mx / btnW);
        if (idx >= 0 && idx < verbs.length) {
            GameState.selectedVerb = verbs[idx];
            GameState.selectedItem = null;
        }
    },

    handleInventoryClick: function(mx, my) {
        var itemId = Inventory.getItemAt(mx, my);
        if (!itemId) {
            GameState.selectedItem = null;
            return;
        }

        var verb = GameState.selectedVerb;

        // LOOK: show description
        if (verb === 'look') {
            var item = Inventory.items[itemId];
            if (item) GameState.showMessage(item.desc);
            return;
        }

        // USE / etc: select item for use-with
        if (verb === 'use' || verb === 'pick up') {
            if (GameState.selectedItem === itemId) {
                GameState.selectedItem = null;
            } else {
                GameState.selectedItem = itemId;
                GameState.showMessage('Benutze ' + (Inventory.items[itemId] ? Inventory.items[itemId].name : itemId) + ' mit ...');
            }
            return;
        }

        // Other verbs on inventory item
        GameState.selectedItem = itemId;
        var item = Inventory.items[itemId];
        if (item) GameState.showMessage(item.desc);
    },

    handleSceneClick: function(mx, my) {
        var scene = SceneManager.current;
        if (!scene) return;

        var verb       = GameState.selectedVerb;
        var selItem    = GameState.selectedItem;
        var hotspot    = GameState.hoverHotspot;

        if (hotspot) {
            // Walk to hotspot center first, then interact
            var wx = hotspot.walkX !== undefined ? hotspot.walkX : hotspot.x + hotspot.w / 2;
            var wy = hotspot.walkY !== undefined ? hotspot.walkY : Math.min(hotspot.y + hotspot.h, CONFIG.SCENE_H - 5);

            Character.walkTo(wx, wy, function() {
                Input.activateHotspot(hotspot, verb, selItem);
            });
        } else {
            // Walk to clicked position
            Character.walkTo(mx, Math.min(my, CONFIG.SCENE_H - 10));
            GameState.selectedItem = null;
        }
    },

    activateHotspot: function(hotspot, verb, selItem) {
        // Face the hotspot
        var p = GameState.player;
        if (hotspot.x + hotspot.w / 2 < p.x) p.facing = 'left';
        else p.facing = 'right';

        // Item + USE → check combined use
        if (selItem && (verb === 'use' || verb === 'pick up')) {
            var combinedKey = 'use_' + selItem;
            if (hotspot.verbs && hotspot.verbs[combinedKey]) {
                hotspot.verbs[combinedKey]();
                GameState.selectedItem = null;
                return;
            }
            // Generic fallback
            GameState.showMessage("Das funktioniert so nicht.");
            GameState.selectedItem = null;
            return;
        }

        // Verb handler
        if (hotspot.verbs && hotspot.verbs[verb]) {
            hotspot.verbs[verb]();
        } else {
            // Fallback messages per verb
            var fallbacks = {
                'look':    "Ich sehe nichts Besonderes.",
                'pick up': "Das kann ich nicht nehmen.",
                'use':     "Das funktioniert nicht.",
                'talk to': "Mit wem rede ich hier?",
                'push':    "Das ist fest verankert.",
                'pull':    "Das gibt nicht nach.",
            };
            GameState.showMessage(fallbacks[verb] || "Nichts passiert.");
        }
    },
};
