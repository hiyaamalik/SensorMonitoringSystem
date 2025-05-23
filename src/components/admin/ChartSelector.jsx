import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

const ChartSelector = ({ chartType, setChartType }) => {
  return (
    <ToggleButtonGroup
      value={chartType}
      exclusive
      onChange={(e, val) => val && setChartType(val)}
      sx={{ mb: 2 }}
    >
      <ToggleButton value="line">Line</ToggleButton>
      <ToggleButton value="bar">Bar</ToggleButton>
      <ToggleButton value="area">Area</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ChartSelector;
