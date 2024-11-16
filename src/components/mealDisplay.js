import React, {useEffect, useState} from 'react';
import './mealDisplay.css'
import axios from "axios";
import threeDots from "../images/3dots.png";

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

     const changeActionMenu = (id) => {
        const menu = document.getElementById(`actionMenu-${id}`);
        if (menu.style.display !== 'block') {
          menu.style.display = 'block';
        } else {
          menu.style.display = 'none';
        }
      };

  const addShop = async (id) => {
    const menu = document.getElementById(`actionMenu-${id}`);
    const added = document.getElementById('addedBox');
    menu.style.display = 'none';

    let currRec = recipe; // Recipe being accessed

    try { // Grab recipe if already exists
      const response = await axios.get(`http://localhost:8080/api/recipes/id/${currRec.id}`);
      console.log("Recipe received:", response.data);
      currRec = response.data;
    }
    catch (error) {
      // Let currRec stay same because doesnt exist in database
    }

    if (currRec.loc === "meal" || currRec.loc === "both") {
      currRec.loc = "both"; // add to both
    }
    else {
      currRec.loc = "shop"; // add location
    }

    // SEND LIST [RECIPE NAME, ID] to shopping list
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

  function waitForClick(buttons) {
    return new Promise((resolve) => {
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          resolve(button); // Resolve the promise when any button is clicked
        });
      });
    });
  }

  const addMeal = async (id) => {
    const menu = document.getElementById(`actionMenu-${id}`);
    const added = document.getElementById('addedBox');
    const chooseDay = document.getElementById('chooseDayBox');
    const buttons = document.querySelectorAll('.pickDay');
    menu.style.display = 'none';

    chooseDay.classList.add('show');
    const clickedButton = await waitForClick(buttons);
    chooseDay.classList.remove('show');
    let currRec = recipe; // Recipe being accessed

    try { // Grab recipe if already exists
      const response = await axios.get(`http://localhost:8080/api/recipes/id/${currRec.id}`);
      console.log("Recipe received:", response.data);
      currRec = response.data;
    }
    catch (error) {
      // Let currRec stay same because doesnt exist in database
    }

    if (currRec.loc === "shop" || currRec.loc === "both") {
      currRec.loc = "both"; // add to both
    }
    else {
      currRec.loc = "meal"; // add location
    }
    if (currRec.day) {
      if (!currRec.day.includes(clickedButton.innerText)) {
        currRec.day.push(clickedButton.innerText);
      }
    }
    else {
      currRec.day = [clickedButton.innerText]; // add currRec[day] = the day chosen to list
    }
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
        <div>
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
            <div className="mealDisplay">
                <h1 className="mealDisplay__title">{recipe.title}</h1>
                <div id="mealActionButton">
                    <button className="actionButton" onClick={() => changeActionMenu(recipeID)}>
                        <img src={threeDots} alt="Action Button" id="actionIMG"/>
                    </button>
                    <div id={`actionMenu-${recipeID}`} className="actionMenu">
                        <button className="actionMenuButton" id="mealShop" onClick={() => addShop(recipeID)}>+ Shopping List</button>
                        <br/>
                        <button className="actionMenuButton" id="mealMeal" onClick={() => addMeal(recipeID)}>+ Meal Plan</button>
                    </div>
                </div>
                <div className="mealDisplay__container">
                    <div className="mealDisplay__col1">
                        <img className="mealDisplay__img" src={recipe.img} alt="Recipe"/>
                        <div className="mealDisplay__ingred">
                            {Object.entries(recipe.ingredients).map(([ingredient, amountArray], i) => (
                                <li className="mealDisplay__ingredient" key={i}>
                                    {`${capitalize(ingredient.split('(')[0])} (${amountArray[0]}${ingredient.split('(')[1]}`}
                                </li>
                            ))}
                        </div>
                    </div>
                    <div className="mealDisplay__col2">
                        <div className="mealDisplay__description"
                             dangerouslySetInnerHTML={{__html: recipe.instructions}}/>
                    </div>
                </div>
            </div>
        </div>
            );
            }

            export default MealDisplay;