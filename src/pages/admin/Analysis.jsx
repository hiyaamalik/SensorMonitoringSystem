import React, { useState } from 'react';

const Analysis = () => {
  const [activeSensor, setActiveSensor] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const sensors = [
    { id: 1, name: "Sensor 1 (CSIR - PME)", baseTemp: 24, baseHumidity: 65, location: "CSIR - PME" },
    { id: 2, name: "Sensor 2 (CSIR - HRD)", baseTemp: 26, baseHumidity: 68, location: "CSIR - HRD" },
    { id: 3, name: "Sensor 3 (CSIR - LIB)", baseTemp: 22, baseHumidity: 70, location: "CSIR - LIB" },
    { id: 4, name: "Sensor 4 (CSIR - CAFETERIA)", baseTemp: 0, baseHumidity: 0, location: "CSIR - CAFETERIA" },
    { id: 5, name: "Sensor 5 (CSIR - OPP WING)", baseTemp: 25, baseHumidity: 62, location: "CSIR - OPP WING" }
  ];

  const generateAnalysisData = (sensorId, selectedDay) => {
    const sensor = sensors.find(s => s.id === sensorId);
    
    if (sensorId === 4) {
      return {
        minTemp: '--',
        maxTemp: '--',
        avgTemp: '--',
        minHumidity: '--',
        maxHumidity: '--',
        avgHumidity: '--',
        rateOfChangeTemp: '--',
        varianceTemp: '--',
        rateOfChangeHumidity: '--',
        varianceHumidity: '--'
      };
    }

    const baseTemp = sensor.baseTemp;
    const baseHumidity = sensor.baseHumidity;
    const dateVariation = selectedDay.getDate() * 0.1;
    
    return {
      minTemp: `${(baseTemp - 2 + dateVariation).toFixed(1)}°C`,
      maxTemp: `${(baseTemp + 3 + dateVariation).toFixed(1)}°C`,
      avgTemp: `${(baseTemp + dateVariation).toFixed(1)}°C`,
      minHumidity: `${Math.round(baseHumidity - 5 + dateVariation)}%`,
      maxHumidity: `${Math.round(baseHumidity + 8 + dateVariation)}%`,
      avgHumidity: `${Math.round(baseHumidity + dateVariation)}%`,
      rateOfChangeTemp: `${((Math.random() * 2) + dateVariation * 0.1).toFixed(2)}°C/hr`,
      varianceTemp: `${((Math.random() * 1.5) + dateVariation * 0.05).toFixed(2)}°C²`,
      rateOfChangeHumidity: `${((Math.random() * 3) + dateVariation * 0.1).toFixed(2)}%/hr`,
      varianceHumidity: `${((Math.random() * 4) + dateVariation * 0.1).toFixed(2)}%²`
    };
  };

  const analysisData = generateAnalysisData(activeSensor, selectedDate);

  const generateCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay() + 1);
    
    const calendarDays = [];
    const today = new Date();
    
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + (week * 7) + day);
        weekDays.push({
          date: date,
          day: date.getDate(),
          isCurrentMonth: date.getMonth() === month,
          isToday: date.toDateString() === today.toDateString(),
          isSelected: date.toDateString() === selectedDate.toDateString()
        });
      }
      calendarDays.push(weekDays);
    }
    return calendarDays;
  };

  const calendarData = generateCalendarData();
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
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
        <h1 style={styles.headerTitle}>Analysis</h1>
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
            <option key={sensor.id} value={sensor.id}>{sensor.name}</option>
          ))}
        </select>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.leftColumn}>
          <div style={styles.calendarContainer}>
            <div style={styles.calendarNavigation}>
              <button style={styles.navButton} onClick={() => navigateMonth(-1)}>&#8249;</button>
              <div style={styles.monthYear}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <button style={styles.navButton} onClick={() => navigateMonth(1)}>&#8250;</button>
            </div>
            <div style={styles.calendarHeader}>
              {weekDays.map(day => (
                <div key={day} style={styles.calendarWeekDay}>{day}</div>
              ))}
            </div>
            <div style={styles.calendarGrid}>
              {calendarData.map((week, weekIndex) => (
                week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    style={{
                      ...styles.calendarDay,
                      ...(day.isCurrentMonth ? styles.calendarDayActive : styles.calendarDayInactive),
                      ...(day.isToday ? styles.calendarDayToday : {}),
                      ...(day.isSelected ? styles.calendarDaySelected : {})
                    }}
                    onClick={() => day.isCurrentMonth && handleDateSelect(day.date)}
                  >
                    {day.day}
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.cardRow}>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Min temperature</div>
                <div style={styles.cardValue}>{analysisData.minTemp}</div>
              </div>
            </div>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Max temperature</div>
                <div style={styles.cardValue}>{analysisData.maxTemp}</div>
              </div>
            </div>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Avg temperature</div>
                <div style={styles.cardValue}>{analysisData.avgTemp}</div>
              </div>
            </div>
          </div>

          <div style={styles.cardRow}>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Min humidity</div>
                <div style={styles.cardValue}>{analysisData.minHumidity}</div>
              </div>
            </div>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Max humidity</div>
                <div style={styles.cardValue}>{analysisData.maxHumidity}</div>
              </div>
            </div>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Avg humidity</div>
                <div style={styles.cardValue}>{analysisData.avgHumidity}</div>
              </div>
            </div>
          </div>

          <div style={styles.bottomCardsContainer}>
            <div style={styles.bottomCardRow}>
              <div style={styles.largeCard}>
                <div style={styles.cardContent}>
                  <div style={styles.cardTitle}>Rate of Change Temp</div>
                  <div style={styles.cardValue}>{analysisData.rateOfChangeTemp}</div>
                </div>
              </div>
              <div style={styles.largeCard}>
                <div style={styles.cardContent}>
                  <div style={styles.cardTitle}>Variance temp</div>
                  <div style={styles.cardValue}>{analysisData.varianceTemp}</div>
                </div>
              </div>
            </div>
            <div style={styles.bottomCardRow}>
              <div style={styles.largeCard}>
                <div style={styles.cardContent}>
                  <div style={styles.cardTitle}>Rate of Change Humidity</div>
                  <div style={styles.cardValue}>{analysisData.rateOfChangeHumidity}</div>
                </div>
              </div>
              <div style={styles.largeCard}>
                <div style={styles.cardContent}>
                  <div style={styles.cardTitle}>Variance Humidity</div>
                  <div style={styles.cardValue}>{analysisData.varianceHumidity}</div>
                </div>
              </div>
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
    backgroundColor: '#dae2f7',
    minHeight: '100vh',
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
    marginRight: '4px'
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
  mainContent: {
    display: 'flex',
    gap: '20px',
    margin: '20px',
    alignItems: 'flex-start'
  },
  leftColumn: {
    flex: '0 0 300px'
  },
  rightColumn: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  calendarNavigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  navButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#374151',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease'
  },
  monthYear: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  calendarHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
    marginBottom: '10px'
  },
  calendarWeekDay: {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#374151',
    padding: '8px 4px'
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px'
  },
  calendarDay: {
    textAlign: 'center',
    padding: '10px 4px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    minHeight: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  calendarDayActive: {
    color: '#374151',
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  calendarDayInactive: {
    color: '#9ca3af',
    cursor: 'default'
  },
  calendarDayToday: {
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    color: '#1e40af',
    fontWeight: 'bold',
    border: '2px solid #3b82f6'
  },
  calendarDaySelected: {
    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: 'bold'
  },
  cardRow: {
    display: 'flex',
    gap: '15px'
  },
  analysisCard: {
    flex: '1',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    minHeight: '80px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  largeCard: {
    flex: '1',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    minHeight: '120px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  bottomCardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  bottomCardRow: {
    display: 'flex',
    gap: '15px'
  },
  cardContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center'
  },
  cardTitle: {
    fontSize: '12px',
    color: '#374151',
    marginBottom: '8px',
    fontWeight: '500'
  },
  cardValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937'
  }
};

export default Analysis;