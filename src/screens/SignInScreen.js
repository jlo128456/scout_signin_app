import React, { useState, useEffect } from 'react';
import PhoneInputSection from '../components/PhoneInputSection-Compact';
import { Plus, AlertCircle } from 'lucide-react';

const DisplayAnnouncementsForChild = ({ announcements, currentChild }) => {
  if (!announcements || announcements.length === 0) return null;
  if (!currentChild) return null;

  const relevantAnnouncements = announcements.filter(announcement => {
    if (announcement.type === 'individual') {
      // Use string comparison for ID match (child ID may be number or string)
      return String(announcement.targetChildId) === String(currentChild.id);
    }
    if (announcement.type === 'section') {
      // Use string comparison for section (case-sensitive but handle type differences)
      return String(announcement.targetSection) === String(currentChild.section);
    }
    return false;
  });

  if (relevantAnnouncements.length === 0) return null;

  const getTypeColor = (type) => {
    switch (type) {
      case 'individual':
        return 'bg-purple-50 border-l-4 border-purple-500';
      default:
        return 'bg-blue-50 border-l-4 border-blue-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'individual':
        return '💜';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="mb-6 space-y-3">
      <h3 className="font-bold text-lg text-gray-700">📢 Message for {currentChild.name}</h3>
      {relevantAnnouncements.map(announcement => (
        <div
          key={announcement.id}
          className={`p-4 rounded-lg ${getTypeColor(announcement.type)}`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{getTypeIcon(announcement.type)}</span>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{announcement.title}</h4>
              <p className="text-gray-700 text-sm whitespace-pre-wrap mt-1">{announcement.message}</p>
              <p className="text-xs text-gray-500 mt-2">Posted: {new Date(announcement.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

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
    const newAtt = { 
      ...data.attendance[child.id], 
      signedIn: false, 
      signOutGuardian: selectedGuardian,
      signOutTime: new Date().toLocaleTimeString() 
    };
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

  return (
    <div className="bg-white p-6 space-y-6">
      {/* Scout Logo Badge */}
      <div className="text-center mb-6">
        <span className="text-6xl">⛺</span>
        <h1 className="text-3xl font-bold text-green-600 mt-2">Scout Sign-In</h1>
      </div>
      
      {/* Section Info */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
        <p className="text-sm font-semibold">Active Section</p>
        <h2 className="text-2xl font-bold">{currentSection}</h2>
      </div>

      {/* Leaders on duty */}
      {onDutyLeaders.length > 0 && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-3">👥 Leaders on Duty</h3>
          <div className="flex flex-wrap gap-3">
            {onDutyLeaders.map((leader, i) => (
              <div
                key={i}
                className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-white font-semibold"
              >
                {leader.name} ({leader.scoutName})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message shown after signing in */}
      {showMessage && latestAnnouncement && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-2">📢 Important Message</h3>
          <p className="text-white font-semibold">{latestAnnouncement.title}</p>
          <p className="text-white mt-2">{latestAnnouncement.message}</p>
        </div>
      )}

      {/* Blocked warning */}
      {blockedWarning && (
        <div className="bg-red-50 border-2 border-red-500 p-6 rounded-lg">
          <div className="flex gap-3 items-start">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-red-600 mb-2">⛔ ACCESS DENIED</h3>
              <p className="text-red-700 font-semibold">{blockedWarning}</p>
              <p className="text-sm text-red-600 mt-2">This parent has been blocked from signing in children. Contact leadership.</p>
            </div>
          </div>
        </div>
      )}

      {/* Counters */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-4xl font-bold text-green-600">{signedInCount}</div>
          <p className="text-gray-600">signed in</p>
        </div>
        <div>
          <div className="text-4xl font-bold text-red-600">{notHereCount}</div>
          <p className="text-gray-600">not here</p>
        </div>
      </div>

      {/* Phone lookup */}
      <div className="bg-blue-50 p-6 rounded-lg space-y-4">
        <h3 className="font-bold text-lg">📱 Find Child by Phone</h3>
        <PhoneInputSection 
          phone={phone}
          onPhoneChange={setPhone}
          onFindChild={findChild}
        />
      </div>

      {/* Quick Add Child */}
      <div>
        {!showAddChild ? (
          <button
            onClick={() => setShowAddChild(true)}
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Child Not Listed? Quick Add
          </button>
        ) : (
          <div className="bg-purple-50 p-4 rounded-lg space-y-2">
            <p className="text-sm text-gray-600 font-semibold mb-2">Add child to {currentSection}:</p>
            <input
              type="text"
              placeholder="Child name"
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500"
            />
            <input
              type="tel"
              placeholder="Parent phone"
              value={newChildPhone}
              onChange={(e) => setNewChildPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={addQuickChild}
                className="flex-1 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600"
              >
                Add & Sign In
              </button>
              <button
                onClick={() => setShowAddChild(false)}
                className="flex-1 bg-gray-300 text-black py-2 rounded font-semibold hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Show announcements for this child */}
      {child && <DisplayAnnouncementsForChild announcements={data.announcements || []} currentChild={child} />}

      {/* Show child if found */}
      {child && (
        <div className={`p-6 rounded-lg border-2 ${isSignedIn ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'}`}>
          <h4 className="font-bold text-2xl mb-2">{child.name}</h4>
          <p className="text-gray-600 mb-1">{child.scoutName}</p>
          <p className="text-sm text-gray-500 mb-4">{child.memberNumber}</p>
          <p className={`text-sm mb-4 ${isSignedIn ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
            {isSignedIn ? `Signed in at ${att.signInTime}` : 'Not signed in yet'}
          </p>
          <button
            onClick={toggleSignIn}
            className={`w-full py-3 rounded-lg text-white font-bold text-lg ${
              isSignedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isSignedIn ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      )}

      {/* Guardian modal */}
      {showGuardianModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Choose Guardian</h3>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {child.guardians.map((guardian, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedGuardian(guardian)}
                  className={`w-full p-3 text-left border rounded ${
                    selectedGuardian === guardian
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {guardian}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSignOut}
                className="flex-1 bg-green-500 text-white py-2 rounded font-semibold"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowGuardianModal(false);
                  setSelectedGuardian('');
                }}
                className="flex-1 bg-gray-300 text-black py-2 rounded font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInScreen;