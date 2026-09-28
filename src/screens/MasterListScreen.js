import React, { useState } from 'react';
import { MASTER_LIST_BY_NUMBER } from '../data/demoData';
import { Phone, MapPin, AlertCircle } from 'lucide-react';

const MasterListScreen = ({ data, setData, onSelectChild }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [filterSection, setFilterSection] = useState('All');
  const [showParentForgotAlert, setShowParentForgotAlert] = useState(false);
  const [lastSignOutScout, setLastSignOutScout] = useState(null);

  const sections = ['All', 'Joeys', 'Cubs', 'Scouts', 'Venturers'];

  // Find this scout in the main children list, so attendance is saved under the
  // SAME id the Sign-In tab and the Log use (otherwise the Log can't find it).
  const findChildId = (scout) => {
    const children = (data && data.children) || [];
    const norm = (v) => String(v == null ? '' : v).trim().toLowerCase();
    const match =
      children.find(c => scout.childId != null && String(c.id) === String(scout.childId)) ||
      children.find(c => c.number != null && String(c.number) === String(scout.number)) ||
      children.find(c => norm(c.name) === norm(scout.name)) ||
      children.find(c => c.phone && scout.phone && norm(c.phone) === norm(scout.phone));
    return match ? match.id : (scout.childId || scout.number);
  };

  const isScoutSignedIn = (scout) => {
    const childId = findChildId(scout);
    return !!(data && data.attendance && data.attendance[childId] && data.attendance[childId].signedIn);
  };

  // Add a Log entry (works whether the log is stored as a list or as an object)
  const addLogEntry = (existingLog, entry) => {
    if (Array.isArray(existingLog)) return [...existingLog, entry];
    return { ...(existingLog || {}), [entry.id]: entry };
  };

  // Sign In - no PIN required
  const handleSignInChild = (scout) => {
    if (!data || !setData) return;

    const childId = findChildId(scout);
    const now = new Date();

    const newAtt = {
      ...((data.attendance || {})[childId] || {}),
      signedIn: true,
      signInTime: now.toLocaleTimeString(),
      signInDate: now.toLocaleDateString(),
      signInMethod: 'Master List',
      signOutTime: undefined,
      signOutGuardian: undefined,
    };

    const entry = {
      id: `log_${now.getTime()}_${childId}`,
      scoutId: childId,
      childId: childId,
      childName: scout.name,
      status: 'Signed In',
      guardian: 'Leader (Master List)',
      timestamp: now.toISOString(),
    };

    setData({
      ...data,
      attendance: { ...(data.attendance || {}), [childId]: newAtt },
      log: addLogEntry(data.log, entry),
    });
    alert(`✓ ${scout.name} has been signed in`);
  };

  // Sign Out - with parent forgot note
  const handleSignOutChild = (scout) => {
    if (!data || !setData) return;

    const childId = findChildId(scout);
    const now = new Date();

    const newAtt = {
      ...((data.attendance || {})[childId] || {}),
      signedIn: false,
      signOutTime: now.toLocaleTimeString(),
      signOutGuardian: 'Leader - Parent Forgot',
      signOutMethod: 'Master List - Leader',
      signOutReason: 'Parent Forgot',
      signOutNotes: `[${now.toLocaleString()}] PARENT FORGOT - Leader signed out`,
    };

    const entry = {
      id: `log_${now.getTime()}_${childId}`,
      scoutId: childId,
      childId: childId,
      childName: scout.name,
      status: 'Signed Out',
      guardian: 'Leader - Parent Forgot',
      timestamp: now.toISOString(),
    };

    setData({
      ...data,
      attendance: { ...(data.attendance || {}), [childId]: newAtt },
      log: addLogEntry(data.log, entry),
    });

    // Show alert
    setLastSignOutScout(scout);
    setShowParentForgotAlert(true);
  };

  const getScoutList = () => {
    const list = Object.values(MASTER_LIST_BY_NUMBER);
    if (filterSection === 'All') return list;
    return list.filter(scout => scout.section === filterSection);
  };

  const scouts = getScoutList();
  const selectedScout = selectedNumber ? MASTER_LIST_BY_NUMBER[selectedNumber] : null;

  const getSectionColor = (section) => {
    const colors = {
      'Joeys': 'bg-yellow-50 border-yellow-300',
      'Cubs': 'bg-orange-50 border-orange-300',
      'Scouts': 'bg-green-50 border-green-300',
      'Venturers': 'bg-blue-50 border-blue-300',
    };
    return colors[section] || 'bg-gray-50 border-gray-300';
  };

  const getSectionBgColor = (section) => {
    const colors = {
      'Joeys': 'from-yellow-500 to-yellow-600',
      'Cubs': 'from-orange-500 to-orange-600',
      'Scouts': 'from-green-500 to-green-600',
      'Venturers': 'from-blue-500 to-blue-600',
    };
    return colors[section] || 'from-gray-500 to-gray-600';
  };

  return React.createElement(
    'div',
    { className: 'bg-white p-6 space-y-6' },

    // Parent Forgot Alert
    showParentForgotAlert && React.createElement(
      'div',
      { className: 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4', style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      React.createElement(
        'div',
        { className: 'bg-yellow-50 border-4 border-red-500 rounded-lg shadow-lg max-w-md w-full p-6 space-y-4' },
        React.createElement('div', { className: 'text-center text-5xl' }, '⚠️'),
        React.createElement('h2', { className: 'text-2xl font-bold text-center text-red-600' }, 'PARENT FORGOT'),
        React.createElement('p', { className: 'text-center text-gray-800 font-semibold text-base' },
          `${lastSignOutScout?.name} signed out - Parent did not pick up`
        ),
        React.createElement('p', { className: 'text-center text-gray-600 text-sm' },
          `Time: ${new Date().toLocaleTimeString()}`
        ),
        React.createElement(
          'button',
          {
            onClick: () => setShowParentForgotAlert(false),
            className: 'w-full px-4 py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600'
          },
          'Close Alert'
        )
      )
    ),

    // Header
    React.createElement(
      'div',
      { className: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg' },
      React.createElement('p', { className: 'text-sm font-semibold' }, '📋 Master List'),
      React.createElement('h2', { className: 'text-2xl font-bold' }, 'All Scouts Directory')
    ),

    // Section Filter
    React.createElement(
      'div',
      { className: 'space-y-3' },
      React.createElement('p', { className: 'font-semibold text-gray-700' }, 'Filter by Section:'),
      React.createElement(
        'div',
        { className: 'flex flex-wrap gap-2' },
        sections.map(section =>
          React.createElement(
            'button',
            {
              key: section,
              onClick: () => setFilterSection(section),
              className: `px-4 py-2 rounded-lg font-semibold transition ${
                filterSection === section
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`
            },
            section
          )
        )
      )
    ),

    // Scout Grid
    React.createElement(
      'div',
      { className: 'grid grid-cols-1 md:grid-cols-2 gap-3' },
      scouts.map(scout =>
        React.createElement(
          'button',
          {
            key: scout.number,
            onClick: () => setSelectedNumber(scout.number),
            className: `p-4 border-2 rounded-lg text-left transition transform hover:scale-105 ${
              selectedNumber === scout.number
                ? 'border-purple-500 bg-purple-50 shadow-lg'
                : `${getSectionColor(scout.section)} border-opacity-50 hover:border-opacity-100`
            }`
          },
          React.createElement(
            'div',
            { className: 'flex items-start justify-between' },
            React.createElement(
              'div',
              { className: 'flex-1' },
              React.createElement(
                'div',
                { className: 'flex items-center gap-2' },
                React.createElement('div', { className: 'text-3xl font-bold text-purple-600' }, scout.number),
                isScoutSignedIn(scout) && React.createElement(
                  'div',
                  { className: 'bg-green-500 text-white px-2 py-1 rounded text-xs font-bold' },
                  '✓ IN'
                )
              ),
              React.createElement('p', { className: 'font-bold text-gray-800 mt-1' }, scout.name),
              React.createElement(
                'div',
                { className: 'flex items-center gap-1 text-xs text-gray-600 mt-2' },
                React.createElement(MapPin, { className: 'w-3 h-3' }),
                scout.section
              )
            ),
            React.createElement(
              'div',
              { className: `px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${getSectionBgColor(scout.section)}` },
              scout.section[0]
            )
          )
        )
      )
    ),

    // Selected Scout Details
    selectedScout && React.createElement(
      'div',
      { className: `border-2 border-purple-300 bg-gradient-to-r ${getSectionBgColor(selectedScout.section)} rounded-lg p-6 text-white` },
      React.createElement(
        'div',
        { className: 'space-y-4' },
        React.createElement(
          'div',
          null,
          React.createElement('p', { className: 'text-sm opacity-90' }, 'Scout Number'),
          React.createElement('h3', { className: 'text-4xl font-bold' }, selectedScout.number)
        ),

        React.createElement(
          'div',
          null,
          React.createElement('p', { className: 'text-sm opacity-90' }, 'Name'),
          React.createElement('p', { className: 'text-xl font-bold' }, selectedScout.name)
        ),

        React.createElement(
          'div',
          { className: 'flex items-center gap-2' },
          React.createElement(MapPin, { className: 'w-5 h-5' }),
          React.createElement('p', { className: 'text-lg font-semibold' }, selectedScout.section)
        ),

        React.createElement(
          'div',
          { className: 'flex items-center gap-2' },
          React.createElement(Phone, { className: 'w-5 h-5' }),
          React.createElement('p', { className: 'text-lg font-mono' }, selectedScout.phone)
        ),

        React.createElement(
          'div',
          { className: 'space-y-3 pt-4 border-t-2 border-white' },
          // Sign In Button (only if NOT signed in)
          !isScoutSignedIn(selectedScout) && React.createElement(
            'button',
            {
              onClick: () => handleSignInChild(selectedScout),
              className: 'w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition'
            },
            '✅ Sign In This Scout'
          ),

          // Sign Out Button (only if signed in)
          isScoutSignedIn(selectedScout) && React.createElement(
            'button',
            {
              onClick: () => handleSignOutChild(selectedScout),
              className: 'w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition'
            },
            '⚠️ Sign Out - Parent Forgot'
          )
        )
      )
    ),

    // Info Box
    React.createElement(
      'div',
      { className: 'bg-blue-50 border-2 border-blue-300 p-4 rounded-lg space-y-2' },
      React.createElement('p', { className: 'text-sm text-gray-700 font-bold' }, '💡 Master List Features:'),
      React.createElement('ul', { className: 'text-sm text-gray-700 space-y-1 ml-4' },
        React.createElement('li', null, '• Click a scout number to view details'),
        React.createElement('li', null, '• ✅ Sign In - Quick sign-in for any scout'),
        React.createElement('li', null, '• ⚠️ Sign Out - Records "PARENT FORGOT" reason'),
        React.createElement('li', null, '• Green badge (✓ IN) shows currently signed-in scouts')
      )
    ),

    // Summary
    React.createElement(
      'div',
      { className: 'bg-gray-50 p-4 rounded-lg text-center' },
      React.createElement('p', { className: 'text-gray-600' },
        `Showing ${scouts.length} scout${scouts.length !== 1 ? 's' : ''} ${filterSection !== 'All' ? `in ${filterSection}` : ''}`
      )
    )
  );
};

export default MasterListScreen;