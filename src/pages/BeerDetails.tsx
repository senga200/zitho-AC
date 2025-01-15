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
    <div>
        <h2>Détails de la bière {beer_id}</h2>
        <h3>{beerDetails?.beer_name}</h3>
        <p>{beerDetails?.description}</p>
        <p>La brasserie qui fabrique cet elixir : {beerDetails?.brewery_name}</p>
        <p>Degrés d'alcool : {beerDetails?.abv}°</p>
        <p>Catégorie : {beerDetails?.category_name}</p>

    </div>
  )
}

export default BeerDetails
