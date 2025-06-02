import React from 'react';
import logo from '../../assets/image (9).png'; // Adjust the path as needed

const Sidebar = ({ activeSection, onSectionChange, userRole, user, onLogout }) => {
  // Filter menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'realtime', label: 'Real Time' },
      { id: 'history', label: 'History & Report' },
      { id: 'map', label: 'Map' },
      { id: 'analysis', label: 'Analysis' },
      { id: 'profile', label: 'My Profile' }
    ];

    // Add admin-only items ONLY if user is admin
    if (userRole === 'admin') {
      baseItems.splice(-1, 0, // Insert before 'My Profile'
        { id: 'user', label: 'User Management' },
        { id: 'sensoractivity', label: 'Sensor Management' }
      );
    }

    // Add logout at the end
    baseItems.push({ id: 'logout', label: 'Log out' });

    return baseItems;
  };

  const menuItems = getMenuItems();

  const handleItemClick = (itemId) => {
    if (itemId === 'logout') {
      if (onLogout) {
        onLogout();
      } else {
        console.log('Logging out...');
      }
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
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            maxWidth: '80%',
            height: 'auto',
            borderRadius: '8px'
          }}
        />
      </div>

      {/* User Info */}
      {user && (
        <div style={{ 
          padding: '10px 16px', 
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          marginBottom: '10px'
        }}>
          <div style={{ 
            color: 'white', 
            fontSize: '12px', 
            textAlign: 'center',
            fontWeight: '500'
          }}>
            Welcome, {user.name}
          </div>
          <div style={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: '10px', 
            textAlign: 'center',
            textTransform: 'capitalize'
          }}>
            {userRole}
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <div style={{ padding: '0 8px', width: '100%' }}>
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
              color: item.id === 'logout' ? '#ffcccb' : 'white',
              backgroundColor: activeSection === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
              transition: 'all 0.2s ease',
              fontSize: '14px',
              fontWeight: activeSection === item.id ? '600' : '400',
              borderLeft: activeSection === item.id ? '3px solid white' : '3px solid transparent',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== item.id) {
                e.target.style.backgroundColor = item.id === 'logout' 
                  ? 'rgba(255, 255, 255, 0.94)' 
                  : 'rgba(255,255,255,0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== item.id) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;