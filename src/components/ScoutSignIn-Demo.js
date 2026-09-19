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
  const [showInstructions, setShowInstructions] = useState(DEMO_MODE && DEMO_SETTINGS.showInstructionsOnLoad);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [data, setData] = useState(() => {
    if (DEMO_MODE) {
      // Demo mode: Initialize with demo data - NOT using localStorage (demo is non-persistent)
      return JSON.parse(JSON.stringify(DEMO_DATA));
    } else {
      // Production mode: Use localStorage for persistence
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

  // Auto-save to localStorage in production mode
  useEffect(() => {
    if (!DEMO_MODE && PRODUCTION_SETTINGS.useLocalStorage) {
      localStorage.setItem('scout_data', JSON.stringify(data));
    }
  }, [data]);

  // Handle selecting a child from the master list
  useEffect(() => {
    if (selectedChildFromList) {
      // Navigate to signin screen and the SignInScreen component will handle the selection
      setScreen('signin');
    }
  }, [selectedChildFromList]);

  const nav = (label, icon, screenName, needsAdmin = false) => 
    React.createElement('button', {
      onClick: () => {
        if (needsAdmin && !adminUnlocked && DEMO_MODE) {
          setShowAdminPin(true);  // Only use PIN in demo mode
        } else {
          setScreen(screenName);
        }
      },
      className: 'px-4 py-2 rounded-lg flex items-center gap-2 font-semibold ' + 
        (screen === screenName ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300') +
        (needsAdmin && !adminUnlocked && DEMO_MODE ? ' opacity-60' : ''),
      title: needsAdmin && !adminUnlocked && DEMO_MODE ? 'Admin PIN required' : '',
    }, icon, label);

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

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-[rgb(5,46,22)]' },
    
    // Watermark Background Image
    React.createElement('img', {
      src: process.env.PUBLIC_URL + '/scout-badge.png',
      alt: 'watermark',
      className: 'fixed inset-0 w-full h-full object-contain opacity-5 pointer-events-none z-0 transform -rotate-45',
      style: { transform: 'rotate(-45deg)', opacity: 0.08 }
    }),
    
    // Instructions Modal (Demo mode only)
    DEMO_MODE && DEMO_SETTINGS.showInstructionsOnLoad && React.createElement(InstructionsModal, {
      isOpen: showInstructions,
      onClose: () => setShowInstructions(false)
    }),

    // Admin PIN Modal (Demo mode only)
    DEMO_MODE && showAdminPin && React.createElement(AdminPinModal, {
      onClose: () => setShowAdminPin(false),
      onSuccess: () => {
        setAdminUnlocked(true);
        setScreen('setup');
      }
    }),

    // Main Content
    React.createElement(
      'div',
      { className: 'max-w-5xl mx-auto p-4' },
      
      // Header
      React.createElement(
        'div',
        { className: 'text-center mb-8 pt-6' },
        React.createElement('img', { 
          src: process.env.PUBLIC_URL + '/scout-badge.png', 
          alt: 'Scout', 
          className: 'w-32 h-32 mx-auto mb-6',
          onError: (e) => {
            e.target.style.display = 'none';
          }
        }),
        React.createElement('h1', { className: 'text-4xl font-bold text-white mb-2' }, 'Scout Sign-In'),
        DEMO_MODE && DEMO_SETTINGS.showDemoBanner && React.createElement('p', { className: 'text-yellow-300 font-bold text-lg' }, '🎬 DEMO MODE - Data resets on refresh'),
        React.createElement('p', { className: 'text-gray-300' }, 'Professional attendance tracking')
      ),

      // Screen Content
      ScreenComponent && React.createElement(ScreenComponent, { 
        data, 
        setData,
        selectedChild: selectedChildFromList,
        onChildSelected: setSelectedChildFromList
      }),

      // Navigation
      React.createElement(
        'div',
        { className: 'flex gap-2 justify-center mt-6 pb-6 flex-wrap' },
        nav('Sign-In', React.createElement('span', null, '📱'), 'signin'),
        DEMO_MODE && DEMO_SETTINGS.showMasterListTab && nav('Master List', React.createElement(Book, { className: 'w-5 h-5' }), 'masterlist'),
        nav('Roster', React.createElement(Users, { className: 'w-5 h-5' }), 'roster'),
        nav('Log', React.createElement(ClipboardList, { className: 'w-5 h-5' }), 'log'),
        nav('Setup', React.createElement(Settings, { className: 'w-5 h-5' }), 'setup', DEMO_MODE),  // Only needs PIN in demo mode
      ),

      // Info Banner (Demo mode only)
      DEMO_MODE && DEMO_SETTINGS.showDemoBanner && React.createElement(
        'div',
        { className: 'mt-6 bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg text-center' },
        React.createElement('p', { className: 'text-yellow-800 font-semibold' }, 
          '✨ This is a fully functional demo. Need help? Check the Instructions modal anytime by refreshing the page.'
        )
      ),

      // Help Button (Demo mode only)
      DEMO_MODE && React.createElement(
        'div',
        { className: 'mt-4 text-center' },
        React.createElement(
          'button',
          {
            onClick: () => setShowInstructions(true),
            className: 'px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700'
          },
          '📋 Show Instructions'
        )
      )
    )
  );
};

export default ScoutSignIn;
