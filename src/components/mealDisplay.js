import React, {useEffect, useState} from 'react';
import './mealDisplay.css'
import axios from "axios";

async function fetchRecipe(id) {
    try { // Grab recipe if already exists
      const response = await axios.get(`http://localhost:8080/api/recipes/id/${id}`);
      console.log("Recipe received:", response.data);
      return response.data;
    }
    catch (error) {
      // Let currRec stay same because doesnt exist in database
    }
}

function MealDisplay(recipeID) {
    recipeID = recipeID['recipeID']; // Unpacks JSON object
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedRecipe = await fetchRecipe(recipeID); // Fetch recipe data
                setRecipe(fetchedRecipe); // Set the recipe in state
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        }

        fetchData();
    }, [recipeID]); // Run effect whenever recipeID changes

    // Render a loading state until recipe data is available
    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mealDisplay">
            <h1 className="mealDisplay__title">{recipe.title}</h1>
        </div>
    );
}

export default MealDisplay;