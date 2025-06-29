import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function NavBar() {
  const { user, isAuthenticated, logout, theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/');
    }
  };

  const publicLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
  ];

  const authLinks = [
    { to: '/recipes/new', label: 'Add Recipe', icon: '➕' },
    { to: '/my-recipes', label: 'My Recipes', icon: '👨‍🍳' },
    { to: '/my-favorites', label: 'Favorites', icon: '❤️' },
  ];

  const guestLinks = [
    { to: '/login', label: 'Login', icon: '🔑' }
  ];

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const styles = {
    nav: {
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' 
        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
      boxShadow: theme === 'dark' 
        ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
        : '0 4px 20px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: '64px'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    links: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    link: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'all 0.2s',
      fontSize: '0.875rem',
      fontWeight: '500',
      ...(isActive ? {
        background: '#3b82f6',
        color: 'white',
        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
      } : {
        color: theme === 'dark' ? '#cbd5e1' : '#64748b',
      })
    }),
    userArea: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    userInfo: {
      background: theme === 'dark' 
        ? 'rgba(55, 65, 81, 0.8)' 
        : 'rgba(249, 250, 251, 0.8)',
      color: theme === 'dark' ? '#f1f5f9' : '#374151',
      padding: '0.5rem 1rem',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '500',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db'
    },
    button: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.875rem',
      transition: 'all 0.2s',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    themeToggle: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.25rem',
      padding: '0.5rem',
      borderRadius: '8px',
      transition: 'background 0.2s',
      color: theme === 'dark' ? '#f1f5f9' : '#374151'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
    
        <Link to="/" style={styles.logo}>
          <span>📖</span>
          Recipe Book
        </Link>

      
        <ul style={styles.links}>
          
          {publicLinks.map(link => (
            <li key={link.to}>
              <Link to={link.to} style={styles.link(isActiveLink(link.to))}>
                <span>{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
          
          
          {isAuthenticated && authLinks.map(link => (
            <li key={link.to}>
              <Link to={link.to} style={styles.link(isActiveLink(link.to))}>
                <span>{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
          
          
          {!isAuthenticated && guestLinks.map(link => (
            <li key={link.to}>
              <Link to={link.to} style={styles.link(isActiveLink(link.to))}>
                <span>{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        
        <div style={styles.userArea}>
          {isAuthenticated ? (
            <>
              <div style={styles.userInfo}>
                Welcome, <strong>{user.username}</strong>
              </div>
              <button style={styles.button} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div style={styles.userInfo}>
              Not logged in
            </div>
          )}
          
          <button style={styles.themeToggle} onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
