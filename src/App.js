import './App.css';
import RecipeSearch from "./components/recipeSearch";
import MealPlanner from "./components/mealPlanner";
import ShoppingList from "./components/shoppingList";
import Home from "./pages/home";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Router>
           <Routes>
               <Route exact path="/" element={<Home />} />
           </Routes>
       </Router>
    </div>
  );
}

export default App;
