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

// ---- Smart Captcha Generator ----
function generateSmartCaptcha() {
  const type = Math.random() < 0.5 ? 'text' : 'math';
  if (type === 'math') {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const operator = Math.random() < 0.5 ? '+' : '-';
    const question = `${a} ${operator} ${b}`;
    let answer = operator === '+' ? a + b : a - b;
    return { question, answer: answer.toString() };
  } else {
    const text = Math.random().toString(36).substring(2, 7).toUpperCase();
    return { question: text, answer: text };
  }
}

// ---- PHP Auth Request Helper ----
async function authPhpRequest(payload) {
  const res = await fetch('https://lostdevs.io/ctrl2/ldauth.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(payload).toString(),
    credentials: 'include'
  });
  return res.json();
}

const CSIRSensorSyncPortal = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    captcha: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [captcha, setCaptcha] = useState(generateSmartCaptcha());
  const [captchaVerified, setCaptchaVerified] = useState(null);

  const carouselImages = [
    "https://candela-ptb.de/wp-content/uploads/2021/01/NPL2.jpg",
    "https://www.nplindia.org/wp-content/uploads/2021/11/9.png",
    "https://www.nplindia.org/wp-content/uploads/2023/04/DSC_2975-scaled.jpg",
    "https://i.ytimg.com/vi/3593ek-BlB0/maxresdefault.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name === "captcha") setCaptchaVerified(null);
  };

  const handleCaptchaVerify = () => {
    if (formData.captcha.trim().toUpperCase() === captcha.answer.toUpperCase()) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const handlePlayCaptchaAudio = () => {
    window.speechSynthesis.cancel();
    let question = captcha.question;
    question = question.replace(/\+/g, ' plus ').replace(/-/g, ' minus ');
    if (/^[A-Z0-9]+$/i.test(question) && question.length === 5) {
      question = question.split('').join(' ');
    }
    const utterance = new window.SpeechSynthesisUtterance("Captcha. " + question);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    if (formData.captcha.trim().toUpperCase() !== captcha.answer.toUpperCase()) {
      setError('Invalid captcha. Please try again.');
      setCaptcha(generateSmartCaptcha());
      setFormData({ ...formData, captcha: '' });
      setCaptchaVerified(null);
      window.speechSynthesis.cancel();
      return;
    }
    if (authMode === 'login') {
      if (!formData.emailId || !formData.password) {
        setError('Please fill in all required fields.');
        return;
      }
      const data = await authPhpRequest({
        action: 'login',
        email: formData.emailId,
        password: formData.password
      });
      if (data.success) {
        onAuthSuccess(data.role === "admin" ? "admin" : "user", {
          email: data.email,
          name: data.name || "User"
        });
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } else {
      // Registration
      if (!formData.emailId || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      const data = await authPhpRequest({
        action: 'register',
        email: formData.emailId,
        password: formData.password,
        fullName: formData.fullName
      });
      if (data.success) {
        setSuccessMessage('User created successfully. Please log in.');
        setAuthMode('login');
        setFormData({
          emailId: formData.emailId,
          password: '',
          fullName: '',
          confirmPassword: '',
          captcha: ''
        });
        setCaptcha(generateSmartCaptcha());
        setCaptchaVerified(null);
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    }
  };

  // ---- Styles ----
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
    headerText: { color: 'white' },
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
    navButtonLeft: { left: '16px' },
    navButtonRight: { right: '16px' },
    imageContainer: {
      width: '100%',
      height: '80%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
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
    successMessage: {
      backgroundColor: 'rgba(34,197,94,0.92)',
      color: 'white',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '16px',
      textAlign: 'center',
      fontSize: '14px'
    },
    formGroup: { marginBottom: '16px' },
    label: {
      color: 'white',
      fontSize: '14px',
      display: 'block',
      marginBottom: '4px'
    },
    required: { color: '#fca5a5' },
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
      alignItems: 'flex-end'
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
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '2px'
    },
    captchaActionsRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '8px',
      marginTop: '6px',
      justifyContent: 'space-between'
    },
    captchaActionsLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    captchaActionsRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    captchaText: {
      color: 'black',
      fontFamily: 'monospace',
      fontSize: '18px',
      userSelect: 'none',
      textDecoration: 'line-through wavy'
    },
    refreshButton: {
      background: '#fb923c',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      fontSize: 20,
      outline: 'none',
      borderRadius: '50%',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s'
    },
    audioButton: {
      background: '#1e40af',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      fontSize: 20,
      outline: 'none',
      borderRadius: '50%',
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s'
    },
    verifyButton: {
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
    footer: { height: '32px' },
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
    activeDot: { background: 'white' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logo}>
              <img src={logoImage} alt="CSIR-NPL Logo" style={styles.logoImg} />
            </div>
            <div style={styles.headerText}>
              <div style={styles.headerTextHindi}>सीएसआईआर-राष्ट्रीय भौतिक प्रयोगशाला</div>
              <div style={styles.headerTextEnglish}>CSIR-National Physical Laboratory</div>
            </div>
          </div>
        </div>
        <div style={styles.mainContent}>
          <button
            style={{ ...styles.navButton, ...styles.navButtonLeft }}
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
            style={{ ...styles.navButton, ...styles.navButtonRight }}
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
        <div style={styles.portalHeader}>
          <h1 style={styles.portalTitle}>SensorSync Portal</h1>
        </div>
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>
              {authMode === 'login' ? 'LOGIN' : 'REGISTER'}
            </h2>
            {error && (
              <div style={styles.errorMessage}>{error}</div>
            )}
            {successMessage && (
              <div style={styles.successMessage}>{successMessage}</div>
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
                  />
                </div>
              )}
              {/* Captcha Section */}
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
                    required
                  />
                  <div style={styles.captchaDisplay}>
                    <span style={styles.captchaText}>{captcha.question}</span>
                  </div>
                </div>
                <div style={styles.captchaActionsRow}>
                  <div style={styles.captchaActionsLeft}>
                    <button
                      type="button"
                      style={styles.verifyButton}
                      onClick={handleCaptchaVerify}
                      onMouseEnter={(e) => e.target.style.color = 'white'}
                      onMouseLeave={(e) => e.target.style.color = '#93c5fd'}
                    >
                      VERIFY
                    </button>
                    {captchaVerified === true && (
                      <div style={{ color: 'lightgreen', fontSize: '13px', marginLeft: '10px' }}>
                        Captcha correct!
                      </div>
                    )}
                    {captchaVerified === false && (
                      <div style={{ color: 'salmon', fontSize: '13px', marginLeft: '10px' }}>
                        Wrong captcha, try again.
                      </div>
                    )}
                  </div>
                  <div style={styles.captchaActionsRight}>
                    <button
                      type="button"
                      aria-label="Play audio captcha"
                      title="Play audio captcha"
                      onClick={handlePlayCaptchaAudio}
                      style={styles.audioButton}
                    >
                      <span role="img" aria-label="audio">🔊</span>
                    </button>
                    <button
                      type="button"
                      aria-label="Refresh captcha"
                      title="Refresh captcha"
                      onClick={() => {
                        window.speechSynthesis.cancel();
                        setCaptcha(generateSmartCaptcha());
                        setFormData({ ...formData, captcha: '' });
                        setCaptchaVerified(null);
                      }}
                      style={styles.refreshButton}
                    >
                      ↻
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                style={styles.submitButton}
                onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.background = '#2563eb'}
              >
                {authMode === 'register' ? 'CREATE ACCOUNT' : 'LOGIN'}
              </button>
              <div style={styles.actionButtons}>
                {authMode === 'login' && (
                  <button
                    type="button"
                    style={styles.actionButton}
                  >
                    FORGOT PASSWORD
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'register' : 'login');
                    setError('');
                    setSuccessMessage('');
                    setFormData({
                      emailId: authMode === 'register' ? formData.emailId : '',
                      password: '',
                      fullName: '',
                      confirmPassword: '',
                      captcha: ''
                    });
                    setCaptcha(generateSmartCaptcha());
                    setCaptchaVerified(null);
                  }}
                  style={styles.actionButton}
                >
                  {authMode === 'login' ? 'NEW? REGISTER NOW' : 'ALREADY HAVE AN ACCOUNT'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div style={styles.footer}></div>
      </div>
    </div>
  );
};

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

  const handleLogout = async () => {
    await authPhpRequest({ action: 'logout' });
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
