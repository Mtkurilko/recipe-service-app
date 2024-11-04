import React, {useEffect, useRef, useState} from 'react';
import './recipeSearch.css'

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
        for (const val of [0,1,2,10,11,12,20,21,22]) {
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
                alert(input.value); // This stands in place to search func and retrieve filter params
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
                                >Greek
                                </button>
                                <button className="optionButton" id="but1" onClick={() => handleButtonChoice(1)}
                                >Italian
                                </button>
                                <button className="optionButton" id="but2" onClick={() => handleButtonChoice(2)}>Irish
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
                                        onClick={() => handleButtonChoice(20)}>Vegan
                                </button>
                                <button className="optionButton" id="but21"
                                        onClick={() => handleButtonChoice(21)}>Vegetarian
                                </button>
                                <button className="optionButton" id="but22" onClick={() => handleButtonChoice(22)}>Other
                                    Diet
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
