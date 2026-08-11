import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

function TopNavBar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'left',
    backgroundColor: '#333',
    padding: '10px',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
  }
};

export default TopNavBar;