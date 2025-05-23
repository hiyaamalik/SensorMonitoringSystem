import React, { useState } from 'react';
import { Box, Grid, Typography, Tabs, Tab } from '@mui/material';
import SensorCard from '../../components/admin/SensorCard';
import ChartSelector from '../../components/admin/ChartSelector';
import CustomLineChart from '../../components/charts/LineChart';
import CustomBarChart from '../../components/charts/BarChart';
import CustomAreaChart from '../../components/charts/AreaChart';

const sampleData = [
  { time: '10:00', value: 28 },
  { time: '10:05', value: 30 },
  { time: '10:10', value: 32 },
];

const RealTime = () => {
  const [chartType, setChartType] = useState('line');
  const [sensorTab, setSensorTab] = useState(0);

  const renderChart = () => {
    if (chartType === 'bar') return <CustomBarChart data={sampleData} />;
    if (chartType === 'area') return <CustomAreaChart data={sampleData} />;
    return <CustomLineChart data={sampleData} />;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Real-Time Monitoring</Typography>
      <Tabs value={sensorTab} onChange={(e, newVal) => setSensorTab(newVal)}>
        <Tab label="Sensor 1" />
        <Tab label="Sensor 2" />
        <Tab label="Sensor 3" />
        <Tab label="Sensor 4" />
        <Tab label="Sensor 5" />
      </Tabs>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} md={3}><SensorCard title="Temperature" value={30} unit="°C" /></Grid>
        <Grid item xs={6} md={3}><SensorCard title="Humidity" value={45} unit="%" /></Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Real-Time Graph</Typography>
        <ChartSelector chartType={chartType} setChartType={setChartType} />
        {renderChart()}
      </Box>
    </Box>
  );
};

export default RealTime;