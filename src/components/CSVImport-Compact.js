import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const CSVImport = ({ onImportFamilies, onImportSchedule }) => {
  const [status, setStatus] = useState('Ready');

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(l => l.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const obj = {};
      let field = '', inQuotes = false;
      let col = 0;
      for (let char of (line + ',')) {
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
          obj[headers[col]] = field.trim().replace(/^"|"$/g, '');
          field = '';
          col++;
        } else field += char;
      }
      return obj;
    });
  };

  const handleFamilies = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStatus('Importing families...');
    const reader = new FileReader();
    reader.onload = (evt) => {
      const families = parseCSV(evt.target.result).map((row, i) => ({
        id: `child-${row.memberNumber || i}`,
        name: row.childName,
        memberNumber: row.memberNumber,
        scoutName: row.scoutName,
        phone: row.phone,
        guardians: row.guardians ? row.guardians.split('|').map(g => g.trim()) : [],
        leaderName: row.leaderName,
        leaderScoutName: row.leaderScoutName,
      }));
      onImportFamilies(families);
      setStatus(`✅ Imported ${families.length} families!`);
      setTimeout(() => setStatus('Ready'), 2000);
    };
    reader.readAsText(file);
  };

  const handleSchedule = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStatus('Importing schedule...');
    const reader = new FileReader();
    reader.onload = (evt) => {
      const schedule = parseCSV(evt.target.result).map((row, i) => ({
        id: `event-${i}`,
        date: row.date,
        day: row.day,
        startTime: row.startTime,
        endTime: row.endTime,
        location: row.location,
        activities: row.activities,
      }));
      onImportSchedule(schedule);
      setStatus(`✅ Imported ${schedule.length} days!`);
      setTimeout(() => setStatus('Ready'), 2000);
    };
    reader.readAsText(file);
  };

  return React.createElement(
    'div',
    { className: 'bg-white p-6 rounded-lg shadow' },
    React.createElement('h2', { className: 'text-2xl font-bold mb-4 flex items-center gap-2' }, React.createElement(Upload, { className: 'w-6 h-6' }), 'Import Data'),
    React.createElement('p', { className: 'text-gray-600 mb-4' }, status),
    React.createElement(
      'div',
      { className: 'space-y-4' },
      React.createElement(
        'div',
        { className: 'p-4 bg-blue-50 rounded' },
        React.createElement('label', { className: 'block font-semibold mb-2' }, '👨‍👩‍👧 Families CSV'),
        React.createElement('input', { type: 'file', accept: '.csv', onChange: handleFamilies, className: 'w-full p-2 border rounded' })
      ),
      React.createElement(
        'div',
        { className: 'p-4 bg-green-50 rounded' },
        React.createElement('label', { className: 'block font-semibold mb-2' }, '📅 Schedule CSV'),
        React.createElement('input', { type: 'file', accept: '.csv', onChange: handleSchedule, className: 'w-full p-2 border rounded' })
      )
    )
  );
};

export default CSVImport;
