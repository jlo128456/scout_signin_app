import React, { useState } from 'react';

const InstructionsModal = ({ onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!onClose) return null; // Don't render if not open

  return (
    <>
      {/* DARK BACKDROP - Blocks everything behind (z-40) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(3px)',
          zIndex: 40,
          pointerEvents: 'auto',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />

      {/* MODAL CONTENT - Centered in middle (z-50) */}
      {!isMinimized && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 50,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              maxWidth: '600px',
              width: '90vw',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              pointerEvents: 'auto',
            }}
          >
            {/* HEADER */}
            <div
              style={{
                padding: '1.5rem',
                borderBottom: '2px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f9fafb',
                flexShrink: 0,
              }}
            >
              <h2 style={{ margin: 0, color: '#111827', fontSize: '1.5rem', fontWeight: 700 }}>
                📖 Tab Guide
              </h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '0.25rem',
                  lineHeight: '1',
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div
              style={{
                overflowY: 'auto',
                flex: 1,
                padding: '1.5rem',
                fontSize: '0.95rem',
                lineHeight: '1.7',
                color: '#374151',
              }}
            >
              {/* SIGN-IN TAB */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#111827', fontSize: '1.125rem', fontWeight: 700 }}>
                  📱 Sign-In
                </h3>
                <p style={{ margin: '0.5rem 0' }}>
                  Find children by phone and mark them as signed in or out
                </p>
                <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
                  <li style={{ margin: '0.25rem 0' }}>Enter parent's phone number</li>
                  <li style={{ margin: '0.25rem 0' }}>See all children for that parent</li>
                  <li style={{ margin: '0.25rem 0' }}>Click child's card to toggle sign in/out</li>
                  <li style={{ margin: '0.25rem 0' }}>Green = Signed In | Red = Not Here</li>
                  <li style={{ margin: '0.25rem 0' }}>Changes save automatically</li>
                </ul>
              </div>

              {/* MASTER LIST TAB */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#111827', fontSize: '1.125rem', fontWeight: 700 }}>
                  📋 Master List
                </h3>
                <p style={{ margin: '0.5rem 0' }}>
                  View all scouts numbered 1-20, click to quick sign-in
                </p>
                <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
                  <li style={{ margin: '0.25rem 0' }}>Shows all scouts in order (1-20)</li>
                  <li style={{ margin: '0.25rem 0' }}>Click any scout card to quick sign in</li>
                  <li style={{ margin: '0.25rem 0' }}>Green = Signed In | Red = Not Here</li>
                  <li style={{ margin: '0.25rem 0' }}>Perfect for fast check-ins</li>
                  <li style={{ margin: '0.25rem 0' }}>No phone lookup needed</li>
                </ul>
              </div>

              {/* ROSTER TAB */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#111827', fontSize: '1.125rem', fontWeight: 700 }}>
                  👥 Roster
                </h3>
                <p style={{ margin: '0.5rem 0' }}>
                  View scouts organized by section (Joeys, Cubs, Scouts, Venturers)
                </p>
                <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
                  <li style={{ margin: '0.25rem 0' }}>Organized by age group/section</li>
                  <li style={{ margin: '0.25rem 0' }}>See all scouts in your group</li>
                  <li style={{ margin: '0.25rem 0' }}>Click to update individual sign-in status</li>
                  <li style={{ margin: '0.25rem 0' }}>Shows current attendance status</li>
                  <li style={{ margin: '0.25rem 0' }}>Easy section-by-section overview</li>
                </ul>
              </div>

              {/* LOG TAB */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#111827', fontSize: '1.125rem', fontWeight: 700 }}>
                  📊 Log
                </h3>
                <p style={{ margin: '0.5rem 0' }}>
                  View attendance history and export to Excel
                </p>
                <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
                  <li style={{ margin: '0.25rem 0' }}>View all past attendance records</li>
                  <li style={{ margin: '0.25rem 0' }}>See who attended each event</li>
                  <li style={{ margin: '0.25rem 0' }}>Export button to save as Excel file</li>
                  <li style={{ margin: '0.25rem 0' }}>Perfect for reporting and records</li>
                  <li style={{ margin: '0.25rem 0' }}>Keep track of attendance history</li>
                </ul>
              </div>

              {/* SETUP TAB */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#111827', fontSize: '1.125rem', fontWeight: 700 }}>
                  ⚙️ Setup
                </h3>
                <p style={{ margin: '0.5rem 0' }}>
                  Add leaders, create announcements, manage admin settings
                </p>
                <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
                  <li style={{ margin: '0.25rem 0' }}>Add leader profiles and contact info</li>
                  <li style={{ margin: '0.25rem 0' }}>Create announcements for parents</li>
                  <li style={{ margin: '0.25rem 0' }}>Manage admin PIN (1234 default)</li>
                  <li style={{ margin: '0.25rem 0' }}>Configure app settings</li>
                  <li style={{ margin: '0.25rem 0' }}>Admin only access</li>
                </ul>
              </div>

              {/* HOW TO SIGN IN */}
              <div style={{ 
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f0fdf4',
                borderLeft: '4px solid #22c55e',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#166534', fontSize: '1rem', fontWeight: 700 }}>
                  ✅ How to Sign In
                </h3>
                <ol style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#333' }}>
                  <li style={{ margin: '0.5rem 0' }}>Go to <strong>Sign-In</strong> tab</li>
                  <li style={{ margin: '0.5rem 0' }}>Enter parent's last 9 digits of phone</li>
                  <li style={{ margin: '0.5rem 0' }}>Select each child attending</li>
                  <li style={{ margin: '0.5rem 0' }}>Card will turn green (Signed In)</li>
                  <li style={{ margin: '0.5rem 0' }}>Done! Attendance is recorded</li>
                </ol>
              </div>

              {/* PHONE NUMBERS SECTION */}
              <div style={{ 
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: '#fef3c7',
                borderLeft: '4px solid #eab308',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#92400e', fontSize: '1rem', fontWeight: 700 }}>
                  ☎️ Contact Numbers
                </h3>
                
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ margin: '0.5rem 0', fontWeight: 600 }}>🟡 Scouts:</p>
                  <p style={{ margin: '0.25rem 0 0 1rem', fontFamily: 'monospace', color: '#333', fontSize: '0.9rem' }}>
                    0412345611, 0412345612, 0412345613, 0412345614, 0412345615
                  </p>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ margin: '0.5rem 0', fontWeight: 600 }}>🔴 Venturers:</p>
                  <p style={{ margin: '0.25rem 0 0 1rem', fontFamily: 'monospace', color: '#333', fontSize: '0.9rem' }}>
                    0412345616, 0412345617, 0412345618, 0412345619, 0412345620
                  </p>
                </div>

                <div style={{ 
                  marginTop: '0.75rem',
                  padding: '0.75rem',
                  backgroundColor: '#dcfce7',
                  borderRadius: '0.375rem',
                  fontSize: '0.85rem'
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>💡 Tip:</p>
                  <p style={{ margin: 0 }}>Just type the last 9 digits (e.g., "412345601") - the system adds the "04" automatically</p>
                </div>
              </div>

              {/* ICONS GUIDE */}
              <div style={{ 
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: '#e0e7ff',
                borderLeft: '4px solid #6366f1',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#3730a3', fontSize: '1rem', fontWeight: 700 }}>
                  🎯 Status Icons
                </h3>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#333' }}>
                  <li style={{ margin: '0.25rem 0' }}>🟢 <strong>Green</strong> = Signed In (Present)</li>
                  <li style={{ margin: '0.25rem 0' }}>🔴 <strong>Red</strong> = Not Here (Absent)</li>
                  <li style={{ margin: '0.25rem 0' }}>⚪ <strong>White</strong> = Not checked yet</li>
                </ul>
              </div>

              {/* FEATURES */}
              <div style={{ 
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f3e8ff',
                borderLeft: '4px solid #a855f7',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.75rem', color: '#6b21a8', fontSize: '1rem', fontWeight: 700 }}>
                  ⭐ Key Features
                </h3>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#333' }}>
                  <li style={{ margin: '0.25rem 0' }}>✅ Real-time attendance tracking</li>
                  <li style={{ margin: '0.25rem 0' }}>✅ One-tap sign in/out toggle</li>
                  <li style={{ margin: '0.25rem 0' }}>✅ Organized by section</li>
                  <li style={{ margin: '0.25rem 0' }}>✅ Export to Excel for reports</li>
                  <li style={{ margin: '0.25rem 0' }}>✅ Parent phone lookup</li>
                  <li style={{ margin: '0.25rem 0' }}>✅ Quick master list view</li>
                  <li style={{ margin: '0.25rem 0' }}>✅ Attendance history log</li>
                </ul>
              </div>

              {/* HELP SECTION */}
              <div style={{ 
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: '#eff6ff',
                borderLeft: '4px solid #3b82f6',
                borderRadius: '0.375rem'
              }}>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#1e40af', fontSize: '1rem', fontWeight: 700 }}>
                  ❓ Need Help?
                </h3>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                  This instructions panel is always available. Click the minimize button to collapse it, or close it and click "Show Instructions" anytime.
                </p>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                  <strong>Pro Tip:</strong> Use the Master List tab for fastest check-ins. Use the Roster tab to see your group organized by section.
                </p>
              </div>
            </div>

            {/* FOOTER - BUTTONS */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderTop: '2px solid #e5e7eb',
                display: 'flex',
                gap: '1rem',
                backgroundColor: '#f9fafb',
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setIsMinimized(true)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#d1d5db'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  backgroundColor: '#e5e7eb',
                  color: '#111827',
                  border: 'none',
                  borderRadius: '0.625rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s',
                }}
              >
                Minimize
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.625rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MINIMIZED BADGE - Small button when minimized (z-45) */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 45,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
          }}
          title="Show Instructions"
        >
          📖
        </button>
      )}
    </>
  );
};

export default InstructionsModal;
