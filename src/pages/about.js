import React from 'react';
import RecipeSearch from "../components/recipeSearch";
import "./pageDefault.css"
import NavBurger from "../components/navBurger";
import logo from "../images/RecipeGuru.png";

function About() {
    return (
        <div className="pBody">
            <div className="homeHeader">
                <NavBurger/>
                <a href="/"><img id="appLogo" src={logo} alt="Recipe Guru"/></a>
                <RecipeSearch/>
            </div>
            <div className="aboutSection">
                <h1>About This Project</h1>
                <div className="aboutBody">
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Mattis inceptos porttitor lorem ac pellentesque. Ut aenean feugiat primis, sociosqu platea bibendum. Efficitur vestibulum phasellus rutrum malesuada eu pellentesque commodo. Habitant conubia nulla sodales tristique nascetur efficitur orci rhoncus parturient. Curabitur nunc volutpat orci lacinia convallis platea integer mauris himenaeos. Iaculis cras sapien montes quisque natoque mauris laoreet non. Quis tempor sapien ornare diam curae. Interdum nibh congue arcu dui porttitor interdum nullam.

Conubia class libero facilisi class, luctus curabitur ligula. In montes mus dignissim urna pretium quis nisi. Ridiculus rutrum orci eleifend conubia nostra per arcu tristique. Pretium tellus mauris ullamcorper ex erat auctor fringilla. At gravida ipsum sodales hac tellus suscipit sem justo. Quisque lacus fames erat et; dui tempus aenean gravida. Scelerisque leo sed morbi maecenas ad magna.

Fringilla id dictum habitasse ullamcorper euismod ridiculus inceptos. Ipsum lorem conubia fames platea nulla nascetur nec mauris. Arcu nisi turpis iaculis accumsan parturient magna. Lacinia leo nullam curae et interdum torquent inceptos a. Consectetur eget id magna inceptos habitant rhoncus habitasse blandit. Habitant tempus at condimentum leo libero tortor nec. Rutrum accumsan auctor urna suscipit phasellus rhoncus mattis rutrum. Nibh conubia eu placerat justo lacus.

Curae nascetur sodales platea adipiscing curabitur dignissim. Class lobortis litora porttitor ridiculus accumsan, taciti ligula luctus augue. Class phasellus eu congue massa nibh hendrerit ridiculus accumsan. Ullamcorper vel nam dapibus efficitur mollis cras pretium. Semper interdum bibendum ut libero metus eros. Blandit litora eget commodo mattis ac? Consectetur iaculis dui sodales eros parturient nisi velit.

Egestas quisque penatibus phasellus senectus sollicitudin curabitur mollis. Enim leo risus posuere fermentum inceptos dui commodo nisi accumsan. Ultricies gravida quam, iaculis litora ullamcorper auctor? Phasellus auctor tempor placerat ornare at tristique. Justo lacinia dis duis; vulputate at urna nullam orci arcu. Curae interdum commodo nam molestie euismod porttitor nostra neque curae? Metus non dictum etiam, dignissim per ullamcorper. Per habitasse dictum diam placerat nibh odio.
                </div>
            </div>
        </div>
    );
}

export default About;