

import { useState, useEffect } from 'react';
import { Brewery } from '../types/Brewery';
import Collapse from './Collapse';
import { Link } from 'react-router-dom';
import './../styles/TagStyle.css';

interface TagFilterBreweryProps {
  breweries: Brewery[];
  breweryTags: string[];
}

function TagFilterBrewery({ breweries }: TagFilterBreweryProps) {
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]); 
 
  const [filteredBreweries, setFilteredBreweries] = useState<Brewery[]>([]); 

  const countryTags = Array.from(new Set(breweries.map((brewery) => (brewery.country ?? '').toString())));



  useEffect(() => {
    let filtered = breweries; 
    // pas de tag : pas de resultats affichés
    if (selectedCountry.length === 0) {
      setFilteredBreweries([]);
      return;
    }


    // Filtre pays
    if (selectedCountry.length > 0) {
      filtered = filtered.filter((brewery) =>
        selectedCountry.includes(brewery.country.toString())
      );
    }


    setFilteredBreweries(filtered);
  }, [selectedCountry, breweries]); 

  const handleCountryTagClick = (country: string): void => {
    setSelectedCountry((prevCategories) =>
      prevCategories.includes(country)
       ? prevCategories.filter((c) => c!== country)
        : [...prevCategories, country]
    );
  };
  const handleResetClick = () => {
    setSelectedCountry([]);
    
    setFilteredBreweries(breweries);
  };


  return (
    <div>
      <Collapse title="Filter by country">
      <div className="tag-container">
        {countryTags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleCountryTagClick(tag.toString())}
            style={{
              backgroundColor: selectedCountry.includes(tag)
                ? '#ffae00'
                : 'white',
              color: selectedCountry.includes(tag) ? 'white' : 'black',
              cursor: 'pointer',
            }}
          >
            {tag}
          </button>
        ))}
      </div>
      </Collapse>
      <div className="beer-list">
  {selectedCountry.length === 0  ? (
    // Aucun tag sélectionné : si aucune bière filtrée, ne rien afficher ici ?
    <p style={{ display: 'none' }}>Sélectionnez des tags pour afficher des bières.</p>
  
  ) : filteredBreweries.length > 0 ? (
    filteredBreweries.map((brewery) => (
      <div key={brewery.brewery_id} className="beer-item">
        <Link to={`/beerDetails/${brewery.brewery_id}`}>
          <h3>{brewery.name}</h3>
          {/* <p>{beer.description}</p>
          <p>
            <strong>Brasserie :</strong> {beer.brewery_name}
          </p>
          <p>
            <strong>ABV :</strong> {beer.abv}°
          </p> */}
        </Link>
      </div>
    ))
  ) : (
    <p>No match found.</p>
    
  )}
        <div className='reset-button'>
        <button onClick={handleResetClick}>Reset filters</button>
        {/* <button onClick={() => console.log(filteredBeers)}>Console log</button> */}
      </div>

      </div>
  

    </div>
  );
}

export default TagFilterBrewery;
