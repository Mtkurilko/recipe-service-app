import React from 'react';
import RecipeSearch from "../components/recipeSearch";
import "./pageDefault.css"
import NavBurger from "../components/navBurger";
import logo from "../images/RecipeGuru.png";
import { useParams } from "react-router-dom";
import MealDisplay from "../components/mealDisplay";

function Recipe () {
    const { id } = useParams();

    console.log(id);

    return (
        <div className="pBody">
            <div className="homeHeader">
                <NavBurger />
                <a href="/"><img id="appLogo" src={logo} alt="Recipe Guru" /></a>
                <RecipeSearch />
            </div>
            <MealDisplay recipeID={id} />
        </div>
    );
}

export default Recipe;