import React, { useContext } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import ThemeContext from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <FormControlLabel
      control={<Switch checked={theme === 'dark'} onChange={handleChange} />}
      label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
    />
  );
};

export default ThemeToggle;
