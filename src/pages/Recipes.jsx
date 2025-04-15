import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await axios.get("https://dummyjson.com/recipes");
            setRecipes(response.data.recipes);
        };
        fetchRecipes();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{marginBottom:'20px'}}>Recipes</h2>
            {recipes.map((recipe) => (
                <div
                    key={recipe.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "20px",
                        borderRadius: "10px",
                        marginBottom: "30px",
                    }}
                >
                    <h3>{recipe.name}</h3>
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
                    />
                    <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                    <p><strong>Meal Type:</strong> {recipe.mealType?.join(", ")}</p>
                    <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p>
                    <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p>
                    <p><strong>Servings:</strong> {recipe.servings}</p>
                    <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                    <p><strong>Calories/Serving:</strong> {recipe.caloriesPerServing}</p>
                    <p><strong>Rating:</strong> {recipe.rating} ⭐ ({recipe.reviewCount} reviews)</p>
                    <p><strong>Tags:</strong> {recipe.tags?.join(", ")}</p>

                    <div>
                        <h4>Ingredients:</h4>
                        <ul style={{ listStyle: 'none' }}>
                            {recipe.ingredients.map((ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4>Instructions:</h4>
                        <ul style={{ listStyle: 'none' }}>
                            {recipe.instructions.map((step, idx) => (
                                <li key={idx}>{step}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
