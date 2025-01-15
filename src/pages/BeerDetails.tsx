import {useEffect, useState} from 'react'
//import { Beer } from '../types/Beer'
import { useParams } from 'react-router-dom'
import { fetchBeers } from '../utils/FetchBeers'
import { Beer } from '../types/Beer';

function BeerDetails() {
    const { beer_id } = useParams<{ beer_id: string }>()
    console.log('ID de la brasserie récupérée dans l\'URL: ' + beer_id);

    const [beers, setBeers] = useState<Beer[]>([])
    useEffect(() => {
        fetchBeers().then(data => setBeers(data));
    }, []);
    console.log("Nos bières", beers);
    const beerDetails = beers.find(beer => beer.beer_id === Number(beer_id));
    console.log("Détails de la bière", beerDetails);


    return (
    <div className='details-container'>
        <h2>{beerDetails?.beer_name}</h2>
        <h5 className='description'>{beerDetails?.description}</h5>
        <p><strong>Brewery : </strong>  {beerDetails?.brewery_name}</p>
        
        <p><strong>ABV : </strong>{beerDetails?.abv}°</p>
        <p><strong>Category : </strong> {beerDetails?.category_name}</p>
        <img src={beerDetails?.logo_url} alt={beerDetails?.beer_name} /> 

    </div>
  )
}

export default BeerDetails
