import React from 'react';
import RecipeSearch from "../components/recipeSearch";
import "./home.css"
import NavBurger from "../components/navBurger";
import RecipeDisplay from "../components/recipeDisplay";
import logo from "../images/RecipeGuru.png";

function Home () {
    return (
        <div className="pBody">
            <div className="homeHeader">
                <NavBurger />
                <a href="/"><img id="appLogo" src={logo} alt="Recipe Guru" /></a>
                <RecipeSearch />
            </div>
            <RecipeDisplay />
        </div>
    );
}

export default Home;