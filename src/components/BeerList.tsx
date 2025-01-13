
import { useEffect, useState } from 'react';
import { Beer } from '../types/Beer';
import { fetchBeers } from '../utils/FetchBeers';

  
export default function BeerList() {
  const [beers, setBeers] = useState<Beer[]>([]);

  useEffect(() => {
    fetchBeers().then(data => setBeers(data));
  }, []);

  return (
    <div>
      <h1>Beer List</h1>
     { beers.length === 0 ? (
       <p>Aucune bière trouvée.</p>
     ) : (
       <ul>
         {beers.map(beer => (
           <li key={beer.beer_id}>
             {beer.name} - {beer.description}
           </li>
         ))}
       </ul>
     )} 
     


    </div>
  );
}

