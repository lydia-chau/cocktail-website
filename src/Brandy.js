import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Cocktails.css";
import Popup from './Popup.js'

export default function Brandy() {
  const [brandyList, setList] = useState([]);
  const [isHidden, setBrandyHidden] = useState(true);
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
    setBrandyHidden(false);
  }

  useEffect(() => {
    Axios.all([
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Brandy"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Apricot_brandy"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Cognac"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Apple_brandy"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Cherry_brandy"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Coffee_brandy"
      ),
      Axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Blackberry_brandy"
      ),
    ]).then(
      Axios.spread(
        (response1,response2,response3,response4,response5,response6,response7) => {
          setList(
            response7.data.drinks.concat(
              response6.data.drinks.concat(
                response5.data.drinks.concat(
                  response4.data.drinks.concat(
                    response3.data.drinks.concat(
                      response1.data.drinks.concat(response2.data.drinks)
                    )
                  )
                )
              )
            )
          );
          
        }
      )
    );
  }, []);

  return (
    <div>
      <h1 className="cocktail-heading">Brandy Cocktails</h1>
      <Popup cocktail={cocktail} isHidden={isHidden} setHidden={setBrandyHidden}/>
      <ul className="cocktail-list">
        {sortList(brandyList).map((item, index) => {
          return <a href={() => false} onClick={()=>cocktailClicked(item.strDrink)}className='cocktail-name' key={index}> {item.strDrink}</a>;
        })}
      </ul>
    </div>
  );
}
