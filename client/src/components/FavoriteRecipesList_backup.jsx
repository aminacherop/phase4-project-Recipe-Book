import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useTheme } from "../ThemeContext";
import RecipeCard from "./RecipeCard";

function FavoriteRecipesList() {
  const { user } = useContext(UserContext);
  const { theme } = useTheme();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/users/${user.id}/favorite_recipes`)
        .then(res => res.json())
        .then(favs => {
          // Each fav has a recipe_id, fetch the full recipe for each
          Promise.all(favs.map(fav =>
            fetch(`http://localhost:5000/recipes/${fav.recipe_id}`).then(r => r.json())
          )).then(recipes => {
            setFavorites(recipes);
            setLoading(false);
          });
        });
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const pageStyle = {
    minHeight: "80vh",
    background: theme === "dark" ? "#181926" : "#f8f8fa",
    padding: "2.5rem 0",
    transition: "background 0.3s"
  };
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
    maxWidth: 1200,
    margin: "0 auto"
  };
  const titleStyle = {
    textAlign: "center",
    color: theme === "dark" ? "#e0e0e0" : "#22223b",
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 32,
    letterSpacing: 1
  };

  if (!user) return <div style={pageStyle}><h2 style={titleStyle}>Favorites</h2><p style={{textAlign: 'center', color: theme === 'dark' ? '#e0e0e0' : '#22223b'}}>Please log in to view your favorite recipes.</p></div>;
  if (loading) return <div style={pageStyle}><h2 style={titleStyle}>Favorites</h2><p style={{textAlign: 'center', color: theme === 'dark' ? '#e0e0e0' : '#22223b'}}>Loading...</p></div>;
  if (!favorites.length) return <div style={pageStyle}><h2 style={titleStyle}>Favorites</h2><p style={{textAlign: 'center', color: theme === 'dark' ? '#e0e0e0' : '#22223b'}}>You have no favorite recipes yet.</p></div>;

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}>Favorites</h2>
      <div style={gridStyle}>
        {favorites.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipesList; 