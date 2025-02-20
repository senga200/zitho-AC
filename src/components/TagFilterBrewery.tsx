
import { useContext, useMemo} from 'react';
import { FilterContext } from "../store/FilterContext";
import { Brewery } from '../types/Brewery';
import Collapse from './Collapse';
import { Link } from 'react-router-dom';
import './../styles/TagStyle.css';

interface TagFilterBreweryProps {
  breweries: Brewery[];
  //breweryFilter: string;
}

function TagFilterBrewery({ breweries }: TagFilterBreweryProps) {

  //MISE EN PLACE DU CONTEXT
  const filterCtx = useContext(FilterContext);
  if (!filterCtx) {
    throw new Error("FilterContext must be used within a FilterContextProvider");
  }

  const { filters, updateFilters } = filterCtx;

  // LES TAGS - useMemo pour alcoholTags car est statique, ne change pas et du coup n'a pas besoin d'être recalculé à chaque render
  const countryTags = Array.from(new Set(breweries.map((brewery) => brewery.country ?? '')));
  

  // // Filtrer les bières en fonction des filtres du contexte. Utilisation de useMemo pour éviter de recalculer à chaque render FilteredBeers. le tableau est recaclulé uniquement si les dépendances changent -beers-filter-alcoholTags
  const filteredBreweries = useMemo(() => {
    // Vérifie si aucun filtre n'est sélectionné
    const noFiltersActive =
      !filters.country;
  
    if (noFiltersActive) {
      // Retourne un tableau vide si aucun filtre n'est actif
      return [];
    }
  
    let filtered = breweries;
  
    // Filtrage par pays
    if (filters.country) {
      const selectedCountries = filters.country.split(",");
      filtered = filtered.filter((brewery: Brewery) =>
        selectedCountries.includes(brewery.country ?? '')
      );
    }
    return filtered;
  }, [breweries, filters]);
  

  const handleCountryTagClick = (country: string): void => {
    const selectedCountries = filters.country
     ? filters.country.split(",")
      : [];
    const updatedCountries = selectedCountries.includes(country)
      ? selectedCountries.filter((b) => b !== country)
      : [...selectedCountries, country];
    updateFilters("country", updatedCountries.join(","));
  };


  const handleResetClick = () => {
    updateFilters("country", "");
  };

  return (
    <div>
      <Collapse title="Filter by country">
        <div className="tag-container">
          {countryTags.map((country, index) => (
            <button
              key={index}
              onClick={() => handleCountryTagClick(country)}
              style={{
                backgroundColor: filters.brewery_name?.includes(country)
                  ? '#ffae00'
                  : 'white',
                color: filters.brewery_name?.includes(country) ? 'white' : 'black',
              }}
            >
              {country}
            </button>
          ))}
        </div>
      </Collapse>


      <div className="beer-list">
        {filteredBreweries.length === 0 ? (
          <p></p>
        ) : (
          filteredBreweries.map((brewery) => (
            <div key={brewery.brewery_id} className="beer-item">
              <Link to={`/breweryDetails/${brewery.brewery_id}`}>
                <h3>{brewery.name}</h3>
              </Link>
            </div>
          ))
        )}  
        <div className="reset-button">
          <button onClick={handleResetClick}>Reset filters</button>
        </div>
      </div>
    </div>
  );
}

export default TagFilterBrewery;

