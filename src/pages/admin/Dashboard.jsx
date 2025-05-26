import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateRandomData = (baseValue = 50, variance = 20) => {
  return Math.floor(baseValue + (Math.random() - 0.5) * variance);
};

const SensorButton = ({ label, isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`sensor-button ${isActive ? 'active' : 'inactive'}`}
  >
    {label}
  </button>
);

const LiveChart = ({ data, title, color = "#2563eb", unit }) => (
  <div className="chart-card">
    <h3 className="chart-title">{title}</h3>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [`${value}${unit}`, title.split(' - ')[0]]}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2} 
            dot={false} 
            activeDot={{ r: 6, fill: color, strokeWidth: 2, stroke: 'white' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const SensorDetails = ({ activeSensor }) => {
  const sensorDetails = {
    1: { location: "Building A", status: "Online", lastUpdated: "Just now" },
    2: { location: "Building B", status: "Online", lastUpdated: "1 min ago" },
    3: { location: "Park", status: "Online", lastUpdated: "2 mins ago" },
    4: { location: "Warehouse", status: "Offline", lastUpdated: "5 mins ago" },
    5: { location: "Office", status: "Online", lastUpdated: "Just now" }
  };

  return (
    <div className="sensor-details">
      <h4>Sensor Details</h4>
      <div className="details-list">
        <div className="detail-row">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{sensorDetails[activeSensor].location}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <span className={`detail-value ${sensorDetails[activeSensor].status === "Online" ? "status-online" : ""}`}>
            {sensorDetails[activeSensor].status}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Last Updated:</span>
          <span className="detail-value">{sensorDetails[activeSensor].lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

const SearchLocations = () => {
  const locations = [
    { id: 1, name: "Building A", distance: "0.2 km" },
    { id: 2, name: "Building B", distance: "0.5 km" },
    { id: 3, name: "Park", distance: "1.2 km" },
    { id: 4, name: "Warehouse", distance: "2.1 km" },
    { id: 5, name: "Office", distance: "0.8 km" }
  ];

  return (
    <div className="search-locations">
      <h4>Nearby Locations</h4>
      <div className="location-list">
        {locations.map(location => (
          <div key={location.id} className="location-item">
            <span>{location.name}</span>
            <span>{location.distance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MapVisualization = ({ activeSensor }) => {
  const sensorPositions = {
    1: { top: "30%", left: "20%" },
    2: { top: "50%", left: "40%" },
    3: { top: "20%", left: "70%" },
    4: { top: "70%", left: "60%" },
    5: { top: "60%", left: "30%" }
  };

  return (
    <div className="map-card">
      <h4 className="map-title">Sensor Locations</h4>
      <div className="map-container">
        {[1, 2, 3, 4, 5].map(sensorId => (
          <div
            key={sensorId}
            className={`sensor-marker ${activeSensor === sensorId ? "active" : ""}`}
            style={{
              top: sensorPositions[sensorId].top,
              left: sensorPositions[sensorId].left
            }}
          />
        ))}
      </div>
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-dot legend-active"></span>
          <span>Active</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-online"></span>
          <span>Online</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-offline"></span>
          <span>Offline</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeSensor, setActiveSensor] = useState(1);

  const generateInitialData = (baseTemp, baseHumidity) => {
    const data = [];
    const now = new Date();
    
    for (let i = 9; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 30000);
      data.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        value: generateRandomData(baseTemp, 15)
      });
    }
    return data;
  };

  const [tempData, setTempData] = useState({
    1: generateInitialData(22, 65),
    2: generateInitialData(25, 70),
    3: generateInitialData(28, 60),
    4: generateInitialData(20, 75),
    5: generateInitialData(24, 68),
  });

  const [humidityData, setHumidityData] = useState({
    1: generateInitialData(65, 20),
    2: generateInitialData(70, 20),
    3: generateInitialData(60, 20),
    4: generateInitialData(75, 20),
    5: generateInitialData(68, 20),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });

      setTempData(prev => ({
        ...prev,
        [activeSensor]: [
          ...prev[activeSensor].slice(1),
          { time: timeString, value: generateRandomData(prev[activeSensor][8].value, 5) }
        ]
      }));

      setHumidityData(prev => ({
        ...prev,
        [activeSensor]: [
          ...prev[activeSensor].slice(1),
          { time: timeString, value: generateRandomData(prev[activeSensor][8].value, 5) }
        ]
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, [activeSensor]);

  const currentTemp = tempData[activeSensor][tempData[activeSensor].length - 1]?.value || 0;
  const currentHumidity = humidityData[activeSensor][humidityData[activeSensor].length - 1]?.value || 0;

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1 className="dashboard-title">IoT Sensor Dashboard</h1>
          <div className="header-status">
            <div className="live-indicator">
              <span className="pulse-dot"></span>
              <span>Live Data</span>
            </div>
          </div>
        </div>

        <div className="sensor-nav">
          {[1, 2, 3, 4, 5].map(sensorId => (
            <SensorButton
              key={sensorId}
              label={`Sensor ${sensorId}`}
              isActive={activeSensor === sensorId}
              onClick={() => setActiveSensor(sensorId)}
            />
          ))}
        </div>

        <div className="current-values">
          <div className="value-container">
            <div className="value-number temp-value">{currentTemp}°C</div>
            <div className="value-label">Temperature</div>
          </div>
          <div className="value-container">
            <div className="value-number humidity-value">{currentHumidity}%</div>
            <div className="value-label">Humidity</div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="charts-column">
            <LiveChart
              data={tempData[activeSensor]}
              title={`Temperature - Sensor ${activeSensor}`}
              color="#2563eb"
              unit="°C"
            />
            <LiveChart
              data={humidityData[activeSensor]}
              title={`Humidity - Sensor ${activeSensor}`}
              color="#16a34a"
              unit="%"
            />
          </div>

          <div className="right-column">
            <MapVisualization activeSensor={activeSensor} />
            <SensorDetails activeSensor={activeSensor} />
            <SearchLocations />
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Global Styles */
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f9fafb;
        }

        /* Main Container */
        .dashboard-container {
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 1.5rem;
        }

        .dashboard-wrapper {
          max-width: 80rem;
          margin: 0 auto;
        }

        /* Header Styles */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .dashboard-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .header-status {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .live-indicator {
          display: flex;
          align-items: center;
        }

        .pulse-dot {
          width: 0.5rem;
          height: 0.5rem;
          background-color: #4ade80;
          border-radius: 50%;
          margin-right: 0.5rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Sensor Navigation Buttons */
        .sensor-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .sensor-button {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          min-width: 120px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .sensor-button.active {
          background-color: #2563eb;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .sensor-button.inactive {
          background-color: white;
          color: #2563eb;
          border: 2px solid #2563eb;
        }

        .sensor-button.inactive:hover {
          background-color: #eff6ff;
        }

        /* Current Values Display */
        .current-values {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          background-color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }

        .value-container {
          text-align: center;
          padding: 0 1rem;
          flex: 1;
        }

        .value-number {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .value-label {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .temp-value { color: #2563eb; }
        .humidity-value { color: #16a34a; }

        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Charts Column */
        .charts-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .chart-card {
          background-color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
        }

        .chart-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }

        .chart-container {
          height: 12rem;
        }

        /* Right Column */
        .right-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Map Card */
        .map-card {
          background-color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
        }

        .map-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }

        .map-container {
          position: relative;
          width: 100%;
          height: 16rem;
          background: linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .sensor-marker {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #6b7280;
          transform: translate(-50%, -50%);
        }

        .sensor-marker.active {
          background-color: #2563eb;
          animation: sensor-pulse 2s infinite;
        }

        @keyframes sensor-pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
          }
          70% {
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
        }

        .map-legend {
          margin-top: 0.75rem;
          display: flex;
          justify-content: center;
          gap: 1rem;
          font-size: 0.75rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
        }

        .legend-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          margin-right: 0.25rem;
        }

        .legend-online { background-color: #4ade80; }
        .legend-offline { background-color: #ef4444; }
        .legend-active { background-color: #2563eb; }

        /* Sensor Details */
        .sensor-details {
          background-color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
        }

        .sensor-details h4 {
          font-weight: 600;
          margin-bottom: 0.5rem;
          margin-top: 0;
        }

        .details-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
        }

        .detail-label {
          color: #6b7280;
        }

        .detail-value {
          font-weight: 500;
        }

        .status-online {
          color: #16a34a;
          font-weight: 500;
        }

        /* Search Locations */
        .search-locations {
          background-color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
        }

        .search-locations h4 {
          font-weight: 600;
          margin-bottom: 0.5rem;
          margin-top: 0;
        }

        .location-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .location-item {
          display: flex;
          justify-content: space-between;
          padding: 0.25rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
          }
          
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .sensor-nav {
            justify-content: center;
          }
          
          .current-values {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .dashboard-title {
            font-size: 1.5rem;
          }
          
          .header-status {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .sensor-button {
            min-width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;