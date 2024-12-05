import React, {useEffect, useRef, useState} from 'react';
import './recipeSearch.css'
import axios from 'axios';

const apiKEY = 'f21c78984da446a5b27c08434d710dff'; // I know this is here don't worry it's open-source & free

function formatNumber(num) {
  if (Number.isInteger(num)) {
    return num.toString(); // Return as is for whole numbers
  } else {
    return num.toFixed(2); // Apply toFixed(2) for decimals
  }
}

async function fetchRecipes(que,cus,diet,intol) {
  try {
    let res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${que}&cuisine=${cus}&diet=${diet}&intolerances=${intol}&apiKey=${apiKEY}&number=5`);  // query
    let apiData = res.data;
    console.log(apiData); // Log data after it's been fetched

    let idList = [];
    apiData.results.forEach(recipe => {
        idList.push(recipe.id);
    })

    res = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${idList.join(',')}&apiKey=${apiKEY}`);
    apiData = res.data;
    console.log(apiData);

    if (apiData && Array.isArray(apiData)) {
      return apiData.map(recipe => {
        const mappedIngredients = recipe.extendedIngredients.reduce((acc, ingredient) => {
          const unitShort = ingredient.measures.us.unitShort || "";
          const key = `${ingredient.name} (${unitShort})`;
          acc[key] = [formatNumber(ingredient.amount)];
          return acc;
        }, {});

        return {
          title: recipe.title,
          ingredients: mappedIngredients,
          diets: recipe.diets.slice(0,5),
          instructions: recipe.instructions,
          id: recipe.id,
          img: recipe.image
        };
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return []; // Return an empty array if there was an error or data is undefined
}

async function searchRecipes(query,filters) {
    let cus, diet, intol = "";

    for (const val of filters) {
        if (val < 10) {
            cus = `${document.getElementById("but"+val).innerText}`;
        }
        else if (val < 20 && val >= 10) {
            intol += `${document.getElementById("but"+val).innerText},`;
        }
        else if (val >= 20) {
            diet = `${document.getElementById("but"+val).innerText}`;
        }
    }

    if (intol !== "") { // Remove ending comma
        intol = intol.slice(0, -1)
    }

    try {
        const data = await fetchRecipes(query,cus,diet,intol);
        console.log(data);
        sessionStorage.setItem('recipes', JSON.stringify(data));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


function RecipeSearch(props) {
    const inputRef = useRef(null);
    const menuRef = useRef(null);
    const [filters, setFilters] = useState([]);

    const handleMenuButton = (e) => {
        if (menuRef.current.style.display === 'none' || menuRef.current.style.display === '') {
            menuRef.current.style.display = 'revert';
        }
        else {
            menuRef.current.style.display = 'none';
        }
    }

    const executeChoices = (fil) => {
        for (const val of [0,1,2,3,10,11,12,20,21,22]) {
            if (fil.includes(val)) {
                document.getElementById("but"+val).style.backgroundColor = 'green';
            }
            else {
                document.getElementById("but"+val).style.backgroundColor = 'aliceblue';
            }
        }
    };

    const handleButtonChoice = (num) => {
        if (filters.includes(num)) {
            let newFilters = filters
            newFilters = filters.filter(numF => numF !== num)
            setFilters(newFilters)
            executeChoices(newFilters) // affect below this *off
        } else {
            let newFilters = filters
             if (num < 10) {
                 newFilters = filters.filter(numF => numF > 9)
                 newFilters.push(num)
                 setFilters(newFilters)
                 executeChoices(newFilters)
            }else if (num >= 20) {
                 newFilters = filters.filter(numF => numF < 20)
                 newFilters.push(num)
                 setFilters(newFilters)
                 executeChoices(newFilters)
            }
            else {
                newFilters.push(num)
                setFilters(newFilters)
                executeChoices(newFilters)
             }
        }
    }

    useEffect(() => {
        const input = inputRef.current;

        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                searchRecipes(input.value,filters).then(r => window.location.href='/') // This stands in place to search func and retrieve filter params
                input.value = ""; // Clear the input field
            }
        };

        if (input) {
            input.addEventListener("keypress", handleKeyPress);
        }

        // Clean up the event listener on component unmount
        return () => {
            if (input) {
                input.removeEventListener("keypress", handleKeyPress);
            }
        };
    }, []);

    return (
        <div className="recipe-search">
            <div className="recipe-search__wrapper">
                <input
                    name="search"
                    placeholder="Search a recipe..."
                    className="recipe-search__input"
                    id="inputSearch"
                    ref={inputRef} // Assign the input reference
                />
                <div className="recipe-search__form">
                    <button className="recipe-search__button" onClick={handleMenuButton}>▼</button>
                    <br />
                    <div id="menuSelection" ref={menuRef}>
                        <div className="hangoverMenu"/>
                        <div id="options">
                            <div id="cuisine">
                                <button className="optionButton" id="but0" onClick={() => handleButtonChoice(0)}
                                >Mediterranean
                                </button>
                                <button className="optionButton" id="but1" onClick={() => handleButtonChoice(1)}
                                >Italian
                                </button>
                                <button className="optionButton" id="but2" onClick={() => handleButtonChoice(2)}
                                >Asian
                                </button>
                                <button className="optionButton" id="but3" onClick={() => handleButtonChoice(3)}
                                >Latin American
                                </button>
                            </div>
                            <div id="allergies">
                                <button className="optionButton" id="but10" onClick={() => handleButtonChoice(10)}>Nut
                                </button>
                                <button className="optionButton" id="but11"
                                        onClick={() => handleButtonChoice(11)}>Dairy
                                </button>
                                <button className="optionButton" id="but12"
                                        onClick={() => handleButtonChoice(12)}>Gluten
                                </button>
                            </div>
                            <div id="diet">
                                <button className="optionButton" id="but20"
                                        onClick={() => handleButtonChoice(20)}
                                >Vegan
                                </button>
                                <button className="optionButton" id="but21"
                                        onClick={() => handleButtonChoice(21)}
                                >Vegetarian
                                </button>
                                <button className="optionButton" id="but22" onClick={() => handleButtonChoice(22)}
                                >Ketogenic
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeSearch;
