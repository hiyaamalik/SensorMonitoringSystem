import React, { useState, useEffect } from 'react';
import '../../styles/LiveSensorMap.css';

const LiveSensorMap = () => {
  const [sensors, setSensors] = useState([]);
  const [hoveredSensor, setHoveredSensor] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sensorColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
  const sensorTypes = ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5'];

  const generateRandomCoords = () => ({
    lat: 8 + Math.random() * 29,
    lng: 68 + Math.random() * 30,
  });

  useEffect(() => {
    const initialSensors = Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      name: `Sensor ${index + 1}`,
      type: sensorTypes[index % sensorTypes.length],
      color: sensorColors[index % sensorColors.length],
      ...generateRandomCoords(),
      temp: Math.round(20 + Math.random() * 20),
      humidity: Math.round(30 + Math.random() * 40),
      status: Math.random() > 0.2 ? 'Active' : 'Inactive',
      lastUpdate: new Date().toLocaleTimeString(),
    }));
    setSensors(initialSensors);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prevSensors =>
        prevSensors.map(sensor => ({
          ...sensor,
          ...generateRandomCoords(),
          temp: Math.round(20 + Math.random() * 20),
          humidity: Math.round(30 + Math.random() * 40),
          status: Math.random() > 0.1 ? 'Active' : 'Inactive',
          lastUpdate: new Date().toLocaleTimeString(),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const coordsToSVG = (lat, lng) => ({
    x: ((lng - 68) / 30) * 700 + 50,
    y: ((37 - lat) / 29) * 400 + 50,
  });

  const handleMouseEnter = (sensor, event) => {
    setHoveredSensor(sensor);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (hoveredSensor) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredSensor(null);
  };

  return (
    <div className="sensor-map-container" onMouseMove={handleMouseMove}>
      <div className="header">
        <h2>Live Sensor Map</h2>
        <p>Real-time sensor tracking</p>
      </div>
      <div className="map-wrapper">
        <svg width="800" height="500" viewBox="0 0 800 500">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="800" height="500" fill="url(#grid)" />
          <rect x="50" y="50" width="700" height="400" fill="none" stroke="#94a3b8" strokeWidth="2" rx="10"/>
          {sensors.map(sensor => {
            const { x, y } = coordsToSVG(sensor.lat, sensor.lng);
            return (
              <g key={sensor.id}>
                {sensor.status === 'Active' && (
                  <circle
                    cx={x}
                    cy={y}
                    r="15"
                    fill={sensor.color}
                    opacity="0.3"
                    className="pulse-animation"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill={sensor.color}
                  stroke="white"
                  strokeWidth="2"
                  onMouseEnter={(e) => handleMouseEnter(sensor, e)}
                  onMouseLeave={handleMouseLeave}
                />
                <text x={x} y={y - 15} textAnchor="middle" className="sensor-label">
                  {sensor.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="status">
        Active: {sensors.filter(s => s.status === 'Active').length} | 
        Inactive: {sensors.filter(s => s.status === 'Inactive').length} | 
        Last Update: {sensors[0]?.lastUpdate || 'N/A'}
      </div>

      {hoveredSensor && (
        <div className="tooltip" style={{ left: mousePosition.x + 10, top: mousePosition.y - 10 }}>
          <div><strong>{hoveredSensor.name}</strong></div>
          <div>Type: {hoveredSensor.type}</div>
          <div>Temp: {hoveredSensor.temp}°C</div>
          <div>Humidity: {hoveredSensor.humidity}%</div>
          <div>Status: {hoveredSensor.status}</div>
          <div>Updated: {hoveredSensor.lastUpdate}</div>
        </div>
      )}
    </div>
  );
};

export default LiveSensorMap;
