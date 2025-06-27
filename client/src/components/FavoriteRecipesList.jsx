import React from 'react';
import { useApp } from '../context/AppContext';
import RecipeCard from './RecipeCard';
import LoadingSpinner from './LoadingSpinner';

function FavoriteRecipesList() {
  const { getFavoriteRecipes, loading, theme } = useApp();
  const favoriteRecipes = getFavoriteRecipes();

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '3rem',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
        : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2rem'
    },
    noFavorites: {
      textAlign: 'center',
      padding: '4rem 2rem',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280'
    },
    stats: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: theme === 'dark' ? '#94a3b8' : '#64748b',
      fontSize: '0.875rem'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <LoadingSpinner message="Loading your favorite recipes..." />
      </div>
    );
  }

  if (!favoriteRecipes.length) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>❤️ Your Favorites</h1>
        <div style={styles.noFavorites}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤍</div>
          <h2>No favorite recipes yet</h2>
          <p>Start exploring recipes and click the heart icon to save your favorites!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>❤️ Your Favorites</h1>
      
      <div style={styles.stats}>
        You have {favoriteRecipes.length} favorite recipe{favoriteRecipes.length !== 1 ? 's' : ''}
      </div>

      <div style={styles.grid}>
        {favoriteRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipesList;
