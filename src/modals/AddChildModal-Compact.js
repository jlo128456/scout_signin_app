import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const AddChildModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({ name: '', phone: '', scoutName: '', memberNumber: '' });

  const handleAdd = () => {
    if (!form.name || !form.phone) {
      alert('Name and phone required');
      return;
    }
    onAdd({
      id: `child-${Date.now()}`,
      name: form.name,
      phone: form.phone,
      scoutName: form.scoutName,
      memberNumber: form.memberNumber,
      guardians: [form.name],
      leaderName: '',
      leaderScoutName: '',
    });
    onClose();
  };

  const Input = ({ label, keyName, type = 'text' }) => (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        type={type}
        value={form[keyName]}
        onChange={(e) => setForm({ ...form, [keyName]: e.target.value })}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Child
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3 mb-4">
          <Input label="Child Name" keyName="name" />
          <Input label="Phone" keyName="phone" type="tel" />
          <Input label="Scout Name" keyName="scoutName" />
          <Input label="Member Number" keyName="memberNumber" />
        </div>
        
        <button
          onClick={handleAdd}
          className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600"
        >
          Add Child
        </button>
      </div>
    </div>
  );
};

export default AddChildModal;
