import React, { useState } from 'react';
import Sidebar from './components/admin/Sidebar'; // Adjust path as needed
import Dashboard from './pages/admin/Dashboard';
// import RealTime from './pages/RealTime';
// import History from './pages/History';
// import Map from './pages/Map';
// import Analysis from './pages/Analysis';
// import User from './pages/User';
// import SensorInfo from './pages/SensorInfo';
// import SensorActivity from './pages/SensorActivity';
// import Profile from './pages/Profile';

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
        return (
          <div>
            <h1>Real Time</h1>
            <p>Real time sensor data...</p>
            {/* Replace with your actual RealTime component */}
          </div>
        );
      case 'history':
        return (
          <div>
            <h1>History & Report</h1>
            <p>Historical data and reports...</p>
            {/* Replace with your actual History component */}
          </div>
        );
      case 'map':
        return (
          <div>
            <h1>Map</h1>
            <p>Geographic visualization...</p>
            {/* Replace with your actual Map component */}
          </div>
        );
      case 'analysis':
        return (
          <div>
            <h1>Analysis</h1>
            <p>Data analysis and statistics...</p>
            {/* Replace with your actual Analysis component */}
          </div>
        );
      case 'user':
        return (
          <div>
            <h1>User Management</h1>
            <p>User table and management...</p>
            {/* Replace with your actual User component */}
          </div>
        );
      case 'sensorinfo':
        return (
          <div>
            <h1>Sensor Information</h1>
            <p>Sensor details and specifications...</p>
            {/* Replace with your actual SensorInfo component */}
          </div>
        );
      case 'sensoractivity':
        return (
          <div>
            <h1>Sensor Activity</h1>
            <p>Sensor status and activity logs...</p>
            {/* Replace with your actual SensorActivity component */}
          </div>
        );
      case 'profile':
        return (
          <div>
            <h1>My Profile</h1>
            <p>User profile information...</p>
            {/* Replace with your actual Profile component */}
          </div>
        );
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