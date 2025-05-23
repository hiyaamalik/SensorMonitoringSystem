import React from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const SensorActivity = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Sensor Activity Log</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sensor</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Error Flags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Sensor 1</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>None</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default SensorActivity;
