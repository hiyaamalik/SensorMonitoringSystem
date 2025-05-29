import React from 'react';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'realtime', label: 'Real Time' },
    { id: 'history', label: 'History & Report' },
    { id: 'map', label: 'Map' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'user', label: 'User Management' },
    { id: 'sensoractivity', label: 'Sensor Management' },
    { id: 'profile', label: 'My Profile' },
    { id: 'logout', label: 'Log out' }
  ];

  const handleItemClick = (itemId) => {
    if (itemId === 'logout') {
      console.log('Logging out...');
      return;
    }
    onSectionChange(itemId);
  };

  return (
    <div
      style={{
        width: '200px',
        height: '100vh',
        background: '#8691b2',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '0',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        zIndex: 1000,
        overflow: 'hidden', // Prevent any overflow
        boxSizing: 'border-box' // Include padding in width
      }}
    >
      {/* Navigation Items */}
      <div style={{ padding: '0 8px', marginTop: '20px', width: '100%' }}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              margin: '2px 0',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'white',
              backgroundColor: activeSection === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
              transition: 'all 0.2s ease',
              fontSize: '14px',
              fontWeight: activeSection === item.id ? '600' : '400',
              borderLeft: activeSection === item.id ? '3px solid white' : '3px solid transparent',
              whiteSpace: 'nowrap', // Prevent text wrapping
              overflow: 'hidden', // Hide overflow
              textOverflow: 'ellipsis', // Show ellipsis if text is too long
              width: '100%', // Force full width
              boxSizing: 'border-box' // Include padding in width
            }}
            onMouseEnter={(e) => {
              if (activeSection !== item.id) {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== item.id) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span style={{ marginRight: '10px', fontSize: '16px' }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;