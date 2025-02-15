import {useEffect, useState, useContext} from 'react'
//import { Beer } from '../types/Beer'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchBeers } from '../utils/FetchBeers'
import { Beer } from '../types/Beer';
import { Link } from 'react-router-dom';
import { FilterContext } from '../store/FilterContext';


function BeerDetails() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); // Retourne à la page précédente
      };
    //recuperation du context 
    const filterCtx = useContext(FilterContext);
    console.log("Context filter", filterCtx);



    const { beer_id } = useParams<{ beer_id: string }>()
    console.log('ID de la brasserie récupérée dans lURL: ' + beer_id);

    const [beers, setBeers] = useState<Beer[]>([])
    useEffect(() => {
        fetchBeers().then(data => setBeers(data));
    }, []);
    console.log("Nos bières", beers);
    const beerDetails = beers.find(beer => beer.beer_id === Number(beer_id));
    console.log("Détails de la bière", beerDetails);
    console.log("logo", beerDetails?.logo_url);


    return ( 
    <div className="beer-details">
      <div className="header-details">
        <Link to="/beers">Retour à la liste</Link>
        <button onClick={goBack} className="back-button">
        Retour
        </button>
      </div>
       
      <div className='details-container'>
        <h2>{beerDetails?.beer_name}</h2>
        <h5 className='description'>{beerDetails?.description}</h5>
        <p><strong>Brewery : </strong>  {beerDetails?.brewery_name}</p>
        
        <p><strong>ABV : </strong>{beerDetails?.abv}°</p>
        <p><strong>Category : </strong> {beerDetails?.category_name}</p>
        <img src={beerDetails?.logo_url} alt={typeof beerDetails?.beer_name === 'string' ? beerDetails?.beer_name : ''} /> 

    </div>
           

    </div>
  )
}

export default BeerDetails
