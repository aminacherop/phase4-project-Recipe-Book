import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { apiClient } from '../utils/api';

function CommentsSection({ recipe, onCommentAdded }) {
  const { user, isAuthenticated, theme } = useApp();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState({ text: '', rating: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!newComment.text.trim()) {
      setError('Please write a comment');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const commentData = {
        text: newComment.text.trim(),
        recipe_id: recipe.id,
        ...(newComment.rating > 0 && { rating: newComment.rating })
      };

      await apiClient.addComment(commentData);
      
      setSuccess('Comment added successfully!');
      setNewComment({ text: '', rating: 0 });
      
      
      if (onCommentAdded) {
        onCommentAdded();
      }
      
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          onClick={interactive ? () => onRatingChange(i) : undefined}
          style={{
            background: 'none',
            border: 'none',
            cursor: interactive ? 'pointer' : 'default',
            fontSize: interactive ? '1.5rem' : '1rem',
            color: i <= rating ? '#fbbf24' : '#d1d5db',
            padding: interactive ? '0.25rem' : '0',
            transition: 'color 0.2s'
          }}
          disabled={!interactive}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  const averageRating = recipe.comments?.length > 0 
    ? recipe.comments
        .filter(comment => comment.rating)
        .reduce((sum, comment) => sum + comment.rating, 0) / 
      recipe.comments.filter(comment => comment.rating).length
    : 0;

  const styles = {
    section: {
      marginTop: '3rem'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: theme === 'dark' ? '2px solid #4b5563' : '2px solid #e5e7eb'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    summary: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.875rem',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280'
    },
    ratingDisplay: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    commentForm: {
      background: theme === 'dark' 
        ? 'rgba(55, 65, 81, 0.3)' 
        : 'rgba(248, 250, 252, 0.8)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
      marginBottom: '2rem'
    },
    formTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    textarea: {
      width: '100%',
      padding: '0.875rem 1rem',
      borderRadius: '12px',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
      fontSize: '1rem',
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      transition: 'all 0.2s',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px',
      fontFamily: 'inherit',
      marginBottom: '1rem'
    },
    ratingSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem'
    },
    ratingLabel: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: theme === 'dark' ? '#f1f5f9' : '#374151'
    },
    buttonRow: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    submitButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: loading ? 'not-allowed' : 'pointer',
      opacity: loading ? 0.7 : 1,
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    loginPrompt: {
      background: theme === 'dark' 
        ? 'rgba(55, 65, 81, 0.3)' 
        : 'rgba(248, 250, 252, 0.8)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
      textAlign: 'center',
      marginBottom: '2rem'
    },
    loginButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      textDecoration: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '1rem'
    },
    commentsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    comment: {
      background: theme === 'dark' 
        ? 'rgba(55, 65, 81, 0.2)' 
        : 'rgba(255, 255, 255, 0.8)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb'
    },
    commentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.75rem'
    },
    commentUser: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    username: {
      fontWeight: '600',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
    },
    commentDate: {
      fontSize: '0.75rem',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280'
    },
    commentRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    commentText: {
      color: theme === 'dark' ? '#e2e8f0' : '#374151',
      lineHeight: '1.6',
      fontSize: '0.95rem'
    },
    message: (type) => ({
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
      ...(type === 'error' ? {
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#ef4444'
      } : {
        background: 'rgba(34, 197, 94, 0.1)',
        color: '#22c55e'
      })
    }),
    noComments: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280'
    }
  };

  return (
    <div style={styles.section}>
      
      <div style={styles.header}>
        <h3 style={styles.title}>
          💬 Comments
          {recipe.comments?.length > 0 && (
            <span style={{ fontSize: '0.875rem', fontWeight: '400' }}>
              ({recipe.comments.length})
            </span>
          )}
        </h3>
        
        {recipe.comments?.length > 0 && (
          <div style={styles.summary}>
            {averageRating > 0 && (
              <div style={styles.ratingDisplay}>
                <div style={{ display: 'flex' }}>
                  {renderStars(Math.round(averageRating))}
                </div>
                <span>{averageRating.toFixed(1)} avg</span>
              </div>
            )}
            <span>•</span>
            <span>{recipe.comments.length} review{recipe.comments.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} style={styles.commentForm}>
          <h4 style={styles.formTitle}>
            ✍️ Share your experience
          </h4>
          
          {error && (
            <div style={styles.message('error')}>
              <span>❌</span>
              {error}
            </div>
          )}
          
          {success && (
            <div style={styles.message('success')}>
              <span>✅</span>
              {success}
            </div>
          )}

          <textarea
            value={newComment.text}
            onChange={(e) => setNewComment(prev => ({ ...prev, text: e.target.value }))}
            placeholder="Share your thoughts about this recipe... How did it turn out? Any tips or modifications?"
            style={styles.textarea}
            maxLength={500}
          />

          <div style={styles.ratingSection}>
            <span style={styles.ratingLabel}>Rate this recipe (optional):</span>
            <div style={{ display: 'flex' }}>
              {renderStars(newComment.rating, true, (rating) => 
                setNewComment(prev => ({ ...prev, rating: rating === prev.rating ? 0 : rating }))
              )}
            </div>
            {newComment.rating > 0 && (
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                {newComment.rating} star{newComment.rating !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div style={styles.buttonRow}>
            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? (
                <>
                  <span>⏳</span>
                  Posting...
                </>
              ) : (
                <>
                  <span>📝</span>
                  Post Comment
                </>
              )}
            </button>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              {newComment.text.length}/500 characters
            </span>
          </div>
        </form>
      ) : (
        <div style={styles.loginPrompt}>
          <h4 style={{ marginBottom: '0.5rem', color: theme === 'dark' ? '#f1f5f9' : '#1e293b' }}>
            💭 Share Your Experience
          </h4>
          <p style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280', marginBottom: '1rem' }}>
            Log in to leave a comment and rating for this recipe
          </p>
          <button
            onClick={() => navigate('/login')}
            style={styles.loginButton}
          >
            <span>🔑</span>
            Login to Comment
          </button>
        </div>
      )}

      
      <div style={styles.commentsContainer}>
        {recipe.comments?.length > 0 ? (
          recipe.comments
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((comment) => (
              <div key={comment.id} style={styles.comment}>
                <div style={styles.commentHeader}>
                  <div style={styles.commentUser}>
                    <span style={styles.username}>
                      👤 {comment.user?.username || 'Anonymous'}
                    </span>
                    <span style={styles.commentDate}>
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  
                  {comment.rating && (
                    <div style={styles.commentRating}>
                      {renderStars(comment.rating)}
                    </div>
                  )}
                </div>
                
                <p style={styles.commentText}>
                  {comment.text}
                </p>
              </div>
            ))
        ) : (
          <div style={styles.noComments}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💭</div>
            <p>No comments yet</p>
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              Be the first to share your experience with this recipe!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentsSection;