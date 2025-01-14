
import { useEffect, useState } from 'react';
import { Beer } from '../types/Beer';
import { fetchBeers } from '../utils/FetchBeers';
import { Link } from 'react-router-dom';
import SearchBeer from '../components/SearchBeer';
import TagFilterBeer from '../components/TagFilterBeer';
import './../styles/BeersListStyle.css';
  
export default function BeersList() {
  const [beers, setBeers] = useState<Beer[]>([]);

  useEffect(() => {
    fetchBeers().then(data => setBeers(data));
  }, []);

  return (
    <div>
      <h2 className='h2-list'>Liste des bières</h2>
      <SearchBeer beers={beers} />
      <TagFilterBeer beers={beers} beerTags={[]} />
     { beers.length === 0 ? (
       <p>Aucune bière trouvée.</p>
     ) : (
       <ul>
         {beers.map(beer => (
          <li className="list-item" key={beer.beer_id}>
          <Link to={`/beerDetails/${beer.beer_id}`}>
            <h3>{beer.beer_name} </h3> <p>{beer.description}</p> _ 
          </Link>
        </li>
        
         ))}
       </ul>
     )} 
     


    </div>
  );
}

