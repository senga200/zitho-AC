//import {useEffect, useState} from 'react'
//import { Beer } from '../types/Beer'
import { useParams } from 'react-router-dom'
//import { fetchBeers } from '../utils/FetchBeers'

function BeerDetails() {
    const { beer_id } = useParams<{ beer_id: string }>()
    console.log('ID de la brasserie récupérée dans l\'URL: ' + beer_id);

 

    return (
    <div>
        <h1>Détails de la bière {beer_id}</h1>

    </div>
  )
}

export default BeerDetails
