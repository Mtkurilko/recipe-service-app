import React from 'react';
import './recipeDisplay.css'
import threeDots from '../images/3dots.png'

function RecipeDisplay(recipes = []) {
    return (
        <div className="recipesContainer">
            <div className="recipe">
                <h3 className="recipeTitle">Example Title</h3>
                <button className="actionButton" ><img src={threeDots} alt="Action Button" id="actionIMG" /></button>
                <div className="recipeAttribute">Nuts</div>
                <br />
                <ul className="ingredientList">
                    <li className="ingredient">Test Ingredient</li>
                    <li className="ingredient">Test Ingredient</li>
                    <li className="ingredient">Test Ingredient</li>
                    <li className="ingredient">Test Ingredient</li>
                    <li className="ingredient">Test Ingredient</li>
                </ul>
                <p className="recipeDescription">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>
            </div>
        </div>
    );
}

export default RecipeDisplay;