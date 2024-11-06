import React from 'react';
import RecipeSearch from "../components/recipeSearch";
import "./home.css"
import NavBurger from "../components/navBurger";
import RecipeDisplay from "../components/recipeDisplay";

function Home () {
    return (
        <div className="pBody">
            <div className="homeHeader">
                <NavBurger />
                <RecipeSearch />
            </div>
            <RecipeDisplay />
        </div>
    );
}

export default Home;