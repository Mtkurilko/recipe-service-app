import React, { useState } from 'react';
import RecipeSearch from "../components/recipeSearch";
import "./pageDefault.css";
import "./about.css";
import NavBurger from "../components/navBurger";
import logo from "../images/RecipeGuru.png";
import home from "../images/homePage.png";
import planner from "../images/planner.png";
import recipe from "../images/recipePage.png";
import search from "../images/search.png";
import shop from "../images/shoppingList.png";

function About() {
    const [expandedImage, setExpandedImage] = useState(null);

    const handleImageClick = (image) => {
        setExpandedImage(image);
    };

    const closeExpandedImage = () => {
        setExpandedImage(null);
    };

    return (
        <>
            <div className="homeHeader">
                <NavBurger />
                <a href="/"><img id="appLogo" src={logo} alt="Recipe Guru" /></a>
                <RecipeSearch />
            </div>
            <div id="about-page">
                <div id="about-section">
                    <h1 id="about-title">About This Project</h1>
                    <div id="about-content">
                        <header id="project-header">
                            <h1>Recipe Search and Meal Planner</h1>
                            <p>A full-stack application for searching, planning, and managing recipes.</p>
                        </header>

                        <section id="features-section">
                            <h2>Features</h2>
                            <ul>
                                <li><strong>Frontend:</strong>
                                    <ul>
                                        <li>Built with React for a dynamic and responsive user interface.</li>
                                        <li>Displays five recipes on the homepage with:
                                            <ul>
                                                <li>Image, Title, Ingredients, Description</li>
                                                <li>Intolerances, Diet, and Type of food</li>
                                            </ul>
                                        </li>
                                        <li>Search bar with dropdown filters for cuisine, diet, and intolerances.</li>
                                        <li>Meal Planner integration to add recipes to specific days of the week.</li>
                                        <li>Shopping List feature with organized ingredients and cost predictions.</li>
                                    </ul>
                                </li>
                                <li><strong>Backend:</strong>
                                    <ul>
                                        <li>Built with Java using Spring Boot for RESTful APIs.</li>
                                        <li>PostgreSQL database for efficient storage and retrieval of recipes.</li>
                                        <li>Dynamic recipe pages generated on-the-fly using IDs from the API.</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        <section id="tech-stack-section">
                            <h2>Technology Stack</h2>
                            <ul>
                                <li><strong>Frontend:</strong> React, Axios, CSS</li>
                                <li><strong>Backend:</strong> Java (Spring Boot), PostgreSQL, RESTful APIs</li>
                                <li><strong>API:</strong> <a href="https://spoonacular.com/food-api" target="_blank" rel="noopener noreferrer">Spoonacular API</a></li>
                            </ul>
                        </section>

                        <section id="screenshots-section">
                            <h2>Screenshots</h2>
                            <div className="screenshot" onClick={() => handleImageClick(home)}>
                                <h3>Homepage</h3>
                                <img id="screenshot-home" src={home} alt="Homepage Screenshot" />
                            </div>
                            <div className="screenshot" onClick={() => handleImageClick(search)}>
                                <h3>Search Bar with Filters</h3>
                                <img id="screenshot-search" src={search} alt="Search Bar Screenshot" />
                            </div>
                            <div className="screenshot" onClick={() => handleImageClick(planner)}>
                                <h3>Meal Planner</h3>
                                <img id="screenshot-planner" src={planner} alt="Meal Planner Screenshot" />
                            </div>
                            <div className="screenshot" onClick={() => handleImageClick(shop)}>
                                <h3>Shopping List</h3>
                                <img id="screenshot-shopping" src={shop} alt="Shopping List Screenshot" />
                            </div>
                            <div className="screenshot" onClick={() => handleImageClick(recipe)}>
                                <h3>Recipe Page</h3>
                                <img id="screenshot-recipe" src={recipe} alt="Recipe Page Screenshot" />
                            </div>
                        </section>

                        <section id="github-section">
                            <h2>GitHub Repository</h2>
                            <p>For the source code and detailed implementation, visit the GitHub repository:</p>
                            <a href="https://github.com/Mtkurilko/recipe-service-app" target="_blank" rel="noopener noreferrer">Recipe Search and Meal Planner on GitHub</a>
                        </section>

                        <footer id="project-footer">
                            <p>&copy; 2025 Recipe Search and Meal Planner</p>
                        </footer>
                    </div>
                </div>
            </div>

            {expandedImage && (
                <div className="image-overlay" onClick={closeExpandedImage}>
                    <div className="expanded-image-container">
                        <img src={expandedImage} alt="Expanded View" className="expanded-image" />
                    </div>
                </div>
            )}
        </>
    );
}

export default About;
