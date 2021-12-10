import React,{useEffect,useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './Popup.css'
import Axios from 'axios';
import RandomCocktail from './CocktailDetails';

export default function Popup(props) {
    const [cocktailDetails, setDetails]=useState([])

    useEffect(()=>{
        Axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+props.cocktail.replace(/ /g,"_")).then((response)=>{
            // console.log(response.data.drinks[0])
            setDetails(response.data.drinks[0]);
        })
    },[props.cocktail])

    return (
        <div className='popup-box'>
          
            <CloseIcon className='close-icon-popup' onClick={()=>props.setHidden(true)}/>
            
            <div className='popup-header'>{props.cocktail}</div>
            <RandomCocktail cocktail={cocktailDetails} homepage={false} popup={true}/>
        </div>
    )
}
