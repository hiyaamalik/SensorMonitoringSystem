import React from 'react';
import { Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const styles = {
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: '20px',
    textAlign: 'center',
  },
  headerTitle: {
    color: 'white',
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  button: {
    mb: 2,
    backgroundColor: '#1e3a8a',
    '&:hover': {
      backgroundColor: '#16326c',
    },
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    overflowX: 'auto',
    padding: '10px',
  },
  table: {
    minWidth: 650,
  },
  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#e0e7ff',
    color: '#1e3a8a',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f9fafb',
    },
  },
  actionButton: {
    marginRight: '8px',
  }
};

const UserManagement = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography component="h1" sx={styles.headerTitle}>
          User Management
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button variant="contained" sx={styles.button}>
          Add User
        </Button>

        <Box sx={styles.tableContainer}>
          <Table sx={styles.table} aria-label="user management table">
            <TableHead>
              <TableRow>
                <TableCell sx={styles.tableHeadCell}>Name</TableCell>
                <TableCell sx={styles.tableHeadCell}>Email</TableCell>
                <TableCell sx={styles.tableHeadCell}>Access</TableCell>
                <TableCell sx={styles.tableHeadCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={styles.tableRow}>
                <TableCell>John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>
                  <Button size="small" sx={styles.actionButton} variant="outlined" color="primary">
                    Edit
                  </Button>
                  <Button size="small" variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagement;
