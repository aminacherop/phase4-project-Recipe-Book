
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import NavBar from './components/NavBar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import CreateRecipeForm from './components/CreateRecipeForm';
import EditRecipeForm from './components/EditRecipeForm';
import AuthPage from './components/AuthPage';
import FavoriteRecipesList from './components/FavoriteRecipesList';
import MyRecipesList from './components/MyRecipesList';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

function AppLayout() {
  const { theme, loading, error } = useApp();

  const appStyles = {
    minHeight: '100vh',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
  };

  const mainStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)'
  };

  if (loading) {
    return (
      <div style={appStyles}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={appStyles}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            background: theme === 'dark' ? '#374151' : '#ffffff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px'
          }}>
            <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>
              ⚠️ Something went wrong
            </h2>
            <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={appStyles}>
      <NavBar />
      <main style={mainStyles}>
        <Routes>
        
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          
          
          <Route path="/recipes/new" element={
            <ProtectedRoute>
              <CreateRecipeForm />
            </ProtectedRoute>
          } />
          <Route path="/recipes/:id/edit" element={
            <ProtectedRoute>
              <EditRecipeForm />
            </ProtectedRoute>
          } />
          <Route path="/my-favorites" element={
            <ProtectedRoute>
              <FavoriteRecipesList />
            </ProtectedRoute>
          } />
          <Route path="/my-recipes" element={
            <ProtectedRoute>
              <MyRecipesList />
            </ProtectedRoute>
          } />
          
          
          <Route path="*" element={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              textAlign: 'center',
              padding: '2rem'
            }}>
              <div>
                <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0' }}>🍽️</h1>
                <h2 style={{ margin: '0 0 1rem 0' }}>Page Not Found</h2>
                <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
                  The recipe you're looking for doesn't exist.
                </p>
                <a 
                  href="/"
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  Back to Recipes
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}


function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
