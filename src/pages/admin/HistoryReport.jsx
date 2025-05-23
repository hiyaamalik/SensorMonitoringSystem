import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

const HistoryReport = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>History & Report</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} />
        <TextField label="End Date" type="date" InputLabelProps={{ shrink: true }} />
        <Button variant="contained" color="primary">Generate Report</Button>
      </Box>
      <Typography variant="h6">[Table & Chart Placeholder]</Typography>
      <Button variant="outlined" sx={{ mt: 2 }}>Download Excel</Button>
    </Box>
  );
};

export default HistoryReport;