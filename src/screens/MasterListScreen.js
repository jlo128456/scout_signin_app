import React, { useState } from 'react';
import { MASTER_LIST_BY_NUMBER } from '../data/demoData';
import { Phone, User, MapPin } from 'lucide-react';

const MasterListScreen = ({ data, onSelectChild }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [filterSection, setFilterSection] = useState('All');

  const sections = ['All', 'Joeys', 'Cubs', 'Scouts', 'Venturers'];
  
  const getScoutList = () => {
    const list = Object.values(MASTER_LIST_BY_NUMBER);
    if (filterSection === 'All') return list;
    return list.filter(scout => scout.section === filterSection);
  };

  const scouts = getScoutList();
  const selectedScout = selectedNumber ? MASTER_LIST_BY_NUMBER[selectedNumber] : null;

  const getSectionColor = (section) => {
    const colors = {
      'Joeys': 'bg-yellow-50 border-yellow-300',
      'Cubs': 'bg-orange-50 border-orange-300',
      'Scouts': 'bg-green-50 border-green-300',
      'Venturers': 'bg-blue-50 border-blue-300',
    };
    return colors[section] || 'bg-gray-50 border-gray-300';
  };

  const getSectionBgColor = (section) => {
    const colors = {
      'Joeys': 'from-yellow-500 to-yellow-600',
      'Cubs': 'from-orange-500 to-orange-600',
      'Scouts': 'from-green-500 to-green-600',
      'Venturers': 'from-blue-500 to-blue-600',
    };
    return colors[section] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-white p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
        <p className="text-sm font-semibold">📋 Master List</p>
        <h2 className="text-2xl font-bold">All Scouts Directory</h2>
      </div>

      {/* Section Filter */}
      <div className="space-y-3">
        <p className="font-semibold text-gray-700">Filter by Section:</p>
        <div className="flex flex-wrap gap-2">
          {sections.map(section => (
            <button
              key={section}
              onClick={() => setFilterSection(section)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterSection === section
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Scout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {scouts.map(scout => (
          <button
            key={scout.number}
            onClick={() => setSelectedNumber(scout.number)}
            className={`p-4 border-2 rounded-lg text-left transition transform hover:scale-105 ${
              selectedNumber === scout.number
                ? 'border-purple-500 bg-purple-50 shadow-lg'
                : `${getSectionColor(scout.section)} border-opacity-50 hover:border-opacity-100`
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-3xl font-bold text-purple-600">{scout.number}</div>
                <p className="font-bold text-gray-800 mt-1">{scout.name}</p>
                <div className="flex items-center gap-1 text-xs text-gray-600 mt-2">
                  <MapPin className="w-3 h-3" />
                  {scout.section}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${getSectionBgColor(scout.section)}`}>
                {scout.section[0]}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Scout Details */}
      {selectedScout && (
        <div className={`border-2 border-purple-300 bg-gradient-to-r ${getSectionBgColor(selectedScout.section)} rounded-lg p-6 text-white`}>
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-90">Scout Number</p>
              <h3 className="text-4xl font-bold">{selectedScout.number}</h3>
            </div>

            <div>
              <p className="text-sm opacity-90">Name</p>
              <p className="text-xl font-bold">{selectedScout.name}</p>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <p className="text-lg font-semibold">{selectedScout.section}</p>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <p className="text-lg font-mono">{selectedScout.phone}</p>
            </div>

            <button
              onClick={() => {
                if (onSelectChild) {
                  const child = data.children.find(c => c.id === selectedScout.childId);
                  if (child) {
                    onSelectChild(child);
                  }
                }
              }}
              className="w-full bg-white text-purple-600 font-bold py-3 rounded-lg hover:bg-opacity-90 transition mt-4"
            >
              👉 Quick Sign-In This Scout
            </button>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          💡 Click a scout number above to view details, then use "Quick Sign-In" to jump to the Sign-In tab with that scout selected.
        </p>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <p className="text-gray-600">
          Showing {scouts.length} scout{scouts.length !== 1 ? 's' : ''} {filterSection !== 'All' ? `in ${filterSection}` : ''}
        </p>
      </div>
    </div>
  );
};

export default MasterListScreen;
