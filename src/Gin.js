import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import './Cocktails.css'
import Popup from './Popup.js'

export default function Gin() {
    const [ginList, setList]=useState([])
    const [isHidden, setGinHidden] = useState(true);
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
        setGinHidden(false);
      }

   useEffect(() => {
        Axios.all([Axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin"),
        Axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Sloe_gin'),]
        ).then(Axios.spread((response1,response2) => {
        setList(response1.data.drinks.concat(response2.data.drinks));      
        }));
    }, []);

    
    return (
        <div>
            <h1 className='cocktail-heading'>Gin Cocktails</h1>
            <Popup cocktail={cocktail} isHidden={isHidden} setHidden={setGinHidden}/>
            <ul className ='cocktail-list'>
            {sortList(ginList).map((item,index)=>{
                return(
                     <a href={() => false} onClick={()=>cocktailClicked(item.strDrink)} className='cocktail-name' key={index}> {item.strDrink}</a>
                )
            })}
            </ul>
        </div>
    )
}