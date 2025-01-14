import { useState, useEffect } from "react";
import { Brewery } from "../types/Brewery";
import { Link } from "react-router-dom";

// Props initialiser la liste
interface SearchBreweryProps {
  breweries: Brewery[];
}

function SearchBrewery({ breweries }: SearchBreweryProps) {
  // Stock search
  const [search, setSearch] = useState<string>("");
  // Stock results
  const [searchResults, setSearchResults] = useState<Brewery[]>([]);

  useEffect(() => {
    if (search.length < 3) {
      setSearchResults([]);
      return;
    }

    const filteredResults = breweries.filter((brewery) =>
      brewery.name.toLowerCase().includes(search.toLowerCase()) ||
        brewery.country.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [search, breweries]);

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
        placeholder="Rechercher une brasserie..."
        className="searchInput"
      />
      <div className="searchResults">
        {searchResults.length > 0 ? (
          searchResults.map((brewery) => (
            <div key={brewery.brewery_id} className="searchResultItem">
              <Link to={`/breweryDetails/${brewery.brewery_id}`}>
                <h3>{brewery.name}</h3>
                <p>{brewery.country}</p>
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

export default SearchBrewery;
