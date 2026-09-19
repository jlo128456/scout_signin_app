import React, { useState, useEffect } from 'react';
import PhoneInputSection from '../components/PhoneInputSection-Compact';
import { Plus, AlertCircle } from 'lucide-react';

const SignInScreen = ({ data, setData, selectedChild }) => {
  const [phone, setPhone] = useState('');
  const [child, setChild] = useState(null);
  const [showGuardianModal, setShowGuardianModal] = useState(false);
  const [selectedGuardian, setSelectedGuardian] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildPhone, setNewChildPhone] = useState('');
  const [blockedWarning, setBlockedWarning] = useState(null);

  // Handle selected child from master list
  useEffect(() => {
    if (selectedChild) {
      setChild(selectedChild);
      setPhone(selectedChild.phone);
    }
  }, [selectedChild]);

  const currentSection = data.currentSection || 'Joeys';
  const signedInCount = Object.values(data.attendance || {}).filter(a => a.signedIn).length;
  const notHereCount = (data.children || []).filter(c => c.section === currentSection).length;
  const onDutyLeaders = (data.leaders || []).filter(l => l.onDuty && l.section === currentSection);
  const childrenForSection = (data.children || []).filter(c => c.section === currentSection);
  const blockedParents = data.blockedParents || [];

  const isPhoneBlocked = (phoneNum) => {
    return blockedParents.some(b => b.phone.includes(phoneNum.slice(-9)) || phoneNum.includes(b.phone.slice(-9)));
  };

  const findChild = (p) => {
    // Check if phone is blocked
    if (isPhoneBlocked(p)) {
      const blocked = blockedParents.find(b => b.phone.includes(p.slice(-9)) || p.includes(b.phone.slice(-9)));
      setBlockedWarning(`⛔ This parent is BLOCKED. Reason: ${blocked.reason || 'No details provided'}`);
      setChild(null);
      return;
    }
    setBlockedWarning(null);

    const found = childrenForSection.find(c => c.phone.includes(p.slice(-9)));
    setChild(found || null);
    if (found) alert(`Found: ${found.name}`);
    else alert('No child found - use Quick Add to add them');
  };

  const addQuickChild = () => {
    if (!newChildName.trim() || !newChildPhone.trim()) {
      alert('Enter name and phone');
      return;
    }

    // Check if parent is blocked
    if (isPhoneBlocked(newChildPhone)) {
      const blocked = blockedParents.find(b => b.phone.includes(newChildPhone.slice(-9)) || newChildPhone.includes(b.phone.slice(-9)));
      alert(`❌ CANNOT ADD: This parent is BLOCKED.\nReason: ${blocked.reason || 'No details'}`);
      return;
    }

    const newChild = {
      id: Date.now(),
      name: newChildName,
      phone: newChildPhone,
      section: currentSection,
      scoutName: 'Scout',
      memberNumber: `SQA${Date.now().toString().slice(-4)}`,
    };
    setData({ ...data, children: [...(data.children || []), newChild] });
    setChild(newChild);
    setNewChildName('');
    setNewChildPhone('');
    setShowAddChild(false);
    alert(`✅ ${newChildName} added and ready to sign in!`);
  };

  const toggleSignIn = () => {
    if (!child) return;
    const att = data.attendance[child.id] || { signedIn: false };
    
    if (!att.signedIn) {
      const newAtt = { ...att, signedIn: true, signInTime: new Date().toLocaleTimeString() };
      const newData = { ...data, attendance: { ...data.attendance, [child.id]: newAtt } };
      setData(newData);
      
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
      
      alert(`${child.name} signed in!`);
      setChild(null);
      setPhone('');
    } else {
      setShowGuardianModal(true);
    }
  };

  const handleSignOut = () => {
    if (!selectedGuardian) {
      alert('Please select a guardian');
      return;
    }
    const newAtt = { ...data.attendance[child.id], signedIn: false, signOutGuardian: selectedGuardian };
    const newData = { ...data, attendance: { ...data.attendance, [child.id]: newAtt } };
    setData(newData);
    alert(`${child.name} signed out by ${selectedGuardian}`);
    setShowGuardianModal(false);
    setSelectedGuardian('');
    setChild(null);
    setPhone('');
  };

  const att = child ? data.attendance[child.id] : null;
  const isSignedIn = att?.signedIn;
  const latestAnnouncement = (data.announcements || []).slice(-1)[0];

  return React.createElement(
    'div',
    { className: 'bg-white p-6 space-y-6' },
    
    // Section Info
    React.createElement(
      'div',
      { className: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg' },
      React.createElement('p', { className: 'text-sm font-semibold' }, 'Active Section'),
      React.createElement('h2', { className: 'text-2xl font-bold' }, currentSection)
    ),

    // Leaders on duty
    onDutyLeaders.length > 0 && React.createElement(
      'div',
      { className: 'bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg' },
      React.createElement('h3', { className: 'font-bold text-lg mb-3' }, '👥 Leaders on Duty'),
      React.createElement(
        'div',
        { className: 'flex flex-wrap gap-3' },
        onDutyLeaders.map((leader, i) =>
          React.createElement(
            'div',
            {
              key: i,
              className: 'bg-white bg-opacity-20 px-4 py-2 rounded-full text-white font-semibold',
            },
            `${leader.name} (${leader.scoutName})`
          )
        )
      )
    ),

    // Message shown ONLY after signing in child
    showMessage && latestAnnouncement && React.createElement(
      'div',
      { className: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg' },
      React.createElement('h3', { className: 'font-bold text-lg mb-2' }, '📢 Important Message'),
      React.createElement('p', { className: 'text-white' }, latestAnnouncement.text)
    ),

    // Blocked warning
    blockedWarning && React.createElement(
      'div',
      { className: 'bg-red-50 border-2 border-red-500 p-6 rounded-lg' },
      React.createElement(
        'div',
        { className: 'flex gap-3 items-start' },
        React.createElement(AlertCircle, { className: 'w-8 h-8 text-red-600 flex-shrink-0 mt-1' }),
        React.createElement(
          'div',
          null,
          React.createElement('h3', { className: 'font-bold text-lg text-red-600 mb-2' }, '⛔ ACCESS DENIED'),
          React.createElement('p', { className: 'text-red-700 font-semibold' }, blockedWarning),
          React.createElement('p', { className: 'text-sm text-red-600 mt-2' }, 'This parent has been blocked from signing in children. Contact leadership.')
        )
      )
    ),

    // Counters
    React.createElement(
      'div',
      { className: 'flex justify-between items-center mb-6' },
      React.createElement(
        'div',
        null,
        React.createElement('div', { className: 'text-4xl font-bold text-green-600' }, signedInCount),
        React.createElement('p', { className: 'text-gray-600' }, 'signed in')
      ),
      React.createElement(
        'div',
        null,
        React.createElement('div', { className: 'text-4xl font-bold text-red-600' }, notHereCount),
        React.createElement('p', { className: 'text-gray-600' }, 'not here')
      )
    ),

    // Phone lookup
    React.createElement(
      'div',
      { className: 'bg-blue-50 p-6 rounded-lg space-y-4' },
      React.createElement('h3', { className: 'font-bold text-lg' }, '📱 Find Child by Phone'),
      React.createElement(PhoneInputSection, { 
        phone, 
        onPhoneChange: setPhone, 
        onFindChild: findChild 
      })
    ),

    // Quick Add Child
    React.createElement(
      'div',
      null,
      !showAddChild && React.createElement(
        'button',
        {
          onClick: () => setShowAddChild(true),
          className: 'w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600 flex items-center justify-center gap-2',
        },
        React.createElement(Plus, { className: 'w-5 h-5' }),
        'Child Not Listed? Quick Add'
      ),
      showAddChild && React.createElement(
        'div',
        { className: 'bg-purple-50 p-4 rounded-lg space-y-2' },
        React.createElement('p', { className: 'text-sm text-gray-600 font-semibold mb-2' }, `Add child to ${currentSection}:`),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Child name',
          value: newChildName,
          onChange: (e) => setNewChildName(e.target.value),
          className: 'w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500',
        }),
        React.createElement('input', {
          type: 'tel',
          placeholder: 'Parent phone',
          value: newChildPhone,
          onChange: (e) => setNewChildPhone(e.target.value),
          className: 'w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500',
        }),
        React.createElement(
          'div',
          { className: 'flex gap-2' },
          React.createElement(
            'button',
            {
              onClick: addQuickChild,
              className: 'flex-1 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600',
            },
            'Add & Sign In'
          ),
          React.createElement(
            'button',
            {
              onClick: () => setShowAddChild(false),
              className: 'flex-1 bg-gray-300 text-black py-2 rounded font-semibold hover:bg-gray-400',
            },
            'Cancel'
          )
        )
      )
    ),

    // Show child if found
    child && React.createElement(
      'div',
      { className: `p-6 rounded-lg border-2 ${isSignedIn ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'}` },
      React.createElement('h4', { className: 'font-bold text-2xl mb-2' }, child.name),
      React.createElement('p', { className: 'text-gray-600 mb-1' }, child.scoutName),
      React.createElement('p', { className: 'text-sm text-gray-500 mb-4' }, child.memberNumber),
      React.createElement('p', { className: `text-sm mb-4 ${isSignedIn ? 'text-green-600 font-semibold' : 'text-gray-600'}` }, isSignedIn ? `Signed in at ${att.signInTime}` : 'Not signed in yet'),
      React.createElement(
        'button',
        {
          onClick: toggleSignIn,
          className: `w-full py-3 rounded-lg text-white font-bold text-lg ${isSignedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`,
        },
        isSignedIn ? 'Sign Out' : 'Sign In'
      )
    ),

    // Guardian modal
    showGuardianModal && React.createElement(
      'div',
      { className: 'fixed inset-0 bg-black/50 flex items-center justify-center' },
      React.createElement(
        'div',
        { className: 'bg-white p-6 rounded-lg shadow-lg w-96' },
        React.createElement('h3', { className: 'text-xl font-bold mb-4' }, 'Choose Guardian'),
        React.createElement(
          'div',
          { className: 'space-y-2 mb-4 max-h-48 overflow-y-auto' },
          child.guardians.map((guardian, i) =>
            React.createElement(
              'button',
              {
                key: i,
                onClick: () => setSelectedGuardian(guardian),
                className: `w-full p-3 text-left border rounded ${selectedGuardian === guardian ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}`,
              },
              guardian
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'flex gap-2' },
          React.createElement('button', { onClick: handleSignOut, className: 'flex-1 bg-green-500 text-white py-2 rounded font-semibold' }, 'Confirm'),
          React.createElement('button', { onClick: () => { setShowGuardianModal(false); setSelectedGuardian(''); }, className: 'flex-1 bg-gray-300 text-black py-2 rounded font-semibold' }, 'Cancel')
        )
      )
    )
  );
};

export default SignInScreen;