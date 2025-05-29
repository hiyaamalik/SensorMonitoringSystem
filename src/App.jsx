import React, { useState } from 'react';
import Sidebar from './components/admin/Sidebar'; // Adjust path as needed
import Dashboard from './pages/admin/Dashboard';
import RealTime from './pages/admin/RealTime';
import History from './pages/admin/HistoryReport'; // Ensure the file is named 'HistoryReport.jsx' or adjust the import to match the actual file name, e.g., './pages/admin/History' if the file is 'History.jsx'
import Analysis from './pages/admin/Analysis';
import User from './pages/admin/Usermanagement';
import SensorActivity from './pages/admin/SensorActivity';
import Profile from './pages/admin/Profile';
import 'leaflet/dist/leaflet.css';
import SensorMap from './pages/admin/SensorMap';


const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'realtime':
        return  <RealTime />;
        
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
        
      
      case 'profile':
        return <Profile />;
      default:
        return (
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard...</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      
      {/* Main Content Area */}
      <div
        style={{
          marginLeft: '200px', // Same as sidebar width
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