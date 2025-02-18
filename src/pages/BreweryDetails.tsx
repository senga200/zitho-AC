import {useEffect, useState} from 'react'
import { Brewery } from '../types/Brewery'

import { useParams } from 'react-router-dom'
import { fetchBreweries } from '../utils/FetchBreweries'
import './../styles/DetailsStyle.css';

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

   const dateStr = breweryDetails?.created_at;
   const year = dateStr ? new Date(dateStr).getFullYear() : '';



    return (
    <div className='details-container'>

      <h2>{breweryDetails?.name}</h2>
      <p><strong>Contry : </strong>{breweryDetails?.country}</p>
      <p><strong>Since : </strong>{year}</p>
      <img src={breweryDetails?.logo} alt={breweryDetails?.name} /> 

        
    </div>
  )
}

export default BreweryDetails
