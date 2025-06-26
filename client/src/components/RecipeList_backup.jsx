import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useTheme } from "../ThemeContext";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("http://localhost:5000/recipes") // adjust port if different
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

  if (loading) return <p style={{ textAlign: "center", marginTop: 40, fontSize: 22, color: theme === 'dark' ? '#e0e0e0' : '#22223b' }}>Loading recipes...</p>;
  if (!recipes.length) return <p style={{ textAlign: "center", marginTop: 40, fontSize: 22, color: theme === 'dark' ? '#e0e0e0' : '#22223b' }}>No recipes available.</p>;

  // Styling
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

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>All Recipes</h1>
      <div style={gridStyle}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
