import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  TableContainer,
  Paper,
  CircularProgress
} from '@mui/material';

const API_URL = 'https://lostdevs.io/ctrl2/beans/sensorinfo.php';

const SensorMetadata = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setRows(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#dae2f7',
      minHeight: '100vh',
      animation: 'fadeInUp 0.5s ease-out forwards'
    },
    header: {
      backgroundColor: '#1e3a8a',
      padding: '20px',
      textAlign: 'center'
    },
    headerTitle: {
      color: 'white',
      margin: '0',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    tableContainer: {
      tableContainer: {
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    overflowX: 'auto',
    margin: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
}

    },
    table: {
      minWidth: 500,
      maxWidth: '100%'
    },
    tableHeadCell: {
      fontWeight: 'bold',
      backgroundColor: '#e0e7ff',
      color: '#1e3a8a',
      marginRight: 'auto',
      padding: '12px , 16px, 20px, 16px',

    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#f9fafb',
      },
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      width: '95%'
    }
  };

  return (
    <Box sx={styles.container}>
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
      
      <Box sx={styles.header}>
        <Typography variant="h1" sx={styles.headerTitle}>Sensor Information</Typography>
      </Box>
      
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table sx={styles.table} aria-label="sensor metadata table">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableHeadCell}>ID</TableCell>
              <TableCell sx={styles.tableHeadCell}>Name</TableCell>
              <TableCell sx={styles.tableHeadCell}>Type</TableCell>
              <TableCell sx={styles.tableHeadCell}>Manufacturer</TableCell>
              <TableCell sx={styles.tableHeadCell}>Model</TableCell>
              <TableCell sx={styles.tableHeadCell}>Status</TableCell>
              <TableCell sx={styles.tableHeadCell}>Platform</TableCell>
              <TableCell sx={styles.tableHeadCell}>Min Temp</TableCell>
              <TableCell sx={styles.tableHeadCell}>Max Temp</TableCell>
              <TableCell sx={styles.tableHeadCell}>Min Humidity</TableCell>
              <TableCell sx={styles.tableHeadCell}>Max Humidity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={11}>
                  <Box sx={styles.loadingContainer}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              rows.map(row => (
                <TableRow key={row.id} sx={styles.tableRow}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.sensor_name}</TableCell>
                  <TableCell>{row.sensor_type}</TableCell>
                  <TableCell>{row.manufacturer}</TableCell>
                  <TableCell>{row.sensor_model}</TableCell>
                  <TableCell>{row.calibration_status}</TableCell>
                  <TableCell>{row.platform}</TableCell>
                  <TableCell>{row.min_temperature}</TableCell>
                  <TableCell>{row.max_temperature}</TableCell>
                  <TableCell>{row.min_humidity}</TableCell>
                  <TableCell>{row.max_humidity}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SensorMetadata;