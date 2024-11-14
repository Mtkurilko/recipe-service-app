import React, { useState, useEffect } from 'react';
import './recipeDisplay.css';
import threeDots from '../images/3dots.png';
import axios from 'axios';

const apiKEY = 'f21c78984da446a5b27c08434d710dff';

function capitalize(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatNumber(num) {
  if (Number.isInteger(num)) {
    return num.toString(); // Return as is for whole numbers
  } else {
    return num.toFixed(2); // Apply toFixed(2) for decimals
  }
}

async function fetchRecipes() {
  try {
    const res = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKEY}&number=5`);
    const apiData = res.data;
    console.log(apiData); // Log data after it's been fetched

    if (apiData && apiData.recipes) {
      return apiData.recipes.map(recipe => {
        const mappedIngredients = recipe.extendedIngredients.reduce((acc, ingredient) => {
          const unitShort = ingredient.measures.metric.unitShort || "";
          const key = `${ingredient.name} (${unitShort})`;
          acc[key] = [formatNumber(ingredient.amount)];
          return acc;
        }, {});

        return {
          title: recipe.title,
          ingredients: mappedIngredients,
          diets: recipe.diets.slice(0,5),
          instructions: recipe.instructions,
          id: recipe.id,
          img: recipe.image
        };
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return []; // Return an empty array if there was an error or data is undefined
}

function RecipeDisplay() {
  const [recipes, setRecipes] = useState([]); // State to store the recipes

  useEffect(() => {
    // Check if data exists in sessionStorage
    const cachedRecipes = sessionStorage.getItem('recipes');

    if (cachedRecipes) {
      // If there's cached data, use it
      setRecipes(JSON.parse(cachedRecipes));
    } else {
      // Fetch new data if no cached data is available
      fetchRecipes().then(data => {
        setRecipes(data);
        // Store fetched data in sessionStorage for later use
        sessionStorage.setItem('recipes', JSON.stringify(data));
      });
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const changeActionMenu = (index) => {
    const menu = document.getElementById(`actionMenu-${index}`);
    if (menu.style.display !== 'block') {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  };

  const addShop = (index) => {
    const menu = document.getElementById(`actionMenu-${index}`);
    const added = document.getElementById('addedBox');
    menu.style.display = 'none';

    // SEND LIST [RECIPE NAME, ID] to shopping list

    added.classList.add('show');
    setTimeout(() => {
      added.classList.remove('show');
    }, 2000);
  };

  function waitForClick(buttons) {
    return new Promise((resolve) => {
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          resolve(button); // Resolve the promise when any button is clicked
        });
      });
    });
  }

  const addMeal = async (index) => {
    const menu = document.getElementById(`actionMenu-${index}`);
    const added = document.getElementById('addedBox');
    const chooseDay = document.getElementById('chooseDayBox');
    const buttons = document.querySelectorAll('.pickDay');
    menu.style.display = 'none';

    chooseDay.classList.add('show');
    const clickedButton = await waitForClick(buttons);
    chooseDay.classList.remove('show');
    const currRec = recipes[index]; // Recipe being accessed
    if (currRec.loc === "shop") {
      currRec.loc = "both"; // add to both
    }
    else {
      currRec.loc = "meal"; // add location
    }
    currRec.day = clickedButton.innerText;
    console.log(`${clickedButton.innerText}: Sending them this: ${JSON.stringify(currRec)}`);
    // Send full recipe {} with next datapoint day to clickedButton (the day) NOT ALL RECIPES
    try {
      const response = await axios.post("http://localhost:8080/api/recipes", currRec);
      console.log("Recipe added:", response.data);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }

    added.classList.add('show');
    setTimeout(() => {
      added.classList.remove('show');
    }, 2000);
  };

  return (
    <div className="recipesContainer">
      <div className="addedBox" id="addedBox">Added ✅</div>
      <div className="chooseDayBox" id="chooseDayBox">
        <h5 id="chooseDayh5">Pick A Day</h5>
        <button className="pickDay">Sunday</button>
        <button className="pickDay">Monday</button>
        <button className="pickDay">Tuesday</button>
        <button className="pickDay">Wednesday</button>
        <button className="pickDay">Thursday</button>
        <button className="pickDay">Friday</button>
        <button className="pickDay">Saturday</button>
      </div>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <div className="recipe" key={index}>
            <h3 className="recipeTitle">{recipe.title}</h3>
            <button className="actionButton" onClick={() => changeActionMenu(index)}>
              <img src={threeDots} alt="Action Button" id="actionIMG" />
            </button>
            <div id={`actionMenu-${index}`} className="actionMenu">
              <button className="actionMenuButton" onClick={() => addShop(index)}>+ Shopping List</button>
              <br />
              <button className="actionMenuButton" onClick={() => addMeal(index)}>+ Meal Plan</button>
            </div>

            {/* Render diets (attributes) */}
            <div className="attributes">
              {recipe.diets.map((diet, i) => (
                <div className="recipeAttribute" key={i}>{capitalize(diet)}</div>
              ))}
            </div>

            <br />

            <div className="desc&List">
              {/* Render ingredients as a list */}
              <ul className="ingredientList">
                {Object.entries(recipe.ingredients).map(([ingredientName, amountArray], i) => (
                  <li className="ingredient" key={i}>
                    {`${capitalize(ingredientName.split('(')[0])} (${amountArray[0]}${ingredientName.split('(')[1]}`}
                  </li>
                ))}
              </ul>

              {/* Render description */}
                <div className="recipeDescription" dangerouslySetInnerHTML={{__html: recipe.instructions}} />
                <img className="recipeImage" src={recipe.img} alt="Recipe" />
            </div>
          </div>
        ))
      ) : (
          <p>Loading...</p> // Show loading state if recipes are still empty
      )}
    </div>
  );
}

export default RecipeDisplay;
