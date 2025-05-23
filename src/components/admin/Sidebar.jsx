import React from 'react';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'realtime', label: 'Real Time', icon: '📈' },
    { id: 'history', label: 'History & Report', icon: '📋' },
    { id: 'map', label: 'Map', icon: '🗺️' },
    { id: 'analysis', label: 'Analysis', icon: '📊' },
    { id: 'user', label: 'User', icon: '👤' },
    { id: 'sensorinfo', label: 'Sensor Information', icon: '🔧' },
    { id: 'sensoractivity', label: 'Sensor Activity', icon: '🔋' },
    { id: 'profile', label: 'My Profile', icon: '👨‍💼' },
    { id: 'logout', label: 'Log out', icon: '🚪' }
  ];

  const handleItemClick = (itemId) => {
    if (itemId === 'logout') {
      // Handle logout logic here
      console.log('Logging out...');
      // You can add actual logout functionality here
      return;
    }
    onSectionChange(itemId);
  };

  return (
    <div
      style={{
        width: '200px',
        height: '100vh',
        background: '#1976d2',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '0',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '10px'
        }}
      >
        <h3
          style={{
            margin: 0,
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          Dashboard
        </h3>
      </div>

      {/* Navigation Items */}
      <div style={{ padding: '0 8px' }}>
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
              borderLeft: activeSection === item.id ? '3px solid white' : '3px solid transparent'
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