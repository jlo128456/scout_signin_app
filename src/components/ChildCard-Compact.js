import React from 'react';
import { User, Smile } from 'lucide-react';

const ChildCard = ({ child, leader, onSignInOut, buttonLabel, status }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg shadow-md border-2 border-green-200">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Smile className="w-8 h-8 text-green-600" />
          <div>
            <h3 className="text-xl font-bold">{child.name}</h3>
            <p className="text-sm text-gray-600">Scout: {child.scoutName}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Member:</span>
            <span className="font-semibold">{child.memberNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-semibold">{child.phone}</span>
          </div>
          {leader && (
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-600">Leader:</span>
              <div className="text-right">
                <p className="font-semibold">{leader.name}</p>
                <p className="text-xs text-gray-500">{leader.scoutName}</p>
              </div>
            </div>
          )}
        </div>
        
        {status && (
          <p className="text-sm font-semibold text-green-700 bg-green-100 p-2 rounded text-center">
            {status}
          </p>
        )}
        
        <button
          onClick={onSignInOut}
          className={`w-full py-3 rounded-lg font-bold text-white ${
            buttonLabel.includes('Sign In')
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default ChildCard;
