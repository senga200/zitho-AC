
import { useContext, useMemo} from 'react';
import { FilterContext } from "../store/FilterContext";
import { Beer } from '../types/Beer';
import Collapse from './Collapse';
import { Link } from 'react-router-dom';
import './../styles/TagStyle.css';

interface TagFilterBeerProps {
  beers: Beer[];
  //breweryFilter: string;
}

function TagFilterBeer({ beers }: TagFilterBeerProps) {

  //MISE EN PLACE DU CONTEXT
  const filterCtx = useContext(FilterContext);
  if (!filterCtx) {
    throw new Error("FilterContext must be used within a FilterContextProvider");
  }

  const { filters, updateFilters } = filterCtx;

  // LES TAGS - useMemo pour alcoholTags car est statique, ne change pas et du coup n'a pas besoin d'être recalculé à chaque render
  const breweryTags = Array.from(new Set(beers.map((beer) => beer.brewery_name ?? '')));
  const categoryTags = Array.from(new Set(beers.map((beer) => beer.category_name ?? '')));
  const alcoholTags = useMemo(
    () => [
      { label: "Sans alcool", value: "non_alcoholic", range: [0, 0] },
      { label: "Légère (0-4°)", value: "light", range: [0, 4] },
      { label: "Moyenne (4-7°)", value: "medium", range: [4, 7] },
      { label: "Forte (+ de 7°)", value: "strong", range: [7, Infinity] },
    ],
    []
  );

  // // Filtrer les bières en fonction des filtres du contexte. Utilisation de useMemo pour éviter de recalculer à chaque render FilteredBeers. le tableau est recaclulé uniquement si les dépendances changent -beers-filter-alcoholTags
  const filteredBeers = useMemo(() => {
    // Vérifie si aucun filtre n'est sélectionné
    const noFiltersActive =
      !filters.brewery_name &&
      !filters.category_name &&
      !filters.abv;
  
    if (noFiltersActive) {
      // Retourne un tableau vide si aucun filtre n'est actif
      return [];
    }
  
    let filtered = beers;
  
    // Filtrage par brasserie
    if (filters.brewery_name) {
      const selectedBreweries = filters.brewery_name.split(",");
      filtered = filtered.filter((beer) =>
        selectedBreweries.includes(beer.brewery_name ?? '')
      );
    }
    // Filtrage par catégori
    if (filters.category_name) {
      const selectedCategories = filters.category_name.split(",");
      filtered = filtered.filter((beer) =>
        selectedCategories.includes(beer.category_name ?? '')
      );
    }
  
    // Filtrage par alcool
    if (filters.abv) {
      const selectedAlcohol = filters.abv.split(",");
      filtered = filtered.filter((beer) =>
        selectedAlcohol.some((tag) => {
          const alcoholTag = alcoholTags.find((at) => at.value === tag);
          if (alcoholTag) {
            const [min, max] = alcoholTag.range;
            return beer.abv >= min && beer.abv <= max;
          }
          return false;
        })
      );
    }
  
    return filtered;
  }, [beers, filters, alcoholTags]);
  

  const handleBreweryTagClick = (brewery: string): void => {
    const selectedBreweries = filters.brewery_name
     ? filters.brewery_name.split(",")
      : [];
    const updatedBreweries = selectedBreweries.includes(brewery)
      ? selectedBreweries.filter((b) => b !== brewery)
      : [...selectedBreweries, brewery];
    updateFilters("brewery_name", updatedBreweries.join(","));
  };

  const handleAlcoholTagClick = (alcoholTag: string): void => {
    const selectedAlcohol = filters.abv 
    ? filters.abv.split(",") 
    : [];
    const updatedAlcohol = selectedAlcohol.includes(alcoholTag)
      ? selectedAlcohol.filter((tag) => tag !== alcoholTag)
      : [...selectedAlcohol, alcoholTag];
    updateFilters("abv", updatedAlcohol.join(","));
  };

  const handleCategoryTagClick = (category: string): void => {
    const selectedCategories = filters.category_name
      ? filters.category_name.split(",")
      : [];
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    updateFilters("category_name", updatedCategories.join(","));
  };

  const handleResetClick = () => {
    updateFilters("brewery_name", "");
    updateFilters("abv", "");
    updateFilters("category_name", "");
  };

  return (
    <div>
      <Collapse title="Filter by brewery">
        <div className="tag-container">
          {breweryTags.map((brewery, index) => (
            <button
              key={index}
              onClick={() => handleBreweryTagClick(brewery)}
              style={{
                backgroundColor: filters.brewery_name?.includes(brewery)
                  ? '#ffae00'
                  : 'white',
                color: filters.brewery_name?.includes(brewery) ? 'white' : 'black',
              }}
            >
              {brewery}
            </button>
          ))}
        </div>
      </Collapse>

      <Collapse title="Filter by ABV">
        <div className="tag-container">
          {alcoholTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleAlcoholTagClick(tag.value)}
              style={{
                backgroundColor: filters.abv?.includes(tag.value)
                  ? '#ffae00'
                  : 'white',
                color: filters.abv?.includes(tag.value) ? 'white' : 'black',
              }}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </Collapse>

      <Collapse title="Filter by category">
        <div className="tag-container">
          {categoryTags.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryTagClick(category)}
              style={{
                backgroundColor: filters.category_name?.includes(category)
                  ? '#ffae00'
                  : 'white',
                color: filters.category_name?.includes(category)
                  ? 'white'
                  : 'black',
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </Collapse>

      <div className="beer-list">
        {filteredBeers.length === 0 ? (
          <p></p>
        ) : (
          filteredBeers.map((beer) => (
            <div key={beer.beer_id} className="beer-item">
              <Link to={`/beerDetails/${beer.beer_id}`}>
                <h3>{beer.beer_name}</h3>
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

export default TagFilterBeer;
