import React, { useState, useEffect } from 'react';
import { Settings, ClipboardList, Users, Book } from 'lucide-react';
import SignInScreen from '../screens/SignInScreen';
import RosterScreen from '../screens/RosterScreen';
import LogScreen from '../screens/LogScreen';
import SetupScreen from '../screens/SetupScreen';
import MasterListScreen from '../screens/MasterListScreen';
import InstructionsModal from '../modals/InstructionsModal';
import AdminPinModal from '../modals/AdminPinModal';
import { DEMO_DATA } from '../data/demoData';
import { DEMO_MODE, DEMO_SETTINGS, PRODUCTION_SETTINGS } from '../config/demoConfig';

const ScoutSignIn = () => {
  const [screen, setScreen] = useState('signin');
  const [showInstructions, setShowInstructions] = useState(false);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [data, setData] = useState(() => {
    if (DEMO_MODE) {
      return JSON.parse(JSON.stringify(DEMO_DATA));
    } else {
      const saved = localStorage.getItem('scout_data');
      return saved ? JSON.parse(saved) : {
        children: [],
        leaders: [],
        attendance: {},
        schedule: [],
        announcements: [],
      };
    }
  });
  const [selectedChildFromList, setSelectedChildFromList] = useState(null);

  useEffect(() => {
    if (!DEMO_MODE && PRODUCTION_SETTINGS.useLocalStorage) {
      localStorage.setItem('scout_data', JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (selectedChildFromList) {
      setScreen('signin');
    }
  }, [selectedChildFromList]);

  const handleScreenChange = (screenName) => {
    if (screenName === 'setup' && !adminUnlocked && DEMO_MODE) {
      setShowAdminPin(true);
    } else {
      setScreen(screenName);
    }
  };

  const getScreen = () => {
    switch(screen) {
      case 'signin': return SignInScreen;
      case 'masterlist': return MasterListScreen;
      case 'roster': return RosterScreen;
      case 'log': return LogScreen;
      case 'setup': return adminUnlocked ? SetupScreen : null;
      default: return SignInScreen;
    }
  };

  const ScreenComponent = getScreen();

  const isSetupLocked = !adminUnlocked && DEMO_MODE;

  return (
    <div className="min-h-screen bg-[rgb(5,46,22)]">
      {/* Watermark Background Image */}
      <img
        src={process.env.PUBLIC_URL + '/scout-badge.png'}
        alt="watermark"
        className="fixed inset-0 w-full h-full object-contain opacity-5 pointer-events-none z-0"
        style={{ transform: 'rotate(-45deg)', opacity: 0.08 }}
      />

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={showInstructions}
        setIsOpen={setShowInstructions}
      />

      {/* Admin PIN Modal */}
      {DEMO_MODE && showAdminPin && (
        <AdminPinModal
          onClose={() => setShowAdminPin(false)}
          onSuccess={() => {
            setAdminUnlocked(true);
            setScreen('setup');
          }}
        />
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <img
            src={process.env.PUBLIC_URL + '/scout-badge.png'}
            alt="Scout"
            className="w-32 h-32 mx-auto mb-6"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="text-4xl font-bold text-white mb-2">Scout Sign-In</h1>
          {DEMO_MODE && DEMO_SETTINGS.showDemoBanner && (
            <p className="text-yellow-300 font-bold text-lg">
              🎬 DEMO MODE - Data resets on refresh
            </p>
          )}
          <p className="text-gray-300">Professional attendance tracking</p>

          {/* Show Instructions Button */}
          <button
            onClick={() => setShowInstructions(true)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            📋 Show Instructions
          </button>
        </div>

        {/* Screen Content */}
        {ScreenComponent && (
          <ScreenComponent
            data={data}
            setData={setData}
            selectedChild={selectedChildFromList}
            onChildSelected={setSelectedChildFromList}
          />
        )}

        {/* Navigation */}
        <div className="flex gap-2 justify-center mt-6 pb-6 flex-wrap">
          <button
            onClick={() => handleScreenChange('signin')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors ${
              screen === 'signin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            📱 Sign-In
          </button>

          {DEMO_MODE && DEMO_SETTINGS.showMasterListTab && (
            <button
              onClick={() => handleScreenChange('masterlist')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors ${
                screen === 'masterlist'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <Book className="w-5 h-5" /> Master List
            </button>
          )}

          <button
            onClick={() => handleScreenChange('roster')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors ${
              screen === 'roster'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <Users className="w-5 h-5" /> Roster
          </button>

          <button
            onClick={() => handleScreenChange('log')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors ${
              screen === 'log'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <ClipboardList className="w-5 h-5" /> Log
          </button>

          <button
            onClick={() => handleScreenChange('setup')}
            disabled={isSetupLocked}
            title={isSetupLocked ? 'Admin PIN required' : ''}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors ${
              screen === 'setup'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } ${isSetupLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <Settings className="w-5 h-5" /> Setup
          </button>
        </div>

        {/* Info Banner */}
        {DEMO_MODE && DEMO_SETTINGS.showDemoBanner && (
          <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg text-center">
            <p className="text-yellow-800 font-semibold">
              ✨ This is a fully functional demo. Click "Show Instructions" in the header for help!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoutSignIn;