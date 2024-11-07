import React from "react"
import './navBurger.css'

function NavBurger() {
    return (
        <div className="navBurger">
            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" id="menuCheckbox"/>

                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        <li>
                            <label htmlFor="menuCheckbox"><a href="/">Home</a></label>
                        </li>
                        <li>
                            <label htmlFor="menuCheckbox"><a href="/plan">Meal Planner</a></label>
                        </li>
                        <li><label htmlFor="menuCheckbox"><a href="/shoplist">Shopping List</a></label></li>
                        <li><label htmlFor="menuCheckbox"><a href="/about">About Project</a></label></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBurger;