import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const PhoneInputSection = ({ onFindChild, onPhoneChange, phone }) => {
  const [error, setError] = useState('');

  const handleFind = () => {
    if (!phone || phone.length < 10) {
      setError('Enter valid phone number');
      return;
    }
    setError('');
    onFindChild(phone);
  };

  return React.createElement(
    'div',
    { className: 'p-6 bg-white rounded-lg shadow' },
    React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, '📱 Find Child'),
    React.createElement(
      'div',
      { className: 'space-y-3' },
      React.createElement(
        'div',
        { className: 'relative' },
        React.createElement('input', {
          type: 'tel',
          placeholder: 'Parent phone number',
          value: phone,
          onChange: (e) => {
            onPhoneChange(e.target.value);
            setError('');
          },
          className: 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500',
        })
      ),
      error && React.createElement('p', { className: 'text-red-600 text-sm' }, error),
      React.createElement(
        'button',
        {
          onClick: handleFind,
          className: 'w-full bg-blue-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600',
        },
        React.createElement(Phone, { className: 'w-5 h-5' }),
        'Find Child'
      )
    )
  );
};

export default PhoneInputSection;
