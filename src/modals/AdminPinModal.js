import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { ADMIN_PIN } from '../data/demoData';

const AdminPinModal = ({ onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (pin === ADMIN_PIN) {
      onSuccess();
      onClose();
    } else {
      setError('❌ Incorrect PIN. Try again.');
      setPin('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-96 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-red-600">Admin Access</h2>
          </div>
          <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">Enter the admin PIN to access setup features.</p>

        {error && (
          <div className="bg-red-50 border-2 border-red-300 p-3 rounded-lg mb-4 text-red-600 font-semibold">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-blue-500"
            autoFocus={true}
          />

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
            >
              Unlock
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-black py-3 rounded-lg font-bold hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            💡 Hint: For this demo, the PIN is in the instructions
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPinModal;