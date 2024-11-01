import React, { useEffect, useRef } from 'react';
import './recipeSearch.css'

function RecipeSearch(props) {
    const inputRef = useRef(null);
    const menuRef = useRef(null);

    const handleMenuButton = (e) => {
        if (menuRef.current.style.display === 'none' || menuRef.current.style.display === '') {
            menuRef.current.style.display = 'revert';
        }
        else {
            menuRef.current.style.display = 'none';
        }
    }

    useEffect(() => {
        const input = inputRef.current;

        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
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
                <button className="recipe-search__button" onClick={handleMenuButton}>▼</button>
                <div id="menuSelection" ref={menuRef}>

                </div>
        </div>
</div>
);
}

export default RecipeSearch;
