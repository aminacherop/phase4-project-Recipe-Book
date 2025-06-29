
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function RecipeCard({ recipe }) {
  const { user, isAuthenticated, theme, toggleFavorite, isRecipeFavorited } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isRecipeFavorited(recipe.id);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    await toggleFavorite(recipe.id);
    setLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const placeholderImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${theme === 'dark' ? '#374151' : '#f3f4f6'}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="${theme === 'dark' ? '#9ca3af' : '#6b7280'}" font-family="Arial, sans-serif" font-size="16">
        🍽️ ${recipe.name}
      </text>
    </svg>
  `)}`;

  const styles = {
    card: {
      background: theme === 'dark' 
        ? 'linear-gradient(145deg, #374151 0%, #4b5563 100%)' 
        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: isHovered 
        ? (theme === 'dark' 
          ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
          : '0 20px 40px rgba(0, 0, 0, 0.15)')
        : (theme === 'dark' 
          ? '0 8px 25px rgba(0, 0, 0, 0.3)' 
          : '0 8px 25px rgba(0, 0, 0, 0.1)'),
      transition: 'all 0.3s ease',
      transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '450px'
    },
    imageContainer: {
      position: 'relative',
      height: '200px',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)'
    },
    favoriteButton: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: 'none',
      borderRadius: '12px',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '20px',
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    },
    content: {
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      gap: '12px'
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      margin: 0,
      lineHeight: '1.3',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical'
    },
    description: {
      color: theme === 'dark' ? '#cbd5e1' : '#64748b',
      fontSize: '0.875rem',
      lineHeight: '1.5',
      margin: 0,
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      flex: 1
    },
    metadata: {
      display: 'flex',
      gap: '16px',
      marginTop: 'auto',
      paddingTop: '12px',
      borderTop: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb'
    },
    timeInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.75rem',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      fontWeight: '500'
    },
    viewButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      textDecoration: 'none',
      padding: '12px 24px',
      borderRadius: '12px',
      fontWeight: '600',
      fontSize: '0.875rem',
      textAlign: 'center',
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }
  };

  return (
    <div 
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div style={styles.imageContainer}>
        <img
          src={imageError ? placeholderImage : recipe.image_url}
          alt={recipe.name}
          style={styles.image}
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Favorite Button */}
        <button
          style={styles.favoriteButton}
          onClick={handleFavorite}
          disabled={loading}
          title={
            !isAuthenticated 
              ? 'Login to favorite recipes' 
              : isFavorited 
                ? 'Remove from favorites' 
                : 'Add to favorites'
          }
        >
          {loading ? '⏳' : (isAuthenticated && isFavorited) ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h3 style={styles.title}>{recipe.name}</h3>
        
        <p style={styles.description}>
          {recipe.description || 'A delicious recipe waiting to be discovered!'}
        </p>

        {/* Metadata */}
        <div style={styles.metadata}>
          {recipe.prep_time && (
            <div style={styles.timeInfo}>
              <span>⏱️</span>
              <span>{recipe.prep_time}m prep</span>
            </div>
          )}
          {recipe.cook_time && (
            <div style={styles.timeInfo}>
              <span>🍳</span>
              <span>{recipe.cook_time}m cook</span>
            </div>
          )}
        </div>

        {/* View Button */}
        <Link to={`/recipes/${recipe.id}`} style={styles.viewButton}>
          
          View Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
