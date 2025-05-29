import React, { useState } from 'react';

const Dashboard = () => {
  const [activeSensor, setActiveSensor] = useState(1);
  
  const sensors = [
    { id: 1, name: "Sensor 1", temp: "24°C", humidity: "65%", status: "Online", location: "Building A" },
    { id: 2, name: "Sensor 2", temp: "26°C", humidity: "68%", status: "Online", location: "Building B" },
    { id: 3, name: "Sensor 3", temp: "22°C", humidity: "70%", status: "Online", location: "Park" },
    { id: 4, name: "Sensor 4", temp: "--", humidity: "--", status: "Offline", location: "Warehouse" },
    { id: 5, name: "Sensor 5", temp: "25°C", humidity: "62%", status: "Online", location: "Office" }
  ];

  const activeSensorData = sensors.find(sensor => sensor.id === activeSensor);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Dashboard</h1>
      </div>
      
      {/* Welcome Banner */}
      <div style={styles.welcomeBanner}>
        <div style={styles.welcomeContent}>
          <h2 style={styles.welcomeTitle}>Welcome Banner</h2>
        </div>
      </div>

      {/* Sensor Navigation Buttons */}
      <div style={styles.sensorNavigation}>
        {sensors.map(sensor => (
          <button
            key={sensor.id}
            style={{
              ...styles.sensorButton,
              ...(activeSensor === sensor.id ? styles.activeSensorButton : {})
            }}
            onClick={() => setActiveSensor(sensor.id)}
          >
            {sensor.name}
          </button>
        ))}
      </div>

      {/* Current Sensor Info */}
      <div style={styles.sensorInfo}>
        <p style={styles.sensorDescription}>
          This is <span style={styles.highlight}>{activeSensorData.name}</span> sensor, currently situated at <span style={styles.highlight}>{activeSensorData.location}</span>
        </p>
      </div>

      {/* Metrics Container */}
      <div style={styles.metricsContainer}>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Current Temp</div>
          <div style={styles.metricValue}>{activeSensorData.temp}</div>
        </div>
        
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Current Humidity</div>
          <div style={styles.metricValue}>{activeSensorData.humidity}</div>
        </div>
        
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Last Update</div>
          <div style={styles.metricValue}>Just now</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: '20px',
    textAlign: 'center'
  },
  headerTitle: {
    color: 'white',
    margin: '0',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  welcomeBanner: {
    backgroundColor: '#d1d5db',
    margin: '20px',
    padding: '60px 20px',
    textAlign: 'center',
    borderRadius: '8px'
  },
  welcomeContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeTitle: {
    color: '#374151',
    margin: '0',
    fontSize: '20px',
    fontWeight: 'normal'
  },
  sensorNavigation: {
    display: 'flex',
    gap: '10px',
    margin: '20px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sensorButton: {
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    flex: '1',
    maxWidth: '200px',
    minWidth: '150px'
  },
  activeSensorButton: {
    backgroundColor: '#3b82f6',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  },
  sensorInfo: {
    backgroundColor: '#d1d5db',
    margin: '20px',
    padding: '30px 20px',
    textAlign: 'center',
    borderRadius: '8px'
  },
  sensorDescription: {
    color: '#374151',
    margin: '0',
    fontSize: '16px',
    lineHeight: '1.5'
  },
  highlight: {
    fontWeight: 'bold',
    color: '#1f2937'
  },
  metricsContainer: {
    display: 'flex',
    gap: '20px',
    margin: '20px',
    flexWrap: 'wrap'
  },
  metricCard: {
    flex: '1',
    backgroundColor: '#d1d5db',
    padding: '30px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    minWidth: '200px'
  },
  metricLabel: {
    color: '#6b7280',
    fontSize: '14px',
    marginBottom: '15px',
    fontWeight: '500'
  },
  metricValue: {
    color: '#1f2937',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0'
  }
};

export default Dashboard;