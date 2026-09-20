import React from 'react';
import { User, Smile } from 'lucide-react';

const ChildCard = ({ child, leader, onSignInOut, buttonLabel, status }) => {
  return React.createElement(
    'div',
    { className: 'bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg shadow-md border-2 border-green-200' },
    React.createElement(
      'div',
      { className: 'space-y-4' },
      React.createElement(
        'div',
        { className: 'flex items-center gap-3 mb-4' },
        React.createElement(Smile, { className: 'w-8 h-8 text-green-600' }),
        React.createElement(
          'div',
          null,
          React.createElement('h3', { className: 'text-xl font-bold' }, child.name),
          React.createElement('p', { className: 'text-sm text-gray-600' }, `Scout: ${child.scoutName}`)
        )
      ),
      React.createElement(
        'div',
        { className: 'bg-white p-4 rounded-lg space-y-2' },
        React.createElement(
          'div',
          { className: 'flex justify-between' },
          React.createElement('span', { className: 'text-gray-600' }, 'Member:'),
          React.createElement('span', { className: 'font-semibold' }, child.memberNumber)
        ),
        React.createElement(
          'div',
          { className: 'flex justify-between' },
          React.createElement('span', { className: 'text-gray-600' }, 'Phone:'),
          React.createElement('span', { className: 'font-semibold' }, child.phone)
        ),
        leader && React.createElement(
          'div',
          { className: 'flex justify-between pt-2 border-t' },
          React.createElement('span', { className: 'text-gray-600' }, 'Leader:'),
          React.createElement(
            'div',
            { className: 'text-right' },
            React.createElement('p', { className: 'font-semibold' }, leader.name),
            React.createElement('p', { className: 'text-xs text-gray-500' }, leader.scoutName)
          )
        )
      ),
      status && React.createElement('p', { className: 'text-sm font-semibold text-green-700 bg-green-100 p-2 rounded text-center' }, status),
      React.createElement(
        'button',
        {
          onClick: onSignInOut,
          className: `w-full py-3 rounded-lg font-bold text-white ${buttonLabel.includes('Sign In') ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`,
        },
        buttonLabel
      )
    )
  );
};

export default ChildCard;
