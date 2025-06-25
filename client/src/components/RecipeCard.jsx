import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image_url} alt={recipe.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
    </div>
  );
}

export default RecipeCard;
