import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Cocktails.css";
import Popup from './Popup.js'

export default function Whiskey() {
  const [whiskeyList, setList] = useState([]);
  const [isHidden, setWhiskeyHidden] = useState(true);
  const [cocktail, setCocktail]=useState('')

  function sortList(list){
    var sortedList=list.slice(0);
    sortedList.sort((a,b)=>{
      return a.strDrink.localeCompare(b.strDrink)
    })
    return sortedList
  }

  
  function cocktailClicked(cocktail) {
    console.log("cocktail clicked " + cocktail);
    setCocktail(cocktail);
    setWhiskeyHidden(false);
  }

  useEffect(() => {

    Axios.all([
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Blended_whiskey"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=scotch"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Irish_whiskey"
      ),
    ]).then(
      Axios.spread((response1, response2, response3, response4, response5) => {
        setList(
          response5.data.drinks.concat(
            response4.data.drinks.concat(
              response3.data.drinks.concat(
                response1.data.drinks.concat(response2.data.drinks)
              )
            )
          )
        );
        
      })
    );

    
  }, []);

  return (
    <div>
      <h1 className="cocktail-heading">Whiskey Cocktails</h1>
      <Popup cocktail={cocktail} isHidden={isHidden} setHidden={setWhiskeyHidden}/>
      <ul className="cocktail-list">
        {sortList(whiskeyList).map((item, index) => {
          return <a href={() => false} onClick={()=>cocktailClicked(item.strDrink)} className='cocktail-name' key={index}> {item.strDrink}</a>;
        })}
      </ul>
    </div>
  );
}
