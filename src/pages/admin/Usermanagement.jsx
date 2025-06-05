import React from 'react';

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
    textAlign: 'center',
  },
  headerTitle: {
    color: 'white',
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  button: {
    marginBottom: '16px',
    backgroundColor: '#1e3a8a',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginLeft: '20px',
    marginTop: '24px',
    transition: 'background-color 0.2s ease',
  },
  tableContainer: {
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    overflowX: 'auto',
    padding: '4px',
    marginRight: '16px',
    marginLeft: '16px',
    marginBottom: '20px',
    borderRadius: '8px',
  },
  table: {
    width: '100%',
    minWidth: '500px',
    borderCollapse: 'collapse',
  },
  tableHead: {
    backgroundColor: '#e0e7ff',
  },
  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#e0e7ff',
    color: '#1e3a8a',
    padding: '16px',
    textAlign: 'left',
    borderBottom: '1px solid #e5e7eb',
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb',
  },
  tableRowOdd: {
    backgroundColor: '#f9fafb',
  },
  tableCell: {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
  },
  actionButton: {
    marginRight: '8px',
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid',
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
  },
  editButton: {
    color: '#1976d2',
    borderColor: '#1976d2',
  },
  deleteButton: {
    color: '#d32f2f', 
    borderColor: '#d32f2f',
  }
};

const UserManagement = () => {
  const users = [
    { name: 'John Doe', email: 'john@example.com', access: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', access: 'User' },
    { name: 'Mike Johnson', email: 'mike@example.com', access: 'Moderator' },
    { name: 'Sarah Wilson', email: 'sarah@example.com', access: 'User' },
    { name: 'David Brown', email: 'david@example.com', access: 'Admin' }
  ];

  const handleButtonHover = (e, isHover, buttonType) => {
    if (buttonType === 'main') {
      e.target.style.backgroundColor = isHover ? '#16326c' : '#1e3a8a';
    } else if (buttonType === 'edit') {
      e.target.style.backgroundColor = isHover ? '#1976d2' : 'transparent';
      e.target.style.color = isHover ? 'white' : '#1976d2';
    } else if (buttonType === 'delete') {
      e.target.style.backgroundColor = isHover ? '#d32f2f' : 'transparent';
      e.target.style.color = isHover ? 'white' : '#d32f2f';
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
        <h1 style={styles.headerTitle}>
          User Management
        </h1>
      </div>

      <div>
        <button 
          style={styles.button}
          onMouseEnter={(e) => handleButtonHover(e, true, 'main')}
          onMouseLeave={(e) => handleButtonHover(e, false, 'main')}
        >
          Add User
        </button>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeadCell}>Name</th>
                <th style={styles.tableHeadCell}>Email</th>
                <th style={styles.tableHeadCell}>Access</th>
                <th style={styles.tableHeadCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={index}
                  style={{
                    ...styles.tableRow,
                    ...(index % 2 === 1 ? styles.tableRowOdd : {})
                  }}
                >
                  <td style={styles.tableCell}>{user.name}</td>
                  <td style={styles.tableCell}>{user.email}</td>
                  <td style={styles.tableCell}>{user.access}</td>
                  <td style={styles.tableCell}>
                    <button 
                      style={{...styles.actionButton, ...styles.editButton}}
                      onMouseEnter={(e) => handleButtonHover(e, true, 'edit')}
                      onMouseLeave={(e) => handleButtonHover(e, false, 'edit')}
                    >
                      Edit
                    </button>
                    <button 
                      style={{...styles.actionButton, ...styles.deleteButton}}
                      onMouseEnter={(e) => handleButtonHover(e, true, 'delete')}
                      onMouseLeave={(e) => handleButtonHover(e, false, 'delete')}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;