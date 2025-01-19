
import { useEffect, useState} from 'react';
import { Beer } from '../types/Beer';
import { fetchBeers } from '../utils/FetchBeers';
import { Link } from 'react-router-dom';
import SearchBeer from '../components/SearchBeer';
import TagFilterBeer from '../components/TagFilterBeer';
import Collapse from '../components/Collapse';
import './../styles/ListStyle.css';
  
function BeersList() {

 

  const [beers, setBeers] = useState<Beer[]>([]);

  useEffect(() => {
    fetchBeers().then(data => setBeers(data));
  }, []);

  return (
    <div className='list-container'>
      <h2 className='h2-list'>Our Beers</h2>
      <SearchBeer beers={beers} />
      <TagFilterBeer beers={beers} beerTags={[]} />
     { beers.length === 0 ? (
       <p>No beer found.</p>
     ) : (
       <Collapse title="All beers">         
       <ul>
         {beers.map(beer => (
          <li className="list-item" key={beer.beer_id}>
          <Link to={`/beerDetails/${beer.beer_id}`}>
          
            <h3>{beer.beer_name} </h3> 
          </Link>
        </li>
        
         ))}
       </ul>
       </Collapse>
     )} 
    
    </div>
  );
}

export default BeersList;
