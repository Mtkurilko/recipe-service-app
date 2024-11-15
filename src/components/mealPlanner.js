import React, {useEffect, useState} from 'react';
import './mealPlanner.css';
import axios from 'axios';


async function fetchMeals() {
    try {
        let response1, response2;

        // Try to fetch data from both API endpoints
        try {
            response1 = await axios.get(`http://localhost:8080/api/recipes/loc/both`);
        } catch (error) {
            response1 = { data: [] };
            console.error("Error fetching 'both' recipes:", error);
        }

        try {
            response2 = await axios.get(`http://localhost:8080/api/recipes/loc/meal`);
        } catch (error) {
            response2 = { data: [] };
            console.error("Error fetching 'meal' recipes:", error);
        }

        // Combine data from both responses
        const combinedData = [...response1.data, ...response2.data];
        console.log(combinedData);

        // Map the data to the required format by day
        const mealsByDay = {
            Sunday: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: []
        };

        // Iterate over combined data and place each recipe on its corresponding days
        combinedData.forEach(recipe => {
            recipe.day.forEach(day => {
                if (mealsByDay[day]) {
                    mealsByDay[day].push({
                        title: recipe.title,
                        url: `/recipe/${recipe.id}`, // Adjust the URL format as needed
                        img: recipe.img,
                        loc: recipe.loc,
                        id: recipe.id,
                        ingredients: recipe.ingredients,
                        instructions: recipe.instructions,
                        diets: recipe.diets
                    });
                }
            });
        });

        console.log("Formatted Meals Data:", mealsByDay);
        return mealsByDay;
    } catch (error) {
        console.error("Error in fetchMeals function:", error);
    }
    return {};
}


function MealPlanner() { // Set a default value here
    const [meals, setMeals] = useState({});

    useEffect(() => {
        fetchMeals().then(data => {
            setMeals(data)
        });
    }, []);

    const changeMealPlan = (day, newMeal) => {
        setMeals((prevMeals) => ({
            ...prevMeals,
            [day]: [...(prevMeals[day] || []), newMeal] // Handle undefined day arrays
        }));
    };

    const removeMeal = async (day, mealID) => {
        setMeals(async (prevMealPlanner) => {
            // Find the meal in the day's meals
            const mealIndex = prevMealPlanner[day].findIndex(meal => meal.id === mealID);

            // If the meal isn't found, return the existing meal planner state
            if (mealIndex === -1) return prevMealPlanner;

            // Extract the meal object from the day's meals
            let mealToRemove = prevMealPlanner[day][mealIndex];

            // Check if the meal appears in multiple days
            const isMealInMultipleDays = Object.keys(prevMealPlanner).some(otherDay =>
                otherDay !== day && prevMealPlanner[otherDay].some(meal => meal.id === mealID)
            );

            // Prepare the updated meal planner state without the removed meal for that day
            const updatedMealPlanner = {
                ...prevMealPlanner,
                [day]: prevMealPlanner[day].filter(meal => meal.id !== mealID),
            };

            // If `loc` is "both" and meal is only on this one day, update `loc` to "shop"
            if (mealToRemove.loc === 'both' && !isMealInMultipleDays) {
                let mealRep = mealToRemove;
                try {
                    const response = await axios.get(`http://localhost:8080/api/recipes/id/${mealID}`);
                    mealRep = response.data;
                } catch (error) {
                    console.error(`Error fetching recipe ${mealID}:`, error);
                }

                mealRep.loc = 'shop';  // set to shop

                // Update the database with the new `loc` value
                axios.put(`http://localhost:8080/api/recipes/id/${mealID}`, mealRep)
                    .then(() => console.log(`Meal ${mealID} updated to 'shop' in database.`))
                    .catch(error => console.error('Error updating meal location:', error));
            }
            // If `loc` is not "both" and meal is only on this one day, delete from database
            else if (mealToRemove.loc !== 'both' && !isMealInMultipleDays) {
                axios.delete(`http://localhost:8080/api/recipes/id/${mealID}`)
                    .then(() => console.log(`Meal ${mealID} deleted from database.`))
                    .catch(error => console.error('Error deleting meal:', error));
            }

            // Return the updated meal planner state
            return updatedMealPlanner;
        });
    };





    return (
        <div className="meal-planner">
            <div className="meal-planner__content">
                <div className='meal-planner__col1'>
                    {["Sunday", "Monday", "Tuesday", "Wednesday"].map(day => (
                        <div className="day" key={day}>
                            <div className="dayTitle">
                                <h3>{day}</h3>
                            </div>
                            <ul className="mealList">
                                {(meals[day] || []).map((meal, index) => ( // Handle undefined day arrays
                                    <li key={index}>
                                        <a className="mealTit" href={meal.url} target="_blank" rel="noopener noreferrer">
                                            {meal.title}
                                        </a>
                                        <button  className="remBut" onClick={() => removeMeal(day, meal.id)}>-</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="meal-planner__col2">
                    {["Thursday", "Friday", "Saturday"].map(day => (
                        <div className="day" key={day}>
                            <div className="dayTitle">
                                <h3>{day}</h3>
                            </div>
                            <ul className="mealList">
                                {(meals[day] || []).map((meal, index) => ( // Handle undefined day arrays
                                    <li key={index}>
                                        <a className="mealTit" href={meal.url} target="_blank" rel="noopener noreferrer">
                                            {meal.title}
                                        </a>
                                        <button className="remBut" onClick={() => removeMeal(day, meal.id)}>-</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MealPlanner;