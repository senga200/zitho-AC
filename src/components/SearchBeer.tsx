
import { useState, useEffect } from "react";
import { Beer } from "../types/Beer";
import { Link } from "react-router-dom";
import './../styles/SearchStyle.css';
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

    //  si beer.beer_name est défini ?
    const filteredResults = beers.filter((beer) =>
      beer.beer_name && beer.beer_name.toLowerCase().includes(search.toLowerCase())
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
                <h3>{beer.beer_name}</h3>
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
