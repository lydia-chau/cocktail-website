import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Cocktails.css";
import Popup from './Popup.js'

export default function Rum() {
  const [rumList, setList] = useState([]);
  const [isHidden, setRumHidden] = useState(true);
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
    setRumHidden(false);
}

  useEffect(() => {
    Axios.all([Axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum"),
    Axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light_rum'),
    Axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Dark_rum'),
    Axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Spiced_rum'),]
    ).then(Axios.spread((response1,response2,response3,response4) => {
      setList(response4.data.drinks.concat(response3.data.drinks.concat(response1.data.drinks.concat(response2.data.drinks))));
      
    }));

  }, []);

  return (
    <div>
      <h1 className="cocktail-heading">Rum Cocktails</h1>
      {!isHidden && <Popup cocktail={cocktail} setHidden={setRumHidden}/>}
      <ul className="cocktail-list">
        {sortList(rumList).map((item, index) => {
          return <a href={() => false} onClick={()=>cocktailClicked(item.strDrink)} className='cocktail-name' key={index}> {item.strDrink}</a>;
        })}
      </ul>
    </div>
  );
}
