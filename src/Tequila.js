import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Cocktails.css";
import Popup from './Popup.js'

export default function Tequila() {
    const [tequilaList, setList]=useState([])
    const [isHidden, setTequilaHidden] = useState(true);
    const [cocktail, setCocktail]=useState('')

    function sortList(list){
        var sortedList=list.slice(0);
        sortedList.sort((a,b)=>{
          return a.strDrink.localeCompare(b.strDrink)
        })
        return sortedList
    }

    function cocktailClicked(cocktail) {
        // console.log("cocktail clicked " + cocktail);
        setCocktail(cocktail);
        setTequilaHidden(false);
    }

    useEffect(() => {
         Axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila').then(
         (response) => {
             setList(response.data.drinks);
         }
         );
     }, []);
 
     
     return (
         <div>
             <h1 className='cocktail-heading'>Tequila Cocktails</h1>
              <Popup cocktail={cocktail} isHidden={isHidden} setHidden={setTequilaHidden}/>

             <ul className ='cocktail-list'>
             {sortList(tequilaList).map((item,index)=>{
                 return(
                      <a href={() => false} onClick={()=>cocktailClicked(item.strDrink)} className='cocktail-name' key={index}> {item.strDrink}</a>
                 )
             })}
             </ul>
         </div>
     )
}