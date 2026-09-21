import React, { useState, useEffect } from 'react';
import { Settings, ClipboardList, Users } from 'lucide-react';
import SignInScreen from '../screens/SignInScreen';
import RosterScreen from '../screens/RosterScreen';
import LogScreen from '../screens/LogScreen';
import SetupScreen from '../screens/SetupScreen';
import InstructionsModal from '../modals/InstructionsModal';

const ScoutSignIn = () => {
  const [screen, setScreen] = useState('signin');
  const [showInstructions, setShowInstructions] = useState(false);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('scout_data');
    return saved ? JSON.parse(saved) : {
      children: [],
      leaders: [],
      attendance: {},
      schedule: [],
      announcements: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('scout_data', JSON.stringify(data));
  }, [data]);

  const getScreen = () => {
    switch(screen) {
      case 'signin': return SignInScreen;
      case 'roster': return RosterScreen;
      case 'log': return LogScreen;
      case 'setup': return SetupScreen;
      default: return SignInScreen;
    }
  };

  const ScreenComponent = getScreen();

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

        {/* Screen Content */}
        {ScreenComponent && (
          <ScreenComponent data={data} setData={setData} />
        )}

        {/* Navigation */}
        <div className="flex gap-2 justify-center mt-6 pb-6 flex-wrap">
          <button
            onClick={() => setScreen('signin')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors ${
              screen === 'signin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            📱 Sign-In
          </button>

          <button
            onClick={() => setScreen('roster')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors ${
              screen === 'roster'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <Users className="w-5 h-5" /> Roster
          </button>

          <button
            onClick={() => setScreen('log')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors ${
              screen === 'log'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <ClipboardList className="w-5 h-5" /> Log
          </button>

          <button
            onClick={() => setScreen('setup')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-colors ${
              screen === 'setup'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <Settings className="w-5 h-5" /> Setup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoutSignIn;
