import React,{useEffect,useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './css/Popup.css'
import { chosenCocktailApi } from './apiCalls';
import RandomCocktail from './CocktailDetails';

export default function Popup(props) {
    const [cocktailDetails, setDetails]=useState([])
    const [close, setClose] =useState(false)
    const [error, setError] = useState(false)

    function closeIconClicked(){
        setClose(!close)
        props.setHidden(true)
    }

    useEffect(()=>{
        setError(false)
        const getChosenCockatail = async () =>{
            try{
                const chosenCocktail = await chosenCocktailApi(props.cocktail);
                setDetails(chosenCocktail.data.drinks[0])
            } catch (error){
                console.log(error)
                setError(true)
            }
        }
        getChosenCockatail();
    },[props.cocktail])

    return (
        <>
        

        <div className={props.isHidden && close ? 'popup-box slideout ' : props.isHidden? 'popup-box hidden' : 'popup-box slidein'}>
            <CloseIcon className='close-icon-popup' onClick={()=>closeIconClicked()}/>
            
            <div className='popup-header'>{props.cocktail}
            </div>
            
            <RandomCocktail cocktail={cocktailDetails} homepage={false} popup={true} error={error}/>
        </div>
        </>
    )
}
