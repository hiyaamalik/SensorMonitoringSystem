import React, { useState, useEffect, useMemo } from 'react';
import AuthModal from "../components/AuthModal";
import "../styles/landing.css";

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState(null);
  const [pulseNodes, setPulseNodes] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate random sensor nodes only once
  const sensorNodes = useMemo(() => (
    Array.from({ length: 15 }, (_, i) => {
      const type = ['Temperature', 'Humidity', 'Pressure', 'Motion', 'Light'][Math.floor(Math.random() * 5)];
      return {
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        type,
        status: Math.random() > 0.2 ? 'active' : 'warning',
        value: type === 'Temperature' 
          ? (Math.random() * 30 + 10).toFixed(1) + '°C' 
          : type === 'Humidity' 
            ? (Math.random() * 80 + 10).toFixed(0) + '%' 
            : Math.random().toFixed(2)
      };
    })
  ), []);

  // Generate pulse effects periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNode = sensorNodes[Math.floor(Math.random() * sensorNodes.length)];
      setPulseNodes(prev => [...prev, { 
        id: Date.now(), 
        nodeId: randomNode.id, 
        x: randomNode.x, 
        y: randomNode.y,
        type: randomNode.type 
      }]);
      
      setTimeout(() => {
        setPulseNodes(prev => prev.slice(1));
      }, 3000);
    }, 800);

    return () => clearInterval(interval);
  }, [sensorNodes]);

  const handleNodeHover = (id) => {
    setActiveNode(id);
  };
  
  const handleNodeLeave = () => {
    setActiveNode(null);
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  return (
    <div className="landing-page-container">
      {/* Animated background */}
      <div className="animated-background">
        <div className="gradient-background"></div>
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animation: `pulse ${Math.random() * 8 + 4}s infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Sensor network visualization */}
      <div className="sensor-network">
        {sensorNodes.map((node) => (
          <React.Fragment key={node.id}>
            {/* Pulse rings */}
            {pulseNodes
              .filter(pulse => pulse.nodeId === node.id)
              .map((pulse) => (
                <div 
                  key={pulse.id}
                  className={`sensor-pulse ${pulse.type.toLowerCase()}-pulse`}
                  style={{ 
                    left: `${pulse.x}%`,
                    top: `${pulse.y}%`
                  }}
                ></div>
              ))}
            
            {/* Sensor node */}
            <div 
              className={`sensor-node ${activeNode === node.id ? 'active' : ''} ${node.status} ${node.type.toLowerCase()}`}
              style={{ 
                left: `${node.x}%`, 
                top: `${node.y}%`,
                boxShadow: `0 0 10px ${node.status === 'active' ? 
                  (node.type === 'Temperature' ? '#ef4444' : 
                   node.type === 'Humidity' ? '#3b82f6' : '#10B981') : '#F59E0B'}`
              }}
              onMouseEnter={() => handleNodeHover(node.id)}
              onMouseLeave={handleNodeLeave}
            ></div>
            
            {/* Connection lines between nodes */}
            {sensorNodes
              .filter((_, idx) => idx !== node.id && Math.random() > 0.7)
              .map((connectedNode) => (
                <svg
                  key={`${node.id}-${connectedNode.id}`}
                  className="connection-line"
                >
                  <line
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${connectedNode.x}%`}
                    y2={`${connectedNode.y}%`}
                    stroke={node.status === 'active' ? 
                      (node.type === 'Temperature' ? '#ef4444' : 
                       node.type === 'Humidity' ? '#3b82f6' : '#10B981') : '#F59E0B'}
                    strokeWidth="1"
                  />
                </svg>
              ))}
              
            {/* Tooltip for active node */}
            {activeNode === node.id && (
              <div 
                className="node-tooltip"
                style={{ 
                  left: `${node.x}%`, 
                  top: `${node.y - 10}%`,
                }}
              >
                <p className="tooltip-title">{node.type} Sensor</p>
                <p className="tooltip-text">Status: {node.status === 'active' ? 'Active' : 'Warning'}</p>
                <p className="tooltip-text">Value: {node.value}</p>
                <p className="tooltip-text">ID: SN-{node.id.toString().padStart(4, '0')}</p>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div className={`content-container ${isLoaded ? 'loaded' : ''}`}>
        <div className="hero-section">
          <div className="logo-container">
            <div className="logo-pulse"></div>
            <div className="logo-icon">
              <svg className="logo-svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <h1 className="main-heading">
            <span className="heading-gradient-1">Sensor</span>
            <span className="heading-gradient-2">Monitoring</span>
          </h1>
          
          <p className="subheading">
            Advanced real-time IoT sensor monitoring with intelligent analytics and visualization
          </p>

          <div className="button-group">
            <button 
              onClick={handleLoginClick}
              className="primary-button"
            >
              Login to Dashboard
            </button>
            <button 
              onClick={handleRegisterClick}
              className="secondary-button"
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="features-grid">
          {[
            {
              title: "Real-time Monitoring",
              icon: "⚡",
              description: "Track your sensors in real-time with live updates and instant notifications for critical events"
            },
            {
              title: "Advanced Analytics",
              icon: "📊",
              description: "Gain powerful insights from your sensor data with AI-powered analytics and predictive maintenance"
            },
            {
              title: "Interactive Mapping",
              icon: "🗺️",
              description: "Visualize your sensor network with interactive maps showing real-time status and activity"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="feature-card"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { value: "10K+", label: "Data Points Collected Daily" },
            { value: "--", label: "Uptime Reliability" },
            { value: "5", label: "Active Sensors" },
            { value: "--", label: "Average Response Time" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="stat-item"
            >
              <div className="stat-value">
                {stat.value}
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="footer">
          &copy; 2025 Sensor Monitoring System. All rights reserved.
        </div>
      </div>

      {/* Auth Modal - Placed at root level of component */}
      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default LandingPage;