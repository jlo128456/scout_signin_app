import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

const LogScreen = ({ data, setData }) => {
  const [pinEntered, setPinEntered] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [correctPin] = useState('1234');

  // Save attendance logs to localStorage whenever data changes
  useEffect(() => {
    try {
      if (data.attendance) {
        localStorage.setItem('scout_logs', JSON.stringify(data.attendance));
      }
    } catch (e) {}
  }, [data.attendance]);

  const handlePinSubmit = () => {
    if (pinEntered === correctPin) {
      setIsAuthenticated(true);
      setPinEntered('');
    } else {
      alert('❌ Incorrect PIN');
      setPinEntered('');
    }
  };

  // FIX: compare ids as text. Attendance keys are always text ("1") but scout ids
  // can be numbers (1), so the old `c.id === childId` never matched anything.
  const children = data.children || [];
  const findChild = (id) => children.find((c) => String(c.id) === String(id));

  // ---------- Build the log ----------
  // 1) Every sign-in / sign-out recorded in data.log (added automatically by ScoutSignIn.js)
  const rawLog = data.log;
  let entries = (Array.isArray(rawLog) ? rawLog : Object.values(rawLog || {})).map((e) => {
    const child = findChild(e.scoutId || e.childId);
    const isIn = e.status === 'Signed In';
    const when = e.timestamp ? new Date(e.timestamp) : null;
    return {
      child: (child && child.name) || e.childName || 'Unknown',
      phone: (child && child.phone) || '',
      section: (child && child.section) || '',
      type: isIn ? 'signin' : 'signout',
      action: isIn
        ? (e.guardian && e.guardian.startsWith('Leader') ? `SIGNED IN by ${e.guardian}` : 'SIGNED IN')
        : `SIGNED OUT${e.guardian ? ` by ${e.guardian}` : ''}`,
      guardian: e.guardian || '',
      time: when ? when.toLocaleTimeString() : '-',
      date: when ? when.toLocaleDateString() : new Date().toLocaleDateString(),
      sortKey: when ? when.getTime() : 0,
    };
  });

  // 2) Fallback: nothing in data.log yet - build it from attendance like before
  if (entries.length === 0) {
    Object.entries(data.attendance || {}).forEach(([childId, att]) => {
      const child = findChild(childId);
      if (!child || !att) return;
      if (att.signInTime) {
        entries.push({
          child: child.name, phone: child.phone || '', section: child.section || '',
          type: 'signin', action: 'SIGNED IN', guardian: '',
          time: att.signInTime, date: new Date().toLocaleDateString(), sortKey: 1,
        });
      }
      if (att.signOutGuardian) {
        entries.push({
          child: child.name, phone: child.phone || '', section: child.section || '',
          type: 'signout', action: `SIGNED OUT by ${att.signOutGuardian}`, guardian: att.signOutGuardian,
          time: att.signOutTime || 'Just now', date: new Date().toLocaleDateString(), sortKey: 2,
        });
      }
    });
  }

  // Newest first
  const logs = entries.sort((a, b) => b.sortKey - a.sortKey);

  const exportToExcel = () => {
    if (logs.length === 0) {
      alert('No log entries to export yet');
      return;
    }
    const headers = ['Scout Name', 'Phone', 'Section', 'Status', 'Parent / Guardian', 'Time', 'Date'];
    const rows = logs.map((log) => [
      log.child,
      log.phone || '-',
      log.section || '-',
      log.type === 'signin' ? 'Signed In' : 'Signed Out',
      log.guardian || '-',
      log.time,
      log.date,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
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
        onKeyDown: (e) => { if (e.key === 'Enter') handlePinSubmit(); },
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
              React.createElement(
                'div',
                { className: 'text-right' },
                React.createElement('p', { className: 'text-sm text-gray-600 font-semibold' }, log.time),
                React.createElement('p', { className: 'text-xs text-gray-500' }, log.date)
              )
            )
          )
        )
  );
};

export default LogScreen;