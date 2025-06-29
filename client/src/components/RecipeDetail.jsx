import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { apiClient } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
import CommentsSection from './CommentsSection';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, theme, toggleFavorite, isRecipeFavorited, deleteRecipe } = useApp();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.getRecipe(id);
    
      if (response.data) {
        setRecipe(response.data);
      } else {
        setError('Recipe not found');
      }
    } catch (err) {
      console.error('Error loading recipe:', err);
      setError(err.message || 'Failed to load recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = () => {
    loadRecipe();
  };

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setFavoriteLoading(true);
    await toggleFavorite(recipe.id);
    setFavoriteLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    try {
      const result = await deleteRecipe(recipe.id);
      if (result.success) {
        navigate('/');
      } else {
        alert('Failed to delete recipe: ' + result.error);
      }
    } catch (err) {
      alert('Failed to delete recipe');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const placeholderImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${theme === 'dark' ? '#374151' : '#f3f4f6'}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="${theme === 'dark' ? '#9ca3af' : '#6b7280'}" font-family="Arial, sans-serif" font-size="24">
        🍽️ ${recipe?.name || 'Recipe Image'}
      </text>
    </svg>
  `)}`;

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#3b82f6',
      textDecoration: 'none',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '2rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      transition: 'background 0.2s',
      border: '1px solid #3b82f6'
    },
    card: {
      background: theme === 'dark' 
        ? 'linear-gradient(145deg, #374151 0%, #4b5563 100%)' 
        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: theme === 'dark' 
        ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
        : '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb'
    },
    imageContainer: {
      position: 'relative',
      height: '400px',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    actionButtons: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      display: 'flex',
      gap: '0.5rem'
    },
    favoriteButton: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: 'none',
      borderRadius: '12px',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '24px',
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    },
    editButton: {
      background: 'rgba(59, 130, 246, 0.9)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    },
    deleteButton: {
      background: 'rgba(239, 68, 68, 0.9)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    },
    content: {
      padding: '2rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      marginBottom: '1rem',
      lineHeight: '1.2'
    },
    description: {
      color: theme === 'dark' ? '#cbd5e1' : '#64748b',
      fontSize: '1.125rem',
      lineHeight: '1.6',
      marginBottom: '2rem'
    },
    metadata: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
      padding: '1.5rem',
      background: theme === 'dark' ? 'rgba(55, 65, 81, 0.5)' : 'rgba(248, 250, 252, 0.8)',
      borderRadius: '12px',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb'
    },
    metadataItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: theme === 'dark' ? '#94a3b8' : '#64748b',
      fontWeight: '500'
    },
    section: {
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    ingredientsList: {
      background: theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(248, 250, 252, 0.8)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb'
    },
    ingredient: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      color: theme === 'dark' ? '#e2e8f0' : '#374151',
      fontSize: '0.95rem',
      lineHeight: '1.5'
    },
    instructions: {
      background: theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(248, 250, 252, 0.8)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
      color: theme === 'dark' ? '#e2e8f0' : '#374151',
      fontSize: '0.95rem',
      lineHeight: '1.7',
      whiteSpace: 'pre-wrap'
    },
    authorInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem',
      background: theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(248, 250, 252, 0.8)',
      borderRadius: '12px',
      marginTop: '2rem',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb'
    },
    error: {
      textAlign: 'center',
      padding: '4rem 2rem',
      color: '#ef4444'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <LoadingSpinner message="Loading recipe details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h2>Error Loading Recipe</h2>
          <p>{error}</p>
          <Link to="/" style={styles.backButton}>
            ← Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
          <h2>Recipe Not Found</h2>
          <p>The recipe you're looking for doesn't exist.</p>
          <Link to="/" style={styles.backButton}>
            ← Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  const isFavorited = isRecipeFavorited(recipe.id);
  const isOwner = user && recipe.user_id === user.id;
  const ingredients = recipe.ingredients ? recipe.ingredients.split(',').map(ing => ing.trim()).filter(ing => ing) : [];

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backButton}>
        ← Back to Recipes
      </Link>

      <div style={styles.card}>
        {/* Image Section */}
        <div style={styles.imageContainer}>
          <img
            src={imageError ? placeholderImage : recipe.image_url}
            alt={recipe.name}
            style={styles.image}
            onError={handleImageError}
          />
          
          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button
              style={styles.favoriteButton}
              onClick={handleFavorite}
              disabled={favoriteLoading}
              title={
                !isAuthenticated 
                  ? 'Login to favorite recipes' 
                  : isFavorited 
                    ? 'Remove from favorites' 
                    : 'Add to favorites'
              }
            >
              {favoriteLoading ? '⏳' : (isAuthenticated && isFavorited) ? '❤️' : '🤍'}
            </button>
            
            {isOwner && (
              <>
                <Link to={`/recipes/${recipe.id}/edit`} style={styles.editButton}>
                  ✏️ Edit
                </Link>
                <button style={styles.deleteButton} onClick={handleDelete}>
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div style={styles.content}>
          <h1 style={styles.title}>{recipe.name}</h1>
          
          {recipe.description && (
            <p style={styles.description}>{recipe.description}</p>
          )}

          {/* Metadata */}
          <div style={styles.metadata}>
            {recipe.prep_time && (
              <div style={styles.metadataItem}>
                <span>⏱️</span>
                <span>Prep: {recipe.prep_time} minutes</span>
              </div>
            )}
            {recipe.cook_time && (
              <div style={styles.metadataItem}>
                <span>🍳</span>
                <span>Cook: {recipe.cook_time} minutes</span>
              </div>
            )}
            {recipe.category && (
              <div style={styles.metadataItem}>
                <span>📂</span>
                <span>Category: {recipe.category.name}</span>
              </div>
            )}
            {recipe.user && (
              <div style={styles.metadataItem}>
                <span>👨‍🍳</span>
                <span>By: {recipe.user.username}</span>
              </div>
            )}
          </div>

          {/* Ingredients */}
          {ingredients.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                🥄 Ingredients
              </h2>
              <div style={styles.ingredientsList}>
                {ingredients.map((ingredient, index) => (
                  <div key={index} style={styles.ingredient}>
                    <span>•</span>
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          {recipe.instructions && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                📝 Instructions
              </h2>
              <div style={styles.instructions}>
                {recipe.instructions}
              </div>
            </div>
          )}

        
          {recipe.comments && recipe.comments.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                💬 Comments ({recipe.comments.length})
              </h2>
              {/* TODO: Add comments display */}
            </div>
          )}

          {/* Comments Section */}
          <CommentsSection recipe={recipe} onCommentAdded={handleCommentAdded} />
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;