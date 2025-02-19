import {useEffect, useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Brewery } from '../types/Brewery'
import { FilterContext } from '../store/FilterContext';

import { useParams } from 'react-router-dom'
import { fetchBreweries } from '../utils/FetchBreweries'
import './../styles/DetailsStyle.css';

function BreweryDetails() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const filterCtx = useContext(FilterContext);
  console.log('Filtres utilisés :', filterCtx);

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
    <div className='brewery-details'>
      <div className="header-details">
        <Link to="/breweries">Retour à la liste</Link>
        <button onClick={goBack} className="back-button">
        Retour
        </button>
      </div>
      
      <div className='details-container'>
        <h2>{breweryDetails?.name}</h2>
        <p><strong>Contry : </strong>{breweryDetails?.country}</p>
        <p><strong>Since : </strong>{year}</p>
        <img src={breweryDetails?.logo} alt={breweryDetails?.name} /> 
      </div>
    </div>
  )
}

export default BreweryDetails
