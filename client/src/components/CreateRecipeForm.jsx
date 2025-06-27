import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function CreateRecipeForm() {
  const { addRecipe, categories, theme } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    prep_time: '',
    cook_time: '',
    image_url: '',
    category_id: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Recipe name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    }
    
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    }
    
    if (!formData.prep_time || isNaN(formData.prep_time) || formData.prep_time <= 0) {
      newErrors.prep_time = 'Valid prep time is required';
    }
    
    if (!formData.cook_time || isNaN(formData.cook_time) || formData.cook_time <= 0) {
      newErrors.cook_time = 'Valid cook time is required';
    }
    
    if (!formData.image_url.trim()) {
      newErrors.image_url = 'Image URL is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess('');

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      // Prepare data for submission
      const recipeData = {
        ...formData,
        prep_time: parseInt(formData.prep_time),
        cook_time: parseInt(formData.cook_time),
        category_id: formData.category_id ? parseInt(formData.category_id) : null
      };

      const result = await addRecipe(recipeData);
      
      if (result.success) {
        setSuccess('Recipe created successfully!');
        // Redirect to the new recipe after a short delay
        setTimeout(() => {
          if (result.recipe?.id) {
            navigate(`/recipes/${result.recipe.id}`);
          } else {
            navigate('/');
          }
        }, 1500);
      } else {
        setErrors({ submit: result.error || 'Failed to create recipe' });
      }
    } catch (err) {
      console.error('Error creating recipe:', err);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '3rem',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    card: {
      background: theme === 'dark' 
        ? 'linear-gradient(145deg, #374151 0%, #4b5563 100%)' 
        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: theme === 'dark' 
        ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
        : '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      '@media (max-width: 640px)': {
        gridTemplateColumns: '1fr'
      }
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
    textarea: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
      fontSize: '1rem',
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      transition: 'all 0.2s',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px'
    },
    select: {
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
      fontSize: '1rem',
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      transition: 'all 0.2s',
      outline: 'none'
    },
    error: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.25rem'
    },
    submitError: {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      padding: '0.75rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      textAlign: 'center'
    },
    success: {
      background: 'rgba(34, 197, 94, 0.1)',
      color: '#22c55e',
      padding: '0.75rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    button: {
      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '0.875rem 2rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: loading ? 'not-allowed' : 'pointer',
      opacity: loading ? 0.7 : 1,
      transition: 'all 0.2s',
      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
      marginTop: '1rem'
    },
    cancelButton: {
      background: 'transparent',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
      borderRadius: '12px',
      padding: '0.875rem 2rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center'
    },
    buttonRow: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      marginTop: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>➕ Create New Recipe</h1>
      
      <div style={styles.card}>
        {errors.submit && (
          <div style={styles.submitError}>
            {errors.submit}
          </div>
        )}
        
        {success && (
          <div style={styles.success}>
            <span>✅</span>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Recipe Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Recipe Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter recipe name"
              required
            />
            {errors.name && <div style={styles.error}>{errors.name}</div>}
          </div>

          {/* Description */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Describe your recipe..."
              rows={3}
              required
            />
            {errors.description && <div style={styles.error}>{errors.description}</div>}
          </div>

          {/* Times and Category */}
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Prep Time (minutes) *</label>
              <input
                type="number"
                name="prep_time"
                value={formData.prep_time}
                onChange={handleChange}
                style={styles.input}
                placeholder="15"
                min="1"
                required
              />
              {errors.prep_time && <div style={styles.error}>{errors.prep_time}</div>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Cook Time (minutes) *</label>
              <input
                type="number"
                name="cook_time"
                value={formData.cook_time}
                onChange={handleChange}
                style={styles.input}
                placeholder="30"
                min="1"
                required
              />
              {errors.cook_time && <div style={styles.error}>{errors.cook_time}</div>}
            </div>
          </div>

          {/* Category */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Category (optional)</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ingredients */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Ingredients *</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="List ingredients separated by commas (e.g., 2 cups flour, 1 cup sugar, 3 eggs)"
              rows={4}
              required
            />
            {errors.ingredients && <div style={styles.error}>{errors.ingredients}</div>}
          </div>

          {/* Instructions */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Instructions *</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Write step-by-step instructions..."
              rows={6}
              required
            />
            {errors.instructions && <div style={styles.error}>{errors.instructions}</div>}
          </div>

          {/* Image URL */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Image URL *</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              style={styles.input}
              placeholder="https://example.com/image.jpg"
              required
            />
            {errors.image_url && <div style={styles.error}>{errors.image_url}</div>}
          </div>

          {/* Buttons */}
          <div style={styles.buttonRow}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.button}
              disabled={loading}
            >
              {loading ? '⏳ Creating...' : '✨ Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipeForm;