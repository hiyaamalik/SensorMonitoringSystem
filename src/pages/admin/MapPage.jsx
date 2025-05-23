import React from 'react';
import { Box, Typography } from '@mui/material';
import MapComponent from '../../components/common/MapComponent';

const mockSensors = [
  { name: 'Sensor 1', coords: [28.61, 77.20], temp: 30, humidity: 45 },
  { name: 'Sensor 2', coords: [19.07, 72.87], temp: 31, humidity: 50 },
  { name: 'Sensor 3', coords: [22.57, 88.36], temp: 29, humidity: 42 },
  { name: 'Sensor 4', coords: [13.08, 80.27], temp: 33, humidity: 48 },
  { name: 'Sensor 5', coords: [12.97, 77.59], temp: 28, humidity: 44 },
];

const MapPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Sensor Map</Typography>
      <MapComponent sensors={mockSensors} />
    </Box>
  );
};

export default MapPage;