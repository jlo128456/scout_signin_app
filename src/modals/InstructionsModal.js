import React, { useState } from 'react';
import { X } from 'lucide-react';

const InstructionsModal = ({ isOpen, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return React.createElement(
    'div',
    { 
      // SOLID MODAL - Always on top, fixed position
      className: 'fixed top-0 right-0 w-full md:w-1/2 h-screen md:h-[95vh] z-50 md:rounded-l-xl overflow-hidden shadow-2xl flex flex-col'
    },
    
    // Header - SOLID, doesn't move
    React.createElement(
      'div',
      { className: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex-shrink-0 flex justify-between items-center' },
      React.createElement('h2', { className: 'text-2xl font-bold' }, '📋 Instructions'),
      React.createElement(
        'div',
        { className: 'flex gap-2' },
        React.createElement(
          'button',
          {
            onClick: () => setIsMinimized(!isMinimized),
            className: 'bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded text-sm font-bold'
          },
          isMinimized ? '↓ Expand' : '↑ Minimize'
        ),
        React.createElement(
          'button',
          {
            onClick: onClose,
            className: 'bg-red-500 hover:bg-red-600 text-white p-2 rounded'
          },
          React.createElement(X, { className: 'w-5 h-5' })
        )
      )
    ),

    // Content - SCROLLABLE
    !isMinimized && React.createElement(
      'div',
      { className: 'flex-1 overflow-y-auto bg-white p-6 space-y-6' },
      
      // Welcome Section
      React.createElement(
        'div',
        null,
        React.createElement('h3', { className: 'text-xl font-bold text-blue-600 mb-3' }, '👋 Welcome to Scout Sign-In Demo'),
        React.createElement('p', { className: 'text-gray-700 leading-relaxed' }, 'This is a fully functional demo of the Scout Sign-In system. You can explore all features with demo data or add your own information.')
      ),

      // How to Use
      React.createElement(
        'div',
        null,
        React.createElement('h3', { className: 'text-xl font-bold text-blue-600 mb-3' }, '🚀 How to Use'),
        React.createElement('ol', { className: 'text-gray-700 space-y-2 list-decimal list-inside' },
          React.createElement('li', null, 'Click on a scout from the Master List OR'),
          React.createElement('li', null, 'Enter a parent\'s phone number to find their child'),
          React.createElement('li', null, 'Click "Sign In" to record attendance'),
          React.createElement('li', null, 'View the Log tab to see all sign-in records'),
          React.createElement('li', null, 'Use Setup tab to add leaders, manage settings, and post announcements')
        )
      ),

      // Phone Numbers Section
      React.createElement(
        'div',
        { className: 'bg-green-50 border-2 border-green-300 p-4 rounded-lg' },
        React.createElement('h3', { className: 'text-lg font-bold text-green-600 mb-3' }, '📱 Parent Phone Numbers to Use'),
        React.createElement('p', { className: 'text-gray-700 mb-3 text-sm' }, 'Use ANY of these phone numbers to find demo scouts:'),
        React.createElement(
          'div',
          { className: 'space-y-2' },
          React.createElement('p', { className: 'text-sm text-gray-700' }, '🟢 <strong>Joeys:</strong> 0412345601, 0412345602, 0412345603, 0412345604, 0412345605'),
          React.createElement('p', { className: 'text-sm text-gray-700' }, '🔵 <strong>Cubs:</strong> 0412345606, 0412345607, 0412345608, 0412345609, 0412345610'),
          React.createElement('p', { className: 'text-sm text-gray-700' }, '🟡 <strong>Scouts:</strong> 0412345611, 0412345612, 0412345613, 0412345614, 0412345615'),
          React.createElement('p', { className: 'text-sm text-gray-700' }, '🔴 <strong>Venturers:</strong> 0412345616, 0412345617, 0412345618, 0412345619, 0412345620')
        ),
        React.createElement('p', { className: 'text-xs text-gray-500 mt-3' }, '✅ Just type the last 9 digits (e.g., "412345601")')
      ),

      // Admin Section
      React.createElement(
        'div',
        { className: 'bg-purple-50 border-2 border-purple-300 p-4 rounded-lg' },
        React.createElement('h3', { className: 'text-lg font-bold text-purple-600 mb-2' }, '🔐 Admin Access'),
        React.createElement('p', { className: 'text-gray-700 text-sm mb-2' }, 'To access the Admin section:'),
        React.createElement('p', { className: 'text-gray-700 text-sm' }, '• PIN: <strong>1234</strong>'),
        React.createElement('p', { className: 'text-gray-700 text-sm' }, '• Use in any tab to unlock admin features')
      ),

      // Features
      React.createElement(
        'div',
        null,
        React.createElement('h3', { className: 'text-lg font-bold text-blue-600 mb-3' }, '✨ Features'),
        React.createElement('ul', { className: 'text-gray-700 space-y-2' },
          React.createElement('li', null, '✅ Master List - View all scouts'),
          React.createElement('li', null, '✅ Sign-In Screen - Mark attendance by phone'),
          React.createElement('li', null, '✅ Roster - View scouts by section'),
          React.createElement('li', null, '✅ Log - See all sign-in/out records'),
          React.createElement('li', null, '✅ Export to Excel - Download attendance data'),
          React.createElement('li', null, '✅ Announcements - Post messages for parents'),
          React.createElement('li', null, '✅ Persistent Storage - Data saves automatically')
        )
      ),

      // Messages Feature
      React.createElement(
        'div',
        { className: 'bg-blue-50 border-2 border-blue-300 p-4 rounded-lg' },
        React.createElement('h3', { className: 'text-lg font-bold text-blue-600 mb-2' }, '📢 Messages for Parents'),
        React.createElement('p', { className: 'text-gray-700 text-sm mb-2' }, 'In the Setup tab, leaders can:'),
        React.createElement('ul', { className: 'text-gray-700 text-sm space-y-1 ml-4' },
          React.createElement('li', null, '• Write messages for entire sections'),
          React.createElement('li', null, '• Send individual messages to specific children'),
          React.createElement('li', null, '• Parents see them when they sign in their child')
        )
      ),

      // Tips Section
      React.createElement(
        'div',
        { className: 'bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg' },
        React.createElement('h3', { className: 'text-lg font-bold text-yellow-600 mb-3' }, '💡 Tips'),
        React.createElement('ul', { className: 'text-gray-700 space-y-2 text-sm' },
          React.createElement('li', null, '💻 Best on desktop/tablet for full experience'),
          React.createElement('li', null, '📱 Responsive design - works on mobile too'),
          React.createElement('li', null, '💾 All data saves automatically'),
          React.createElement('li', null, '🔄 Refresh page - data persists'),
          React.createElement('li', null, '📊 Export feature requires data to exist')
        )
      ),

      // Navigation Help
      React.createElement(
        'div',
        null,
        React.createElement('h3', { className: 'text-lg font-bold text-blue-600 mb-3' }, '🗂️ Tab Guide'),
        React.createElement('div', { className: 'space-y-3' },
          React.createElement(
            'div',
            { className: 'border-l-4 border-blue-500 pl-3' },
            React.createElement('h4', { className: 'font-bold text-gray-800' }, '📱 Sign-In'),
            React.createElement('p', { className: 'text-sm text-gray-700' }, 'Find children by phone and mark them as signed in or out')
          ),
          React.createElement(
            'div',
            { className: 'border-l-4 border-green-500 pl-3' },
            React.createElement('h4', { className: 'font-bold text-gray-800' }, '📋 Master List'),
            React.createElement('p', { className: 'text-sm text-gray-700' }, 'View all scouts numbered 1-20, click to quick sign-in')
          ),
          React.createElement(
            'div',
            { className: 'border-l-4 border-purple-500 pl-3' },
            React.createElement('h4', { className: 'font-bold text-gray-800' }, '👥 Roster'),
            React.createElement('p', { className: 'text-sm text-gray-700' }, 'View scouts organized by section (Joeys, Cubs, Scouts, Venturers)')
          ),
          React.createElement(
            'div',
            { className: 'border-l-4 border-yellow-500 pl-3' },
            React.createElement('h4', { className: 'font-bold text-gray-800' }, '📊 Log'),
            React.createElement('p', { className: 'text-sm text-gray-700' }, 'View attendance history and export to Excel')
          ),
          React.createElement(
            'div',
            { className: 'border-l-4 border-red-500 pl-3' },
            React.createElement('h4', { className: 'font-bold text-gray-800' }, '⚙️ Setup'),
            React.createElement('p', { className: 'text-sm text-gray-700' }, 'Add leaders, create announcements, manage admin settings')
          )
        )
      ),

      // Getting Help
      React.createElement(
        'div',
        { className: 'bg-gray-50 border-2 border-gray-300 p-4 rounded-lg' },
        React.createElement('h3', { className: 'text-lg font-bold text-gray-600 mb-2' }, '❓ Need Help?'),
        React.createElement('p', { className: 'text-gray-700 text-sm' }, 'This instructions panel is always available. Click the minimize button to collapse it, or close it and click "Show Instructions" anytime.')
      )
    )
  );
};

export default InstructionsModal;