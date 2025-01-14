//import {useEffect, useState} from 'react'
//import { Brewery } from '../types/Brewery'
import { useParams } from 'react-router-dom'
//import { fetchBreweries } from '../utils/FetchBreweries'

function BreweryDetails() {

    const { brewery_id } = useParams<{ brewery_id: string }>();
    console.log('ID de la brasserie récupérée dans l\'URL: ' + brewery_id);
    



    return (
    <div>
      <h1>brewery details</h1>
        
        
    </div>
  )
}

export default BreweryDetails
