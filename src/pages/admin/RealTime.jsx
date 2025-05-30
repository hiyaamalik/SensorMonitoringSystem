import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const RealTime = () => {
  const [activeSensor, setActiveSensor] = useState(1);
  const [tempChartType, setTempChartType] = useState('line');
  const [humidityChartType, setHumidityChartType] = useState('area');
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(24);
  const [currentHumidity, setCurrentHumidity] = useState(65);
  
  const sensors = [
    { id: 1, name: "Sensor 1", baseTemp: 24, baseHumidity: 65, location: "Building A" },
    { id: 2, name: "Sensor 2", baseTemp: 26, baseHumidity: 68, location: "Building B" },
    { id: 3, name: "Sensor 3", baseTemp: 22, baseHumidity: 70, location: "Park" },
    { id: 4, name: "Sensor 4", baseTemp: 0, baseHumidity: 0, location: "Warehouse" },
    { id: 5, name: "Sensor 5", baseTemp: 25, baseHumidity: 62, location: "Office" }
  ];

  const activeSensorData = sensors.find(sensor => sensor.id === activeSensor);

  // Initialize data
  useEffect(() => {
    const initData = [];
    const now = new Date();
    for (let i = 9; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 5000);
      const timeStr = time.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      
      const baseTemp = activeSensorData.baseTemp;
      const baseHumidity = activeSensorData.baseHumidity;
      
      if (activeSensorData.id === 4) {
        // Offline sensor
        initData.push({
          time: timeStr,
          temp: 0,
          humidity: 0
        });
      } else {
        initData.push({
          time: timeStr,
          temp: baseTemp + (Math.random() - 0.5) * 4,
          humidity: baseHumidity + (Math.random() - 0.5) * 10
        });
      }
    }
    
    const tempDataFormatted = initData.map(d => ({ time: d.time, value: Math.round(d.temp * 10) / 10 }));
    const humidityDataFormatted = initData.map(d => ({ time: d.time, value: Math.round(d.humidity) }));
    
    setTempData(tempDataFormatted);
    setHumidityData(humidityDataFormatted);
    
    if (activeSensorData.id === 4) {
      setCurrentTemp(0);
      setCurrentHumidity(0);
    } else {
      setCurrentTemp(tempDataFormatted[tempDataFormatted.length - 1].value);
      setCurrentHumidity(humidityDataFormatted[humidityDataFormatted.length - 1].value);
    }
  }, [activeSensor]);

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      
      const baseTemp = activeSensorData.baseTemp;
      const baseHumidity = activeSensorData.baseHumidity;
      
      let newTempValue, newHumidityValue;
      
      if (activeSensorData.id === 4) {
        // Offline sensor
        newTempValue = 0;
        newHumidityValue = 0;
      } else {
        newTempValue = Math.round((baseTemp + (Math.random() - 0.5) * 4) * 10) / 10;
        newHumidityValue = Math.round(baseHumidity + (Math.random() - 0.5) * 10);
      }
      
      setTempData(prev => {
        const newData = [...prev.slice(1), { time: timeStr, value: newTempValue }];
        return newData;
      });
      
      setHumidityData(prev => {
        const newData = [...prev.slice(1), { time: timeStr, value: newHumidityValue }];
        return newData;
      });
      
      setCurrentTemp(newTempValue);
      setCurrentHumidity(newHumidityValue);
    }, 2000);

    return () => clearInterval(interval);
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

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Real Time</h1>
      </div>

      {/* Sensor Navigation Buttons */}
      <div style={styles.sensorNavigation}>
        {sensors.map(sensor => (
          <button
            key={sensor.id}
            style={{
              ...styles.sensorButton,
              ...(activeSensor === sensor.id ? styles.activeSensorButton : {}),
              ...(sensor.id === 4 ? styles.offlineSensorButton : {})
            }}
            onClick={() => setActiveSensor(sensor.id)}
          >
            {sensor.name}
          </button>
        ))}
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
              {activeSensorData.id === 4 ? '--' : `${currentTemp}°C`}
            </div>
          </div>
        </div>

        <div style={styles.currentValueCard}>
          <div style={styles.currentValueContent}>
            <h3 style={styles.currentValueTitle}>Current Humidity</h3>
            <div style={styles.currentValueNumber}>
              {activeSensorData.id === 4 ? '--' : `${currentHumidity}%`}
            </div>
          </div>
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
  offlineSensorButton: {
    backgroundColor: '#6b7280',
    cursor: 'not-allowed'
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
    backgroundColor: '#1e40af',
    borderRadius: '8px',
    padding: '30px 20px',
    minWidth: '300px'
  },
  currentValueContent: {
    textAlign: 'center'
  },
  currentValueTitle: {
    color: 'white',
    margin: '0 0 15px 0',
    fontSize: '18px',
    fontWeight: '500'
  },
  currentValueNumber: {
    color: 'white',
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '0'
  }
};

export default RealTime;