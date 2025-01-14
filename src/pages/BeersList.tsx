
import { useEffect, useState } from 'react';
import { Beer } from '../types/Beer';
import { fetchBeers } from '../utils/FetchBeers';
import { Link } from 'react-router-dom';
import SearchBeer from '../components/SearchBeer';
import TagFilterBeer from '../components/TagFilterBeer';
  
export default function BeersList() {
  const [beers, setBeers] = useState<Beer[]>([]);

  useEffect(() => {
    fetchBeers().then(data => setBeers(data));
  }, []);

  return (
    <div>
      <h1>Beer List</h1>
      <SearchBeer beers={beers} />
      <TagFilterBeer beers={beers} beerTags={[]} />
     { beers.length === 0 ? (
       <p>Aucune bière trouvée.</p>
     ) : (
       <ul>
         {beers.map(beer => (
           <li key={beer.beer_id}>
             {beer.name} - {beer.description}
              <Link to={`/beerDetails/${beer.beer_id}`}>page de la biere</Link>
           </li>
         ))}
       </ul>
     )} 
     


    </div>
  );
}

