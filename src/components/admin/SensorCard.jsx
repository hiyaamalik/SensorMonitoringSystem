import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SensorCard = ({ title, value, unit }) => {
  return (
    <Card sx={{ minWidth: 150, m: 1 }}>
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="h5">{value} {unit}</Typography>
      </CardContent>
    </Card>
  );
};

export default SensorCard;