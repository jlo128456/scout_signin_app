import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const AnnouncementsManager = ({ data, setData }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'section',
    targetSection: data.currentSection || 'Joeys',
    targetGroup: '',
    targetChildId: ''
  });

  useEffect(() => {
    const savedAnnouncements = localStorage.getItem('scout_announcements');
    if (savedAnnouncements) {
      try {
        let parsed = JSON.parse(savedAnnouncements);
        
        // Fix old announcements that have null/undefined targetSection
        parsed = parsed.map(ann => {
          if (ann.type === 'section' && !ann.targetSection) {
            return {
              ...ann,
              targetSection: data.currentSection || 'Joeys'
            };
          }
          return ann;
        });
        
        setData({ ...data, announcements: parsed });
      } catch (err) {
        console.error('Failed to load announcements from storage:', err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('scout_announcements', JSON.stringify(data.announcements || []));
  }, [data.announcements]);

  const announcements = data.announcements || [];
  const children = data.children || [];
  const sections = ['Joeys', 'Cubs', 'Scouts', 'Venturers'];

  const childrenInSection = children.filter(c => c.section === formData.targetSection);

  const handleAddAnnouncement = () => {
    if (!formData?.title?.trim() || !formData?.message?.trim()) {
      alert('Please enter title and message');
      return;
    }

    if (formData.type === 'individual' && !formData.targetChildId) {
      alert('Please select a child for individual message');
      return;
    }

    // Find the selected child's name and phone for display
    let childName = 'Unknown Child';
    let childPhone = '';
    if (formData.type === 'individual' && formData.targetChildId) {
      const selectedChild = children.find(c => String(c.id) === String(formData.targetChildId));
      if (selectedChild) {
        childName = selectedChild.name;
        childPhone = selectedChild.phone || '';
      }
    }

    // Ensure section has a value (only for section type)
    let targetSection = null;
    if (formData.type === 'section') {
      targetSection = formData.targetSection && formData.targetSection.trim() 
        ? formData.targetSection 
        : (data.currentSection || 'Joeys');
    }

    const newAnnouncement = {
      id: Date.now(),
      title: formData.title,
      message: formData.message,
      type: formData.type || 'section',
      targetSection: targetSection,
      targetGroup: (formData.type || 'section') === 'group' ? formData.targetGroup : null,
      targetChildId: (formData.type || 'section') === 'individual' ? formData.targetChildId : null,
      childName: (formData.type || 'section') === 'individual' ? childName : null,
      childPhone: (formData.type || 'section') === 'individual' ? childPhone : null,
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
      targetSection: announcement.type === 'section' ? (announcement.targetSection || (data.currentSection || 'Joeys')) : '',
      targetGroup: announcement.targetGroup || '',
      targetChildId: announcement.targetChildId || ''
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
      case 'all':
        return 'bg-yellow-50 border-yellow-300';
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
      case 'all':
        return 'bg-yellow-600 text-white';
      case 'individual':
        return 'bg-purple-600 text-white';
      case 'group':
        return 'bg-orange-600 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  const getTargetInfo = (announcement) => {
    const type = announcement.type || 'section';
    if (type === 'all') {
      return 'For All Sections (everyone)';
    } else if (type === 'section') {
      // Debug: show what we're getting
      const section = announcement.targetSection;
      if (!section) {
        console.warn('Missing targetSection:', announcement);
        return 'For All Scouts';  // Safe fallback
      }
      return `For ${section} Section`;
    } else if (type === 'group') {
      const group = announcement.targetGroup || 'Unknown Group';
      return `For ${group}`;
    } else if (type === 'individual') {
      // Use stored childName and childPhone (most reliable)
      if (announcement.childName && announcement.childPhone) {
        return `For ${announcement.childName} (${announcement.childPhone})`;
      }
      if (announcement.childName) {
        return `For ${announcement.childName}`;
      }
      // Fallback: try to find by name and phone match
      const child = children.find(c => 
        c.name === announcement.childName || 
        c.phone === announcement.childPhone
      );
      if (child) {
        return `For ${child.name} (${child.phone || 'No phone'})`;
      }
      return 'For Unknown Child';
    }
    return 'Announcement';
  };

  const getAnnouncementDate = (createdAt) => {
    try {
      const date = new Date(createdAt);
      if (isNaN(date.getTime())) {
        return 'Date not set';
      }
      return date.toLocaleString();
    } catch (err) {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-600">📢 Messages to Parents</h3>
        <button
          type="button"
          onClick={() => {
            if (showForm) {
              // Closing the form
              resetForm();
            } else {
              // Opening the form
              setShowForm(true);
              setEditingId(null);
              setFormData({
                title: '',
                message: '',
                type: 'section',
                targetSection: data.currentSection || 'Joeys',
                targetGroup: '',
                targetChildId: ''
              });
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add Message'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg border-2 border-blue-300">
          <div className="space-y-3">
            
            {/* Title */}
            <div>
              <label className="block font-semibold mb-1">Message Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Special Announcement"
                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-semibold mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message here..."
                rows={4}
                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Target Type */}
            <div>
              <label className="block font-semibold mb-1">Who Should See This?</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value, targetChildId: '', targetGroup: '', targetSection: '' })}
                className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="all">🌍 All Sections (everyone)</option>
                <option value="section">📘 Entire Section (all kids in section)</option>
                <option value="group">🟠 Specific Group (e.g., Cubs & Scouts)</option>
                <option value="individual">💜 Individual Child (one child only)</option>
              </select>
            </div>

            {/* Section Select */}
            {formData.type === 'section' && (
              <div>
                <label className="block font-semibold mb-1">Select Section</label>
                <select
                  value={formData.targetSection || 'Joeys'}
                  onChange={(e) => setFormData({ ...formData, targetSection: e.target.value })}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  {sections.map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>
            )}

            {/* All Sections Info */}
            {formData.type === 'all' && (
              <div className="bg-blue-100 border-2 border-blue-500 p-3 rounded-lg">
                <p className="font-semibold text-blue-700">✅ This message will go to ALL children in:</p>
                <p className="text-blue-600">Joeys, Cubs, Scouts, and Venturers</p>
              </div>
            )}

            {/* Group Input */}
            {formData.type === 'group' && (
              <div>
                <label className="block font-semibold mb-1">Group Name</label>
                <input
                  type="text"
                  value={formData.targetGroup}
                  onChange={(e) => setFormData({ ...formData, targetGroup: e.target.value })}
                  placeholder="e.g., Cubs & Scouts, Intermediate Group"
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}

            {/* Child Select */}
            {formData.type === 'individual' && (
              <div>
                <label className="block font-semibold mb-1">Select Child</label>
                <select
                  value={formData.targetChildId}
                  onChange={(e) => setFormData({ ...formData, targetChildId: e.target.value })}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">-- Select a child --</option>
                  {children.map(child => (
                    <option key={child.id} value={child.id}>
                      {child.name} ({child.section})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddAnnouncement}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
              >
                {editingId ? 'Update Message' : 'Post Message'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-3">
        {announcements.length > 0 ? (
          announcements.map(announcement => (
            <div
              key={announcement.id}
              className={`p-4 rounded-lg border-2 ${getTypeColor(announcement.type)}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`px-2 py-1 rounded text-sm font-bold ${getTypeBadgeColor(announcement.type)}`}>
                      {(announcement.type || 'section').toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      {getTargetInfo(announcement)}
                    </span>
                    <span className="text-xs text-gray-500">
                      Posted {getAnnouncementDate(announcement.createdAt)}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{announcement.title}</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{announcement.message}</p>
                </div>
                <div className="flex gap-2 ml-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(announcement)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(announcement.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>📭 No messages yet</p>
            <p className="text-sm">Click "Add Message" to create an announcement</p>
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-lg mt-4">
        <h4 className="font-bold text-blue-600 mb-2">💡 Message Types:</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>🌍 All Sections: Show to EVERY child (Joeys, Cubs, Scouts, Venturers)</li>
          <li>📘 Section: Show to ALL children in one section</li>
          <li>🟠 Group: Show to specific group (e.g., Cubs & Scouts)</li>
          <li>💜 Individual: Show to ONE child only</li>
          <li>💡 Parents only see messages for their child!</li>
        </ul>
      </div>
    </div>
  );
};

export default AnnouncementsManager;