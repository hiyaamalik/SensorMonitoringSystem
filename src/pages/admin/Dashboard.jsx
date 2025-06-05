import React, { useState, useEffect } from 'react';

const sensorTypeMap = {
  1: "DHT11",
  2: "DHT22",
  3: "DHT12",
  4: "DHT13",
  5: "DHT14"
};

const sensors = [
  { id: 1, name: "Sensor 1 (CSIR - PME)", location: "CSIR - PME" },
  { id: 2, name: "Sensor 2 (CSIR - HRD)", location: "CSIR - HRD" },
  { id: 3, name: "Sensor 3 (CSIR - LIB)", location: "CSIR - LIB" },
  { id: 4, name: "Sensor 4 (CSIR - CAFETERIA)", location: "CSIR - CAFETERIA" },
  { id: 5, name: "Sensor 5 (CSIR - OPP WING)", location: "CSIR - OPP WING" }
];

const API_BASE = 'https://lostdevs.io/ctrl2/beans/rtdbms.php?type=';

const Dashboard = () => {
  const [activeSensor, setActiveSensor] = useState(1);
  const [currentTemp, setCurrentTemp] = useState('--');
  const [currentHumidity, setCurrentHumidity] = useState('--');
  const [lastUpdate, setLastUpdate] = useState('--');
  const [loading, setLoading] = useState(true);

  const activeSensorData = sensors.find(sensor => sensor.id === activeSensor);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      const sensorType = sensorTypeMap[activeSensor];
      if (!sensorType) return;

      try {
        const res = await fetch(`${API_BASE}${sensorType}`);
        const data = await res.json();

        if (data && data.success) {
          if (isMounted) {
            setCurrentTemp(
              typeof data.temperature_C === 'number' ? data.temperature_C : '--'
            );
            setCurrentHumidity(
              typeof data.humidity === 'number' ? data.humidity : '--'
            );
            setLastUpdate(
              data.receiving_date ? data.receiving_date : '--'
            );
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setCurrentTemp('--');
            setCurrentHumidity('--');
            setLastUpdate('--');
            setLoading(false);
          }
        }
      } catch (e) {
        if (isMounted) {
          setCurrentTemp('--');
          setCurrentHumidity('--');
          setLastUpdate('--');
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [activeSensor]);

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#dae2f7',
      minHeight: '100vh',
      opacity: 0,
      transform: 'translateY(10px)',
      animation: 'fadeInUp 0.5s ease-out forwards'
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
      backgroundColor: '#ffffff',
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
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '10px',
      margin: '20px'
    },
    sensorLabel: {
      fontWeight: 'normal',
      fontSize: '14px',
      color: '#374151',
      marginRight: '4px',
      whiteSpace: 'nowrap'
    },
    sensorDropdown: {
      width: '250px',
      padding: '10px',
      fontSize: '14px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
      color: '#1f2937'
    },
    sensorInfo: {
      backgroundColor: '#ffffff',
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
      backgroundColor: '#ffffff',
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
      color: 'darkblue',
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '0'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Dashboard</h1>
      </div>

      <div style={styles.welcomeBanner}>
        <div style={styles.welcomeContent}>
          <h2 style={styles.welcomeTitle}>Welcome Banner</h2>
        </div>
      </div>

      <div style={styles.sensorNavigation}>
        <label htmlFor="sensor-select" style={styles.sensorLabel}>Select Sensor:</label>
        <select
          id="sensor-select"
          value={activeSensor}
          onChange={e => setActiveSensor(Number(e.target.value))}
          style={styles.sensorDropdown}
        >
          {sensors.map(sensor => (
            <option key={sensor.id} value={sensor.id}>
              {sensor.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.sensorInfo}>
        <p style={styles.sensorDescription}>
          This is <span style={styles.highlight}>{activeSensorData.name}</span> sensor, currently situated at <span style={styles.highlight}>{activeSensorData.location}</span>
        </p>
      </div>

      <div style={styles.metricsContainer}>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Current Temp</div>
          <div style={styles.metricValue}>
            {loading ? "Loading..." : (currentTemp !== '--' ? `${currentTemp}°C` : '--')}
          </div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Current Humidity</div>
          <div style={styles.metricValue}>
            {loading ? "Loading..." : (currentHumidity !== '--' ? `${currentHumidity}%` : '--')}
          </div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>Last Update</div>
          <div style={styles.metricValue}>
            {loading ? "Loading..." : lastUpdate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
