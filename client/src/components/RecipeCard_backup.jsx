import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { UserContext } from "../UserContext";

function RecipeCard({ recipe }) {
  const { theme } = useTheme();
  const { user } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/users/${user.id}/favorite_recipes`)
        .then(res => res.json())
        .then(favs => {
          setIsFavorite(favs.some(fav => fav.recipe_id === recipe.id));
        });
    } else {
      setIsFavorite(false);
    }
  }, [user, recipe.id]);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      console.log('Redirecting to login...');
      setTimeout(() => navigate('/login'), 100);
      return;
    }
    setLoading(true);
    if (!isFavorite) {
      fetch("http://localhost:5000/favorite_recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ recipe_id: recipe.id })
      })
        .then(res => res.json())
        .then(() => setIsFavorite(true))
        .finally(() => setLoading(false));
    } else {
      fetch(`http://localhost:5000/users/${user.id}/favorite_recipes`)
        .then(res => res.json())
        .then(favs => {
          const fav = favs.find(f => f.recipe_id === recipe.id);
          if (fav) {
            fetch(`http://localhost:5000/favorite_recipes/${fav.id}`, {
              method: "DELETE",
              credentials: "include"
            })
              .then(() => setIsFavorite(false))
              .finally(() => setLoading(false));
          } else {
            setLoading(false);
          }
        });
    }
  };

  const cardStyle = {
    border: "none",
    borderRadius: 16,
    boxShadow: theme === "dark" ? "0 4px 16px #0006" : "0 4px 16px #0001",
    padding: 20,
    background: theme === "dark" ? "#232946" : "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "box-shadow 0.2s, background 0.3s",
    minHeight: 420,
    position: "relative"
  };
  const imgStyle = {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: theme === "dark" ? "0 2px 8px #0006" : "0 2px 8px #0002"
  };
  const nameStyle = {
    fontSize: 22,
    fontWeight: 600,
    color: theme === "dark" ? "#e0e0e0" : "#22223b",
    margin: "10px 0 6px 0",
    textAlign: "center"
  };
  const descStyle = {
    color: theme === "dark" ? "#b8c1ec" : "#4a4e69",
    fontSize: 15,
    marginBottom: 18,
    textAlign: "center",
    minHeight: 40
  };
  const linkStyle = {
    marginTop: "auto",
    background: theme === "dark" ? "#393e46" : "#4a4e69",
    color: "#fff",
    padding: "8px 18px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 15,
    transition: "background 0.2s"
  };
  const favBtnStyle = {
    position: "absolute",
    top: 18,
    right: 18,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 28,
    color: isFavorite ? "#e63946" : theme === "dark" ? "#b8c1ec" : "#4a4e69",
    transition: "color 0.2s"
  };

  return (
    <div style={cardStyle}>
      <button style={favBtnStyle} onClick={handleFavorite} disabled={loading} title={user ? (isFavorite ? "Remove from favorites" : "Add to favorites") : "Log in to favorite recipes"}>
        {user ? (isFavorite ? "❤️" : "🤍") : "🤍"}
      </button>
      <img src={recipe.image_url} alt={recipe.name} style={imgStyle} />
      <h2 style={nameStyle}>{recipe.name}</h2>
      <p style={descStyle}>{recipe.description}</p>
      <Link to={`/recipes/${recipe.id}`} style={linkStyle}>View Recipe</Link>
    </div>
  );
}

export default RecipeCard;
