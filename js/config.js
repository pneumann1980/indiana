/* ============================================
   config.js – Game Constants & Configuration
   ============================================ */

var CONFIG = {
    // Canvas
    CANVAS_W: 800,
    CANVAS_H: 520,

    // Layout zones
    SCENE_H: 360,       // y: 0 → 359  (etwas kleiner für größere UI)
    VERB_Y:  360,       // y: 360 → 410
    VERB_H:  50,
    INV_Y:   410,       // y: 410 → 519
    INV_H:   110,

    // Gameplay
    WALK_SPEED: 220,
    ANIM_FPS: 8,
    MESSAGE_DURATION: 3.5,

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
    INV_SLOT_W: 76,
    INV_SLOT_H: 86,
    INV_SLOTS_VISIBLE: 10,

    // Color palette (UI) – clearly visible, high contrast
    UI: {
        BG:           '#1a0e04',
        BORDER:       '#8a5a20',
        VERB_BG:      '#2a1606',
        VERB_HOVER:   '#4a2a0e',
        VERB_ACTIVE:  '#7a3a0a',
        VERB_TEXT:    '#e8c070',
        VERB_TEXT_HL: '#ffe060',
        VERB_BORDER:  '#6a3a10',
        INV_BG:       '#200e02',
        INV_SLOT:     '#2e1808',
        INV_SLOT_HV:  '#4a2a10',
        INV_SLOT_SEL: '#7a3a08',
        TEXT:         '#f0e0b0',
        TEXT_BRIGHT:  '#ffe060',
        TEXT_DIM:     '#a08040',
        HOTSPOT:      'rgba(255,220,100,0.18)',
    },

    // Debug
    DEBUG_HOTSPOTS: false,
};
