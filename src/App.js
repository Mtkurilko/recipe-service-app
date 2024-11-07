import './App.css';
import Home from "./pages/home";
import Plan from "./pages/plan";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import ShopList from "./pages/shoplist";
import About from "./pages/about";

function App() {
  return (
    <div className="App">
       <Router>
           <Routes>
               <Route exact path="/" element={<Home />} />
               <Route exact path="/plan" element={<Plan />} />
               <Route exact path="/shoplist" element={<ShopList />} />
               <Route exact path="/about" element={<About />} />
           </Routes>
       </Router>
    </div>
  );
}

export default App;
