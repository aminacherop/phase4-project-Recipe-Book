<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/recipes") 
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        console.log("Response:", res.status);
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading recipes...</p>;
  if (!recipes.length) return <p>No recipes available.</p>;

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
=======
// src/components/RecipeList.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import RecipeCard from './RecipeCard';
import LoadingSpinner from './LoadingSpinner';

function RecipeList() {
  const { recipes, loading, theme } = useApp();

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '3rem',
      background: theme === 'dark' 
        ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
        : 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    stats: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: theme === 'dark' ? '#94a3b8' : '#64748b',
      fontSize: '0.875rem'
    },
    noRecipes: {
      textAlign: 'center',
      padding: '4rem 2rem',
      color: theme === 'dark' ? '#9ca3af' : '#6b7280'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <LoadingSpinner message="Loading delicious recipes..." />
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Recipe Collection</h1>
        <div style={styles.noRecipes}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
          <h2>No recipes available yet</h2>
          <p>Be the first to share a delicious recipe!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Recipe Collection</h1>
      
      <div style={styles.stats}>
        Discover {recipes.length} amazing recipe{recipes.length !== 1 ? 's' : ''} from our community
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
>>>>>>> main
    </div>
  );
}

export default RecipeList;
