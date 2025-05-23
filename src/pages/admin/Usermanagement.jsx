import React from 'react';
import { Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const UserManagement = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Button variant="contained" sx={{ mb: 2 }}>Add User</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Access</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell><Button size="small">Edit</Button> <Button size="small" color="error">Delete</Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default UserManagement;
