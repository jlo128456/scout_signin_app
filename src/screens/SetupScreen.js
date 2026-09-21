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
    return (
      <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-20">
        <div className="text-center mb-6">
          <Lock className="w-16 h-16 mx-auto text-red-600 mb-4" />
          <h2 className="text-2xl font-bold">Setup Protected</h2>
          <p className="text-gray-600 mt-2">Enter PIN to access setup</p>
        </div>
        <input
          type="password"
          placeholder="Enter PIN"
          value={pinEntered}
          onChange={(e) => setPinEntered(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handlePinSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
        >
          Unlock
        </button>
      </div>
    );
  }

  const defaultSections = ['Joeys', 'Cub Scouts', 'Scouts', 'Venturers', 'Rovers'];
  const allSections = [...(data.sections && data.sections.length > 0 ? data.sections : defaultSections)];
  const allChildren = data.children || [];
  const allLeaders = data.leaders || [];
  const blockedParents = data.blockedParents || [];

  return (
    <div className="bg-white p-6 rounded-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">⚙️ Setup</h2>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600"
        >
          Lock
        </button>
      </div>

      {/* Change PIN */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-bold text-lg mb-3">🔐 Change PIN</h3>
        <p className="text-sm text-gray-600 mb-3">Current PIN: {correctPin}</p>
        <div className="space-y-2">
          <input
            type="password"
            placeholder="New PIN"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-500"
          />
          <input
            type="password"
            placeholder="Confirm new PIN"
            value={confirmNewPin}
            onChange={(e) => setConfirmNewPin(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-purple-500 mb-2"
          />
          <button
            onClick={changePin}
            className="w-full bg-purple-500 text-white py-2 rounded font-semibold hover:bg-purple-600"
          >
            Update PIN
          </button>
        </div>
      </div>

      {/* Export/Import Master List */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h3 className="font-bold text-lg mb-3">💾 Master List Backup</h3>
        <p className="text-sm text-gray-600 mb-3">Save or load your complete master list</p>
        <div className="flex gap-2 mb-3">
          <button
            onClick={exportData}
            className="flex-1 bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export List
          </button>
          <label className="flex-1 bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-5 h-5" />
            Import List
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Blocked Parents */}
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 className="font-bold text-lg mb-3">🚫 Child Protection - Blocked Parents</h3>
        <p className="text-sm text-gray-600 mb-3">Block undesirable or banned parents from signing in</p>
        <div className="space-y-2 mb-3">
          <input
            type="tel"
            placeholder="Parent phone to block"
            value={blockedPhone}
            onChange={(e) => setBlockedPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-red-500"
          />
          <textarea
            placeholder="Reason for blocking (optional)"
            value={blockedReason}
            onChange={(e) => setBlockedReason(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-red-500 h-16"
          />
          <button
            onClick={addBlockedParent}
            className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600"
          >
            Block Parent
          </button>
        </div>

        {blockedParents.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-600 mb-2">Blocked: {blockedParents.length} parent(s)</p>
            {blockedParents.map((blocked) => (
              <div
                key={blocked.id}
                className="bg-white p-3 rounded border border-red-300 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold text-red-600">{blocked.phone}</p>
                  <p className="text-xs text-gray-600">{blocked.reason}</p>
                  <p className="text-xs text-gray-500">{blocked.blockedDate}</p>
                </div>
                <button
                  onClick={() => unblockParent(blocked.id)}
                  className="text-green-500 hover:text-green-700 font-bold"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section Selector */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-bold text-lg mb-3">🎯 Select Active Section/Night</h3>
        <p className="text-sm text-gray-600 mb-3">Currently showing: {currentSection}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {allSections.map((section, i) => (
            <button
              key={i}
              onClick={() => updateSection(section)}
              className={`px-4 py-2 rounded font-semibold ${
                currentSection === section
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New section name"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={addSection}
            className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Master Children List */}
      <div className="border-t pt-6">
        <h3 className="font-bold text-lg mb-4">👶 All Children (Master List)</h3>
        
        <div className="space-y-3 mb-4 bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-600 font-semibold mb-2">
            {editingChildId ? 'Update child:' : 'Add child to master list:'}
          </p>
          <input
            type="text"
            placeholder="Child name"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="tel"
            placeholder="Parent phone"
            value={childPhone}
            onChange={(e) => setChildPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500"
          />
          <select
            value={childSection}
            onChange={(e) => setChildSection(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500"
          >
            {allSections.map((sec, i) => (
              <option key={i} value={sec}>{sec}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={addChild}
              className={`flex-1 ${editingChildId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white py-2 rounded font-semibold flex items-center justify-center gap-2`}
            >
              {editingChildId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {editingChildId ? 'Update Child' : 'Add Child'}
            </button>
            {editingChildId && (
              <button
                onClick={cancelEdit}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <p className="text-sm font-semibold text-gray-600 mb-2">Total: {allChildren.length} children</p>
        {allChildren.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allChildren.map((child) => (
              <div
                key={child.id}
                className={`p-3 rounded border ${
                  currentSection === child.section
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{child.name}</p>
                    <p className="text-xs text-gray-600">{child.phone} • {child.section}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editChild(child)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteChild(child.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Master Leaders List */}
      <div className="border-t pt-6">
        <h3 className="font-bold text-lg mb-4">👥 All Leaders (Master List)</h3>
        
        <div className="space-y-3 mb-4 bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-600 font-semibold mb-2">
            {editingLeaderId ? 'Update leader:' : 'Add leader to master list:'}
          </p>
          <input
            type="text"
            placeholder="Leader full name"
            value={leaderName}
            onChange={(e) => setLeaderName(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Scout name (Skipper, Leader, etc)"
            value={leaderScoutName}
            onChange={(e) => setLeaderScoutName(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500"
          />
          <select
            value={leaderSection}
            onChange={(e) => setLeaderSection(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2 focus:outline-none focus:border-blue-500"
          >
            {allSections.map((sec, i) => (
              <option key={i} value={sec}>{sec}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={addLeader}
              className={`flex-1 ${editingLeaderId ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white py-2 rounded font-semibold flex items-center justify-center gap-2`}
            >
              {editingLeaderId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {editingLeaderId ? 'Update Leader' : 'Add Leader'}
            </button>
            {editingLeaderId && (
              <button
                onClick={cancelEdit}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <p className="text-sm font-semibold text-gray-600 mb-2">Total: {allLeaders.length} leaders</p>
        {allLeaders.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allLeaders.map((leader) => (
              <div
                key={leader.id}
                className={`p-3 rounded border ${
                  currentSection === leader.section
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{leader.name}</p>
                    <p className="text-xs text-gray-600">{leader.scoutName} • {leader.section}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editLeader(leader)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteLeader(leader.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages to Parents */}
      <div className="border-t pt-6">
        <AnnouncementsManager data={data} setData={setData} />
      </div>

      {/* CSV Import */}
      <div className="border-t pt-6">
        <h3 className="font-bold text-lg mb-4">📥 Optional: Import CSV</h3>
        <CSVImport
          onImportFamilies={(fams) => setData({ 
            ...data, 
            children: [...(data.children || []), ...fams.map(f => ({ ...f, id: Date.now() + Math.random(), section: currentSection }))] 
          })}
          onImportSchedule={(sched) => setData({ ...data, schedule: sched })}
        />
      </div>
    </div>
  );
};

export default SetupScreen;
