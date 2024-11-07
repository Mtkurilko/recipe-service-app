import React, { useState } from 'react';
import './mealPlanner.css';

const defaultMeals = {
        Sunday: [{ title: "Pancakes", url: "/pancakes" }],
        Monday: [{ title: "Salad", url: "/salad" }],
        Tuesday: [],
        Wednesday: [{ title: "Spaghetti", url: "/spaghetti" }],
        Thursday: [{ title: "Tacos", url: "/tacos" }],
        Friday: [],
        Saturday: [{ title: "Pizza", url: "/pizza" }]
};

function MealPlanner({ initialMeals = defaultMeals }) { // Set a default value here
    const [meals, setMeals] = useState(initialMeals);

    const changeMealPlan = (day, newMeal) => {
        setMeals((prevMeals) => ({
            ...prevMeals,
            [day]: [...(prevMeals[day] || []), newMeal] // Handle undefined day arrays
        }));
    };

    const removeMeal = (day, mealTitle) => {
        setMeals((prevMeals) => ({
            ...prevMeals,
            [day]: prevMeals[day]?.filter(meal => meal.title !== mealTitle) || [] // Handle undefined day arrays
        }));
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
                                        <button  className="remBut" onClick={() => removeMeal(day, meal.title)}>-</button>
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
                                        <button className="remBut" onClick={() => removeMeal(day, meal.title)}>-</button>
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
