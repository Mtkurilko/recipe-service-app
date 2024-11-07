import React from 'react';
import "./pageDefault.css"
import RecipeSearch from "../components/recipeSearch";
import NavBurger from "../components/navBurger";
import logo from "../images/RecipeGuru.png";
import MealPlanner from "../components/mealPlanner";

function Plan () {
    return (
        <div className="pBody">
            <div className="homeHeader">
                <NavBurger/>
                <a href="/"><img id="appLogo" src={logo} alt="Recipe Guru"/></a>
                <RecipeSearch />
            </div>
            <MealPlanner />
        </div>
    );
}

export default Plan;