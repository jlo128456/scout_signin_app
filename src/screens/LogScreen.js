import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const LogScreen = ({ data }) => {
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

  const exportToExcel = () => {
    // Build CSV data
    const headers = ['Scout Name', 'Phone', 'Section', 'Status', 'Sign-In Time', 'Sign-Out Guardian', 'Date'];
    const rows = [];

    Object.entries(data.attendance || {}).forEach(([childId, att]) => {
      const child = data.children.find(c => c.id === childId);
      if (!child) return;

      const status = att.signedIn ? 'Signed In' : 'Not Here';
      const signInTime = att.signInTime || '-';
      const signOutGuardian = att.signOutGuardian || '-';
      const date = new Date().toISOString().split('T')[0];

      rows.push([
        child.name,
        child.phone || '-',
        child.section || '-',
        status,
        signInTime,
        signOutGuardian,
        date
      ]);
    });

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scout-signin-log-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return React.createElement(
      'div',
      { className: 'bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-20' },
      React.createElement(
        'div',
        { className: 'text-center mb-6' },
        React.createElement(Lock, { className: 'w-16 h-16 mx-auto text-red-600 mb-4' }),
        React.createElement('h2', { className: 'text-2xl font-bold' }, 'Log Protected'),
        React.createElement('p', { className: 'text-gray-600 mt-2' }, 'Enter PIN to view activity log')
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

  const logs = [];
  
  Object.entries(data.attendance || {}).forEach(([childId, att]) => {
    const child = data.children.find(c => c.id === childId);
    if (!child) return;
    
    if (att.signInTime) {
      logs.push({
        time: att.signInTime,
        child: child.name,
        action: 'SIGNED IN',
        type: 'signin',
      });
    }
    if (att.signOutGuardian) {
      logs.push({
        time: 'Just now',
        child: child.name,
        action: `SIGNED OUT by ${att.signOutGuardian}`,
        type: 'signout',
      });
    }
  });

  logs.sort((a, b) => {
    if (a.time === 'Just now') return -1;
    if (b.time === 'Just now') return 1;
    return b.time.localeCompare(a.time);
  });

  return React.createElement(
    'div',
    { className: 'bg-white p-6 rounded-lg' },
    React.createElement(
      'div',
      { className: 'flex justify-between items-center mb-6' },
      React.createElement('h2', { className: 'text-2xl font-bold' }, '📋 Sign-In Log'),
      React.createElement(
        'div',
        { className: 'flex gap-2' },
        React.createElement(
          'button',
          {
            onClick: exportToExcel,
            className: 'bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600',
          },
          '📥 Export to Excel'
        ),
        React.createElement(
          'button',
          {
            onClick: () => setIsAuthenticated(false),
            className: 'bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600',
          },
          'Lock'
        )
      )
    ),
    
    logs.length === 0
      ? React.createElement('p', { className: 'text-gray-600 text-center py-8' }, 'No activity yet')
      : React.createElement(
          'div',
          { className: 'space-y-2' },
          logs.map((log, i) =>
            React.createElement(
              'div',
              {
                key: i,
                className: `p-4 rounded-lg flex justify-between items-center ${log.type === 'signin' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`,
              },
              React.createElement(
                'div',
                null,
                React.createElement('p', { className: 'font-bold text-lg' }, log.child),
                React.createElement('p', { className: `text-sm ${log.type === 'signin' ? 'text-green-600' : 'text-red-600'}` }, log.action)
              ),
              React.createElement('p', { className: 'text-sm text-gray-600 font-semibold' }, log.time)
            )
          )
        )
  );
};

export default LogScreen;