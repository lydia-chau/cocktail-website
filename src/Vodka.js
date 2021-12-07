import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Cocktails.css";
import Popup from './Popup.js'

export default function Vodka() {
  const [vodkaList, setList] = useState([]);
  const [isHidden, setHidden] = useState(true);
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
    setHidden(false);
    
  }

  useEffect(() => {
    Axios.all([
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Peach_vodka"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Lemon_vodka"
      ),
    ]).then(
      Axios.spread((response1, response2, response3) => {
        setList(
          response3.data.drinks.concat(
            response1.data.drinks.concat(response2.data.drinks)
          )
        );
        
      })
    );
  }, []);

  return (
    <div>
      <h1 className="cocktail-heading">Vodka Cocktails</h1>
      {!isHidden && <Popup cocktail={cocktail} setHidden={setHidden}/>}
      {/* {!isHidden && <RandomCocktail cocktail={cocktail} />} */}

      <ul className="cocktail-list">
        {sortList(vodkaList).map((item, index) => {
          return <a href={() => false} onClick={()=>cocktailClicked(item.strDrink)} className='cocktail-name' key={index}> {item.strDrink}</a>;

        })}
      </ul>
      
    </div>
  );
}
