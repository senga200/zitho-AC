import {useEffect, useState} from 'react'
import { Brewery } from '../types/Brewery'

import { useParams } from 'react-router-dom'
import { fetchBreweries } from '../utils/FetchBreweries'

function BreweryDetails() {

    const { brewery_id } = useParams<{ brewery_id: string }>();
    console.log('ID de la brasserie récupérée dans l\'URL: ' + brewery_id);

    const [breweries, setBreweries] = useState<Brewery[]>([]);
    
    useEffect(() => {
        fetchBreweries().then(data => setBreweries(data));
    }, []);
    console.log("Nos brasseries", breweries);
    const breweryDetails = breweries.find(brewery => brewery.brewery_id === Number(brewery_id));
    console.log("Détails de la bière", breweryDetails);



    return (
    <div>
      <h2>brewery details {brewery_id}</h2>

      <h3>{breweryDetails?.name}</h3>
      <p>{breweryDetails?.country}</p>
      <p>{breweryDetails?.created_at}</p>
   

      
        
        
    </div>
  )
}

export default BreweryDetails
