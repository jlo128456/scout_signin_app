import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const AnnouncementsManager = ({ data, setData }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'section', // 'section', 'group', 'individual'
    targetSection: data.currentSection || 'Joeys',
    targetGroup: '', // For group messages (e.g., "Cubs & Scouts")
    targetChildId: '' // For individual messages
  });

  const announcements = data.announcements || [];
  const children = data.children || [];
  const sections = ['Joeys', 'Cubs', 'Scouts', 'Venturers'];

  // Get children in current section
  const childrenInSection = children.filter(c => c.section === formData.targetSection);

  const handleAddAnnouncement = () => {
    if (!formData.title.trim() || !formData.message.trim()) {
      alert('Please enter title and message');
      return;
    }

    if (formData.type === 'individual' && !formData.targetChildId) {
      alert('Please select a child for individual message');
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      targetSection: formData.type === 'section' ? formData.targetSection : null,
      targetGroup: formData.type === 'group' ? formData.targetGroup : null,
      targetChildId: formData.type === 'individual' ? formData.targetChildId : null,
      createdAt: new Date().toISOString(),
      createdBy: 'Leader'
    };

    const updatedAnnouncements = editingId
      ? announcements.map(a => a.id === editingId ? { ...a, ...newAnnouncement, id: a.id } : a)
      : [...announcements, newAnnouncement];

    setData({ ...data, announcements: updatedAnnouncements });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'section',
      targetSection: data.currentSection || 'Joeys',
      targetGroup: '',
      targetChildId: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      message: announcement.message,
      type: announcement.type,
      targetSection: announcement.targetSection,
      targetGroup: announcement.targetGroup,
      targetChildId: announcement.targetChildId
    });
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this announcement?')) {
      setData({
        ...data,
        announcements: announcements.filter(a => a.id !== id)
      });
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'individual':
        return 'bg-purple-50 border-purple-300';
      case 'group':
        return 'bg-orange-50 border-orange-300';
      default:
        return 'bg-blue-50 border-blue-300';
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'individual':
        return 'bg-purple-600 text-white';
      case 'group':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  const getTargetInfo = (announcement) => {
    if (announcement.type === 'section') {
      return `For ${announcement.targetSection} Section`;
    } else if (announcement.type === 'group') {
      return `For ${announcement.targetGroup}`;
    } else if (announcement.type === 'individual') {
      const child = children.find(c => c.id === announcement.targetChildId);
      return `For ${child?.name || 'Unknown Child'}`;
    }
  };

  return React.createElement(
    'div',
    { className: 'space-y-4' },

    // Header
    React.createElement(
      'div',
      { className: 'flex justify-between items-center mb-4' },
      React.createElement('h3', { className: 'text-xl font-bold text-blue-600' }, '📢 Messages to Parents'),
      React.createElement(
        'button',
        {
          onClick: () => {
            setShowForm(!showForm);
            setEditingId(null);
            resetForm();
          },
          className: 'bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2'
        },
        React.createElement(Plus, { className: 'w-5 h-5' }),
        showForm ? 'Cancel' : 'Add Message'
      )
    ),

    // Add/Edit Form
    showForm && React.createElement(
      'div',
      { className: 'bg-gray-50 p-4 rounded-lg border-2 border-blue-300' },
      React.createElement(
        'div',
        { className: 'space-y-3' },
        
        // Title
        React.createElement(
          'div',
          null,
          React.createElement('label', { className: 'block font-semibold mb-1' }, 'Message Title'),
          React.createElement('input', {
            type: 'text',
            value: formData.title,
            onChange: (e) => setFormData({ ...formData, title: e.target.value }),
            placeholder: 'e.g., Special Announcement',
            className: 'w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
          })
        ),

        // Message
        React.createElement(
          'div',
          null,
          React.createElement('label', { className: 'block font-semibold mb-1' }, 'Message'),
          React.createElement('textarea', {
            value: formData.message,
            onChange: (e) => setFormData({ ...formData, message: e.target.value }),
            placeholder: 'Write your message here...',
            rows: 4,
            className: 'w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
          })
        ),

        // Target Type
        React.createElement(
          'div',
          null,
          React.createElement('label', { className: 'block font-semibold mb-1' }, 'Who Should See This?'),
          React.createElement(
            'select',
            {
              value: formData.type,
              onChange: (e) => setFormData({ ...formData, type: e.target.value, targetChildId: '', targetGroup: '' }),
              className: 'w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
            },
            React.createElement('option', { value: 'section' }, '📘 Entire Section (all kids in section)'),
            React.createElement('option', { value: 'group' }, '🟠 Specific Group (e.g., Cubs & Scouts)'),
            React.createElement('option', { value: 'individual' }, '💜 Individual Child (one child only)')
          )
        ),

        // Section Select (if type is 'section')
        formData.type === 'section' && React.createElement(
          'div',
          null,
          React.createElement('label', { className: 'block font-semibold mb-1' }, 'Select Section'),
          React.createElement(
            'select',
            {
              value: formData.targetSection,
              onChange: (e) => setFormData({ ...formData, targetSection: e.target.value }),
              className: 'w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
            },
            sections.map(section =>
              React.createElement('option', { key: section, value: section }, section)
            )
          )
        ),

        // Group Input (if type is 'group')
        formData.type === 'group' && React.createElement(
          'div',
          null,
          React.createElement('label', { className: 'block font-semibold mb-1' }, 'Group Name'),
          React.createElement('input', {
            type: 'text',
            value: formData.targetGroup,
            onChange: (e) => setFormData({ ...formData, targetGroup: e.target.value }),
            placeholder: 'e.g., Cubs & Scouts, Intermediate Group',
            className: 'w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
          })
        ),

        // Child Select (if type is 'individual')
        formData.type === 'individual' && React.createElement(
          'div',
          null,
          React.createElement('label', { className: 'block font-semibold mb-1' }, 'Select Child'),
          React.createElement(
            'select',
            {
              value: formData.targetChildId,
              onChange: (e) => setFormData({ ...formData, targetChildId: e.target.value }),
              className: 'w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none'
            },
            React.createElement('option', { value: '' }, '-- Select a child --'),
            children.map(child =>
              React.createElement('option', { key: child.id, value: child.id }, 
                `${child.name} (${child.section})`)
            )
          )
        ),

        // Buttons
        React.createElement(
          'div',
          { className: 'flex gap-2' },
          React.createElement(
            'button',
            {
              onClick: handleAddAnnouncement,
              className: 'flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700'
            },
            editingId ? 'Update Message' : 'Post Message'
          ),
          React.createElement(
            'button',
            {
              onClick: resetForm,
              className: 'flex-1 bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-gray-500'
            },
            'Cancel'
          )
        )
      )
    ),

    // Announcements List
    React.createElement(
      'div',
      { className: 'space-y-3' },
      announcements.length > 0
        ? announcements.map(announcement =>
            React.createElement(
              'div',
              {
                key: announcement.id,
                className: `p-4 rounded-lg border-2 ${getTypeColor(announcement.type)}`
              },
              React.createElement(
                'div',
                { className: 'flex justify-between items-start mb-2' },
                React.createElement(
                  'div',
                  { className: 'flex-1' },
                  React.createElement(
                    'div',
                    { className: 'flex items-center gap-2 mb-1 flex-wrap' },
                    React.createElement(
                      'span',
                      { className: `px-2 py-1 rounded text-sm font-bold ${getTypeBadgeColor(announcement.type)}` },
                      announcement.type.toUpperCase()
                    ),
                    React.createElement(
                      'span',
                      { className: 'text-sm font-semibold text-gray-700' },
                      getTargetInfo(announcement)
                    ),
                    React.createElement(
                      'span',
                      { className: 'text-xs text-gray-500' },
                      `Posted ${new Date(announcement.createdAt).toLocaleString()}`
                    )
                  ),
                  React.createElement('h4', { className: 'font-bold text-lg mb-1' }, announcement.title),
                  React.createElement('p', { className: 'text-gray-700 whitespace-pre-wrap' }, announcement.message)
                ),
                React.createElement(
                  'div',
                  { className: 'flex gap-2 ml-2' },
                  React.createElement(
                    'button',
                    {
                      onClick: () => handleEdit(announcement),
                      className: 'bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
                    },
                    React.createElement(Edit2, { className: 'w-4 h-4' })
                  ),
                  React.createElement(
                    'button',
                    {
                      onClick: () => handleDelete(announcement.id),
                      className: 'bg-red-500 text-white p-2 rounded hover:bg-red-600'
                    },
                    React.createElement(Trash2, { className: 'w-4 h-4' })
                  )
                )
              )
            )
          )
        : React.createElement(
            'div',
            { className: 'text-center py-8 text-gray-500' },
            React.createElement('p', null, '📭 No messages yet'),
            React.createElement('p', { className: 'text-sm' }, 'Click "Add Message" to create an announcement')
          )
    ),

    // Info box
    React.createElement(
      'div',
      { className: 'bg-blue-50 border-2 border-blue-300 p-4 rounded-lg mt-4' },
      React.createElement('h4', { className: 'font-bold text-blue-600 mb-2' }, '💡 Message Types:'),
      React.createElement('ul', { className: 'text-sm text-gray-700 space-y-2' },
        React.createElement('li', null, '📘 Section: Show to ALL children in a section'),
        React.createElement('li', null, '🟠 Group: Show to specific group (e.g., Cubs & Scouts)'),
        React.createElement('li', null, '💜 Individual: Show to ONE child only'),
        React.createElement('li', null, '💡 Parents only see messages for their child!')
      )
    )
  );
};

export default AnnouncementsManager;