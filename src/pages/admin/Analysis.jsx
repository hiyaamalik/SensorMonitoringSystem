import React, { useState } from 'react';

const Analysis = () => {
  const [activeSensor, setActiveSensor] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const sensors = [
    { id: 1, name: "Sensor 1", baseTemp: 24, baseHumidity: 65, location: "Building A" },
    { id: 2, name: "Sensor 2", baseTemp: 26, baseHumidity: 68, location: "Building B" },
    { id: 3, name: "Sensor 3", baseTemp: 22, baseHumidity: 70, location: "Park" },
    { id: 4, name: "Sensor 4", baseTemp: 0, baseHumidity: 0, location: "Warehouse" },
    { id: 5, name: "Sensor 5", baseTemp: 25, baseHumidity: 62, location: "Office" }
  ];

  // Mock data generation for analysis based on selected date
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
    
    // Use selected date to create variation in data
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

  // Generate proper calendar data
  const generateCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // First day to show (might be from previous month)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay() + 1); // Monday start
    
    const calendarDays = [];
    const today = new Date();
    
    // Generate 6 weeks of calendar
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
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
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
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Analysis</h1>
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

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Column - Full Calendar */}
        <div style={styles.leftColumn}>
          <div style={styles.calendarContainer}>
            {/* Calendar Header with Navigation */}
            <div style={styles.calendarNavigation}>
              <button 
                style={styles.navButton}
                onClick={() => navigateMonth(-1)}
              >
                &#8249;
              </button>
              <div style={styles.monthYear}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <button 
                style={styles.navButton}
                onClick={() => navigateMonth(1)}
              >
                &#8250;
              </button>
            </div>
            
            {/* Week Days Header */}
            <div style={styles.calendarHeader}>
              {weekDays.map(day => (
                <div key={day} style={styles.calendarWeekDay}>{day}</div>
              ))}
            </div>
            
            {/* Calendar Grid */}
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

        {/* Right Column - Analysis Cards */}
        <div style={styles.rightColumn}>
          {/* Temperature Cards Row */}
          <div style={styles.cardRow}>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Min temperature of day selected</div>
                <div style={styles.cardValue}>{analysisData.minTemp}</div>
              </div>
            </div>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Max temperature of day selected</div>
                <div style={styles.cardValue}>{analysisData.maxTemp}</div>
              </div>
            </div>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Avg temperature of day selected</div>
                <div style={styles.cardValue}>{analysisData.avgTemp}</div>
              </div>
            </div>
          </div>

          {/* Humidity Cards Row */}
          <div style={styles.cardRow}>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Min humidity of day selected</div>
                <div style={styles.cardValue}>{analysisData.minHumidity}</div>
              </div>
            </div>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Max humidity of day selected</div>
                <div style={styles.cardValue}>{analysisData.maxHumidity}</div>
              </div>
            </div>
            <div style={styles.analysisCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Avg humidity of day selected</div>
                <div style={styles.cardValue}>{analysisData.avgHumidity}</div>
              </div>
            </div>
          </div>

          {/* Bottom Large Cards - Better Spacing */}
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
                  <div style={styles.cardTitle}>variance Humidity</div>
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
    backgroundColor: '#9ca3af',
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
    backgroundColor: '#9ca3af',
    borderRadius: '12px',
    minHeight: '80px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  largeCard: {
    flex: '1',
    backgroundColor: '#9ca3af',
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
    fontWeight: '500',
    lineHeight: '1.3'
  },
  cardValue: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937'
  }
};

export default Analysis;