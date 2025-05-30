import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Modal,
  Divider,
  Tooltip
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ThemeToggle from '../../components/common/ThemeToggle';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: 'John Doe',
    access: 'Admin', // This will be read-only as per requirement
    mobile: '9876543210',
    email: 'john@example.com',
    employeeNumber: 'EMP1234',
    minTemp: 10,
    maxTemp: 50,
    minHumidity: 30,
    maxHumidity: 80,
  });

  // Required fields that must have values
  const requiredFields = ['name', 'mobile', 'email', 'employeeNumber'];

  useEffect(() => {
    validateAll();
  }, [formData]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone number validation (Indian format - 10 digits)
  const isValidPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Employee number validation (alphanumeric, minimum 3 characters)
  const isValidEmployeeNumber = (empNum) => {
    const empRegex = /^[A-Za-z0-9]{3,}$/;
    return empRegex.test(empNum);
  };

  const validateAll = () => {
    const newErrors = {};

    // Validate required fields
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Name validation (minimum 2 characters, only letters and spaces)
    if (formData.name && formData.name.trim()) {
      if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters long';
      } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
        newErrors.name = 'Name can only contain letters and spaces';
      }
    }

    // Email validation
    if (formData.email && formData.email.trim()) {
      if (!isValidEmail(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Mobile number validation
    if (formData.mobile && formData.mobile.trim()) {
      if (!isValidPhone(formData.mobile.trim())) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number starting with 6-9';
      }
    }

    // Employee number validation
    if (formData.employeeNumber && formData.employeeNumber.trim()) {
      if (!isValidEmployeeNumber(formData.employeeNumber.trim())) {
        newErrors.employeeNumber = 'Employee number must be at least 3 alphanumeric characters';
      }
    }

    // Temperature validation
    const minTemp = Number(formData.minTemp);
    const maxTemp = Number(formData.maxTemp);
    
    if (isNaN(minTemp) || isNaN(maxTemp)) {
      newErrors.temp = 'Temperature values must be valid numbers';
    } else if (minTemp >= maxTemp) {
      newErrors.temp = 'Minimum temperature must be less than maximum temperature';
    } else if (minTemp < -50 || maxTemp > 100) {
      newErrors.temp = 'Temperature values must be between -50°C and 100°C';
    }

    // Humidity validation
    const minHumidity = Number(formData.minHumidity);
    const maxHumidity = Number(formData.maxHumidity);
    
    if (isNaN(minHumidity) || isNaN(maxHumidity)) {
      newErrors.humidity = 'Humidity values must be valid numbers';
    } else if (minHumidity < 0 || maxHumidity > 100) {
      newErrors.humidity = 'Humidity values must be between 0% and 100%';
    } else if (minHumidity >= maxHumidity) {
      newErrors.humidity = 'Minimum humidity must be less than maximum humidity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateAll()) {
      return;
    }
    console.log('Saved data:', formData);
    alert('Profile saved successfully!');
    setEditMode(false); // Exit edit mode after successful save
  };

  const handleConfigSave = () => {
    if (!validateAll()) {
      return;
    }
    console.log('Configuration saved:', {
      minTemp: formData.minTemp,
      maxTemp: formData.maxTemp,
      minHumidity: formData.minHumidity,
      maxHumidity: formData.maxHumidity
    });
    alert('Configuration settings saved successfully!');
    setOpen(false);
  };

  const isFormValid = Object.keys(errors).length === 0;

  const renderRequiredLabel = (label) => (
    <span>
      {label} <span style={{ color: 'red' }}>*</span>
    </span>
  );

  return (
    <>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>My Profile</h1>
          <IconButton onClick={() => setOpen(true)} style={styles.settingsButton}>
            <SettingsIcon sx={{ color: 'white', fontSize: 28, '&:hover': { color: '#cbd5e1' } }} />
          </IconButton>
        </div>

        <Box sx={styles.formWrapper}>
          <TextField 
            label={renderRequiredLabel("Name")}
            variant="outlined" 
            fullWidth 
            value={formData.name} 
            onChange={handleChange('name')}
            error={Boolean(errors.name)}
            helperText={errors.name}
            placeholder="Enter your full name"
            disabled={!editMode}
          />
          
          <TextField 
            label="Access Level"
            variant="outlined" 
            fullWidth 
            value={formData.access} 
            disabled={true}
            helperText="Access level is managed by system administrator"
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#666',
                backgroundColor: '#f5f5f5'
              }
            }}
          />
          
          <TextField 
            label={renderRequiredLabel("Mobile Number")}
            variant="outlined" 
            fullWidth 
            value={formData.mobile} 
            onChange={handleChange('mobile')}
            error={Boolean(errors.mobile)}
            helperText={errors.mobile || "Enter 10-digit mobile number"}
            placeholder="9876543210"
            inputProps={{ maxLength: 10 }}
            disabled={!editMode}
          />
          
          <TextField 
            label={renderRequiredLabel("Email")}
            type="email" 
            variant="outlined" 
            fullWidth 
            value={formData.email} 
            onChange={handleChange('email')}
            error={Boolean(errors.email)}
            helperText={errors.email}
            placeholder="example@domain.com"
            disabled={!editMode}
          />
          
          <TextField
            label={renderRequiredLabel("Employee Number")}
            variant="outlined"
            fullWidth
            value={formData.employeeNumber}
            onChange={handleChange('employeeNumber')}
            disabled={!editMode}
            error={Boolean(errors.employeeNumber)}
            helperText={errors.employeeNumber || "Minimum 3 alphanumeric characters"}
            placeholder="EMP1234"
          />

          <ThemeToggle />
          
          {/* Edit/Save Profile Button */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            {!editMode ? (
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => setEditMode(true)}
                fullWidth
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSave}
                  disabled={!isFormValid}
                  sx={{ flex: 1 }}
                >
                  Save Profile
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => setEditMode(false)}
                  sx={{ flex: 1 }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
          
          {!isFormValid && editMode && (
            <Typography variant="caption" color="error" sx={{ mt: 1, textAlign: 'center' }}>
              Please fix the errors above before saving
            </Typography>
          )}
        </Box>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={styles.modalBox}>
          <Typography variant="h6" gutterBottom>Configuration Settings</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Configure threshold values for environmental monitoring alerts. 
            <span style={{ color: 'red' }}> * </span>indicates required fields.
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Temperature Settings <span style={{ color: 'red' }}>*</span>
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Min Temperature (°C)"
              type="number"
              fullWidth
              value={formData.minTemp}
              onChange={handleChange('minTemp')}
              error={Boolean(errors.temp)}
              inputProps={{ min: -50, max: 100, step: 0.1 }}
              placeholder="-50 to 100"
            />
            <TextField
              label="Max Temperature (°C)"
              type="number"
              fullWidth
              value={formData.maxTemp}
              onChange={handleChange('maxTemp')}
              error={Boolean(errors.temp)}
              inputProps={{ min: -50, max: 100, step: 0.1 }}
              placeholder="-50 to 100"
            />
          </Box>
          
          {errors.temp && (
            <Typography color="error" sx={{ mb: 2, fontSize: '0.875rem' }}>
              {errors.temp}
            </Typography>
          )}

          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Humidity Settings <span style={{ color: 'red' }}>*</span>
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Min Humidity (%)"
              type="number"
              fullWidth
              value={formData.minHumidity}
              onChange={handleChange('minHumidity')}
              error={Boolean(errors.humidity)}
              inputProps={{ min: 0, max: 100, step: 1 }}
              placeholder="0 to 100"
            />
            <TextField
              label="Max Humidity (%)"
              type="number"
              fullWidth
              value={formData.maxHumidity}
              onChange={handleChange('maxHumidity')}
              error={Boolean(errors.humidity)}
              inputProps={{ min: 0, max: 100, step: 1 }}
              placeholder="0 to 100"
            />
          </Box>
          
          {errors.humidity && (
            <Typography color="error" sx={{ mb: 2, fontSize: '0.875rem' }}>
              {errors.humidity}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body2" sx={{ mb: 0.5, color: '#666' }}>
            App Version: 1.0.0
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
            Developer: Life.OS
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Tooltip title={!isFormValid ? 'Please fix validation errors first' : ''}>
              <span>
                <Button
                  variant="contained"
                  onClick={handleConfigSave}
                  disabled={!isFormValid}
                >
                  Save Settings
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;

// Enhanced styling
const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
  },
  headerTitle: {
    color: 'white',
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '90%',
    maxWidth: '500px',
    margin: '30px auto',
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxWidth: '90vw',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflow: 'auto',
  },
};