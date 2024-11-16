import React, {useEffect, useState} from 'react';
import './mealDisplay.css'
import axios from "axios";

function capitalize(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

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
            <div className="mealDisplay__container">
                <img className="mealDisplay__img" src={recipe.img} alt="Recipe"/>
                <div className="mealDisplay__description" dangerouslySetInnerHTML={{__html: recipe.instructions}} />
                <div className="mealDisplay__ingred">
                    {Object.entries(recipe.ingredients).map(([ingredient, amountArray], i) => (
                        <li className="mealDisplay__ingredient" key={i}>
                            {`${capitalize(ingredient.split('(')[0])} (${amountArray[0]}${ingredient.split('(')[1]}`}
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MealDisplay;