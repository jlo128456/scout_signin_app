import React from 'react';
import { LogIn, LogOut } from 'lucide-react';

const SignInButton = ({ isSignedIn, onSignInOut, disabled }) => {
  const icon = isSignedIn ? React.createElement(LogOut, { className: 'w-5 h-5' }) : React.createElement(LogIn, { className: 'w-5 h-5' });
  const label = isSignedIn ? 'Sign Out' : 'Sign In';
  const color = isSignedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';

  return React.createElement(
    'button',
    {
      onClick: onSignInOut,
      disabled,
      className: `w-full ${color} text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    },
    icon,
    label
  );
};

export default SignInButton;
