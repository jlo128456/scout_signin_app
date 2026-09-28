import React, { useState, useEffect, useRef } from 'react';
import { Settings, ClipboardList, Users, Book, Lock } from 'lucide-react';
import SignInScreen from '../screens/SignInScreen';
import RosterScreen from '../screens/RosterScreen';
import LogScreen from '../screens/LogScreen';
import SetupScreen from '../screens/SetupScreen';
import MasterListScreen from '../screens/MasterListScreen';
import InstructionsModal from '../modals/InstructionsModal';
import { DEMO_DATA } from '../data/demoData';

const ScoutSignIn = () => {
  const [screen, setScreen] = useState('signin');
  const [showInstructions, setShowInstructions] = useState(false);
  const [masterListPinInput, setMasterListPinInput] = useState('');
  const [masterListUnlocked, setMasterListUnlocked] = useState(false);
  const [masterListPinError, setMasterListPinError] = useState('');
  // Demo: always start with the demo scouts/parents so you can sign in straight away.
  // (Not saved to browser storage, so every refresh starts the demo fresh.)
  const [data, setDataRaw] = useState(() => JSON.parse(JSON.stringify(DEMO_DATA)));

  // ---------- Automatic Log ----------
  // Keeps its own record of who is signed in. Whenever that changes (Sign-In tab,
  // Master List, anywhere) a Log entry is added to data.log automatically.
  const signedInRef = useRef(null);

  const readSignedIn = (d) => {
    const map = {};
    Object.entries((d && d.attendance) || {}).forEach(([id, att]) => {
      map[id] = !!(att && att.signedIn);
    });
    return map;
  };

  const logValues = (log) => (Array.isArray(log) ? log : Object.values(log || {}));

  useEffect(() => {
    const current = readSignedIn(data);
    if (signedInRef.current === null) {
      signedInRef.current = current; // first load - nothing to log
      return;
    }
    const before = signedInRef.current;
    signedInRef.current = current;

    const ids = new Set([...Object.keys(before), ...Object.keys(current)]);
    const children = data.children || [];
    const existing = logValues(data.log);
    const now = new Date();
    const newEntries = [];

    ids.forEach((id) => {
      const wasIn = !!before[id];
      const isIn = !!current[id];
      if (wasIn === isIn) return;

      const status = isIn ? 'Signed In' : 'Signed Out';
      // Skip if a screen already logged this same change in the last few seconds
      const already = existing.some((e) =>
        String(e.scoutId || e.childId) === String(id) &&
        e.status === status &&
        now - new Date(e.timestamp) < 5000
      );
      if (already) return;

      const att = (data.attendance || {})[id] || {};
      const child = children.find((c) => String(c.id) === String(id));
      newEntries.push({
        id: `log_${now.getTime()}_${id}`,
        scoutId: child ? child.id : id,
        childId: child ? child.id : id,
        childName: child ? child.name : (att.childName || ''),
        status,
        guardian: isIn
          ? (att.signInGuardian || att.guardian || '')
          : (att.signOutGuardian || att.guardian || ''),
        timestamp: now.toISOString(),
      });
    });

    if (newEntries.length === 0) return;

    setDataRaw((d) => {
      let log = d.log;
      if (Array.isArray(log)) {
        log = [...log, ...newEntries];
      } else {
        log = { ...(log || {}) };
        newEntries.forEach((e) => { log[e.id] = e; });
      }
      return { ...d, log };
    });
  }, [data]);

  // Screens call setData exactly as before. Always hand React a fresh copy so the
  // change is picked up even if a screen edited the old object in place.
  const setData = (update) => {
    setDataRaw((prev) => {
      const next = typeof update === 'function' ? update(prev) : update;
      if (!next || typeof next !== 'object') return next;
      return { ...next, attendance: { ...(next.attendance || {}) } };
    });
  };

  const [selectedChildFromList, setSelectedChildFromList] = useState(null);

  // Clear out any old empty data the previous version saved in the browser
  useEffect(() => {
    try { localStorage.removeItem('scout_data'); } catch (e) {}
  }, []);

  // Picking a child from the Master List jumps to the Sign-In tab
  useEffect(() => {
    if (selectedChildFromList) {
      setScreen('signin');
    }
  }, [selectedChildFromList]);

  const handleMasterListPinVerify = () => {
    if (masterListPinInput !== '1234') {
      setMasterListPinError('❌ Incorrect PIN');
      setMasterListPinInput('');
      return;
    }
    setMasterListUnlocked(true);
    setMasterListPinInput('');
    setMasterListPinError('');
  };

  const handleScreenChange = (screenName) => {
    // Leaving the Master List locks it again and clears the PIN box
    if (screen === 'masterlist' && screenName !== 'masterlist') {
      setMasterListUnlocked(false);
      setMasterListPinInput('');
      setMasterListPinError('');
    }

    // Same as Setup: switch to the tab; the lock card shows in the page until unlocked
    setScreen(screenName);
  };

  const getScreen = () => {
    switch(screen) {
      case 'signin': return SignInScreen;
      case 'masterlist': return MasterListScreen;
      case 'roster': return RosterScreen;
      case 'log': return LogScreen;
      case 'setup': return SetupScreen;
      default: return SignInScreen;
    }
  };

  const ScreenComponent = getScreen();

  return (
    <div
      className="flex flex-col"
      style={{
        height: '100dvh',          // exactly the visible screen height (phones, tablets, desktop)
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'rgb(5,46,22)'
      }}
    >
      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={showInstructions}
        setIsOpen={setShowInstructions}
      />

      {/* Watermark Background Image */}
      <img
        src={process.env.PUBLIC_URL + '/scout-badge.png'}
        alt="watermark"
        className="fixed inset-0 w-full h-full object-contain opacity-5 pointer-events-none z-0"
        style={{ transform: 'rotate(-45deg)', opacity: 0.08 }}
      />

      {/* Header - one compact row */}
      <div
        className="flex items-center justify-between gap-2 px-3 py-2"
        style={{ flexShrink: 0, position: 'relative', zIndex: 10, paddingTop: 'max(8px, env(safe-area-inset-top))' }}
      >
        <div className="flex items-center gap-2" style={{ minWidth: 0 }}>
          <img
            src={process.env.PUBLIC_URL + '/scout-badge.png'}
            alt="Scout Badge"
            style={{ width: 'clamp(32px, 8vw, 48px)', height: 'clamp(32px, 8vw, 48px)', flexShrink: 0 }}
          />
          <div style={{ minWidth: 0 }}>
            <h1 className="font-bold text-white leading-tight" style={{ fontSize: 'clamp(16px, 4.5vw, 24px)', color: '#fff' }}>Scout Sign-In</h1>
            <p className="leading-tight" style={{ fontSize: 'clamp(10px, 2.5vw, 13px)', color: '#d1d5db' }}>Professional attendance tracking</p>
          </div>
        </div>
        <button
          onClick={() => setShowInstructions(true)}
          className="rounded-lg font-semibold"
          style={{ backgroundColor: '#2563eb', color: '#fff', padding: '6px 10px', fontSize: 'clamp(12px, 3vw, 14px)', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          📋 <span className="hidden sm:inline">Instructions</span>
        </button>
      </div>

      {/* Main Content - fills the space between header and tabs, scrolls only if needed */}
      <div
        className="px-2 md:px-4"
        style={{ flex: '1 1 auto', minHeight: 0, overflowY: 'auto', overflowX: 'hidden', position: 'relative', zIndex: 1, WebkitOverflowScrolling: 'touch' }}
      >
        <div className="mx-auto" style={{ maxWidth: '900px', width: '100%' }}>
        {/* Screen Content - Master List shows its lock card in the page until unlocked (same as Setup) */}
        {screen === 'masterlist' && !masterListUnlocked ? (
          <div className="flex justify-center mt-8 px-2" style={{ position: 'relative', zIndex: 10 }}>
            <div
              className="rounded-lg shadow-lg w-full max-w-md p-6 text-center"
              style={{ backgroundColor: '#ffffff', opacity: 1, boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}
            >
              <Lock className="mx-auto mb-3 text-red-600" size={26} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Master List Protected</h2>
              <p className="text-gray-600 mb-6">Enter PIN to access master list</p>

              <input
                type="password"
                placeholder="Enter PIN"
                value={masterListPinInput}
                onChange={(e) => {
                  setMasterListPinInput(e.target.value);
                  setMasterListPinError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleMasterListPinVerify();
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                style={{ boxSizing: 'border-box', backgroundColor: '#ffffff', color: '#111827' }}
                autoFocus
              />

              {masterListPinError && (
                <p className="text-red-600 text-sm font-semibold mb-4">{masterListPinError}</p>
              )}

              <button
                onClick={handleMasterListPinVerify}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
              >
                Unlock
              </button>
            </div>
          </div>
        ) : (
          ScreenComponent && (
            <ScreenComponent
              data={data}
              setData={setData}
              selectedChild={selectedChildFromList}
              onChildSelected={setSelectedChildFromList}
            />
          )
        )}
        </div>
      </div>

      {/* Navigation - always at the bottom, never covers the page */}
      <div
        className="flex gap-1 justify-center px-2 pt-2"
        style={{
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
          paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
          width: '100%'
        }}
      >
        <button
          onClick={() => {
            handleScreenChange('signin');
          }}
          className={`rounded-lg flex items-center gap-1 font-semibold transition-colors ${
            screen === 'signin'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          style={{
            padding: 'clamp(6px, 2vw, 12px) clamp(8px, 2.5vw, 16px)',
            fontSize: 'clamp(11px, 2.5vw, 14px)',
            whiteSpace: 'nowrap'
          }}
        >
          📱 <span className="hidden sm:inline">Sign-In</span>
        </button>

        <button
          onClick={() => handleScreenChange('masterlist')}
          className={`rounded-lg flex items-center gap-1 font-semibold transition-colors ${
            screen === 'masterlist'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          style={{
            padding: 'clamp(6px, 2vw, 12px) clamp(8px, 2.5vw, 16px)',
            fontSize: 'clamp(11px, 2.5vw, 14px)',
            whiteSpace: 'nowrap'
          }}
        >
          <Book style={{ width: 'clamp(14px, 3vw, 20px)', height: 'clamp(14px, 3vw, 20px)' }} />
          <span className="hidden sm:inline">List</span> {!masterListUnlocked && '🔒'}
        </button>

        <button
          onClick={() => {
            handleScreenChange('roster');
          }}
          className={`rounded-lg flex items-center gap-1 font-semibold transition-colors ${
            screen === 'roster'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          style={{
            padding: 'clamp(6px, 2vw, 12px) clamp(8px, 2.5vw, 16px)',
            fontSize: 'clamp(11px, 2.5vw, 14px)',
            whiteSpace: 'nowrap'
          }}
        >
          <Users style={{ width: 'clamp(14px, 3vw, 20px)', height: 'clamp(14px, 3vw, 20px)' }} />
          <span className="hidden sm:inline">Roster</span>
        </button>

        <button
          onClick={() => {
            handleScreenChange('log');
          }}
          className={`rounded-lg flex items-center gap-1 font-semibold transition-colors ${
            screen === 'log'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          style={{
            padding: 'clamp(6px, 2vw, 12px) clamp(8px, 2.5vw, 16px)',
            fontSize: 'clamp(11px, 2.5vw, 14px)',
            whiteSpace: 'nowrap'
          }}
        >
          <ClipboardList style={{ width: 'clamp(14px, 3vw, 20px)', height: 'clamp(14px, 3vw, 20px)' }} />
          <span className="hidden sm:inline">Log</span>
        </button>

        <button
          onClick={() => {
            handleScreenChange('setup');
          }}
          className={`rounded-lg flex items-center gap-1 font-semibold transition-colors ${
            screen === 'setup'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          style={{
            padding: 'clamp(6px, 2vw, 12px) clamp(8px, 2.5vw, 16px)',
            fontSize: 'clamp(11px, 2.5vw, 14px)',
            whiteSpace: 'nowrap'
          }}
        >
          <Settings style={{ width: 'clamp(14px, 3vw, 20px)', height: 'clamp(14px, 3vw, 20px)' }} />
          <span className="hidden sm:inline">Setup</span>
        </button>
      </div>
    </div>
  );
};

export default ScoutSignIn;