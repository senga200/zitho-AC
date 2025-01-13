
import { useEffect, useState } from 'react';
import { Brewery } from '../types/Brewery';
import { fetchBreweries } from '../utils/FetchBreweries';

  
export default function BreweriesList() {
  const [breweries, setBreweries] = useState<Brewery[]>([]);

  useEffect(() => {
    fetchBreweries().then(data => setBreweries(data));
  }, []);
console.log("brasseries list", breweries);

  return (
    <div>
      <h1>breweries List</h1>
     { breweries.length === 0 ? (
       <p>Aucune brasserie trouvée.</p>
     ) : (
       <ul>
         {breweries.map(brewery => (
           <li key={brewery.brewery_id}>
             {brewery.name} 
           </li>
         ))}
       </ul>
     )} 
     


    </div>
  );
}
