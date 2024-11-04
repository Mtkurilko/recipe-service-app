import React from 'react';
import RecipeSearch from "../components/recipeSearch";
import "./home.css"

function Home () {
    return (
        <div className="homeHeader">
            <RecipeSearch />
        </div>
    );
}

export default Home;