import React from 'react';
import './recipeDisplay.css';
import threeDots from '../images/3dots.png';

const defaultRecipes = {
    1: {
        title: 'Recipe 1 Title',
        desc: 'This is a description for Recipe 1...',
        attributes: ['Dairy-Free', 'Low-Carb'],
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    },
    2: {
        title: 'Recipe 2 Title',
        desc: 'This is a description for Recipe 2...',
        attributes: ['Vegan', 'Gluten-Free'],
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    },
    3: {
        title: 'Recipe 3 Title',
        desc: 'This is a description for Recipe 3...',
        attributes: ['Vegan', 'Gluten-Free'],
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    },
    4: {
        title: 'Recipe 4 Title',
        desc: 'This is a description for Recipe 4...',
        attributes: ['Vegan', 'Gluten-Free'],
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    },
    5: {
        title: 'Recipe 5 Title',
        desc: 'This is a description for Recipe 5...',
        attributes: ['Vegan', 'Gluten-Free'],
        ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    }
};

function RecipeDisplay({ recipes = defaultRecipes }) {
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

        /* Do the work here */

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
        /* Do the work with clickedButton here */
        chooseDay.classList.remove('show');

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
            {Object.entries(recipes).map(([recipeID, recipe], index) => (
                <div className="recipe" key={recipeID}>
                    <h3 className="recipeTitle">{recipe.title}</h3>
                    <button className="actionButton" onClick={() => changeActionMenu(index)}>
                        <img src={threeDots} alt="Action Button" id="actionIMG" />
                    </button>
                    <div id={`actionMenu-${index}`} className="actionMenu">
                        <button className="actionMenuButton" onClick={() => addShop(index)}>+ Shopping List</button>
                        <br />
                        <button className="actionMenuButton" onClick={() => addMeal(index)}>+ Meal Plan</button>
                    </div>
                    <div className="attributes">
                        {recipe.attributes.map((attribute) => (
                            <div className="recipeAttribute">{attribute}</div>
                        ))}
                    </div>
                    <br />
                    <div className="desc&List">
                        <ul className="ingredientList">
                            {recipe.ingredients.map((ingredient, i) => (
                                <li className="ingredient" key={i}>{ingredient}</li>
                            ))}
                        </ul>
                        <div className="recipeDescription">
                            {recipe.desc}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RecipeDisplay;