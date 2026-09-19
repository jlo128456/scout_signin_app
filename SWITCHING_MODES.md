# Scout Sign-In App - Switching Between Demo & Production Modes

## 🎛️ Easy Mode Toggle

The app now has a **single configuration flag** that switches between:
- **DEMO MODE** - Non-persistent, master list, instructions, PIN protection
- **PRODUCTION MODE** - Persistent storage, normal admin access, clean interface

---

## ⚡ Quick Switch (30 seconds)

### Step 1: Open Configuration File
```
src/config/demoConfig.js
```

### Step 2: Change One Line
```javascript
// FOR DEMO MODE:
export const DEMO_MODE = true;

// FOR PRODUCTION MODE:
export const DEMO_MODE = false;
```

### Step 3: Restart App
```bash
npm start
```

That's it! ✨

---

## 📊 Feature Comparison

| Feature | Demo Mode | Production Mode |
|---------|-----------|-----------------|
| **Storage** | In-memory (non-persistent) | localStorage (persistent) |
| **Master List Tab** | ✅ Visible | ❌ Hidden |
| **Instructions Popup** | ✅ Shows on startup | ❌ Hidden |
| **Admin PIN** | ✅ Required (1234) | ❌ No PIN |
| **Demo Banner** | ✅ Yellow banner | ❌ Hidden |
| **Help Button** | ✅ Visible | ❌ Hidden |
| **Data Reset** | ✅ On page refresh | ❌ Never (persistent) |
| **Use Case** | Testing, demos, training | Real usage, production |

---

## 🔧 Configuration File Locations

### Main Toggle
```
src/config/demoConfig.js
Line 14: export const DEMO_MODE = true;  // Change this
```

### Related Files (No changes needed - they auto-detect)
- `src/components/ScoutSignIn-Demo.js` - Reads DEMO_MODE automatically
- `src/App.js` - Routes to ScoutSignIn-Demo
- All screens and modals - Disabled when DEMO_MODE = false

---

## 📋 What Changes When You Switch

### Switching FROM Demo TO Production (DEMO_MODE = false)

✅ **Enabled:**
- localStorage persistence (data survives page refresh)
- Normal admin access (no PIN required)
- Clean interface (no instructions/banner)

❌ **Disabled:**
- Master list tab
- Instructions popup
- Admin PIN modal
- Demo banner
- Help button
- Demo data

### Switching FROM Production TO Demo (DEMO_MODE = true)

✅ **Enabled:**
- Non-persistent storage (data resets on refresh)
- Master list tab (numbers 1-20)
- Instructions popup (on startup)
- Admin PIN protection (1234)
- Demo banner (yellow)
- Help button
- Pre-loaded demo data

❌ **Disabled:**
- localStorage (ignored)
- Any existing localStorage data (fresh demo data loads)

---

## 💾 Data Handling

### Demo Mode
```javascript
// Non-persistent - in-memory only
const [data, setData] = useState(() => {
  return JSON.parse(JSON.stringify(DEMO_DATA));  // Always fresh
});

// No localStorage used
```

### Production Mode
```javascript
// Persistent - uses localStorage
const [data, setData] = useState(() => {
  const saved = localStorage.getItem('scout_data');
  return saved ? JSON.parse(saved) : {/*default structure*/};
});

// Auto-saves to localStorage whenever data changes
useEffect(() => {
  localStorage.setItem('scout_data', JSON.stringify(data));
}, [data]);
```

---

## 🚀 Complete Step-by-Step Guide

### To Use for Testing (Demo Mode)

**Current Status:** ✅ Already set to demo mode

1. Just run the app:
   ```bash
   cd scout_signin_app_demo
   npm install  # first time only
   npm start
   ```

2. Explore all features with demo data

3. Refresh page to reset

### To Use for Production

1. Edit `src/config/demoConfig.js`:
   ```javascript
   export const DEMO_MODE = false;  // ← Change this line
   ```

2. Restart the app:
   ```bash
   npm start
   ```

3. Now running in production mode:
   - No instructions popup
   - No master list tab
   - No admin PIN needed
   - Data persists in localStorage

4. Use normally - data saves automatically

### To Switch Back to Demo

1. Edit `src/config/demoConfig.js`:
   ```javascript
   export const DEMO_MODE = true;  // ← Change this line back
   ```

2. Restart the app:
   ```bash
   npm start
   ```

3. Demo mode is back with all features

---

## 🔐 Admin Access Difference

### In Demo Mode
```
User clicks Setup tab
  ↓
PIN modal appears
  ↓
Enter: 1234
  ↓
Setup unlocked
```

### In Production Mode
```
User clicks Setup tab
  ↓
Setup opens immediately
  ↓
No PIN required
```

---

## 📱 Interface Changes

### Demo Mode (All Features)
```
┌─────────────────────────────────┐
│ 🏕️ Scout Sign-In                │
│ 🎬 DEMO MODE - Data resets...   │ ← Demo banner
├─────────────────────────────────┤
│ Content                          │
├─────────────────────────────────┤
│ [Sign-In] [Master List] [Roster]│ ← Master list visible
│ [Log] [Setup]                   │
├─────────────────────────────────┤
│ ✨ Demo info...                  │ ← Info banner
├─────────────────────────────────┤
│ [❓ Show Instructions]           │ ← Help button
└─────────────────────────────────┘
```

### Production Mode (Clean)
```
┌─────────────────────────────────┐
│ 🏕️ Scout Sign-In                │
├─────────────────────────────────┤
│ Content                          │
├─────────────────────────────────┤
│ [Sign-In] [Roster] [Log] [Setup]│ ← No Master List
│                                  │
├─────────────────────────────────┤
│ (No banners or help buttons)     │
└─────────────────────────────────┘
```

---

## ✅ Verification Checklist

### After Switching to Production Mode

- [ ] Edit `src/config/demoConfig.js` line 14
- [ ] Set `DEMO_MODE = false`
- [ ] Restart app (`npm start`)
- [ ] Verify: No yellow demo banner
- [ ] Verify: Master List tab is gone
- [ ] Verify: Setup opens without PIN
- [ ] Verify: No instructions popup
- [ ] Test: Sign in a scout
- [ ] Test: Refresh page
- [ ] Verify: Data persists after refresh ✅

### After Switching Back to Demo Mode

- [ ] Edit `src/config/demoConfig.js` line 14
- [ ] Set `DEMO_MODE = true`
- [ ] Restart app (`npm start`)
- [ ] Verify: Yellow demo banner appears
- [ ] Verify: Master List tab visible
- [ ] Verify: Instructions popup shows
- [ ] Verify: Setup requires PIN (1234)
- [ ] Test: Sign in a scout
- [ ] Test: Refresh page
- [ ] Verify: Data resets to demo defaults ✅

---

## 🔍 Configuration Details

### Demo Settings (src/config/demoConfig.js)
```javascript
DEMO_SETTINGS = {
  showInstructionsOnLoad: true,     // Auto-show help on startup
  showMasterListTab: true,          // Display master list tab
  showDemoBanner: true,             // Show "DEMO MODE" banner
  adminPin: '1234',                 // PIN for setup access
  nonPersistent: true,              // Don't save to localStorage
}
```

### Production Settings (src/config/demoConfig.js)
```javascript
PRODUCTION_SETTINGS = {
  useLocalStorage: true,            // Save to localStorage
  showMasterListTab: false,         // Hide master list tab
  showInstructionsOnLoad: false,    // No popup on startup
  showDemoBanner: false,            // No demo banner
}
```

All these are automatically applied based on `DEMO_MODE` flag.

---

## 🔄 Deployment Workflow

### For Demonstration/Testing

1. `export const DEMO_MODE = true;`
2. `npm start`
3. Use master list to find scouts quickly
4. Show instructions to stakeholders
5. Use PIN to access admin features
6. Refresh to reset for next demo

### For Production Deployment

1. `export const DEMO_MODE = false;`
2. `npm run build` (creates optimized production build)
3. Deploy `build/` folder to hosting
4. Users experience production app with persistence
5. No demo features visible

---

## 🆘 Troubleshooting

### Master List tab still showing after switching to production?
- Make sure you edited `src/config/demoConfig.js` correctly
- Verify line 14 says: `export const DEMO_MODE = false;`
- Restart the app (stop with Ctrl+C, run `npm start` again)
- Clear browser cache (Ctrl+Shift+Delete)

### Data not persisting in production mode?
- Verify `DEMO_MODE = false` in config
- Check browser allows localStorage
- Try in a different browser
- Check browser console for errors (F12)

### Admin PIN still required in production?
- Verify `DEMO_MODE = false` in config
- Hard refresh (Ctrl+Shift+R)
- Restart app and browser

### Data not resetting in demo mode?
- Verify `DEMO_MODE = true` in config
- Make sure you're hitting refresh, not reload
- Check browser isn't caching data
- Try Ctrl+Shift+R for hard refresh

---

## 📝 Code Examples

### To Check Current Mode in Your Code

```javascript
import { DEMO_MODE } from './config/demoConfig';

if (DEMO_MODE) {
  console.log('Running in DEMO mode');
} else {
  console.log('Running in PRODUCTION mode');
}
```

### To Add Custom Feature Based on Mode

```javascript
import { DEMO_MODE, DEMO_SETTINGS } from './config/demoConfig';

// Only show master list in demo mode
DEMO_MODE && DEMO_SETTINGS.showMasterListTab && (
  <MasterListTab />
)
```

---

## 🎯 Best Practices

### For Demo Mode
- ✅ Use for presentations
- ✅ Use for training
- ✅ Use for feature testing
- ✅ Refresh between sessions
- ❌ Don't use for real data entry

### For Production Mode
- ✅ Use for real scout operations
- ✅ Keep data saved
- ✅ User-managed admin access
- ✅ Regular backups
- ❌ Don't switch to demo (data loss)

---

## 🚀 Summary

| Action | How | Time |
|--------|-----|------|
| **Switch to Production** | Edit 1 line in config | 30 sec |
| **Switch back to Demo** | Edit 1 line in config | 30 sec |
| **Deploy Production** | Run `npm run build` | 1 min |
| **Verify Changes** | Check checklist above | 2 min |

That's it! The toggle is that easy. 🎉

---

## 📞 Need More Help?

- **Quick facts?** → QUICK_REFERENCE.md
- **Setup help?** → SETUP_INSTRUCTIONS.md
- **Full guide?** → DEMO_GUIDE.md
- **Data info?** → DATA_STRUCTURE.md
- **Navigation?** → README.md
