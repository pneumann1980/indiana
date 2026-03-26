/* ============================================
   state.js – Global Game State
   ============================================ */

var GameState = {

    // ── Active scene ─────────────────────────
    currentScene: 'temple',
    previousScene: null,

    // ── Player character ─────────────────────
    player: {
        x: 200,
        y: 310,
        targetX: 200,
        targetY: 310,
        facing: 'right',    // 'left' | 'right'
        walking: false,
        animFrame: 0,
        animTimer: 0,
        onArrival: null,    // callback when player reaches target
        visible: true,
    },

    // ── Inventory ────────────────────────────
    inventory: [],          // Array of item-id strings
    selectedItem: null,     // item-id currently held (for USE + item)
    invScrollOffset: 0,     // scroll position

    // ── Verbs ────────────────────────────────
    selectedVerb: 'look',   // active verb

    // ── UI State ─────────────────────────────
    hoverHotspot: null,     // hotspot under mouse
    hoverInvItem: null,
    message: '',
    messageTimer: 0,
    actionLine: '',         // top-of-UI action description ("Use rope with door")

    // ── Dialog ───────────────────────────────
    dialog: {
        active: false,
        lines: [],          // {speaker, text} objects
        currentLine: 0,
        onComplete: null,
    },

    // ── Cutscene ─────────────────────────────
    cutscene: {
        active: false,
        steps: [],
        currentStep: 0,
        stepTimer: 0,
        onComplete: null,
        blackout: 0,        // 0-1 fade value
    },

    // ── Puzzle Flags ─────────────────────────
    flags: {
        // === Temple ===
        temple_sandBagTaken:    false,
        temple_idolTaken:       false,
        temple_boulderSeen:     false,
        temple_sapitoMet:       false,
        temple_escaped:         false,

        // === University ===
        uni_talkedMarcus:       false,
        uni_missionAccepted:    false,
        uni_gotJournal:         false,

        // === Nepal ===
        nepal_barEntered:       false,
        nepal_metMarion:        false,
        nepal_medallionGiven:   false,
        nepal_belloqAttacked:   false,

        // === Cairo ===
        cairo_basemarketVisited:false,
        cairo_foundSallah:      false,
        cairo_mapRoomOpen:      false,
        cairo_gotStaff:         false,

        // === Well of Souls ===
        wos_caveFound:          false,
        wos_arkFound:           false,
        wos_capturedByNazis:    false,

        // === Ship / Sub ===
        ship_boarded:           false,

        // === Island ===
        island_arkedOpened:     false,
        island_survived:        false,
    },

    // ── Scene-local data ─────────────────────
    // Scenes can store per-scene state here
    sceneData: {},

    // ── Map overlay ──────────────────────────
    travelMap: {
        active: false,
        from: null,
        to: null,
        progress: 0,        // 0 → 1
        onComplete: null,
    },

    // Helper: add item
    addItem: function(itemId) {
        if (this.inventory.indexOf(itemId) === -1) {
            this.inventory.push(itemId);
        }
    },

    // Helper: remove item
    removeItem: function(itemId) {
        var idx = this.inventory.indexOf(itemId);
        if (idx !== -1) {
            this.inventory.splice(idx, 1);
            if (this.selectedItem === itemId) this.selectedItem = null;
        }
    },

    // Helper: has item?
    hasItem: function(itemId) {
        return this.inventory.indexOf(itemId) !== -1;
    },

    // Helper: set flag
    setFlag: function(key, val) {
        if (val === undefined) val = true;
        this.flags[key] = val;
    },

    // Helper: get flag
    flag: function(key) {
        return !!this.flags[key];
    },

    // Helper: show message
    showMessage: function(text) {
        this.message = text;
        this.messageTimer = CONFIG.MESSAGE_DURATION;
    },
};
