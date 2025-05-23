mport React from 'react';
import { Box, TextField, Typography, Button, Switch, FormControlLabel } from '@mui/material';
import { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';

const ProfileSettings = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Profile Settings</Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
        <TextField label="Name" variant="outlined" fullWidth />
        <TextField label="Access Level" variant="outlined" fullWidth />
        <TextField label="Mobile Number" variant="outlined" fullWidth />
        <TextField label="Email Address" variant="outlined" fullWidth />
        <TextField label="Custom Threshold (°C)" variant="outlined" type="number" fullWidth />

        <FormControlLabel
          control={<Switch checked={theme === 'dark'} onChange={handleThemeChange} />}
          label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        />

        <Button type="submit" variant="contained" color="primary">
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSettings;