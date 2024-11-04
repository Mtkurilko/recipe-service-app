import React from 'react';
import "./shoppingList.css"

const defaultItems = [
    {
        title: "Milkshake",
        url: "https://www.example.com/milkshake",
        ingredients: {
            "Milk (liters)": [2, 2.00], // Including unit within the ingredient key
            "Ice Cream (g)": [200, 3.50],
            "Sugar (g)": [50, 0.50]
        }
    },
    {
        title: "Omelette",
        url: "https://www.example.com/omelette",
        ingredients: {
            "Eggs ()": [2, 1.50],
            "Cheese (g)": [50, 1.00],
            "Tomato ()": [1, 0.75],
            "Bell Pepper ()": [1, 0.75]
        }
    },
    {
        title: "Sandwich",
        url: "https://www.example.com/sandwich",
        ingredients: {
            "Bread (slices)": [2, 1.00],
            "Lettuce (leaf)": [1, 0.50],
            "Tomato ()": [1, 0.75],
            "Turkey (g)": [50, 2.50]
        }
    },
    {
        title: "Milkshake",
        url: "https://www.example.com/milkshake",
        ingredients: {
            "Milk (liters)": [2, 2.00], // Including unit within the ingredient key
            "Ice Cream (g)": [200, 3.50],
            "Sugar (g)": [50, 0.50]
        }
    },
    {
        title: "Omelette",
        url: "https://www.example.com/omelette",
        ingredients: {
            "Eggs ()": [2, 1.50],
            "Cheese (g)": [50, 1.00],
            "Tomato ()": [1, 0.75],
            "Bell Pepper ()": [1, 0.75]
        }
    },
    {
        title: "Sandwich",
        url: "https://www.example.com/sandwich",
        ingredients: {
            "Bread (slices)": [2, 1.00],
            "Lettuce (leaf)": [1, 0.50],
            "Tomato ()": [1, 0.75],
            "Turkey (g)": [50, 2.50]
        }
    }
];

function ShoppingList({ items = defaultItems }) {
    const ingredientTotals = {};

    // Calculate total quantities and costs for each ingredient
    items.forEach(item => {
        Object.entries(item.ingredients).forEach(([ingredient, [quantity, price]]) => {
            if (!ingredientTotals[ingredient]) {
                ingredientTotals[ingredient] = { quantity: 0, totalCost: 0 };
            }
            ingredientTotals[ingredient].quantity += quantity;
            ingredientTotals[ingredient].totalCost += price;
        });
    });

    const totalCost = Object.values(ingredientTotals)
        .reduce((sum, item) => sum + item.totalCost, 0)
        .toFixed(2);

    return (
        <div className="shoppingList">
            <h1>Shopping List</h1>
            <ul className="shoppingList__list">
                    {items.map((item, index) => (
                        <li key={index} className="shoppingList__item">
                            <a className="mealTit" href={item.url} target="_blank" rel="noopener noreferrer">
                                {item.title}
                            </a>
                            <ul>
                                {Object.entries(item.ingredients).map(([ingredient, [quantity, price]], idx) => (
                                    <li key={idx} className="ingredient">
                                        {ingredient.split('(')[0]+"("}{quantity}{ingredient.split('(')[1]}, Cost: ${price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
            </ul>
            <div className="shoppingList__totals">
                <h2>Total Ingredients</h2>
                <ul>
                    {Object.entries(ingredientTotals).map(([ingredient, details], index) => (
                        <li key={index} className="ingredient-total">
                            {ingredient.split('(')[0]+"("}{details.quantity}{ingredient.split('(')[1]}, Cost: ${details.totalCost.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <p><strong>Overall Total Cost:</strong> ${totalCost}</p>
            </div>
        </div>
    );
}

export default ShoppingList;
