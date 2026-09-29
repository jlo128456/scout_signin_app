import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// Demo phone numbers — matches src/data/demoData.js
// ---------------------------------------------------------------------------
const DEMO_CHILDREN = [
  {
    section: 'Joeys', icon: '🟤', color: '#92400e',
    kids: [
      { n: 1, name: 'Tommy Wilson', phone: '0412345601', guardians: 'Sarah Wilson, John Wilson' },
      { n: 2, name: 'Emma Smith', phone: '0412345602', guardians: 'Lisa Smith, Mike Smith' },
      { n: 3, name: 'Liam Brown', phone: '0412345603', guardians: 'Angela Brown' },
      { n: 4, name: 'Sophie Johnson', phone: '0412345604', guardians: 'Patricia Johnson, Robert Johnson' },
      { n: 5, name: 'Oliver Davis', phone: '0412345605', guardians: 'Jennifer Davis' },
    ],
  },
  {
    section: 'Cubs', icon: '🟡', color: '#a16207',
    kids: [
      { n: 6, name: 'Mia Taylor', phone: '0412345606', guardians: 'Margaret Taylor, David Taylor' },
      { n: 7, name: 'Lucas Martinez', phone: '0412345607', guardians: 'Rosa Martinez' },
      { n: 8, name: 'Ava Anderson', phone: '0412345608', guardians: 'Karen Anderson, James Anderson' },
      { n: 9, name: 'Noah Thompson', phone: '0412345609', guardians: 'Susan Thompson' },
      { n: 10, name: 'Isabella Garcia', phone: '0412345610', guardians: 'Carmen Garcia, Antonio Garcia' },
    ],
  },
  {
    section: 'Scouts', icon: '🟢', color: '#166534',
    kids: [
      { n: 11, name: 'Ethan Moore', phone: '0412345611', guardians: 'Patricia Moore' },
      { n: 12, name: 'Olivia Jackson', phone: '0412345612', guardians: 'Mary Jackson, Peter Jackson' },
      { n: 13, name: 'Mason White', phone: '0412345613', guardians: 'Linda White' },
      { n: 14, name: 'Charlotte Lee', phone: '0412345614', guardians: 'Margaret Lee, Thomas Lee' },
      { n: 15, name: 'Lucas Harris', phone: '0412345615', guardians: 'Christine Harris' },
    ],
  },
  {
    section: 'Venturers', icon: '🔴', color: '#991b1b',
    kids: [
      { n: 16, name: 'Samuel Martin', phone: '0412345616', guardians: 'Patricia Martin' },
      { n: 17, name: 'Grace Robinson', phone: '0412345617', guardians: 'Elizabeth Robinson, William Robinson' },
      { n: 18, name: 'Benjamin Clark', phone: '0412345618', guardians: 'Nancy Clark' },
      { n: 19, name: 'Amelia Rodriguez', phone: '0412345619', guardians: 'Maria Rodriguez, Carlos Rodriguez' },
      { n: 20, name: 'Jack Lewis', phone: '0412345620', guardians: 'Sandra Lewis' },
    ],
  },
];

const DEMO_LEADERS = [
  { section: 'Joeys', names: 'Sarah Miller, Mark Peterson' },
  { section: 'Cubs', names: 'Jessica Chen, Andrew Thompson' },
  { section: 'Scouts', names: 'Rebecca Walsh, Christopher Bond' },
  { section: 'Venturers', names: 'Victoria Hart (Daniel Price is off duty)' },
];

// ---------------------------------------------------------------------------
// Small style helpers
// ---------------------------------------------------------------------------
const h3 = { marginTop: 0, marginBottom: '0.5rem', color: '#111827', fontSize: '1.125rem', fontWeight: 700 };
const li = { margin: '0.25rem 0' };
const ul = { margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 };
const box = (bg, border) => ({
  marginTop: '1.5rem', padding: '1rem', backgroundColor: bg,
  borderLeft: `4px solid ${border}`, borderRadius: '0.375rem',
});
const boxTitle = (color) => ({ marginTop: 0, marginBottom: '0.75rem', color, fontSize: '1rem', fontWeight: 700 });
const cell = { padding: '0.3rem 0.5rem', borderBottom: '1px solid #fde68a', verticalAlign: 'top' };

const InstructionsModal = ({ isOpen, setIsOpen }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsMinimized(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* DARK BACKDROP */}
      <div
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(3px)', zIndex: 40, pointerEvents: 'auto',
        }}
        onClick={handleClose}
      />

      {/* MODAL CONTENT */}
      {!isMinimized && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 50 }}>
          <div
            style={{
              backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              maxWidth: '640px', width: '92vw', maxHeight: '85vh',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* HEADER */}
            <div
              style={{
                padding: '1.25rem 1.5rem', borderBottom: '2px solid #e5e7eb', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', flexShrink: 0,
              }}
            >
              <h2 style={{ margin: 0, color: '#111827', fontSize: '1.5rem', fontWeight: 700 }}>📖 How to Use This Demo</h2>
              <button
                onClick={handleClose}
                style={{
                  background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6b7280',
                  padding: '0.25rem', lineHeight: '1', width: '2rem', height: '2rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div style={{ overflowY: 'auto', flex: 1, padding: '1.5rem', fontSize: '0.95rem', lineHeight: '1.7', color: '#374151' }}>

              {/* DEMO NOTICE */}
              <div style={{ ...box('#fef2f2', '#ef4444'), marginTop: 0 }}>
                <p style={{ margin: 0, fontWeight: 600, color: '#b91c1c' }}>
                  ⚠️ Demo mode: all data resets when you refresh or close the app. Admin PIN is <strong>1234</strong>.
                </p>
              </div>

              {/* WHAT'S NEW */}
              <div style={box('#faf5ff', '#a855f7')}>
                <h3 style={boxTitle('#6b21a8')}>🆕 What's Changed</h3>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#333' }}>
                  <li style={li}>
                    <strong>Leaders on Duty now show</strong> in the purple Active Section bar, next to the section name.
                  </li>
                  <li style={li}>
                    <strong>Short and full section names both work.</strong> Leaders and children are found whichever name was used:
                    <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1.25rem' }}>
                      <li style={li}>"Joeys" = "Joey Scouts"</li>
                      <li style={li}>"Cubs" = "Cub Scouts"</li>
                      <li style={li}>"Scouts" = "Scouts"</li>
                      <li style={li}>"Venturers" = "Venturer Scouts"</li>
                      <li style={li}>"Rovers" = "Rover Scouts"</li>
                    </ul>
                    Capital letters and extra spaces don't matter either.
                  </li>
                  <li style={li}>
                    If nobody is rostered on, the bar says <em>"None on duty — set in Roster"</em>.
                  </li>
                  <li style={li}>
                    <strong>Counters are per section.</strong> "Signed in" and "Not here" only count children
                    in the active section. "Not here" no longer includes children who are already signed in.
                  </li>
                  <li style={li}>
                    <strong>Sign-out fix:</strong> children added with Quick Add can now be signed out without the app crashing.
                  </li>
                </ul>
              </div>

              {/* ANNOUNCEMENTS */}
              <div style={box('#fefce8', '#eab308')}>
                <h3 style={boxTitle('#854d0e')}>📢 Messages from Leaders (What's Changed)</h3>
                <p style={{ margin: '0.25rem 0' }}>
                  Messages appear in the yellow panel on the Sign-In screen. Leaders post them from Setup, and each message has a target:
                </p>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#333' }}>
                  <li style={li}>🌏 <strong>Everyone</strong> — shown to all parents in every section</li>
                  <li style={li}>🏕️ <strong>Section</strong> — only shown when that section is active</li>
                  <li style={li}>👥 <strong>Group</strong> — shown to the selected group of families</li>
                  <li style={li}>
                    🔒 <strong>Individual</strong> — private to one child. It only appears <em>after</em> that
                    child is found by phone number, so other parents never see it.
                  </li>
                </ul>
                <p style={{ margin: '0.5rem 0 0' }}>
                  After a sign-in, the latest public message pops up in blue for 5 seconds. Private
                  (individual) messages are never used for this pop-up.
                </p>
              </div>

              {/* SIGN-IN TAB */}
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={h3}>📱 Sign-In</h3>
                <ul style={ul}>
                  <li style={li}>Type the parent's phone number and tap <strong>Find Child</strong></li>
                  <li style={li}>The child's card appears — tap <strong>Sign In</strong> (green)</li>
                  <li style={li}>To sign out, find the child again, tap <strong>Sign Out</strong> (red) and pick the guardian</li>
                  <li style={li}>Not on the list? Use <strong>Child Not Listed? Quick Add</strong></li>
                  <li style={li}>
                    <strong>Only the active section is searched.</strong> To find a Scouts child, set the active section to Scouts in Setup first.
                  </li>
                </ul>
              </div>

              {/* MASTER LIST TAB */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={h3}>📋 Master List</h3>
                <ul style={ul}>
                  <li style={li}>All 20 demo children, numbered 1–20</li>
                  <li style={li}>Filter by section, tap a child, then tap <strong>Quick Sign-In</strong></li>
                  <li style={li}>No phone lookup needed</li>
                </ul>
              </div>

              {/* ROSTER TAB */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={h3}>👥 Roster</h3>
                <ul style={ul}>
                  <li style={li}>Shows the leaders for the active section</li>
                  <li style={li}>Toggle each leader <strong>On Duty / Off Duty</strong></li>
                  <li style={li}>On-duty leaders appear straight away in the Sign-In header</li>
                </ul>
              </div>

              {/* LOG TAB */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={h3}>📊 Log</h3>
                <ul style={ul}>
                  <li style={li}>Sign-in and sign-out times, plus which guardian collected each child</li>
                  <li style={li}>Export to a spreadsheet for records</li>
                </ul>
              </div>

              {/* SETUP TAB */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={h3}>⚙️ Setup (PIN 1234)</h3>
                <ul style={ul}>
                  <li style={li}>Change the <strong>active section</strong></li>
                  <li style={li}>Add children and leaders</li>
                  <li style={li}>Post messages (Everyone / Section / Group / Individual)</li>
                  <li style={li}>Block a parent's phone number</li>
                </ul>
              </div>

              {/* DEMO PHONE NUMBERS — every child */}
              <div style={box('#fef3c7', '#eab308')}>
                <h3 style={boxTitle('#92400e')}>☎️ Demo Phone Numbers (all children)</h3>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem' }}>
                  Each number finds one child. Remember to set that child's section as active first.
                </p>

                {DEMO_CHILDREN.map((grp) => (
                  <div key={grp.section} style={{ marginBottom: '1rem' }}>
                    <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: grp.color }}>
                      {grp.icon} {grp.section}
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                          <tr style={{ textAlign: 'left', color: '#78350f' }}>
                            <th style={cell}>#</th>
                            <th style={cell}>Child</th>
                            <th style={cell}>Phone</th>
                            <th style={cell}>Guardians (for sign-out)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {grp.kids.map((k) => (
                            <tr key={k.n}>
                              <td style={cell}>{k.n}</td>
                              <td style={{ ...cell, fontWeight: 600 }}>{k.name}</td>
                              <td style={{ ...cell, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{k.phone}</td>
                              <td style={cell}>{k.guardians}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                <div style={{ padding: '0.75rem', backgroundColor: '#dcfce7', borderRadius: '0.375rem', fontSize: '0.85rem' }}>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 600 }}>💡 Tip:</p>
                  <p style={{ margin: 0 }}>
                    Type the full number (0412345601) or just the last 9 digits (412345601). Both work.
                  </p>
                </div>
              </div>

              {/* LEADERS */}
              <div style={box('#e0e7ff', '#6366f1')}>
                <h3 style={boxTitle('#3730a3')}>👥 Demo Leaders on Duty</h3>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#333' }}>
                  {DEMO_LEADERS.map((l) => (
                    <li key={l.section} style={li}><strong>{l.section}:</strong> {l.names}</li>
                  ))}
                </ul>
              </div>

              {/* QUICK TEST */}
              <div style={box('#f0fdf4', '#22c55e')}>
                <h3 style={boxTitle('#166534')}>✅ Quick Test (2 minutes)</h3>
                <ol style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#333' }}>
                  <li style={li}>Setup → PIN <strong>1234</strong> → set active section to <strong>Cubs</strong></li>
                  <li style={li}>Sign-In → check Jessica Chen and Andrew Thompson appear in the purple bar</li>
                  <li style={li}>Enter <strong>0412345606</strong> → Find Child → Mia Taylor → Sign In</li>
                  <li style={li}>"Signed in" goes to 1 and "Not here" drops to 4</li>
                  <li style={li}>Find her again → Sign Out → choose Margaret Taylor → Confirm</li>
                </ol>
              </div>

              {/* STATUS */}
              <div style={box('#f3f4f6', '#9ca3af')}>
                <h3 style={boxTitle('#374151')}>🎯 Colours</h3>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#333' }}>
                  <li style={li}>🟢 <strong>Green</strong> = Signed in</li>
                  <li style={li}>🔴 <strong>Red</strong> = Not here / Sign out button</li>
                  <li style={li}>⛔ <strong>Red warning box</strong> = Blocked parent, contact leadership</li>
                </ul>
              </div>

              {/* HELP */}
              <div style={box('#eff6ff', '#3b82f6')}>
                <h3 style={boxTitle('#1e40af')}>❓ Need Help?</h3>
                <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                  <strong>Child not found?</strong> Check the active section matches the child's section.
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                  <strong>No leaders showing?</strong> Go to Roster and switch a leader to On Duty.
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                  Tap <strong>Minimize</strong> to keep this guide handy as a 📖 button in the corner.
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div
              style={{
                padding: '1rem 1.5rem', borderTop: '2px solid #e5e7eb', display: 'flex', gap: '1rem',
                backgroundColor: '#f9fafb', flexShrink: 0,
              }}
            >
              <button
                onClick={() => setIsMinimized(true)}
                style={{
                  flex: 1, padding: '0.75rem 1rem', backgroundColor: '#e5e7eb', color: '#111827', border: 'none',
                  borderRadius: '0.625rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
                }}
              >
                Minimize
              </button>
              <button
                onClick={handleClose}
                style={{
                  flex: 1, padding: '0.75rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none',
                  borderRadius: '0.625rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MINIMIZED BADGE */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 45, width: '60px', height: '60px',
            borderRadius: '50%', backgroundColor: '#3b82f6', color: 'white', border: 'none', fontSize: '1.5rem',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
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