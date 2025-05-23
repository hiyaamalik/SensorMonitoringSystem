import React from 'react';
import { Box, Typography, TextField, Grid, Paper } from '@mui/material';

const Analysis = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Sensor Data Analysis</Typography>
      <TextField label="Select Date" type="date" InputLabelProps={{ shrink: true }} sx={{ mb: 3 }} />
      <Grid container spacing={2}>
        {["Min Temp", "Max Temp", "Avg Temp", "Min Humidity", "Max Humidity", "Avg Humidity"].map(label => (
          <Grid item xs={6} md={4} key={label}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="subtitle1">{label}</Typography>
              <Typography variant="h6">--</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Analysis;
