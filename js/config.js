/* ============================================
   config.js – Game Constants & Configuration
   ============================================ */

var CONFIG = {
    // Canvas
    CANVAS_W: 800,
    CANVAS_H: 520,

    // Layout zones
    SCENE_H: 380,       // y: 0 → 379
    VERB_Y: 380,        // y: 380 → 424
    VERB_H: 44,
    INV_Y: 424,         // y: 424 → 519
    INV_H: 96,

    // Gameplay
    WALK_SPEED: 220,        // px/s
    ANIM_FPS: 8,            // character animation frames per second
    MESSAGE_DURATION: 3.5,  // seconds a message stays on screen

    // Verb definitions
    VERBS: ['look', 'pick up', 'use', 'talk to', 'push', 'pull'],
    VERB_LABELS: {
        'look':    'Anschauen',
        'pick up': 'Nehmen',
        'use':     'Benutzen',
        'talk to': 'Reden',
        'push':    'Schieben',
        'pull':    'Ziehen',
    },

    // Inventory
    INV_SLOT_W: 72,
    INV_SLOT_H: 72,
    INV_SLOTS_VISIBLE: 10,

    // Color palette (UI)
    UI: {
        BG:           '#120902',
        BORDER:       '#5c3a14',
        VERB_BG:      '#1e0e04',
        VERB_HOVER:   '#3a1e08',
        VERB_ACTIVE:  '#7a3a12',
        VERB_TEXT:    '#d4a060',
        VERB_TEXT_HL: '#ffd700',
        INV_BG:       '#160b02',
        INV_SLOT:     '#1e1004',
        INV_SLOT_HV:  '#2e1808',
        INV_SLOT_SEL: '#5a2e0a',
        TEXT:         '#e8d4a0',
        TEXT_BRIGHT:  '#ffd700',
        TEXT_DIM:     '#7a5a30',
        HOTSPOT:      'rgba(255,220,100,0.18)',
    },

    // Debug
    DEBUG_HOTSPOTS: false,
};
