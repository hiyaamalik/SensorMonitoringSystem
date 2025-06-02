import React, { useState, useEffect } from 'react';
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
import logoImage from './assets/image (9).png';

const CSIRSensorSyncPortal = ({ onLogin, onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    captcha: ''
  });
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of image URLs for the carousel
  const carouselImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (authMode === 'login') {
      // Simple authentication logic
      if (formData.emailId === 'admin@gmail.com' && formData.password === 'admin') {
        onAuthSuccess('admin', { email: formData.emailId, name: 'Administrator' });
      } else if (formData.emailId === 'user@gmail.com' && formData.password === 'user') {
        onAuthSuccess('user', { email: formData.emailId, name: 'User' });
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } else {
      if (formData.emailId && formData.password && formData.confirmPassword) {
        if (formData.password === formData.confirmPassword) {
          onAuthSuccess('user', { email: formData.emailId, name: formData.fullName || 'User' });
        } else {
          setError('Passwords do not match.');
        }
      } else {
        setError('Please fill in all required fields.');
      }
    }
  };

  const generateCaptcha = () => {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
  };

  const [captchaText] = useState(generateCaptcha());

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #1e3a8a 100%)',
      display: 'flex',
      fontFamily: 'Arial, sans-serif'
    },
    leftSide: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      background: 'linear-gradient(to right, #f97316, #ea580c)',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    logo: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      border: '2px solid white',
      overflow: 'hidden'
    },
    logoImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    headerText: {
      color: 'white'
    },
    headerTextHindi: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    headerTextEnglish: {
      fontSize: '24px',
      fontWeight: 'bold'
    },
    mainContent: {
      flex: 1,
      background: 'white',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 10,
      width: '48px',
      height: '48px',
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    navButtonLeft: {
      left: '16px'
    },
    navButtonRight: {
      right: '16px'
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      marginTop: '16px'
    },
    imageWrapper: {
      width: '100%',
      height: '100%',
      maxWidth: '800px',
      position: 'relative',
      overflow: 'hidden'
    },
    buildingImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '8px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: 'opacity 1s ease-in-out'
    },
    rightSide: {
      width: '384px',
      background: 'linear-gradient(to bottom, #1e40af, #1e3a8a)',
      display: 'flex',
      flexDirection: 'column'
    },
    portalHeader: {
      textAlign: 'center',
      padding: '32px 0'
    },
    portalTitle: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      margin: 0
    },
    formContainer: {
      flex: 1,
      padding: '0 32px'
    },
    formCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '8px',
      padding: '24px'
    },
    formTitle: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '24px',
      margin: '0 0 24px 0'
    },
    errorMessage: {
      backgroundColor: 'rgba(220, 53, 69, 0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '16px',
      textAlign: 'center',
      fontSize: '14px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      color: 'white',
      fontSize: '14px',
      display: 'block',
      marginBottom: '4px'
    },
    required: {
      color: '#fca5a5'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '4px',
      color: 'white',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    captchaContainer: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    captchaInput: {
      flex: 1,
      padding: '8px 12px',
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '4px',
      color: 'white',
      fontSize: '14px',
      outline: 'none'
    },
    captchaDisplay: {
      background: '#e5e7eb',
      padding: '8px 12px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center'
    },
    captchaText: {
      color: 'black',
      fontFamily: 'monospace',
      fontSize: '18px',
      userSelect: 'none',
      textDecoration: 'line-through wavy'
    },
    refreshButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    verifyButton: {
      marginTop: '8px',
      fontSize: '12px',
      color: '#93c5fd',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'color 0.3s'
    },
    submitButton: {
      width: '100%',
      background: '#2563eb',
      color: 'white',
      padding: '12px',
      borderRadius: '4px',
      fontWeight: '600',
      fontSize: '16px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '24px',
      transition: 'background-color 0.3s'
    },
    actionButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '16px'
    },
    actionButton: {
      width: '100%',
      background: '#3b82f6',
      color: 'white',
      padding: '8px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    footer: {
      height: '32px'
    },
    credentialsInfo: {
      marginTop: '16px',
      padding: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
      fontSize: '12px',
      color: '#93c5fd'
    },
    carouselDots: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px'
    },
    carouselDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.5)',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    activeDot: {
      background: 'white'
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Side - CSIR NPL Information */}
      <div style={styles.leftSide}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            {/* CSIR NPL Logo */}
            <div style={styles.logo}>
              <img src={logoImage} alt="CSIR-NPL Logo" style={styles.logoImg} />
            </div>
            <div style={styles.headerText}>
              <div style={styles.headerTextHindi}>सीएसआईआर-राष्ट्रीय भौतिक प्रयोगशाला</div>
              <div style={styles.headerTextEnglish}>CSIR-National Physical Laboratory</div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={styles.mainContent}>
          {/* Navigation Arrows */}
          <button 
            style={{...styles.navButton, ...styles.navButtonLeft}}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.5)'}
            onClick={() => setCurrentImageIndex(prev => 
              prev === 0 ? carouselImages.length - 1 : prev - 1
            )}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            style={{...styles.navButton, ...styles.navButtonRight}}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.5)'}
            onClick={() => setCurrentImageIndex(prev => 
              prev === carouselImages.length - 1 ? 0 : prev + 1
            )}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Carousel */}
          <div style={styles.imageContainer}>
            <div style={styles.imageWrapper}>
              <img 
                src={carouselImages[currentImageIndex]} 
                alt="CSIR-NPL" 
                style={styles.buildingImage}
              />
              <div style={styles.carouselDots}>
                {carouselImages.map((_, index) => (
                  <div 
                    key={index}
                    style={{
                      ...styles.carouselDot,
                      ...(index === currentImageIndex ? styles.activeDot : {})
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - SensorSync Portal */}
      <div style={styles.rightSide}>
        {/* Portal Header */}
        <div style={styles.portalHeader}>
          <h1 style={styles.portalTitle}>SensorSync Portal</h1>
        </div>

        {/* Auth Form */}
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>
              {authMode === 'login' ? 'LOGIN' : 'REGISTER'}
            </h2>

            {error && (
              <div style={styles.errorMessage}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email ID */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Email ID <span style={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = 'white'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  required
                />
              </div>

              {/* Full Name (Register only) */}
              {authMode === 'register' && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = 'white'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  />
                </div>
              )}

              {/* Password */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  {authMode === 'register' ? 'Create Password' : 'Password'} <span style={styles.required}>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = 'white'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  required
                />
              </div>

              {/* Confirm Password (Register only) */}
              {authMode === 'register' && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = 'white'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  />
                </div>
              )}

              {/* Captcha */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Captcha <span style={styles.required}>*</span>
                </label>
                <div style={styles.captchaContainer}>
                  <input
                    type="text"
                    name="captcha"
                    value={formData.captcha}
                    onChange={handleInputChange}
                    style={styles.captchaInput}
                    onFocus={(e) => e.target.style.borderColor = 'white'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                    required
                  />
                  <div style={styles.captchaDisplay}>
                    <span style={styles.captchaText}>
                      {captchaText}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    style={styles.refreshButton}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                  >
                    ↻
                  </button>
                </div>
                <button
                  type="button"
                  style={styles.verifyButton}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = '#93c5fd'}
                >
                  VERIFY
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={styles.submitButton}
                onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.background = '#2563eb'}
              >
                {authMode === 'register' ? 'CREATE ACCOUNT' : 'LOGIN'}
              </button>

              {/* Additional Actions */}
              <div style={styles.actionButtons}>
                {authMode === 'login' && (
                  <button
                    type="button"
                    style={styles.actionButton}
                    onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                    onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
                  >
                    FORGOT PASSWORD
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  style={styles.actionButton}
                  onMouseEnter={(e) => e.target.style.background = '#2563eb'}
                  onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
                >
                  {authMode === 'login' ? 'NEW? REGISTER NOW' : 'ALREADY HAVE AN ACCOUNT'}
                </button>
              </div>
            </form>

            {/* Demo Credentials */}
            {authMode === 'login' && (
              <div style={styles.credentialsInfo}>
                <strong>Demo Credentials:</strong><br />
                Admin: admin@gmail.com / admin<br />
                User: user@gmail.com / user
              </div>
            )}
          </div>
        </div>

        {/* Footer spacing */}
        <div style={styles.footer}></div>
      </div>
    </div>
  );
};

// Main App Component (unchanged)
const App = () => {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'dashboard'
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleAuthSuccess = (role, userData) => {
    setUserRole(role);
    setUser(userData);
    setCurrentView('dashboard');
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    setCurrentView('landing');
    setActiveSection('dashboard');
  };

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
        return userRole === 'admin' ? <User /> : <Dashboard />;
      case 'sensoractivity':
        return userRole === 'admin' ? <SensorActivity /> : <Dashboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  if (currentView === 'landing') {
    return <CSIRSensorSyncPortal onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
        userRole={userRole}
        user={user}
        onLogout={handleLogout}
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