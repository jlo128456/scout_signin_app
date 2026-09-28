import React, { useState, useEffect } from 'react';
import PhoneInputSection from '../components/PhoneInputSection-Compact';
import { Plus, AlertCircle } from 'lucide-react';
import AnnouncementsManager from '../components/AnnouncementsManager';

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
  // Never pop up someone else's private message
  const latestAnnouncement = (data.announcements || []).filter(a => a.type !== 'individual').slice(-1)[0];

  return (
    <div className="signin-root">
      <style>{`
        .signin-root { height: 100%; display: flex; flex-direction: column; gap: 8px;
          background: #fff; border-radius: 10px; padding: 8px; box-sizing: border-box; overflow: hidden; }
        .signin-top { display: flex; gap: 8px; align-items: stretch; flex-shrink: 0; }
        .signin-body { flex: 1 1 auto; min-height: 0; display: grid; gap: 8px;
          grid-template-columns: 1fr; grid-template-rows: minmax(0, auto) minmax(0, 1fr); }
        .signin-col { min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
        .signin-msgs { max-height: 22vh; }
        @media (min-width: 768px) {
          .signin-body { grid-template-columns: 1fr 1fr; grid-template-rows: minmax(0, 1fr); }
          .signin-msgs { max-height: none; }
        }
        @media (max-width: 767px) {
          .signin-root { height: auto; min-height: 100%; overflow: visible; }
          .signin-col { overflow: visible; }
        }
      `}</style>

      {/* Top bar: section + leaders + counters */}
      <div className="signin-top">
        <div className="flex-1 rounded-lg px-3 py-2" style={{ background: "linear-gradient(to right, #a855f7, #9333ea)", color: "#fff", minWidth: 0 }}>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xs font-semibold" style={{ color: "#fff", opacity: 0.85 }}>Active Section</span>
            <span className="text-base md:text-lg font-bold" style={{ color: "#fff" }}>{currentSection}</span>
          </div>
          {onDutyLeaders.length > 0 && (
            <p className="text-xs" style={{ color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              👥 {onDutyLeaders.map(l => `${l.name}${l.scoutName ? ` (${l.scoutName})` : ""}`).join(" · ")}
            </p>
          )}
        </div>
        <div className="text-center rounded-lg px-3 py-1" style={{ backgroundColor: "#f0fdf4" }}>
          <div className="text-xl font-bold" style={{ color: "#16a34a" }}>{signedInCount}</div>
          <p className="text-xs text-gray-600">signed in</p>
        </div>
        <div className="text-center rounded-lg px-3 py-1" style={{ backgroundColor: "#fef2f2" }}>
          <div className="text-xl font-bold" style={{ color: "#dc2626" }}>{notHereCount}</div>
          <p className="text-xs text-gray-600">not here</p>
        </div>
      </div>

      <div className="signin-body">
        {/* Left (or top on phones): messages */}
        <div className="signin-col signin-msgs">
          {showMessage && latestAnnouncement && (
            <div className="rounded-lg px-3 py-2" style={{ background: "linear-gradient(to right, #3b82f6, #2563eb)", color: "#fff" }}>
              <p className="font-bold text-sm" style={{ color: "#fff" }}>📢 {latestAnnouncement.title}</p>
              <p className="text-sm" style={{ color: "#fff" }}>{latestAnnouncement.message}</p>
            </div>
          )}
          {/* All/Section/Group for everyone, Individual only once that child is found */}
          <AnnouncementsManager data={data} mode="parent" child={child} />
        </div>

        {/* Right (or below on phones): find, add, sign in */}
        <div className="signin-col">
          {blockedWarning && (
            <div className="rounded-lg px-3 py-2 border-2" style={{ backgroundColor: "#fef2f2", borderColor: "#ef4444" }}>
              <div className="flex gap-2 items-start">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
                <div>
                  <p className="font-bold text-sm" style={{ color: "#dc2626" }}>⛔ ACCESS DENIED</p>
                  <p className="text-sm font-semibold" style={{ color: "#b91c1c" }}>{blockedWarning}</p>
                  <p className="text-xs" style={{ color: "#dc2626" }}>Contact leadership.</p>
                </div>
              </div>
            </div>
          )}

          {/* Show child if found (goes to the top so Sign In is always visible) */}
          {child && (
            <div className="rounded-lg px-3 py-2 border-2" style={{ backgroundColor: isSignedIn ? "#f0fdf4" : "#f9fafb", borderColor: isSignedIn ? "#86efac" : "#d1d5db" }}>
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <h4 className="font-bold text-lg">{child.name}</h4>
                <span className="text-xs text-gray-500">{child.scoutName} · {child.memberNumber}</span>
              </div>
              <p className="text-xs mb-2" style={{ color: isSignedIn ? "#16a34a" : "#4b5563", fontWeight: isSignedIn ? 600 : 400 }}>
                {isSignedIn ? `Signed in at ${att.signInTime}` : 'Not signed in yet'}
              </p>
              <button
                type="button"
                onClick={toggleSignIn}
                className="w-full py-2 rounded-lg font-bold text-base"
                style={{ backgroundColor: isSignedIn ? "#ef4444" : "#22c55e", color: "#fff" }}
              >
                {isSignedIn ? 'Sign Out' : 'Sign In'}
              </button>
            </div>
          )}

          {/* Phone lookup */}
          <div className="rounded-lg p-2 border-2" style={{ backgroundColor: "#eff6ff", borderColor: "#93c5fd" }}>
            <PhoneInputSection
              phone={phone}
              onPhoneChange={setPhone}
              onFindChild={findChild}
            />
          </div>

          {/* Quick Add Child */}
          {!showAddChild ? (
            <button
              type="button"
              onClick={() => setShowAddChild(true)}
              className="w-full py-2 rounded-lg font-bold flex items-center justify-center gap-2 text-sm"
              style={{ backgroundColor: "#a855f7", color: "#fff", flexShrink: 0 }}
            >
              <Plus className="w-4 h-4" />
              Child Not Listed? Quick Add
            </button>
          ) : (
            <div className="rounded-lg p-2 space-y-2" style={{ backgroundColor: "#faf5ff" }}>
              <p className="text-xs text-gray-600 font-semibold">Add child to {currentSection}:</p>
              <input
                type="text"
                placeholder="Child name"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border rounded focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Parent phone"
                value={newChildPhone}
                onChange={(e) => setNewChildPhone(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border rounded focus:outline-none"
              />
              <div className="flex gap-2">
                <button type="button" onClick={addQuickChild}
                  className="flex-1 py-1.5 rounded font-semibold text-sm"
                  style={{ backgroundColor: "#22c55e", color: "#fff" }}>
                  Add & Sign In
                </button>
                <button type="button" onClick={() => setShowAddChild(false)}
                  className="flex-1 py-1.5 rounded font-semibold text-sm"
                  style={{ backgroundColor: "#d1d5db", color: "#000" }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guardian modal */}
      {showGuardianModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-96">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Choose Guardian</h3>
            <div className="space-y-2 mb-3 md:mb-4 max-h-48 overflow-y-auto">
              {child.guardians.map((guardian, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedGuardian(guardian)}
                  className={`w-full p-2 md:p-3 text-left text-sm md:text-base border rounded ${
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
                type="button"
                onClick={handleSignOut}
                className="flex-1 bg-green-500 text-white py-1.5 md:py-2 rounded font-semibold text-sm md:text-base"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowGuardianModal(false);
                  setSelectedGuardian('');
                }}
                className="flex-1 bg-gray-300 text-black py-1.5 md:py-2 rounded font-semibold text-sm md:text-base"
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