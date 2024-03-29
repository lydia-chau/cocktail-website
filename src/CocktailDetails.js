import React from 'react'
import './css/CocktailDetails.css'
import CloseIcon from '@mui/icons-material/Close';


export default function RandomCocktail(props) {
    const cocktail=props.cocktail;
    const error = props.error;
    const ingredientsObject={};

    //returns all keys that have strMeasure e.g strMeasure1 
    const portionsKey=Object.keys(cocktail).filter((string)=>{
        return string.includes('strMeasure') && cocktail[string]!=null
    })

    const portionsArray = portionsKey.map((item, i, arr)=>{
        //cocktail[strMeasure1]= 1/2 tsp something like that
            return cocktail[item];
        }
    )
    //push all measurements e.g. 1tsp, 2tbp.... onto protionsArray that is []

    const ingredientsKey=Object.keys(cocktail).filter((string)=>{
        return string.includes('strIngredient') && cocktail[string]!=null
    })

    //returns ingredients e.g. Vodka, Gin, Triplesec
    const ingredientsList = ingredientsKey.map((item, i, arr) => {
      return cocktail[item];
    });

    //creates object, {vodka: 1tsp} and so on
    ingredientsList.forEach((key,i)=>{
        if (portionsArray[i]===undefined){
            ingredientsObject[key]='';

        }else{
            ingredientsObject[key]=portionsArray[i]
        }
    })
  

    return (
      <>
        {props.homepage && (
          <CloseIcon
            className="close-icon"
            onClick={() => props.setRandomHidden(true)}
          />
        )}

        {props.homepage && <h1 className='cocktail-detail-name'>{cocktail.strDrink}</h1>}
        {!error ? <div data-testid = "drink-details" className={props.popup ? "drink-details-popup" : "drink-details"}>
            {!props.homepage && <img 
            alt='cocktail' 
            className ='popup-image'
            src={cocktail.strDrinkThumb}></img>}
            <br />
          <ul data-testid = "drink-ingredients" className='drink-ingredients'>
            {Object.keys(ingredientsObject).map((key, index) => {
              return <li className='drink-ingredients' key={index}>{ingredientsObject[key] + " " + key}</li>;
            })}

          </ul>
          <br />
          <div data-testid = "instructions" className="instructions">{cocktail.strInstructions}</div>
        </div> : <div className='popup-header'>Oops! Something went wrong</div>}
      </>
    );
}
