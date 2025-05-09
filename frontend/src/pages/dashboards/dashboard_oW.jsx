import React from 'react';

const DashboardQ = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Your Dashboard</h1>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>User Profile</h2>
          <p>View and update your personal information.</p>
        </div>
        <div style={styles.card}>
          <h2>Tasks</h2>
          <p>Check your pending or completed tasks.</p>
        </div>
        <div style={styles.card}>
          <h2>Settings</h2>
          <p>Manage your preferences and privacy.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '30px'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  card: {
    width: '250px',
    padding: '20px',
    margin: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
  }
};

export default DashboardQ;
