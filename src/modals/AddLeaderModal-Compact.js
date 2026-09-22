import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const AddLeaderModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({ name: '', scoutName: '' });

  const handleAdd = () => {
    if (!form.name) {
      alert('Leader name required');
      return;
    }
    onAdd({
      id: `leader-${Date.now()}`,
      name: form.name,
      scoutName: form.scoutName,
    });
    onClose();
  };

  const Input = ({ label, keyName }) => (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
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
            Add Leader
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3 mb-4">
          <Input label="Leader Name" keyName="name" />
          <Input label="Scout Name (e.g., Skipper)" keyName="scoutName" />
        </div>
        
        <button
          onClick={handleAdd}
          className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600"
        >
          Add Leader
        </button>
      </div>
    </div>
  );
};

export default AddLeaderModal;
