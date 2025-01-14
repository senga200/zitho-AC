import { useState, useEffect } from "react";
import { Beer } from "../types/Beer";
import { Link } from "react-router-dom";

// Props initialiser la liste
interface SearchBeerProps {
  beers: Beer[];
}

function SearchBeer({ beers }: SearchBeerProps) {
  // Stock search
  const [search, setSearch] = useState<string>("");
  // Stock results
  const [searchResults, setSearchResults] = useState<Beer[]>([]);

  useEffect(() => {
    if (search.length < 3) {
      setSearchResults([]);
      return;
    }

    const filteredResults = beers.filter((beer) =>
      beer.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [search, beers]);

  // searchMAJ
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Rechercher une bière..."
        className="searchInput"
      />
      <div className="searchResults">
        {searchResults.length > 0 ? (
          searchResults.map((beer) => (
            <div key={beer.beer_id} className="searchResultItem">
              <Link to={`/beerDetails/${beer.beer_id}`}>
                <h3>{beer.name}</h3>
                <p>{beer.description}</p>
              </Link>
            </div>
          ))
        ) : search !== "" && search.length >= 3 ? (
          <p>Aucun résultat trouvé.</p>
        ) : null}
      </div>
    </div>
  );
}

export default SearchBeer;
