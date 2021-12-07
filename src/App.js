import "./App.css";
// import { Navbar } from "react-bootstrap";
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Navbar from "./Navbar.js";
import Home from "./Home.js";
import Vodka from "./Vodka.js";
import Gin from "./Gin.js";
import Whiskey from "./Whiskey.js";
import Tequila from "./Tequila.js";
import Rum from "./Rum.js";
import Brandy from "./Brandy.js";
import Vermouth from './Vermouth.js'
import AllCocktails from "./AllCocktails";
import SearchedCocktail from './SearchedCocktail'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<AllCocktails />} />
            <Route path='/searched' element={<SearchedCocktail />} />
            <Route path="/vodka" element={<Vodka />} />
            <Route path="/gin" element={<Gin />} />
            <Route path="/tequila" element={<Tequila />} />
            <Route path="/whiskey" element={<Whiskey />} />
            <Route path="/brandy" element={<Brandy />} />
            <Route path="/rum" element={<Rum />} />
            <Route path="/vermouth" element={<Vermouth />} />

          </Routes>
      </Router>
    </>
  );
}

export default App;
