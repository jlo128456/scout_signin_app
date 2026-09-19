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

  return React.createElement(
    'div',
    { className: 'fixed inset-0 bg-black/50 flex items-center justify-center z-50' },
    React.createElement(
      'div',
      { className: 'bg-white rounded-lg shadow-2xl w-96 p-6' },
      React.createElement(
        'div',
        { className: 'flex items-center justify-between mb-4' },
        React.createElement(
          'div',
          { className: 'flex items-center gap-2' },
          React.createElement(Lock, { className: 'w-6 h-6 text-red-600' }),
          React.createElement('h2', { className: 'text-2xl font-bold text-red-600' }, 'Admin Access')
        ),
        React.createElement(
          'button',
          { onClick: onClose, className: 'hover:bg-gray-100 p-1 rounded' },
          React.createElement(X, { className: 'w-6 h-6' })
        )
      ),

      React.createElement('p', { className: 'text-gray-600 mb-4' }, 'Enter the admin PIN to access setup features.'),

      error && React.createElement(
        'div',
        { className: 'bg-red-50 border-2 border-red-300 p-3 rounded-lg mb-4 text-red-600 font-semibold' },
        error
      ),

      React.createElement(
        'div',
        { className: 'space-y-4' },
        React.createElement('input', {
          type: 'password',
          placeholder: 'Enter PIN',
          value: pin,
          onChange: (e) => {
            setPin(e.target.value);
            setError('');
          },
          onKeyPress: handleKeyPress,
          className: 'w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-blue-500',
          autoFocus: true,
        }),

        React.createElement(
          'div',
          { className: 'flex gap-2' },
          React.createElement(
            'button',
            {
              onClick: handleSubmit,
              className: 'flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700'
            },
            'Unlock'
          ),
          React.createElement(
            'button',
            {
              onClick: onClose,
              className: 'flex-1 bg-gray-300 text-black py-3 rounded-lg font-bold hover:bg-gray-400'
            },
            'Cancel'
          )
        ),

        React.createElement(
          'p',
          { className: 'text-center text-sm text-gray-500 mt-4' },
          '💡 Hint: For this demo, the PIN is in the instructions'
        )
      )
    )
  );
};

export default AdminPinModal;
