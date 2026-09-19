import React from 'react';
import { X, Book } from 'lucide-react';

const InstructionsModal = ({ onClose }) => {
  return React.createElement(
    'div',
    { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4' },
    React.createElement(
      'div',
      { className: 'bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col' },
      
      // Header (Fixed at top)
      React.createElement(
        'div',
        { className: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between flex-shrink-0' },
        React.createElement(
          'div',
          { className: 'flex items-center gap-3' },
          React.createElement(Book, { className: 'w-6 h-6' }),
          React.createElement('h2', { className: 'text-2xl font-bold' }, 'How to Use This Demo')
        ),
        React.createElement(
          'button',
          { onClick: onClose, className: 'hover:bg-blue-500 p-2 rounded-full transition' },
          React.createElement(X, { className: 'w-6 h-6' })
        )
      ),

      // Content (Scrollable)
      React.createElement(
        'div',
        { className: 'flex-1 overflow-y-auto p-6 space-y-6' },

        React.createElement(
          'div',
          null,
          React.createElement('h3', { className: 'text-lg font-bold text-blue-600 mb-2 flex items-center gap-2' }, '📌 IMPORTANT NOTES'),
          React.createElement('p', { className: 'text-red-600 font-semibold' }, '⚠️ This is a DEMO with sample data. All data resets when you close or refresh the app. Nothing is saved!'),
          React.createElement('p', { className: 'text-gray-700 mt-2' }, 'This demo allows you to explore all features without affecting real scout records.')
        ),

        React.createElement(
          'div',
          null,
          React.createElement('h3', { className: 'text-lg font-bold text-green-600 mb-2 flex items-center gap-2' }, '📱 Sign-In Tab'),
          React.createElement('ol', { className: 'list-decimal list-inside space-y-2 text-gray-700' },
            React.createElement('li', null, React.createElement('span', { className: 'font-semibold' }, 'Find by Phone: '), 'Enter any phone number to search for a scout'),
            React.createElement('li', null, React.createElement('span', { className: 'font-semibold' }, 'Quick Add: '), 'Add a new scout on the fly if not in list'),
            React.createElement('li', null, React.createElement('span', { className: 'font-semibold' }, 'Sign In: '), 'Click "Sign In" button when child arrives'),
            React.createElement('li', null, React.createElement('span', { className: 'font-semibold' }, 'Sign Out: '), 'Click "Sign Out" and select their guardian picking them up'),
            React.createElement('li', null, React.createElement('span', { className: 'font-semibold' }, 'View Leaders: '), 'All leaders on duty are shown at the top')
          )
        ),

        React.createElement(
          'div',
          null,
          React.createElement('h3', { className: 'text-lg font-bold text-purple-600 mb-2 flex items-center gap-2' }, '🔢 Master List Tab'),
          React.createElement('p', { className: 'text-gray-700 mb-2' }, 'Browse all scouts organized by section:'),
          React.createElement('ul', { className: 'list-disc list-inside space-y-1 text-gray-700' },
            React.createElement('li', null, React.createElement('span', { className: 'font-semibold' }, 'Number 1-5: '), 'Joeys'),
            React.createElement('li', null, React.createElement('span', { className: 'font-semibold' }, 'Number 6-10: '), 'Cubs'),
            React.createElement('li', null, React.createElement('span', { className: 'font-semibold' }, 'Number 11-15: '), 'Scouts'),
            React.createElement('li', null, React.createElement('span', { className: 'font-semibold' }, 'Number 16-20: '), 'Venturers')
          ),
          React.createElement('p', { className: 'text-gray-700 mt-2' }, 'Click a scout number to quickly sign them in from the Sign-In tab!')
        ),

        React.createElement(
          'div',
          null,
          React.createElement('h3', { className: 'text-lg font-bold text-orange-600 mb-2 flex items-center gap-2' }, '📋 Roster Tab'),
          React.createElement('ul', { className: 'list-disc list-inside space-y-2 text-gray-700' },
            React.createElement('li', null, 'View all registered scouts and leaders'),
            React.createElement('li', null, 'See their scout names and member numbers'),
            React.createElement('li', null, 'View their assigned sections')
          )
        ),

        React.createElement(
          'div',
          null,
          React.createElement('h3', { className: 'text-lg font-bold text-indigo-600 mb-2 flex items-center gap-2' }, '📊 Log Tab'),
          React.createElement('ul', { className: 'list-disc list-inside space-y-2 text-gray-700' },
            React.createElement('li', null, 'View today\'s sign-in/sign-out records'),
            React.createElement('li', null, 'See timestamps and guardian information'),
            React.createElement('li', null, 'Monitor attendance in real-time')
          )
        ),

        React.createElement(
          'div',
          null,
          React.createElement('h3', { className: 'text-lg font-bold text-pink-600 mb-2 flex items-center gap-2' }, '⚙️ Setup Tab (Admin Only)'),
          React.createElement('p', { className: 'text-gray-700 mb-2' }, React.createElement('span', { className: 'font-bold' }, 'Admin PIN: '), React.createElement('span', { className: 'font-mono bg-gray-100 px-2 py-1 rounded' }, '1234')),
          React.createElement('ul', { className: 'list-disc list-inside space-y-2 text-gray-700' },
            React.createElement('li', null, 'Add/manage scouts and leaders'),
            React.createElement('li', null, 'Import data from CSV (demo uses built-in data)'),
            React.createElement('li', null, 'Configure sections and announcements'),
            React.createElement('li', null, 'Block problematic parents if needed')
          )
        ),

        React.createElement(
          'div',
          { className: 'bg-green-50 border-2 border-green-300 p-4 rounded-lg' },
          React.createElement('h3', { className: 'font-bold text-green-600 mb-3' }, '📱 Parent Phone Numbers to Use:'),
          React.createElement('p', { className: 'text-gray-700 mb-3' }, 'Try these phone numbers in the Sign-In tab:'),
          React.createElement('ul', { className: 'space-y-2 text-gray-700' },
            React.createElement('li', null, 
              React.createElement('span', { className: 'font-mono bg-white px-2 py-1 rounded border border-green-300' }, '0412345601'),
              ' - Scout 1 (Joey)'
            ),
            React.createElement('li', null, 
              React.createElement('span', { className: 'font-mono bg-white px-2 py-1 rounded border border-green-300' }, '0412345606'),
              ' - Scout 6 (Cub)'
            ),
            React.createElement('li', null, 
              React.createElement('span', { className: 'font-mono bg-white px-2 py-1 rounded border border-green-300' }, '0412345611'),
              ' - Scout 11 (Scout)'
            ),
            React.createElement('li', null, 
              React.createElement('span', { className: 'font-mono bg-white px-2 py-1 rounded border border-green-300' }, '0412345616'),
              ' - Scout 16 (Venturer)'
            ),
            React.createElement('li', null, 
              React.createElement('span', { className: 'font-mono bg-white px-2 py-1 rounded border border-green-300' }, '0412345620'),
              ' - Scout 20 (Venturer)'
            )
          ),
          React.createElement('p', { className: 'text-gray-600 text-sm mt-3' }, 'Or use any number from 0412345601 to 0412345620 to find different scouts!')
        ),

        React.createElement(
          'div',
          { className: 'bg-blue-50 border-2 border-blue-300 p-4 rounded-lg' },
          React.createElement('h3', { className: 'font-bold text-blue-600 mb-2' }, '💡 Demo Tips:'),
          React.createElement('ul', { className: 'list-disc list-inside space-y-1 text-gray-700' },
            React.createElement('li', null, 'Phone numbers all start with 0412345 (last digits: 601-620)'),
            React.createElement('li', null, 'Try signing in scouts from different sections'),
            React.createElement('li', null, 'Change the active section using the Setup tab'),
            React.createElement('li', null, 'Refresh the page to reset all data back to demo defaults'),
            React.createElement('li', null, 'No data persists - perfect for safe testing!')
          )
        )
      ),

      // Footer (Fixed at bottom)
      React.createElement(
        'div',
        { className: 'bg-gray-50 p-4 border-t flex gap-3 flex-shrink-0' },
        React.createElement(
          'button',
          {
            onClick: onClose,
            className: 'flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition'
          },
          'Got It! Let\'s Demo 🎉'
        ),
        React.createElement(
          'button',
          {
            onClick: onClose,
            className: 'flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-400 transition'
          },
          'Cancel'
        )
      )
    )
  );
};

export default InstructionsModal;