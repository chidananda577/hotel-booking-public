import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>
          Hotel Booking
        </Link>

        <div style={styles.menu}>
          <Link to="/hotels" style={styles.link}>
            Hotels
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/bookings" style={styles.link}>
                Booking History
              </Link>
              <span style={styles.userInfo}>Welcome, {user?.name}</span>
              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  } as React.CSSProperties,
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,
  brand: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  } as React.CSSProperties,
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  } as React.CSSProperties,
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
  } as React.CSSProperties,
  userInfo: {
    color: '#ecf0f1',
    fontSize: '0.9rem',
  } as React.CSSProperties,
  button: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  } as React.CSSProperties,
};

export default NavBar;
