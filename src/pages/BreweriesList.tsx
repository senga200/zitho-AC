
import { useEffect, useState } from 'react';
import { Brewery } from '../types/Brewery';
import { fetchBreweries } from '../utils/FetchBreweries';
import { Link } from 'react-router-dom';
import SearchBrewery from '../components/SearchBrewery';
  
export default function BreweriesList() {
  const [breweries, setBreweries] = useState<Brewery[]>([]);

  useEffect(() => {
    fetchBreweries().then(data => setBreweries(data));
  }, []);
console.log("brasseries list", breweries);

  return (
    <div>
      <h1>breweries List</h1>
      <SearchBrewery breweries={breweries} />
     { breweries.length === 0 ? (
       <p>Aucune brasserie trouvée.</p>
     ) : (
       <ul>
         {breweries.map(brewery => (
           <li key={brewery.brewery_id}>
             {brewery.name} 
              <Link to={`/breweryDetails/${brewery.brewery_id}`}>page de la brasserie</Link>
           </li>
         ))}
       </ul>
     )} 
     


    </div>
  );
}
