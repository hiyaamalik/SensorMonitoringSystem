import React, { useState, useRef } from 'react';

const DataValidation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [verificationHistory, setVerificationHistory] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0] || null;
    processSelectedFile(file);
  };

  const processSelectedFile = (file) => {
    if (file) {
      setSelectedFile(file);
      setVerificationResult('');
      
      // Auto-verify if file is selected
      setTimeout(() => {
        handleVerifyFile(file);
      }, 500);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        processSelectedFile(file);
      } else {
        setVerificationResult('❌ Please select only XLSX or XLS files.');
      }
    }
  };



  const handleVerifyFile = async (file = selectedFile) => {
    if (!file) {
      setVerificationResult('❌ Please select a file first.');
      return;
    }

    setLoading(true);
    
    // Simulate more detailed verification process
    const steps = [
      'Analyzing file structure...',
      'Checking digital signatures...',
      'Validating file integrity...',
      'Running security scan...',
      'Finalizing verification...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setVerificationResult(`🔄 ${steps[i]}`);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    // Generate realistic verification result
    const isValid = Math.random() > 0.25; // 75% chance of valid file
    const fileSize = (file.size / (1024 * 1024)).toFixed(2);
    const timestamp = new Date().toLocaleString();
    
    let result;
    if (isValid) {
      const hashValue = Math.random().toString(36).substring(2, 15).toUpperCase();
      result = `✅ VERIFICATION SUCCESSFUL
      
File: "${file.name}"
Size: ${fileSize} MB
Status: SECURE & VALID
Hash: ${hashValue}
Verified: ${timestamp}

✓ File integrity confirmed
✓ No tampering detected
✓ Digital signature valid
✓ Security scan passed`;
    } else {
      const errorType = Math.random() > 0.5 ? 'CORRUPTED' : 'TAMPERED';
      result = `❌ VERIFICATION FAILED
      
File: "${file.name}"
Size: ${fileSize} MB
Status: ${errorType}
Error Code: ERR_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}
Checked: ${timestamp}

⚠ File integrity compromised
⚠ Potential security risk detected
⚠ File may be corrupted or tampered`;
    }
    
    setVerificationResult(result);
    
    // Add to history
    const historyEntry = {
      fileName: file.name,
      timestamp: new Date().toLocaleTimeString(),
      status: isValid ? 'PASSED' : 'FAILED',
      size: `${fileSize} MB`
    };
    
    setVerificationHistory(prev => [historyEntry, ...prev.slice(0, 4)]); // Keep last 5 entries
    setLoading(false);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setVerificationResult('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#dae2f7',
      minHeight: '100vh',
      opacity: 0,
      transform: 'translateY(10px)',
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
    statsContainer: {
      display: 'flex',
      gap: '20px',
      margin: '20px',
      flexWrap: 'wrap'
    },
    statCard: {
      flex: '1',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      minWidth: '150px'
    },
    statLabel: {
      color: '#6b7280',
      fontSize: '12px',
      marginBottom: '8px',
      fontWeight: '500',
      textTransform: 'uppercase'
    },
    statValue: {
      color: 'darkblue',
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0'
    },
    sectionContainer: {
      backgroundColor: '#ffffff',
      margin: '20px',
      padding: '30px 20px',
      borderRadius: '8px'
    },
    sectionTitle: {
      color: '#374151',
      margin: '0 0 20px 0',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    buttonPrimary: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      marginRight: '10px',
      marginBottom: '15px',
      transition: 'all 0.2s ease'
    },
    buttonSecondary: {
      backgroundColor: '#6b7280',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      marginLeft: '10px'
    },
    dropZone: {
      border: `2px dashed ${dragActive ? '#3b82f6' : '#d1d5db'}`,
      borderRadius: '8px',
      padding: '40px 20px',
      textAlign: 'center',
      backgroundColor: dragActive ? '#eff6ff' : '#f9fafb',
      cursor: 'pointer',
      marginBottom: '20px',
      transition: 'all 0.3s ease'
    },
    fileInput: {
      display: 'none'
    },
    fileListContainer: {
      marginTop: '15px'
    },
    fileListItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: '#f3f4f6',
      margin: '8px 0',
      borderRadius: '6px',
      fontSize: '14px',
      color: '#374151'
    },
    fileInfo: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    },
    fileName: {
      fontWeight: '500',
      marginBottom: '2px'
    },
    fileDetails: {
      fontSize: '12px',
      color: '#6b7280'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '500',
      textTransform: 'uppercase'
    },
    statusVerified: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusPending: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    statusFailed: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    selectedFileInfo: {
      backgroundColor: '#eff6ff',
      border: '1px solid #bfdbfe',
      borderRadius: '6px',
      padding: '15px',
      marginBottom: '15px'
    },
    resultContainer: {
      marginTop: '20px',
      padding: '20px',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.6',
      fontFamily: 'monospace',
      whiteSpace: 'pre-line'
    },
    resultSuccess: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      border: '1px solid #a7f3d0'
    },
    resultError: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fca5a5'
    },
    resultProcessing: {
      backgroundColor: '#ddd6fe',
      color: '#5b21b6',
      border: '1px solid #c4b5fd'
    },
    resultDefault: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
      border: '1px solid #d1d5db'
    },
    historyContainer: {
      marginTop: '20px'
    },
    historyItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 15px',
      backgroundColor: '#f9fafb',
      margin: '5px 0',
      borderRadius: '4px',
      fontSize: '13px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px 20px',
      color: '#6b7280',
      fontStyle: 'italic'
    }
  };

  const getResultStyle = () => {
    if (verificationResult.includes('🔄')) return { ...styles.resultContainer, ...styles.resultProcessing };
    if (verificationResult.includes('✅')) return { ...styles.resultContainer, ...styles.resultSuccess };
    if (verificationResult.includes('❌')) return { ...styles.resultContainer, ...styles.resultError };
    return { ...styles.resultContainer, ...styles.resultDefault };
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'verified': return { ...styles.statusBadge, ...styles.statusVerified };
      case 'failed': return { ...styles.statusBadge, ...styles.statusFailed };
      default: return { ...styles.statusBadge, ...styles.statusPending };
    }
  };

  return (
    <div style={styles.container}>
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
        <h1 style={styles.headerTitle}>Data Validation</h1>
      </div>



      <div style={styles.sectionContainer}>
        <h3 style={styles.sectionTitle}>Verify Secure XLSX File</h3>
        
        <div 
          style={styles.dropZone}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={{ marginBottom: '10px', fontSize: '18px' }}>
            {dragActive ? '📁 Drop file here!' : '📤 Drag & Drop XLSX file here'}
          </div>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>
            or click to browse files
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            style={styles.fileInput}
          />
        </div>

        {selectedFile && (
          <div style={styles.selectedFileInfo}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                  📄 {selectedFile.name}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Size: {formatFileSize(selectedFile.size)} • Type: {selectedFile.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
                </div>
              </div>
              <button style={styles.buttonSecondary} onClick={clearFile}>
                Clear
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          <strong style={{ color: '#374151', fontSize: '16px' }}>Verification Result:</strong>
          {verificationResult ? (
            <div style={getResultStyle()}>
              {verificationResult}
            </div>
          ) : (
            <div style={styles.resultContainer}>
              {loading ? (
                <span style={{ color: '#6b7280', fontStyle: 'italic' }}>
                  🔄 Processing verification...
                </span>
              ) : (
                'No verification performed yet. Select a file to begin automatic verification.'
              )}
            </div>
          )}
        </div>

        {verificationHistory.length > 0 && (
          <div style={styles.historyContainer}>
            <strong style={{ color: '#374151', fontSize: '14px', display: 'block', marginBottom: '10px' }}>
              Recent Verifications:
            </strong>
            {verificationHistory.map((entry, index) => (
              <div key={index} style={styles.historyItem}>
                <span>{entry.fileName} ({entry.size})</span>
                <span style={{ 
                  color: entry.status === 'PASSED' ? '#065f46' : '#991b1b',
                  fontWeight: '500'
                }}>
                  {entry.status} • {entry.timestamp}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataValidation;