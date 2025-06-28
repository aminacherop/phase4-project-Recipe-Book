import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function AuthPage() {
  const { login, signup, theme } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = isLogin 
        ? await login({ username: formData.username, password: formData.password })
        : await signup(formData);

      if (result.success) {

        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ username: '', email: '', password: '' });
  };

  const styles = {
    container: {
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    },
    card: {
      background: theme === 'dark' 
        ? 'linear-gradient(145deg, #374151 0%, #4b5563 100%)' 
        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      padding: '3rem',
      boxShadow: theme === 'dark' 
        ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
        : '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
      width: '100%',
      maxWidth: '400px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '2rem',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: theme === 'dark' ? '#f1f5f9' : '#374151'
    },
    input: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
      fontSize: '1rem',
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      transition: 'all 0.2s',
      outline: 'none'
    },
    button: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '0.75rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: loading ? 'not-allowed' : 'pointer',
      opacity: loading ? 0.7 : 1,
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
    },
    toggleButton: {
      background: 'none',
      border: 'none',
      color: '#3b82f6',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      textAlign: 'center',
      padding: '0.5rem'
    },
    error: {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      padding: '0.75rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      textAlign: 'center'
    },
    divider: {
      textAlign: 'center',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      fontSize: '0.875rem',
      margin: '1rem 0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isLogin ? 'Welcome Back' : 'Join Recipe Book'} 🍳
        </h2>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>

          {!isLogin && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your password"
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? '⏳ Processing...' : (isLogin ? '🔑 Login' : '📝 Sign Up')}
          </button>
        </form>

        <div style={styles.divider}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </div>

        <button style={styles.toggleButton} onClick={toggleMode}>
          {isLogin ? 'Create New Account' : 'Login Instead'}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
