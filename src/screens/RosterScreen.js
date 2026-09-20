import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const RosterScreen = ({ data, setData }) => {
  const [pinEntered, setPinEntered] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [correctPin] = useState('1234');

  const handlePinSubmit = () => {
    if (pinEntered === correctPin) {
      setIsAuthenticated(true);
      setPinEntered('');
    } else {
      alert('❌ Incorrect PIN');
      setPinEntered('');
    }
  };

  const toggleOnDuty = (leaderIndex) => {
    const updatedLeaders = [...data.leaders];
    updatedLeaders[leaderIndex] = {
      ...updatedLeaders[leaderIndex],
      onDuty: !updatedLeaders[leaderIndex].onDuty,
    };
    setData({ ...data, leaders: updatedLeaders });
  };

  if (!isAuthenticated) {
    return React.createElement(
      'div',
      { className: 'bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-20' },
      React.createElement(
        'div',
        { className: 'text-center mb-6' },
        React.createElement(Lock, { className: 'w-16 h-16 mx-auto text-red-600 mb-4' }),
        React.createElement('h2', { className: 'text-2xl font-bold' }, 'Roster Protected'),
        React.createElement('p', { className: 'text-gray-600 mt-2' }, 'Enter PIN to manage leaders')
      ),
      React.createElement('input', {
        type: 'password',
        placeholder: 'Enter PIN',
        value: pinEntered,
        onChange: (e) => setPinEntered(e.target.value),
        className: 'w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500',
      }),
      React.createElement(
        'button',
        {
          onClick: handlePinSubmit,
          className: 'w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600',
        },
        'Unlock'
      )
    );
  }

  const leaders = data.leaders || [];
  const onDutyCount = leaders.filter(l => l.onDuty).length;

  return React.createElement(
    'div',
    { className: 'bg-white p-6 rounded-lg' },
    React.createElement(
      'div',
      { className: 'flex justify-between items-center mb-6' },
      React.createElement(
        'div',
        null,
        React.createElement('h2', { className: 'text-2xl font-bold' }, '👥 Leaders On Duty'),
        React.createElement('p', { className: 'text-gray-600 mt-1' }, `${onDutyCount} of ${leaders.length} leaders working today`)
      ),
      React.createElement(
        'button',
        {
          onClick: () => setIsAuthenticated(false),
          className: 'bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600',
        },
        'Lock'
      )
    ),

    leaders.length === 0
      ? React.createElement('p', { className: 'text-gray-600 text-center py-8' }, 'No leaders added yet')
      : React.createElement(
          'div',
          { className: 'space-y-4' },
          leaders.map((leader, i) => {
            const onDuty = leader.onDuty || false;
            return React.createElement(
              'div',
              {
                key: i,
                className: `p-6 rounded-lg border-2 transition-all ${onDuty ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'}`,
              },
              React.createElement(
                'div',
                { className: 'flex items-start justify-between' },
                React.createElement(
                  'div',
                  { className: 'flex items-start gap-4' },
                  React.createElement(
                    'div',
                    { className: `w-16 h-16 ${onDuty ? 'bg-green-500' : 'bg-gray-400'} rounded-full flex items-center justify-center flex-shrink-0 transition-all` },
                    React.createElement('div', { className: 'text-2xl font-bold text-white' }, leader.name.substring(0, 2).toUpperCase())
                  ),
                  React.createElement(
                    'div',
                    null,
                    React.createElement('h3', { className: 'text-xl font-bold text-gray-900' }, leader.name),
                    React.createElement('p', { className: `text-sm font-semibold ${onDuty ? 'text-green-600' : 'text-gray-500'}` }, leader.scoutName || 'Leader'),
                    React.createElement('p', { className: onDuty ? 'text-green-600 font-bold mt-1' : 'text-gray-600 mt-1' }, onDuty ? '✅ On Duty' : '⏸️ Off Duty')
                  )
                ),
                React.createElement(
                  'button',
                  {
                    onClick: () => toggleOnDuty(i),
                    className: `px-6 py-3 rounded-lg font-bold text-white transition-all ${onDuty ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'}`,
                  },
                  onDuty ? 'On Duty' : 'Off Duty'
                )
              )
            );
          })
        )
  );
};

export default RosterScreen;