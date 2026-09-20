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

  const input = (label, key, type = 'text') =>
    React.createElement(
      'div',
      null,
      React.createElement('label', { className: 'block text-sm font-semibold mb-1' }, label),
      React.createElement('input', {
        type,
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
        React.createElement('h2', { className: 'text-xl font-bold flex items-center gap-2' }, React.createElement(Plus, { className: 'w-5 h-5' }), 'Add Child'),
        React.createElement('button', { onClick: onClose, className: 'text-gray-500 hover:text-black' }, React.createElement(X, { className: 'w-5 h-5' }))
      ),
      React.createElement(
        'div',
        { className: 'space-y-3 mb-4' },
        input('Child Name', 'name'),
        input('Phone', 'phone', 'tel'),
        input('Scout Name', 'scoutName'),
        input('Member Number', 'memberNumber')
      ),
      React.createElement(
        'button',
        { onClick: handleAdd, className: 'w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600' },
        'Add Child'
      )
    )
  );
};

export default AddChildModal;
