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
                            <a href="">
                                <label htmlFor="menuCheckbox" onClick="this.parentNode.click();">Home</label>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <label htmlFor="menuCheckbox" onClick="this.parentNode.click();">About</label>
                            </a>
                        </li>
                        <li><label htmlFor="menuCheckbox"><a href="">Info</a></label></li>
                        <li><label htmlFor="menuCheckbox"><a href="">Contact</a></label></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBurger;