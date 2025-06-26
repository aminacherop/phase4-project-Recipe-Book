// src/components/MyRecipesList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RecipeCard from './RecipeCard';
import LoadingSpinner from './LoadingSpinner';

function MyRecipesList() {
  const { getUserRecipes, loading, theme, user } = useApp();
  const myRecipes = getUserRecipes();

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
        : 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '1rem'
    },
    subtitle: {
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      fontSize: '1.125rem',
      marginBottom: '2rem'
    },
    stats: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: theme === 'dark' ? '#94a3b8' : '#64748b',
      fontSize: '0.875rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem'
    },
    noRecipes: {
      textAlign: 'center',
      padding: '4rem 2rem',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280'
    },
    createButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      color: 'white',
      textDecoration: 'none',
      padding: '0.875rem 2rem',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '1rem',
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
      marginTop: '1.5rem'
    },
    quickActions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '3rem',
      flexWrap: 'wrap'
    },
    actionCard: {
      background: theme === 'dark' 
        ? 'linear-gradient(145deg, #374151 0%, #4b5563 100%)' 
        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: theme === 'dark' 
        ? '0 8px 25px rgba(0, 0, 0, 0.3)' 
        : '0 8px 25px rgba(0, 0, 0, 0.1)',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
      textAlign: 'center',
      minWidth: '200px',
      flex: 1,
      maxWidth: '300px'
    },
    actionNumber: {
      fontSize: '2rem',
      fontWeight: '800',
      color: theme === 'dark' ? '#8b5cf6' : '#7c3aed',
      marginBottom: '0.5rem'
    },
    actionLabel: {
      color: theme === 'dark' ? '#e2e8f0' : '#374151',
      fontSize: '0.875rem',
      fontWeight: '600'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <LoadingSpinner message="Loading your recipes..." />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>👨‍🍳 My Recipes</h1>
        <p style={styles.subtitle}>
          Manage and showcase your culinary creations
        </p>
      </div>

      {/* Quick Stats */}
      {myRecipes.length > 0 && (
        <div style={styles.quickActions}>
          <div style={styles.actionCard}>
            <div style={styles.actionNumber}>{myRecipes.length}</div>
            <div style={styles.actionLabel}>
              Recipe{myRecipes.length !== 1 ? 's' : ''} Created
            </div>
          </div>
          <div style={styles.actionCard}>
            <div style={styles.actionNumber}>
              {myRecipes.reduce((total, recipe) => total + (recipe.prep_time || 0) + (recipe.cook_time || 0), 0)}
            </div>
            <div style={styles.actionLabel}>
              Total Cook Time (min)
            </div>
          </div>
          <div style={styles.actionCard}>
            <div style={styles.actionNumber}>
              {new Set(myRecipes.map(recipe => recipe.category_id).filter(Boolean)).size}
            </div>
            <div style={styles.actionLabel}>
              Different Categories
            </div>
          </div>
        </div>
      )}

      {myRecipes.length === 0 ? (
        <div style={styles.noRecipes}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👨‍🍳</div>
          <h2>No recipes created yet</h2>
          <p>Start sharing your culinary creativity with the world!</p>
          <p style={{ fontSize: '0.875rem', opacity: 0.8, marginTop: '1rem' }}>
            Your recipes will appear here once you create them.
          </p>
          <Link to="/recipes/new" style={styles.createButton}>
            <span>✨</span>
            Create Your First Recipe
          </Link>
        </div>
      ) : (
        <>
          <div style={styles.stats}>
            Showing {myRecipes.length} of your recipe{myRecipes.length !== 1 ? 's' : ''}
          </div>

          <div style={styles.grid}>
            {myRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/recipes/new" style={styles.createButton}>
              <span>➕</span>
              Create Another Recipe
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default MyRecipesList;