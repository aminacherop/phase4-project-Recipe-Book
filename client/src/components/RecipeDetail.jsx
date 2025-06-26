import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipe");
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipe:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading recipe details...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.name}</h2>
      <img
        src={recipe.image_url}
        alt={recipe.name}
        style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
      />
      <p><strong>Description:</strong> {recipe.description}</p>
      <p><strong>Category:</strong> {recipe.category?.name}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Prep Time:</strong> {recipe.prep_time} mins</p>
      <p><strong>Cook Time:</strong> {recipe.cook_time} mins</p>
      <p><strong>Posted by:</strong> {recipe.user?.username}</p>

      <div style={{ marginTop: "1rem" }}>
        <Link to={`/recipes/${recipe.id}/edit`}>✏️ Edit Recipe</Link>
      </div>
    </div>
  );
}

export default RecipeDetail;
