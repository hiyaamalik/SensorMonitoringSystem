import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const HistoryReport = () => {
  const [activeSensor, setActiveSensor] = useState(1);
  const [tempChartType, setTempChartType] = useState('line');
  const [humidityChartType, setHumidityChartType] = useState('area');
  const [startDate, setStartDate] = useState('2023-05-29');
  const [endDate, setEndDate] = useState('2023-05-30');
  const [isMounted, setIsMounted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const sensors = [
    { id: 1, name: "Sensor 1 (CSIR - PME)", baseTemp: 24, baseHumidity: 65, location: "CSIR - PME" },
    { id: 2, name: "Sensor 2 (CSIR - HRD)", baseTemp: 26, baseHumidity: 68, location: "CSIR - HRD" },
    { id: 3, name: "Sensor 3 (CSIR - LIB)", baseTemp: 22, baseHumidity: 70, location: "CSIR - LIB" },
    { id: 4, name: "Sensor 4 (CSIR - CAFETERIA)", baseTemp: 0, baseHumidity: 0, location: "CSIR - CAFETERIA" },
    { id: 5, name: "Sensor 5 (CSIR - OPP WING)", baseTemp: 25, baseHumidity: 62, location: "CSIR - OPP WING)" }
  ];

  const generateMockData = (sensorId, days = 1) => {
    const data = [];
    const baseTemp = sensors.find(s => s.id === sensorId)?.baseTemp || 24;
    const baseHumidity = sensors.find(s => s.id === sensorId)?.baseHumidity || 65;
    
    const hoursToGenerate = days * 24;
    const now = new Date();
    
    for (let i = hoursToGenerate; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const timeStr = time.toLocaleString('en-US', { 
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      if (sensorId === 4) {
        data.push({
          time: timeStr,
          temp: 0,
          humidity: 0
        });
      } else {
        data.push({
          time: timeStr,
          temp: Math.round((baseTemp + (Math.random() - 0.5) * 6) * 10) / 10,
          humidity: Math.round(baseHumidity + (Math.random() - 0.5) * 15)
        });
      }
    }
    return data;
  };

  const mockData = generateMockData(activeSensor, 2);
  const tempData = mockData.map(d => ({ time: d.time, value: d.temp }));
  const humidityData = mockData.map(d => ({ time: d.time, value: d.humidity }));

  const generateTableData = () => {
    const tableData = [];
    const sensorData = sensors.find(s => s.id === activeSensor);
    
    for (let i = 0; i < 20; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      if (activeSensor === 4) {
        tableData.push({
          date: date.toLocaleDateString(),
          time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          temperature: '--',
          humidity: '--',
          status: 'Offline'
        });
      } else {
        tableData.push({
          date: date.toLocaleDateString(),
          time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          temperature: `${(sensorData.baseTemp + (Math.random() - 0.5) * 4).toFixed(1)}°C`,
          humidity: `${Math.round(sensorData.baseHumidity + (Math.random() - 0.5) * 10)}%`,
          status: 'Active'
        });
      }
    }
    return tableData;
  };

  const tableData = generateTableData();

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

  const downloadReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Time,Temperature,Humidity,Status\n" +
      tableData.map(row => `${row.date},${row.time},${row.temperature},${row.humidity},${row.status}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sensor_${activeSensor}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    dateRangeContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      margin: '20px',
      flexWrap: 'wrap'
    },
    dateInputGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    dateInput: {
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    },
    dateRangeTo: {
      color: '#6b7280',
      fontSize: '14px',
      fontWeight: '500'
    },
    downloadButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    dataTableContainer: {
      margin: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    tableWrapper: {
      width: '100%'
    },
    tableScrollContainer: {
      overflowX: 'auto',
      maxHeight: '300px',
      overflowY: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px'
    },
    tableHeaderRow: {
      backgroundColor: '#f9fafb'
    },
    tableHeader: {
      padding: '12px 16px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#374151',
      borderBottom: '2px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      backgroundColor: '#f9fafb'
    },
    tableRowEven: {
      backgroundColor: '#ffffff'
    },
    tableRowOdd: {
      backgroundColor: '#f9fafb'
    },
    tableCell: {
      padding: '12px 16px',
      borderBottom: '1px solid #e5e7eb',
      color: '#374151'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    statusActive: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusOffline: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
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
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>History and Report</h1>
      </div>

      <div style={styles.sensorNavigation}>
        <label htmlFor="sensor-select" style={styles.sensorLabel}>Select Sensor:</label>
        <select
          id="sensor-select"
          value={activeSensor}
          onChange={(e) => setActiveSensor(Number(e.target.value))}
          style={styles.sensorDropdown}
        >
          {sensors.map(sensor => (
            <option key={sensor.id} value={sensor.id}>
              {sensor.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.dateRangeContainer}>
        <div style={styles.dateInputGroup}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.dateInput}
          />
          <span style={styles.dateRangeTo}>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.dateInput}
          />
        </div>
        <button
          onClick={downloadReport}
          style={styles.downloadButton}
        >
          Download Report
        </button>
      </div>

      <div style={styles.dataTableContainer}>
        <div style={styles.tableWrapper}>
          <div style={styles.tableScrollContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Time</th>
                  <th style={styles.tableHeader}>Temperature</th>
                  <th style={styles.tableHeader}>Humidity</th>
                  <th style={styles.tableHeader}>Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.slice(0, 8).map((row, index) => (
                  <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                    <td style={styles.tableCell}>{row.date}</td>
                    <td style={styles.tableCell}>{row.time}</td>
                    <td style={styles.tableCell}>{row.temperature}</td>
                    <td style={styles.tableCell}>{row.humidity}</td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.statusBadge,
                        ...(row.status === 'Offline' ? styles.statusOffline : styles.statusActive)
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={styles.chartsContainer}>
        {/* Temperature Graph */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Temperature graph of timespan</h3>
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

        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Humidity graph of timespan</h3>
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
    </div>
  );
};

export default HistoryReport;