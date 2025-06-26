import React, { useState } from "react";
import { useTheme } from "../ThemeContext";

function CreateRecipeForm() {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
    prep_time: "",
    cook_time: "",
    image_url: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (e) => {
    setForm((prev) => ({ ...prev, image_url: e.target.value }));
    setImageFile(null);
    setImagePreview(e.target.value);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setForm((prev) => ({ ...prev, image_url: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.description) errs.description = "Description is required";
    if (!form.ingredients) errs.ingredients = "Ingredients are required";
    if (!form.instructions) errs.instructions = "Instructions are required";
    if (!form.prep_time || isNaN(form.prep_time)) errs.prep_time = "Prep time is required and must be a number";
    if (!form.cook_time || isNaN(form.cook_time)) errs.cook_time = "Cook time is required and must be a number";
    if (!form.image_url && !imageFile) errs.image_url = "Image URL or file is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // For now, only send image_url to backend. File upload would require backend support for multipart/form-data.
    fetch("http://localhost:5000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image_url: imageFile ? imagePreview : form.image_url })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add recipe");
        return res.json();
      })
      .then(() => {
        setMessage("Recipe added successfully!");
        setForm({
          name: "",
          description: "",
          ingredients: "",
          instructions: "",
          prep_time: "",
          cook_time: "",
          image_url: ""
        });
        setImageFile(null);
        setImagePreview("");
        setErrors({});
      })
      .catch(() => setMessage("Error adding recipe."));
  };

  // Styling
  const pageStyle = {
    padding: "2rem 0",
    minHeight: "80vh",
    background: theme === "dark" ? "#181926" : "#f8f8fa",
    transition: "background 0.3s"
  };
  const formCardStyle = {
    maxWidth: 600,
    margin: "0 auto",
    background: theme === "dark" ? "#232946" : "#fff",
    borderRadius: 12,
    boxShadow: theme === "dark" ? "0 4px 24px #0006" : "0 4px 24px #0002",
    padding: 32,
    color: theme === "dark" ? "#e0e0e0" : "#22223b"
  };
  const labelStyle = {
    fontWeight: 500,
    marginBottom: 2
  };
  const inputStyle = {
    padding: "10px 12px",
    borderRadius: 8,
    border: theme === "dark" ? "1px solid #393e46" : "1px solid #c9ada7",
    fontSize: 16,
    outline: "none",
    background: theme === "dark" ? "#232946" : "#f8f8fa",
    color: theme === "dark" ? "#e0e0e0" : "#22223b",
    marginBottom: 4
  };
  const textareaStyle = {
    ...inputStyle,
    resize: "vertical"
  };
  const buttonStyle = {
    padding: "10px 0",
    background: theme === "dark" ? "#393e46" : "#4caf50",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 8
  };

  return (
    <div style={pageStyle}>
      <div style={formCardStyle}>
        <h2 style={{ marginBottom: 24 }}>Add a New Recipe</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Recipe Name:</label>
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} placeholder="Recipe Name" />
            {errors.name && <div style={{ color: "#b00020" }}>{errors.name}</div>}
          </div>
          <div>
            <label style={labelStyle}>Description:</label>
            <textarea name="description" value={form.description} onChange={handleChange} style={textareaStyle} placeholder="Description" rows={2} />
            {errors.description && <div style={{ color: "#b00020" }}>{errors.description}</div>}
          </div>
          <div>
            <label style={labelStyle}>Ingredients:</label>
            <textarea name="ingredients" value={form.ingredients} onChange={handleChange} style={textareaStyle} placeholder="Ingredients (comma separated)" rows={2} />
            {errors.ingredients && <div style={{ color: "#b00020" }}>{errors.ingredients}</div>}
          </div>
          <div>
            <label style={labelStyle}>Instructions:</label>
            <textarea name="instructions" value={form.instructions} onChange={handleChange} style={textareaStyle} placeholder="Instructions" rows={3} />
            {errors.instructions && <div style={{ color: "#b00020" }}>{errors.instructions}</div>}
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Prep Time (min):</label>
              <input name="prep_time" type="number" value={form.prep_time} onChange={handleChange} style={inputStyle} placeholder="Prep Time" />
              {errors.prep_time && <div style={{ color: "#b00020" }}>{errors.prep_time}</div>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Cook Time (min):</label>
              <input name="cook_time" type="number" value={form.cook_time} onChange={handleChange} style={inputStyle} placeholder="Cook Time" />
              {errors.cook_time && <div style={{ color: "#b00020" }}>{errors.cook_time}</div>}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Image URL:</label>
            <input name="image_url" value={form.image_url} onChange={handleImageUrlChange} style={inputStyle} placeholder="Image URL" disabled={!!imageFile} />
          </div>
          <div>
            <label style={labelStyle}>Or Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageFileChange} style={inputStyle} disabled={!!form.image_url} />
          </div>
          {(form.image_url || imagePreview) && (
            <div style={{ margin: "12px 0" }}>
              <label style={labelStyle}>Image Preview:</label><br />
              <img src={imagePreview || form.image_url} alt="Preview" style={{ maxWidth: 200, maxHeight: 200, borderRadius: 8, border: `1px solid ${theme === 'dark' ? '#393e46' : '#ccc'}` }} />
            </div>
          )}
          {errors.image_url && <div style={{ color: "#b00020" }}>{errors.image_url}</div>}
          <button type="submit" style={buttonStyle}>Add Recipe</button>
          {message && <div style={{ color: message.includes("success") ? "#388e3c" : "#b00020", marginTop: 8 }}>{message}</div>}
        </form>
      </div>
    </div>
  );
}

export default CreateRecipeForm; 