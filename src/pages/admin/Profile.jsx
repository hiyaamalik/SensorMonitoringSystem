import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import ThemeToggle from '../../components/common/ThemeToggle';

const Profile = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
        <TextField label="Name" variant="outlined" fullWidth />
        <TextField label="Access" variant="outlined" fullWidth />
        <TextField label="Mobile Number" variant="outlined" fullWidth />
        <TextField label="Email" type="email" variant="outlined" fullWidth />
        <TextField label="Threshold Temperature (°C)" type="number" variant="outlined" fullWidth />
        <ThemeToggle />
        <Button variant="contained" color="primary">Save Settings</Button>
      </Box>
    </Box>
  );
};

export default Profile;
