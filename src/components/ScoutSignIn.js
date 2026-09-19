import React, { useState, useEffect } from 'react';
import { Settings, ClipboardList, Users } from 'lucide-react';
import SignInScreen from '../screens/SignInScreen';
import RosterScreen from '../screens/RosterScreen';
import LogScreen from '../screens/LogScreen';
import SetupScreen from '../screens/SetupScreen';

const ScoutSignIn = () => {
  const [screen, setScreen] = useState('signin');
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

  const nav = (label, icon, screenName) => React.createElement('button', {
    onClick: () => setScreen(screenName),
    className: 'px-4 py-2 rounded-lg flex items-center gap-2 font-semibold ' + (screen === screenName ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'),
  }, icon, label);

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

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-[rgb(5,46,22)]' },
    
    // Watermark Background
    React.createElement(
      'div',
      { className: 'watermark' },
      React.createElement('div', { className: 'watermark-container' }, '⛺')
    ),
    
    React.createElement(
      'div',
      { className: 'max-w-5xl mx-auto p-4' },
      React.createElement(
        'div',
        { className: 'text-center mb-8 pt-6' },
        React.createElement('h1', { className: 'text-4xl font-bold text-white mb-2' }, '⛺ Scout Sign-In'),
        React.createElement('p', { className: 'text-gray-300' }, 'Professional attendance tracking')
      ),

      React.createElement(ScreenComponent, { data, setData }),

      React.createElement(
        'div',
        { className: 'flex gap-2 justify-center mt-6 pb-6 flex-wrap' },
        nav('Sign-In', React.createElement('span', null, '📱'), 'signin'),
        nav('Roster', React.createElement(Users, { className: 'w-5 h-5' }), 'roster'),
        nav('Log', React.createElement(ClipboardList, { className: 'w-5 h-5' }), 'log'),
        nav('Setup', React.createElement(Settings, { className: 'w-5 h-5' }), 'setup'),
      ),
    )
  );
};

export default ScoutSignIn;