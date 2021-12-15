import React from 'react'
import { useState, useCallback } from "react";
import CocktailDetails from './CocktailDetails.js'
import Axios from "axios";
import cocktailImage from './cocktail-homepage.jpg';
import './Home.css'

export default function Home() {
    const [cocktail, setCocktail] = useState("");
    const [randomHidden,setRandomHidden]=useState(false);

    const getCocktail = useCallback(() => {
      setRandomHidden(false);
      Axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(
        (response) => {
          setCocktail(response.data.drinks[0]);
          // console.log(cocktail);
        }
      );
    }, [randomHidden]);
    return (
      <div className="App">
        <div className="body">
          <header className="App-header">
          
            <h1 className='what-drink-header'>What drink will you have today?</h1>
            
            <img className='cocktail-homepage-image' src={cocktailImage}></img>
            
            <br />
            <button className="generate-button" onClick={getCocktail}>
              Generate Random Cocktail
            </button>
            
          </header>
          {/* <button className="generate-button" onClick={getCocktail}>
              Generate Random Cocktail
            </button> */}

          {cocktail && !randomHidden &&
              <div className='random-home-div'>

                <img alt='cocktail' className ='cocktail-image-home' src={cocktail.strDrinkThumb}></img>

                <div className='random-cocktail-homepage-card'>
                  <CocktailDetails cocktail={cocktail} homepage={true} setRandomHidden={setRandomHidden}></CocktailDetails>
                </div>

              </div>
            }
          

          <div className="alcohols">
            <a className="Vodka" href="/vodka">
              Vodka
            </a>
            <a className="Gin" href="/gin">
              Gin
            </a>
            <a className="Tequila" href="/tequila">
              Tequila
            </a>
            <a className="Whiskey" href="/whiskey">
              Whiskey
            </a>
            <a className="Brandy" href="/brandy">
              BRANDY
            </a>
            <a className="Rum" href="/rum">
              Rum
            </a>
            
          </div>
          
        </div>
      </div>
    );
}