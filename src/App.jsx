import React, { useState } from 'react';
import Sidebar from './components/admin/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import RealTime from './pages/admin/RealTime';
import History from './pages/admin/HistoryReport';
import Analysis from './pages/admin/Analysis';
import User from './pages/admin/Usermanagement';
import SensorActivity from './pages/admin/SensorActivity';
import Profile from './pages/admin/Profile';
import SensorMap from './pages/admin/SensorMap';

import 'leaflet/dist/leaflet.css';
import SensorMetadata from './pages/admin/SensorInformation';

const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock user data to simulate admin login
  const user = {
    email: "admin@csirnpl.gov.in",
    name: "Admin User"
  };
  const userRole = "admin";

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'realtime':
        return <RealTime />;
      case 'history':
        return <History />;
      case 'map':
        return <SensorMap />;
      case 'analysis':
        return <Analysis />;
      case 'user':
        return <User />;
      case 'sensoractivity':
        return <SensorActivity />;
      case 'sensorinfo':  
        return <SensorMetadata />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        userRole={userRole}
        user={user}
        onLogout={() => console.log("Logout clicked")}
      />
      <div
        style={{
          marginLeft: '200px',
          padding: '20px',
          width: 'calc(100% - 200px)',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5'
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default App;