import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function EditRecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    </div>
  );
}

export default EditRecipeForm;
