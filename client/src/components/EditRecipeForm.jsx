<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
=======
// src/components/EditRecipeForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { apiClient } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
>>>>>>> main

function EditRecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error("Failed to load recipe:", err));
  }, [id]);

  const handleSubmit = (values) => {
    fetch(`http://localhost:5000/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update recipe");
        return res.json();
      })
      .then(() => {
        alert("Recipe updated!");
        navigate(`/recipes/${id}`);
      })
      .catch((err) => console.error("Update failed:", err));
  };

  if (!recipe) return <p>Loading form...</p>;

  return (
    <div className="edit-form">
      <h2>Edit Recipe</h2>
      <Formik
        initialValues={{
          name: recipe.name || "",
          description: recipe.description || "",
          ingredients: recipe.ingredients || "",
          instructions: recipe.instructions || "",
          prep_time: recipe.prep_time || 0,
          cook_time: recipe.cook_time || 0,
          image_url: recipe.image_url || "",
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.name) errors.name = "Name is required";
          if (!values.description) errors.description = "Description required";
          if (!values.ingredients) errors.ingredients = "Ingredients required";
          if (!values.instructions) errors.instructions = "Instructions required";
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        <Form className="form">
          <label>Name:</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" className="error" />

          <label>Description:</label>
          <Field name="description" as="textarea" />
          <ErrorMessage name="description" component="div" className="error" />

          <label>Ingredients:</label>
          <Field name="ingredients" as="textarea" />
          <ErrorMessage name="ingredients" component="div" className="error" />

          <label>Instructions:</label>
          <Field name="instructions" as="textarea" />
          <ErrorMessage name="instructions" component="div" className="error" />

          <label>Prep Time (min):</label>
          <Field name="prep_time" type="number" />
          <ErrorMessage name="prep_time" component="div" className="error" />

          <label>Cook Time (min):</label>
          <Field name="cook_time" type="number" />
          <ErrorMessage name="cook_time" component="div" className="error" />

          <label>Image URL:</label>
          <Field name="image_url" type="text" />
          <ErrorMessage name="image_url" component="div" className="error" />

          <button type="submit">Update Recipe</button>
        </Form>
      </Formik>
=======
  const { updateRecipe, categories, theme, user } = useApp();
  
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
  
  const [originalRecipe, setOriginalRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getRecipe(id);
      
      if (response.data) {
        const recipe = response.data;
        setOriginalRecipe(recipe);
        
        // Check if user owns this recipe
        if (user && recipe.user_id !== user.id) {
          navigate('/');
          return;
        }
        
        // Auto-fill form with current recipe data
        setFormData({
          name: recipe.name || '',
          description: recipe.description || '',
          ingredients: recipe.ingredients || '',
          instructions: recipe.instructions || '',
          prep_time: recipe.prep_time || '',
          cook_time: recipe.cook_time || '',
          image_url: recipe.image_url || '',
          category_id: recipe.category_id || ''
        });
      } else {
        setErrors({ load: 'Recipe not found' });
      }
    } catch (err) {
      console.error('Error loading recipe:', err);
      setErrors({ load: err.message || 'Failed to load recipe' });
    } finally {
      setLoading(false);
    }
  };

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
    setSubmitting(true);
    setErrors({});
    setSuccess('');

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitting(false);
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

      const result = await updateRecipe(id, recipeData);
      
      if (result.success) {
        setSuccess('Recipe updated successfully!');
        // Redirect to the recipe after a short delay
        setTimeout(() => {
          navigate(`/recipes/${id}`);
        }, 1500);
      } else {
        setErrors({ submit: result.error || 'Failed to update recipe' });
      }
    } catch (err) {
      console.error('Error updating recipe:', err);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Your changes will be lost.')) {
      navigate(`/recipes/${id}`);
    }
  };

  const hasChanges = () => {
    if (!originalRecipe) return false;
    
    return (
      formData.name !== (originalRecipe.name || '') ||
      formData.description !== (originalRecipe.description || '') ||
      formData.ingredients !== (originalRecipe.ingredients || '') ||
      formData.instructions !== (originalRecipe.instructions || '') ||
      formData.prep_time !== (originalRecipe.prep_time || '').toString() ||
      formData.cook_time !== (originalRecipe.cook_time || '').toString() ||
      formData.image_url !== (originalRecipe.image_url || '') ||
      formData.category_id !== (originalRecipe.category_id || '').toString()
    );
  };

  const styles = {
    container: {
      maxWidth: '900px',
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
        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
        : 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      fontSize: '1rem'
    },
    card: {
      background: theme === 'dark' 
        ? 'linear-gradient(145deg, #374151 0%, #4b5563 100%)' 
        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: theme === 'dark' 
        ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
        : '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      paddingBottom: '0.5rem',
      borderBottom: theme === 'dark' ? '2px solid #4b5563' : '2px solid #e5e7eb'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem',
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
      color: theme === 'dark' ? '#f1f5f9' : '#374151',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    required: {
      color: '#ef4444'
    },
    input: {
      padding: '0.875rem 1rem',
      borderRadius: '12px',
      border: theme === 'dark' ? '2px solid #4b5563' : '2px solid #d1d5db',
      fontSize: '1rem',
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      transition: 'all 0.2s',
      outline: 'none'
    },
    textarea: {
      padding: '0.875rem 1rem',
      borderRadius: '12px',
      border: theme === 'dark' ? '2px solid #4b5563' : '2px solid #d1d5db',
      fontSize: '1rem',
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      transition: 'all 0.2s',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px',
      fontFamily: 'inherit'
    },
    select: {
      padding: '0.875rem 1rem',
      borderRadius: '12px',
      border: theme === 'dark' ? '2px solid #4b5563' : '2px solid #d1d5db',
      fontSize: '1rem',
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
      transition: 'all 0.2s',
      outline: 'none'
    },
    error: {
      color: '#ef4444',
      fontSize: '0.875rem',
      marginTop: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    loadError: {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      padding: '1.5rem',
      borderRadius: '12px',
      fontSize: '1rem',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    submitError: {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      padding: '1rem',
      borderRadius: '12px',
      fontSize: '0.875rem',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    success: {
      background: 'rgba(34, 197, 94, 0.1)',
      color: '#22c55e',
      padding: '1rem',
      borderRadius: '12px',
      fontSize: '0.875rem',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    buttonRow: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      marginTop: '2rem',
      paddingTop: '2rem',
      borderTop: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb'
    },
    cancelButton: {
      background: 'transparent',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      border: theme === 'dark' ? '2px solid #4b5563' : '2px solid #d1d5db',
      borderRadius: '12px',
      padding: '0.875rem 2rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    updateButton: {
      background: hasChanges() 
        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
        : theme === 'dark' ? '#4b5563' : '#9ca3af',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '0.875rem 2rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: hasChanges() && !submitting ? 'pointer' : 'not-allowed',
      opacity: hasChanges() && !submitting ? 1 : 0.6,
      transition: 'all 0.2s',
      boxShadow: hasChanges() ? '0 4px 12px rgba(245, 158, 11, 0.3)' : 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    changeIndicator: {
      background: '#f59e0b',
      color: 'white',
      fontSize: '0.75rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      display: hasChanges() ? 'inline-flex' : 'none',
      alignItems: 'center',
      gap: '0.25rem',
      marginTop: '1rem'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <LoadingSpinner message="Loading recipe for editing..." />
      </div>
    );
  }

  if (errors.load) {
    return (
      <div style={styles.container}>
        <div style={styles.loadError}>
          <span>⚠️</span>
          {errors.load}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>✏️ Edit Recipe</h1>
        <p style={styles.subtitle}>
          Update your recipe "{originalRecipe?.name}"
        </p>
        <div style={styles.changeIndicator}>
          <span>💾</span>
          Unsaved changes
        </div>
      </div>
      
      <div style={styles.card}>
        {errors.submit && (
          <div style={styles.submitError}>
            <span>❌</span>
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
          {/* Basic Information */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <span>📝</span>
              Basic Information
            </h3>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Recipe Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter recipe name"
                required
              />
              {errors.name && (
                <div style={styles.error}>
                  <span>⚠️</span>
                  {errors.name}
                </div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Description <span style={styles.required}>*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="Describe your recipe..."
                rows={3}
                required
              />
              {errors.description && (
                <div style={styles.error}>
                  <span>⚠️</span>
                  {errors.description}
                </div>
              )}
            </div>
          </div>

          {/* Timing & Category */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <span>⏰</span>
              Timing & Category
            </h3>
            
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Prep Time (minutes) <span style={styles.required}>*</span>
                </label>
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
                {errors.prep_time && (
                  <div style={styles.error}>
                    <span>⚠️</span>
                    {errors.prep_time}
                  </div>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Cook Time (minutes) <span style={styles.required}>*</span>
                </label>
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
                {errors.cook_time && (
                  <div style={styles.error}>
                    <span>⚠️</span>
                    {errors.cook_time}
                  </div>
                )}
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">Select a category (optional)</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Content */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <span>🥄</span>
              Recipe Content
            </h3>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Ingredients <span style={styles.required}>*</span>
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                style={{...styles.textarea, minHeight: '120px'}}
                placeholder="List ingredients separated by commas..."
                rows={5}
                required
              />
              {errors.ingredients && (
                <div style={styles.error}>
                  <span>⚠️</span>
                  {errors.ingredients}
                </div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Instructions <span style={styles.required}>*</span>
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                style={{...styles.textarea, minHeight: '150px'}}
                placeholder="Write step-by-step instructions..."
                rows={7}
                required
              />
              {errors.instructions && (
                <div style={styles.error}>
                  <span>⚠️</span>
                  {errors.instructions}
                </div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Image URL <span style={styles.required}>*</span>
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                style={styles.input}
                placeholder="https://example.com/image.jpg"
                required
              />
              {errors.image_url && (
                <div style={styles.error}>
                  <span>⚠️</span>
                  {errors.image_url}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonRow}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.updateButton}
              disabled={!hasChanges() || submitting}
            >
              {submitting ? (
                <>
                  <span>⏳</span>
                  Updating...
                </>
              ) : (
                <>
                  <span>💾</span>
                  Update Recipe
                </>
              )}
            </button>
          </div>
        </form>
      </div>
>>>>>>> main
    </div>
  );
}

<<<<<<< HEAD
export default EditRecipeForm;
=======
export default EditRecipeForm;
>>>>>>> main
