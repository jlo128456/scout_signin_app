import React, { useState } from 'react';
import { Lock, Plus, X, Edit2, Download, Upload } from 'lucide-react';
import CSVImport from '../components/CSVImport-Compact';
import AnnouncementsManager from '../components/AnnouncementsManager';

const SetupScreen = ({ data, setData }) => {
  const [pinEntered, setPinEntered] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [correctPin] = useState(data.pin || '1234');
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');
  const [currentSection, setCurrentSection] = useState(data.currentSection || 'Joeys');
  const [newSection, setNewSection] = useState('');
  const [childName, setChildName] = useState('');
  const [childPhone, setChildPhone] = useState('');
  const [childSection, setChildSection] = useState('Joeys');
  const [leaderName, setLeaderName] = useState('');
  const [leaderScoutName, setLeaderScoutName] = useState('');
  const [leaderSection, setLeaderSection] = useState('Joeys');
  const [blockedPhone, setBlockedPhone] = useState('');
  const [blockedReason, setBlockedReason] = useState('');
  const [editingChildId, setEditingChildId] = useState(null);
  const [editingLeaderId, setEditingLeaderId] = useState(null);

  const handlePinSubmit = () => {
    if (pinEntered === correctPin) {
      setIsAuthenticated(true);
      setPinEntered('');
    } else {
      alert('❌ Incorrect PIN');
      setPinEntered('');
    }
  };

  const changePin = () => {
    if (!newPin.trim()) {
      alert('Enter new PIN');
      return;
    }
    if (newPin !== confirmNewPin) {
      alert('PINs do not match');
      return;
    }
    if (newPin === correctPin) {
      alert('New PIN must be different from current PIN');
      return;
    }
    setData({ ...data, pin: newPin });
    alert('✅ PIN changed successfully!');
    setNewPin('');
    setConfirmNewPin('');
  };

  const exportData = () => {
    const dataToExport = {
      children: data.children || [],
      leaders: data.leaders || [],
      sections: data.sections || [],
      blockedParents: data.blockedParents || [],
      pin: data.pin || '1234',
      timestamp: new Date().toLocaleString(),
    };
    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scout-master-list-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    alert('✅ Master list exported!');
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        setData({
          ...data,
          children: imported.children || data.children,
          leaders: imported.leaders || data.leaders,
          sections: imported.sections || data.sections,
          blockedParents: imported.blockedParents || data.blockedParents,
          pin: imported.pin || data.pin,
        });
        alert('✅ Master list imported!');
      } catch (err) {
        alert('❌ Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const updateSection = (section) => {
    setCurrentSection(section);
    setData({ ...data, currentSection: section });
  };

  const addSection = () => {
    if (!newSection.trim()) {
      alert('Enter section name');
      return;
    }
    const sections = [...(data.sections || []), newSection];
    setData({ ...data, sections });
    setNewSection('');
  };

  const addBlockedParent = () => {
    if (!blockedPhone.trim()) {
      alert('Enter phone number to block');
      return;
    }
    const blocked = {
      id: Date.now(),
      phone: blockedPhone,
      reason: blockedReason || 'No reason provided',
      blockedDate: new Date().toLocaleString(),
    };
    setData({ ...data, blockedParents: [...(data.blockedParents || []), blocked] });
    setBlockedPhone('');
    setBlockedReason('');
    alert('✅ Parent blocked!');
  };

  const unblockParent = (id) => {
    setData({ ...data, blockedParents: (data.blockedParents || []).filter(b => b.id !== id) });
  };

  const addChild = () => {
    if (!childName.trim() || !childPhone.trim()) {
      alert('Enter name and phone');
      return;
    }
    if (editingChildId) {
      const updatedChildren = (data.children || []).map(c => 
        c.id === editingChildId 
          ? { ...c, name: childName, phone: childPhone, section: childSection }
          : c
      );
      setData({ ...data, children: updatedChildren });
      alert('✅ Child updated!');
      setEditingChildId(null);
    } else {
      const newChild = {
        id: Date.now(),
        name: childName,
        phone: childPhone,
        section: childSection,
        scoutName: 'Scout',
        memberNumber: `SQA${Date.now().toString().slice(-4)}`,
      };
      setData({ ...data, children: [...(data.children || []), newChild] });
      alert('✅ Child added!');
    }
    setChildName('');
    setChildPhone('');
    setChildSection('Joeys');
  };

  const addLeader = () => {
    if (!leaderName.trim()) {
      alert('Enter leader name');
      return;
    }
    if (editingLeaderId) {
      const updatedLeaders = (data.leaders || []).map(l => 
        l.id === editingLeaderId 
          ? { ...l, name: leaderName, scoutName: leaderScoutName || 'Leader', section: leaderSection }
          : l
      );
      setData({ ...data, leaders: updatedLeaders });
      alert('✅ Leader updated!');
      setEditingLeaderId(null);
    } else {
      const newLeader = {
        id: Date.now(),
        name: leaderName,
        scoutName: leaderScoutName || 'Leader',
        section: leaderSection,
        onDuty: false,
      };
      setData({ ...data, leaders: [...(data.leaders || []), newLeader] });
      alert('✅ Leader added!');
    }
    setLeaderName('');
    setLeaderScoutName('');
    setLeaderSection('Joeys');
  };

  const editChild = (child) => {
    setEditingChildId(child.id);
    setChildName(child.name);
    setChildPhone(child.phone);
    setChildSection(child.section);
  };

  const editLeader = (leader) => {
    setEditingLeaderId(leader.id);
    setLeaderName(leader.name);
    setLeaderScoutName(leader.scoutName);
    setLeaderSection(leader.section);
  };

  const cancelEdit = () => {
    setEditingChildId(null);
    setEditingLeaderId(null);
    setChildName('');
    setChildPhone('');
    setChildSection('Joeys');
    setLeaderName('');
    setLeaderScoutName('');
    setLeaderSection('Joeys');
  };

  const deleteChild = (id) => {
    setData({ ...data, children: (data.children || []).filter(c => c.id !== id) });
  };

  const deleteLeader = (id) => {
    setData({ ...data, leaders: (data.leaders || []).filter(l => l.id !== id) });
  };

  if (!isAuthenticated) {
    return React.createElement(
      'div',
      { className: 'bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-20' },
      React.createElement(
        'div',
        { className: 'text-center mb-6' },
        React.createElement(Lock, { className: 'w-16 h-16 mx-auto text-red-600 mb-4' }),
        React.createElement('h2', { className: 'text-2xl font-bold' }, 'Setup Protected'),
        React.createElement('p', { className: 'text-gray-600 mt-2' }, 'Enter PIN to access setup')
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

  const defaultSections = ['Joeys', 'Cub Scouts', 'Scouts', 'Venturers', 'Rovers'];
  const allSections = [...(data.sections && data.sections.length > 0 ? data.sections : defaultSections)];
  const allChildren = data.children || [];
  const allLeaders = data.leaders || [];
  const blockedParents = data.blockedParents || [];

  return React.createElement(
    'div',
    { className: 'bg-white p-6 rounded-lg space-y-6' },
    React.createElement(
      'div',
      { className: 'flex justify-between items-center' },
      React.createElement('h2', { className: 'text-2xl font-bold' }, '⚙️ Setup'),
      React.createElement(
        'button',
        {
          onClick: () => setIsAuthenticated(false),
          className: 'bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600',
        },
        'Lock'
      )
    ),

    // Change PIN
    React.createElement(
      'div',
      { className: 'bg-purple-50 p-4 rounded-lg border border-purple-200' },
      React.createElement('h3', { className: 'font-bold text-lg mb-3' }, '🔐 Change PIN'),
      React.createElement('p', { className: 'text-sm text-gray-600 mb-3' }, `Current PIN: ${correctPin}`),
      React.createElement(
        'div',
        { className: 'space-y-2' },
        React.createElement('input', {
          type: 'password',
          placeholder: 'New PIN',
          value: newPin,
          onChange: (e) => setNewPin(e.target.value),
          className: 'w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-500',
        }),
        React.createElement('input', {
          type: 'password',
          placeholder: 'Confirm new PIN',
          value: confirmNewPin,
          onChange: (e) => setConfirmNewPin(e.target.value),
          className: 'w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-500 mb-2',
        }),
        React.createElement(
          'button',
          {
            onClick: changePin,
            className: 'w-full bg-purple-500 text-white py-2 rounded font-semibold hover:bg-purple-600',
          },
          'Update PIN'
        )
      )
    ),

    // Export/Import Master List
    React.createElement(
      'div',
      { className: 'bg-green-50 p-4 rounded-lg border border-green-200' },
      React.createElement('h3', { className: 'font-bold text-lg mb-3' }, '💾 Master List Backup'),
      React.createElement('p', { className: 'text-sm text-gray-600 mb-3' }, 'Save or load your complete master list'),
      React.createElement(
        'div',
        { className: 'flex gap-2 mb-3' },
        React.createElement(
          'button',
          {
            onClick: exportData,
            className: 'flex-1 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 flex items-center justify-center gap-2',
          },
          React.createElement(Download, { className: 'w-5 h-5' }),
          'Export List'
        ),
        React.createElement(
          'label',
          { className: 'flex-1 bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 flex items-center justify-center gap-2 cursor-pointer' },
          React.createElement(Upload, { className: 'w-5 h-5' }),
          'Import List',
          React.createElement('input', {
            type: 'file',
            accept: '.json',
            onChange: importData,
            className: 'hidden',
          })
        )
      )
    ),

    // Blocked Parents (Child Protection)
    React.createElement(
      'div',
      { className: 'bg-red-50 p-4 rounded-lg border border-red-200' },
      React.createElement('h3', { className: 'font-bold text-lg mb-3' }, '🚫 Child Protection - Blocked Parents'),
      React.createElement('p', { className: 'text-sm text-gray-600 mb-3' }, 'Block undesirable or banned parents from signing in'),
      React.createElement(
        'div',
        { className: 'space-y-2 mb-3' },
        React.createElement('input', {
          type: 'tel',
          placeholder: 'Parent phone to block',
          value: blockedPhone,
          onChange: (e) => setBlockedPhone(e.target.value),
          className: 'w-full px-3 py-2 border rounded focus:outline-none focus:border-red-500',
        }),
        React.createElement('textarea', {
          placeholder: 'Reason for blocking (optional)',
          value: blockedReason,
          onChange: (e) => setBlockedReason(e.target.value),
          className: 'w-full px-3 py-2 border rounded focus:outline-none focus:border-red-500 h-16',
        }),
        React.createElement(
          'button',
          {
            onClick: addBlockedParent,
            className: 'w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600',
          },
          'Block Parent'
        )
      ),

      blockedParents.length > 0 && React.createElement(
        'div',
        { className: 'space-y-2' },
        React.createElement('p', { className: 'text-sm font-semibold text-gray-600 mb-2' }, `Blocked: ${blockedParents.length} parent(s)`),
        blockedParents.map((blocked) =>
          React.createElement(
            'div',
            {
              key: blocked.id,
              className: 'bg-white p-3 rounded border border-red-300 flex justify-between items-start',
            },
            React.createElement(
              'div',
              null,
              React.createElement('p', { className: 'font-semibold text-red-600' }, blocked.phone),
              React.createElement('p', { className: 'text-xs text-gray-600' }, blocked.reason),
              React.createElement('p', { className: 'text-xs text-gray-500' }, blocked.blockedDate)
            ),
            React.createElement(
              'button',
              {
                onClick: () => unblockParent(blocked.id),
                className: 'text-green-500 hover:text-green-700 font-bold',
              },
              'Unblock'
            )
          )
        )
      )
    ),

    // Section Selector
    React.createElement(
      'div',
      { className: 'bg-blue-50 p-4 rounded-lg border border-blue-200' },
      React.createElement('h3', { className: 'font-bold text-lg mb-3' }, '🎯 Select Active Section/Night'),
      React.createElement('p', { className: 'text-sm text-gray-600 mb-3' }, `Currently showing: ${currentSection}`),
      React.createElement(
        'div',
        { className: 'flex flex-wrap gap-2 mb-3' },
        allSections.map((section, i) =>
          React.createElement(
            'button',
            {
              key: i,
              onClick: () => updateSection(section),
              className: `px-4 py-2 rounded font-semibold ${currentSection === section ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`,
            },
            section
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'flex gap-2' },
        React.createElement('input', {
          type: 'text',
          placeholder: 'New section name',
          value: newSection,
          onChange: (e) => setNewSection(e.target.value),
          className: 'flex-1 px-3 py-2 border rounded focus:outline-none focus:border-blue-500',
        }),
        React.createElement(
          'button',
          {
            onClick: addSection,
            className: 'bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600',
          },
          'Add'
        )
      )
    ),

    // Master Children List
    React.createElement(
      'div',
      { className: 'border-t pt-6' },
      React.createElement('h3', { className: 'font-bold text-lg mb-4' }, '👶 All Children (Master List)'),
      
      React.createElement(
        'div',
        { className: 'space-y-3 mb-4 bg-gray-50 p-4 rounded' },
        React.createElement('p', { className: 'text-sm text-gray-600 font-semibold mb-2' }, editingChildId ? 'Update child:' : 'Add child to master list:'),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Child name',
          value: childName,
          onChange: (e) => setChildName(e.target.value),
          className: 'w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500',
        }),
        React.createElement('input', {
          type: 'tel',
          placeholder: 'Parent phone',
          value: childPhone,
          onChange: (e) => setChildPhone(e.target.value),
          className: 'w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500',
        }),
        React.createElement(
          'select',
          {
            value: childSection,
            onChange: (e) => setChildSection(e.target.value),
            className: 'w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500',
          },
          allSections.map((sec, i) => React.createElement('option', { key: i, value: sec }, sec))
        ),
        React.createElement(
          'div',
          { className: 'flex gap-2' },
          React.createElement(
            'button',
            {
              onClick: addChild,
              className: `flex-1 ${editingChildId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white py-2 rounded font-semibold flex items-center justify-center gap-2`,
            },
            React.createElement(editingChildId ? Edit2 : Plus, { className: 'w-5 h-5' }),
            editingChildId ? 'Update Child' : 'Add Child'
          ),
          editingChildId && React.createElement(
            'button',
            {
              onClick: cancelEdit,
              className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded font-semibold',
            },
            'Cancel'
          )
        )
      ),

      React.createElement('p', { className: 'text-sm font-semibold text-gray-600 mb-2' }, `Total: ${allChildren.length} children`),
      allChildren.length > 0 && React.createElement(
        'div',
        { className: 'space-y-2 max-h-64 overflow-y-auto' },
        allChildren.map((child) =>
          React.createElement(
            'div',
            {
              key: child.id,
              className: `p-3 rounded border ${currentSection === child.section ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-300'}`,
            },
            React.createElement(
              'div',
              { className: 'flex justify-between items-start' },
              React.createElement(
                'div',
                null,
                React.createElement('p', { className: 'font-semibold' }, child.name),
                React.createElement('p', { className: 'text-xs text-gray-600' }, `${child.phone} • ${child.section}`)
              ),
              React.createElement(
                'div',
                { className: 'flex gap-2' },
                React.createElement(
                  'button',
                  {
                    onClick: () => editChild(child),
                    className: 'text-blue-500 hover:text-blue-700',
                  },
                  React.createElement(Edit2, { className: 'w-4 h-4' })
                ),
                React.createElement(
                  'button',
                  {
                    onClick: () => deleteChild(child.id),
                    className: 'text-red-500 hover:text-red-700',
                  },
                  React.createElement(X, { className: 'w-4 h-4' })
                )
              )
            )
          )
        )
      )
    ),

    // Master Leaders List
    React.createElement(
      'div',
      { className: 'border-t pt-6' },
      React.createElement('h3', { className: 'font-bold text-lg mb-4' }, '👥 All Leaders (Master List)'),
      
      React.createElement(
        'div',
        { className: 'space-y-3 mb-4 bg-gray-50 p-4 rounded' },
        React.createElement('p', { className: 'text-sm text-gray-600 font-semibold mb-2' }, editingLeaderId ? 'Update leader:' : 'Add leader to master list:'),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Leader full name',
          value: leaderName,
          onChange: (e) => setLeaderName(e.target.value),
          className: 'w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500',
        }),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Scout name (Skipper, Leader, etc)',
          value: leaderScoutName,
          onChange: (e) => setLeaderScoutName(e.target.value),
          className: 'w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500',
        }),
        React.createElement(
          'select',
          {
            value: leaderSection,
            onChange: (e) => setLeaderSection(e.target.value),
            className: 'w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500',
          },
          allSections.map((sec, i) => React.createElement('option', { key: i, value: sec }, sec))
        ),
        React.createElement(
          'div',
          { className: 'flex gap-2' },
          React.createElement(
            'button',
            {
              onClick: addLeader,
              className: `flex-1 ${editingLeaderId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white py-2 rounded font-semibold flex items-center justify-center gap-2`,
            },
            React.createElement(editingLeaderId ? Edit2 : Plus, { className: 'w-5 h-5' }),
            editingLeaderId ? 'Update Leader' : 'Add Leader'
          ),
          editingLeaderId && React.createElement(
            'button',
            {
              onClick: cancelEdit,
              className: 'flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded font-semibold',
            },
            'Cancel'
          )
        )
      ),

      React.createElement('p', { className: 'text-sm font-semibold text-gray-600 mb-2' }, `Total: ${allLeaders.length} leaders`),
      allLeaders.length > 0 && React.createElement(
        'div',
        { className: 'space-y-2 max-h-64 overflow-y-auto' },
        allLeaders.map((leader) =>
          React.createElement(
            'div',
            {
              key: leader.id,
              className: `p-3 rounded border ${currentSection === leader.section ? 'bg-blue-100 border-blue-300' : 'bg-gray-50 border-gray-300'}`,
            },
            React.createElement(
              'div',
              { className: 'flex justify-between items-start' },
              React.createElement(
                'div',
                null,
                React.createElement('p', { className: 'font-semibold' }, leader.name),
                React.createElement('p', { className: 'text-xs text-gray-600' }, `${leader.scoutName} • ${leader.section}`)
              ),
              React.createElement(
                'div',
                { className: 'flex gap-2' },
                React.createElement(
                  'button',
                  {
                    onClick: () => editLeader(leader),
                    className: 'text-blue-500 hover:text-blue-700',
                  },
                  React.createElement(Edit2, { className: 'w-4 h-4' })
                ),
                React.createElement(
                  'button',
                  {
                    onClick: () => deleteLeader(leader.id),
                    className: 'text-red-500 hover:text-red-700',
                  },
                  React.createElement(X, { className: 'w-4 h-4' })
                )
              )
            )
          )
        )
      )
    ),

    // Messages to Parents (Announcements Manager)
    React.createElement(
      'div',
      { className: 'border-t pt-6' },
      React.createElement(AnnouncementsManager, { data, setData })
    ),

    // CSV Import (Optional)
    React.createElement(
      'div',
      { className: 'border-t pt-6' },
      React.createElement('h3', { className: 'font-bold text-lg mb-4' }, '📥 Optional: Import CSV'),
      React.createElement(CSVImport, {
        onImportFamilies: (fams) => setData({ ...data, children: [...(data.children || []), ...fams.map(f => ({ ...f, id: Date.now() + Math.random(), section: currentSection }))] }),
        onImportSchedule: (sched) => setData({ ...data, schedule: sched }),
      })
    )
  );
};

export default SetupScreen;