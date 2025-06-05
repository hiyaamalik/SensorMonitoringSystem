import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';

const styles = {
  root: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#dae2f7',
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    animation: 'fadeInUp 0.5s ease-out forwards'
  },
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
  
  tableContainer: {
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    overflowX: 'auto',
    padding: '4px',
    marginRight: '16px',
    marginLeft: '16px',
    marginBottom: '20px',
    marginTop: '20px',
    borderRadius: '8px',
  },
  table: {
    minWidth: 500,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#e0e7ff',
    color: '#1e3a8a',
    fontSize: '14px',
  },
  stripedRow: {
    backgroundColor: '#f9fafb',
  }
};

const SensorActivity = () => {
  return (
    <div style={styles.root}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Sensor Activity Log</h1>
      </div>

      <div style={styles.tableContainer}>
        <Table style={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell style={styles.tableHeaderCell}>Sensor</TableCell>
              <TableCell style={styles.tableHeaderCell}>Status</TableCell>
              <TableCell style={styles.tableHeaderCell}>Error Flags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow style={styles.stripedRow}>
              <TableCell>Sensor 1</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>None</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sensor 2</TableCell>
              <TableCell>Inactive</TableCell>
              <TableCell>Timeout</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SensorActivity;