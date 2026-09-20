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

  const input = (label, key) =>
    React.createElement(
      'div',
      null,
      React.createElement('label', { className: 'block text-sm font-semibold mb-1' }, label),
      React.createElement('input', {
        value: form[key],
        onChange: (e) => setForm({ ...form, [key]: e.target.value }),
        className: 'w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500',
      })
    );

  return React.createElement(
    'div',
    { className: 'fixed inset-0 bg-black/50 flex items-center justify-center' },
    React.createElement(
      'div',
      { className: 'bg-white p-6 rounded-lg shadow-lg w-96' },
      React.createElement(
        'div',
        { className: 'flex justify-between items-center mb-4' },
        React.createElement('h2', { className: 'text-xl font-bold flex items-center gap-2' }, React.createElement(Plus, { className: 'w-5 h-5' }), 'Add Leader'),
        React.createElement('button', { onClick: onClose, className: 'text-gray-500 hover:text-black' }, React.createElement(X, { className: 'w-5 h-5' }))
      ),
      React.createElement(
        'div',
        { className: 'space-y-3 mb-4' },
        input('Leader Name', 'name'),
        input('Scout Name (e.g., Skipper)', 'scoutName')
      ),
      React.createElement(
        'button',
        { onClick: handleAdd, className: 'w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600' },
        'Add Leader'
      )
    )
  );
};

export default AddLeaderModal;
