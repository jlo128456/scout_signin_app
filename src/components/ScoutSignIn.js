import React, { useState, useEffect, useRef } from 'react';
import { Settings, ClipboardList, Users, Book, Lock } from 'lucide-react';
import SignInScreen from '../screens/SignInScreen';
import RosterScreen from '../screens/RosterScreen';
import LogScreen from '../screens/LogScreen';
import SetupScreen from '../screens/SetupScreen';
import MasterListScreen from '../screens/MasterListScreen';
import InstructionsModal from '../modals/InstructionsModal';

// ---------- Messages for everyone ----------
// Shows any Setup announcement set to "All Sections (everyone)" at the top of the Sign-In tab
const EveryoneAnnouncements = ({ announcements }) => {
  const everyone = (announcements || []).filter((a) => a && a.type === 'all');
  if (everyone.length === 0) return null;

  return (
    <div className="mb-4 space-y-2" style={{ position: 'relative', zIndex: 10 }}>
      {everyone.map((a) => (
        <div
          key={a.id}
          className="p-4 rounded-lg border-l-4 border-green-500 shadow"
          style={{ backgroundColor: '#f0fdf4' }}
        >
          <h4 className="font-bold text-gray-800">🌍 {a.title || 'Message for everyone'}</h4>
          {a.message && (
            <p className="text-gray-700 text-sm whitespace-pre-wrap mt-1">{a.message}</p>
          )}
          {a.createdAt && !isNaN(new Date(a.createdAt)) && (
            <p className="text-xs text-gray-500 mt-2">
              Posted: {new Date(a.createdAt).toLocaleString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const ScoutSignIn = () => {
  const [screen, setScreen] = useState('signin');
  const [showInstructions, setShowInstructions] = useState(false);

  // Master List PIN protection
  const [masterListPinInput, setMasterListPinInput] = useState('');
  const [masterListUnlocked, setMasterListUnlocked] = useState(false);
  const [masterListPinError, setMasterListPinError] = useState('');

  const [data, setDataRaw] = useState(() => {
    try {
      const saved = localStorage.getItem('scout_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      children: [],
      leaders: [],
      attendance: {},
      schedule: [],
      announcements: [],
      log: {},
    };
  });

  const [selectedChildFromList, setSelectedChildFromList] = useState(null);

  // Save everything (including the Log) so it survives a refresh
  useEffect(() => {
    try {
      localStorage.setItem('scout_data', JSON.stringify(data));
    } catch (e) {}
  }, [data]);

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

  // Picking a child from the Master List jumps to the Sign-In tab
  useEffect(() => {
    if (selectedChildFromList) {
      setScreen('signin');
    }
  }, [selectedChildFromList]);

  // ---------- Master List PIN ----------
  const handleMasterListPinVerify = () => {
    const pin = data.pin || '1234';
    if (masterListPinInput !== pin) {
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

  const navClass = (name) =>
    `px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors ${
      screen === name
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-[rgb(5,46,22)]">
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

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <img
            src={process.env.PUBLIC_URL + '/scout-badge.png'}
            alt="Scout Badge"
            className="w-32 h-32 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-white mb-2">Scout Sign-In</h1>
          <p className="text-gray-300">Professional attendance tracking</p>

          {/* Show Instructions Button */}
          <button
            onClick={() => setShowInstructions(true)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            📋 Show Instructions
          </button>
        </div>

        {/* Messages for everyone - shown at the top of the Sign-In tab */}
        {screen === 'signin' && (
          <EveryoneAnnouncements announcements={data.announcements} />
        )}

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

        {/* Navigation */}
        <div className="flex gap-2 justify-center mt-6 pb-6 flex-wrap" style={{ position: 'relative', zIndex: 10 }}>
          <button onClick={() => handleScreenChange('signin')} className={navClass('signin')}>
            📱 Sign-In
          </button>

          <button onClick={() => handleScreenChange('masterlist')} className={navClass('masterlist')}>
            <Book className="w-5 h-5" /> Master List {!masterListUnlocked && '🔒'}
          </button>

          <button onClick={() => handleScreenChange('roster')} className={navClass('roster')}>
            <Users className="w-5 h-5" /> Roster
          </button>

          <button onClick={() => handleScreenChange('log')} className={navClass('log')}>
            <ClipboardList className="w-5 h-5" /> Log
          </button>

          <button onClick={() => handleScreenChange('setup')} className={navClass('setup')}>
            <Settings className="w-5 h-5" /> Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoutSignIn;
