import React, { useState, useEffect } from 'react';
import {
  LineChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar
} from 'recharts';

// Sensor id ↔ Firebase type mapping
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
  { id: 5, name: "Sensor 5 (CSIR - OPP WING)", location: "CSIR - OPP WING)" }
];

const API_BASE = 'https://lostdevs.io/ctrl2/beans/rtdbms.php?type=';

const RealTime = () => {
  const [activeSensor, setActiveSensor] = useState(1);
  const [tempChartType, setTempChartType] = useState('line');
  const [humidityChartType, setHumidityChartType] = useState('area');
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [currentTemp, setCurrentTemp] = useState('--');
  const [currentHumidity, setCurrentHumidity] = useState('--');
  const [loading, setLoading] = useState(true);

  // Fade-in animation state
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 100); // trigger fade-in after 100ms

    return () => clearTimeout(timeout);
  }, []);

  const activeSensorData = sensors.find(sensor => sensor.id === activeSensor);

  // Live Data Fetcher & Chart Updater
  useEffect(() => {
    let interval;
    let isMounted = true;
    setLoading(true);

    const fetchLiveData = async () => {
      const sensorType = sensorTypeMap[activeSensor];
      if (!sensorType) return;

      try {
        const res = await fetch(`${API_BASE}${sensorType}`);
        const data = await res.json();

        if (data && data.success) {
          const now = new Date();
          const timeStr = now.toLocaleTimeString('en-US', {
            hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
          });

          const tempC = typeof data.temperature_C === 'number' ? data.temperature_C : null;
          const humidity = typeof data.humidity === 'number' ? data.humidity : null;

          if (isMounted) {
            setTempData(prev => {
              const newData = [...prev, { time: timeStr, value: tempC }];
              return newData.slice(-10);
            });
            setHumidityData(prev => {
              const newData = [...prev, { time: timeStr, value: humidity }];
              return newData.slice(-10);
            });

            setCurrentTemp(tempC !== null ? tempC : '--');
            setCurrentHumidity(humidity !== null ? humidity : '--');
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setCurrentTemp('--');
            setCurrentHumidity('--');
            setLoading(false);
          }
        }
      } catch (e) {
        if (isMounted) {
          setCurrentTemp('--');
          setCurrentHumidity('--');
          setLoading(false);
        }
      }
    };

    fetchLiveData();
    interval = setInterval(fetchLiveData, 2000);

    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, [activeSensor]);

  const renderTempChart = () => {
    const chartProps = {
      data: tempData,
      children: [
        <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e0e0e0" />,
        <XAxis key="x" dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />,
        <YAxis key="y" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />,
        <Tooltip key="tooltip" contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }} />
      ]
    };

    if (tempChartType === 'bar') {
      return (
        <BarChart {...chartProps}>
          {chartProps.children}
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      );
    }
    if (tempChartType === 'area') {
      return (
        <AreaChart {...chartProps}>
          {chartProps.children}
          <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
        </AreaChart>
      );
    }
    return (
      <LineChart {...chartProps}>
        {chartProps.children}
        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
      </LineChart>
    );
  };

  const renderHumidityChart = () => {
    const chartProps = {
      data: humidityData,
      children: [
        <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e0e0e0" />,
        <XAxis key="x" dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />,
        <YAxis key="y" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />,
        <Tooltip key="tooltip" contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }} />
      ]
    };

    if (humidityChartType === 'bar') {
      return (
        <BarChart {...chartProps}>
          {chartProps.children}
          <Bar dataKey="value" fill="#10b981" />
        </BarChart>
      );
    }
    if (humidityChartType === 'line') {
      return (
        <LineChart {...chartProps}>
          {chartProps.children}
          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
        </LineChart>
      );
    }
    return (
      <AreaChart {...chartProps}>
        {chartProps.children}
        <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
      </AreaChart>
    );
  };

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#dae2f7',
      minHeight: '100vh',
      opacity: fadeIn ? 1 : 0,
      transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease'
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
    chartsContainer: {
      display: 'flex',
      gap: '20px',
      margin: '20px',
      flexWrap: 'wrap'
    },
    chartCard: {
      flex: '1',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      minWidth: '400px'
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    chartTitle: {
      margin: '0',
      fontSize: '18px',
      color: '#1f2937',
      fontWeight: '600'
    },
    chartControls: {
      display: 'flex',
      gap: '8px'
    },
    controlButton: {
      backgroundColor: 'transparent',
      border: '1px solid #d1d5db',
      color: '#6b7280',
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    controlButtonActive: {
      backgroundColor: '#3b82f6',
      border: '1px solid #3b82f6',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer'
    },
    chartWrapper: {
      width: '100%',
      height: '200px'
    },
    currentValuesContainer: {
      display: 'flex',
      gap: '20px',
      margin: '20px',
      flexWrap: 'wrap'
    },
    currentValueCard: {
      flex: '1',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '30px 20px',
      minWidth: '300px'
    },
    currentValueContent: {
      textAlign: 'center'
    },
    currentValueTitle: {
      color: '#6b7280',
      fontSize: '14px',
      marginBottom: '15px',
      fontWeight: '500'
    },
    currentValueNumber: {
      color: 'darkblue',
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '0'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Real Time</h1>
      </div>

      {/* Sensor Dropdown */}
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

      {/* Charts Section */}
      <div style={styles.chartsContainer}>
        {/* Temperature Graph */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Temperature graph</h3>
            <div style={styles.chartControls}>
              <button
                style={tempChartType === 'line' ? styles.controlButtonActive : styles.controlButton}
                onClick={() => setTempChartType('line')}
              >
                Line
              </button>
              <button
                style={tempChartType === 'bar' ? styles.controlButtonActive : styles.controlButton}
                onClick={() => setTempChartType('bar')}
              >
                Bar
              </button>
              <button
                style={tempChartType === 'area' ? styles.controlButtonActive : styles.controlButton}
                onClick={() => setTempChartType('area')}
              >
                Area
              </button>
            </div>
          </div>
          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={200}>
              {renderTempChart()}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Humidity Graph */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Humidity graph</h3>
            <div style={styles.chartControls}>
              <button
                style={humidityChartType === 'line' ? styles.controlButtonActive : styles.controlButton}
                onClick={() => setHumidityChartType('line')}
              >
                Line
              </button>
              <button
                style={humidityChartType === 'bar' ? styles.controlButtonActive : styles.controlButton}
                onClick={() => setHumidityChartType('bar')}
              >
                Bar
              </button>
              <button
                style={humidityChartType === 'area' ? styles.controlButtonActive : styles.controlButton}
                onClick={() => setHumidityChartType('area')}
              >
                Area
              </button>
            </div>
          </div>
          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={200}>
              {renderHumidityChart()}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Current Values Section */}
      <div style={styles.currentValuesContainer}>
        <div style={styles.currentValueCard}>
          <div style={styles.currentValueContent}>
            <h3 style={styles.currentValueTitle}>Current Temperature</h3>
            <div style={styles.currentValueNumber}>
              {loading ? <span>Loading...</span> : (currentTemp !== '--' ? `${currentTemp}°C` : '--')}
            </div>
          </div>
        </div>

        <div style={styles.currentValueCard}>
          <div style={styles.currentValueContent}>
            <h3 style={styles.currentValueTitle}>Current Humidity</h3>
            <div style={styles.currentValueNumber}>
              {loading ? <span>Loading...</span> : (currentHumidity !== '--' ? `${currentHumidity}%` : '--')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTime;
