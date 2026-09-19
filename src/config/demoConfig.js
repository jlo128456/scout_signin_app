/**
 * Demo Mode Configuration
 * 
 * Set DEMO_MODE to true for non-persistent demo with master list
 * Set DEMO_MODE to false for production with localStorage persistence
 * 
 * Features Enabled in DEMO MODE:
 *   - Non-persistent in-memory storage
 *   - Master list tab (numbers 1-20)
 *   - Instructions popup on startup
 *   - Admin PIN protection
 *   - Pre-loaded demo data
 *   - Data resets on page refresh
 * 
 * Features in PRODUCTION MODE:
 *   - localStorage persistence (data saved)
 *   - No master list tab
 *   - No instructions popup
 *   - Normal admin access
 *   - User data maintained
 */

export const DEMO_MODE = true;  // ⭐ TOGGLE THIS TO SWITCH MODES

/**
 * ============================================
 * HOW TO SWITCH MODES
 * ============================================
 * 
 * FOR DEMO (Testing & Demonstrations):
 *   Change line above to: export const DEMO_MODE = true;
 *   - Non-persistent storage
 *   - Master list enabled
 *   - Instructions popup shows
 *   - All demo features active
 * 
 * FOR PRODUCTION (Real Usage):
 *   Change line above to: export const DEMO_MODE = false;
 *   - localStorage saves data
 *   - Master list hidden
 *   - No instructions popup
 *   - No demo banner
 *   - Original app behavior
 * 
 * Then restart: npm start
 * ============================================
 */

// Demo mode settings (only used if DEMO_MODE is true)
export const DEMO_SETTINGS = {
  showInstructionsOnLoad: true,    // Show instructions popup on startup
  showMasterListTab: true,         // Show master list tab
  showDemoBanner: true,            // Show "DEMO MODE" banner
  adminPin: '1234',                // Admin PIN for setup
  nonPersistent: true,             // Don't use localStorage
};

// Production mode settings (only used if DEMO_MODE is false)
export const PRODUCTION_SETTINGS = {
  useLocalStorage: true,           // Use browser localStorage
  showMasterListTab: false,        // Hide master list tab
  showInstructionsOnLoad: false,   // No instructions popup
  showDemoBanner: false,           // No demo banner
};

export default DEMO_MODE;
