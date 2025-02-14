import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import Collapse from "../components/Collapse";
import { fetchBreweries, fetchBreweryById, addBrewery, updateBrewery, deleteBrewery } from "../utils/FetchBreweries";
import { fetchBeers, fetchBeersById, deleteBeer, addBeer } from "../utils/FetchBeers";
import { Brewery } from "../types/Brewery";
import { Beer } from "../types/Beer";




function Admin() {
///////////HOOKS BRASSERIE /////////////////////////////
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [breweryIdToUpdate, setBreweryIdToUpdate] = useState<number | "">("");
  const [breweryToEdit, setBreweryToEdit] = useState<Brewery | null>(null);
  const [updatedBreweryData, setUpdatedBreweryData] = useState<Brewery | null>(null);
  const [breweryIdToSearch, setBreweryIdToSearch] = useState<number | "">("");
  const [displayBrewery, setDisplayBrewery] = useState<{ id?: number; name?: string; country?: string } | null>(null);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    fetchAllBreweries ();
  }, []);
///////////HOOKS BIERES /////////////////////////////
  const [beers, setBeers] = useState<Beer[]>([]);
  //const [beerIdToUpdate, setBeerIdToUpdate] = useState<number | "">("");
  //const [beerToEdit, setBeerToEdit] = useState<Beer | null>(null);
  //const [updatedBeerData, setUpdatedBeerData] = useState<Beer | null>(null);
  const [beerIdToSearch, setBeerIdToSearch] = useState<number | "">("");
  const [displayBeer, setDisplayBeer] = useState<{ beer?: Beer } | null>(null);
  const [messageBeer, setMessageBeer] = useState<string>("");
  useEffect(() => {
    fetchAllBeers();
  }, []);

  ///////gestion connexion ///////
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);

if (!authContext) {
  console.error("Erreur : AuthContext pas là");
  return <div>Déso, auth error</div>; 
}

const { isAuthenticated, login, logout } = authContext;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!login(email, password)) {
      setError("Déso, wrong password or email !");
    }else {
      setError("");
      //setIsAuthenticated(false);
    }
  };

///////////gestion des brasseries//////
  const fetchAllBreweries  = async () => {
    const data = await fetchBreweries();
    setBreweries(data);
  };

  const handleSearchBreweryById = async () => {
    if (!breweryIdToSearch) return;
    const response = await fetchBreweryById(Number(breweryIdToSearch));
    if (response?.brewery) {
      setDisplayBrewery(response.brewery);
      setMessage("");
    } else {
      setDisplayBrewery(null);
      setMessage("Aucune brasserie trouvée avec cet ID.");
    }
  };

  const handleAddBrewery = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newBrewery = {
      brewery: null, 
      brewery_id: 0, 
      name: formData.get("name") as string,
      country: formData.get("country") as string,
      created_at: formData.get("created_at") as string,
      logo: formData.get("logo") as string,
    };
    await addBrewery(newBrewery);
  
    setMessage("Brasserie ajoutée avec succès.");
    fetchAllBreweries (); // rfesh la liste après ajout
  };

  const handleDeleteBrewery = async (id: number) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer la brasserie ID ${id} ?`);
    
    if (confirmDelete) {
      await deleteBrewery(id);
      setMessage("Brasserie supprimée !");
      setDisplayBrewery(null);
      fetchAllBreweries();
    } else {
      setMessage("Suppression annulée.");
    }
  };

  const handleSearchBreweryToUpdate = async () => {
    if (!breweryIdToUpdate) return;
  
    const response = await fetchBreweryById(Number(breweryIdToUpdate));
    
    if (response?.brewery) {
      setBreweryToEdit(response.brewery);
      setUpdatedBreweryData(response.brewery); // Pré-remplit le formulaire
      setMessage("");
    } else {
      setBreweryToEdit(null);
      setMessage("Aucune brasserie trouvée avec cet ID.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updatedBreweryData) return;
    
    setUpdatedBreweryData({
      ...updatedBreweryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateBrewery = async () => {
    if (!breweryToEdit || !updatedBreweryData) return;
  
    await updateBrewery(breweryToEdit.brewery_id, updatedBreweryData);
    setMessage("Brasserie mise à jour avec succès !");
    setBreweryToEdit(null);
    fetchAllBreweries();
  };
  
  
/////////////gestion des bières //////

  const fetchAllBeers = async () => {
    const data = await fetchBeers();
    setBeers(data);
  };


  const handleSearchBeerById = async () => {
    if (!beerIdToSearch) return;
    const response = await fetchBeersById(Number(beerIdToSearch));
    if (response) {
      setDisplayBeer({ beer: response });
      console.log("bière en question", response);
      setMessageBeer("");
    } else {
      setDisplayBeer(null);
      setMessageBeer("no beer found with this id.");
    }
  };

  const handleAddBeer = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newBeer = {
      beer_id: 0, 
      beer_name: formData.get("beer_name") as string,
      description: formData.get("description") as string,
      // logo_url: formData.get("logo") as string,
      abv: Number(formData.get("abv")),
      brewery_id: Number(formData.get("brewery_id")),
      category_id: Number(formData.get("category_id")),
    };
    console.log("1. Données envoyées à l'API:", JSON.stringify(newBeer));

    await addBeer(newBeer);
    console.log("2. Données envoyées à l'API:", JSON.stringify(newBeer));

  
    setMessage("Berr added successfully.");
    fetchAllBeers (); // rfesh la liste après ajout
  };

  const handleDeleteBeer = async (id:number) => {
    const confirmDelete = window.confirm(`Are you sure to delete this beer ${id} ?`);
    
    if (confirmDelete) {
      await deleteBeer(id);
      setMessageBeer("Beer deleted !");
      setDisplayBeer(null);
      fetchAllBeers();
    } else {
      setMessageBeer("delete canceled.");
    }
  };

  console.log("displayBeer state:", displayBeer);


  if (!isAuthenticated) {
    return (
      <div>
        <h2>You are admin, please log in</h2>
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  } else {
  return (
    <div>
      <h2>Admin area</h2>
      <button onClick={logout}>Log out</button>
      <div>
      <h3>Breweries Managment</h3>
      <Collapse title="SEE ALL BREWERIES">
      <button onClick={fetchAllBreweries }>go breweries</button>
      <ul>
      {breweries.map((brewery) => (
      <li key={brewery.brewery_id}>{brewery.name} - {brewery.brewery_id}</li>
      ))}
    </ul>
      </Collapse>
      <Collapse title="DELETE A BREWERY">
      <input
      type="number"
      placeholder="brewery ID"
      value={breweryIdToSearch}
      onChange={(e) => setBreweryIdToSearch(Number(e.target.value))}
      />
      <button onClick={handleSearchBreweryById}>
      Find
      </button>
      {displayBrewery && <p>Brewery find : {displayBrewery.name}</p>}
      <button onClick={() => handleDeleteBrewery(Number(breweryIdToSearch))}>
      🗑️ delete !
      </button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      </Collapse>
      <Collapse title="ADD A BREWERY">
      <form onSubmit={handleAddBrewery}>
        <input type="text" name="name" placeholder="Brewery name" />
        <input type="text" name="country" placeholder="Brewery country" />
        <input type="text" name="created_at" placeholder="Created at" />
        <input type="text" name="logo" placeholder="Logo" />
        <button type="submit">Add</button>
      </form>
      </Collapse>
      <Collapse title="UPDATE A BREWERY">
      <input 
      type="number" 
      name="id" 
      placeholder="brewery ID" 
      value={breweryIdToUpdate}
      onChange={(e) => setBreweryIdToUpdate(Number(e.target.value))}
      />
      <button onClick={handleSearchBreweryToUpdate}>Find</button>

  {breweryToEdit && updatedBreweryData && (
    <div>
      <h3>Update : {breweryToEdit.name}</h3>
      <input 
        type="text" 
        name="name" 
        value={updatedBreweryData.name || ""} 
        onChange={handleInputChange} 
        placeholder="Brewery Name" 
      />
      <input 
        type="text" 
        name="country" 
        value={updatedBreweryData.country || ""}  
        onChange={handleInputChange} 
        placeholder="Country"
      />
      <input 
        type="text" 
        name="created_at" 
        value={updatedBreweryData.created_at || ""} 
        onChange={handleInputChange} 
        placeholder="Created at"
      />
      <input 
        type="text" 
        name="logo" 
        value={updatedBreweryData.logo || ""} 
        onChange={handleInputChange} 
        placeholder="Logo"
      />
      <button onClick={handleUpdateBrewery}>Update</button>
    </div>
  )}

  {message && <p style={{ color: "green" }}>{message}</p>}
      </Collapse>
      </div>
      <div>
      <h3>Beer managment</h3>
      <Collapse title="SEE ALL BEERS">
      <button onClick={fetchAllBeers}>go beers</button>
      <ul>
      {beers.map((beer) => (
      <li key={beer.beer_id}>{beer.beer_name} - {beer.beer_id}</li>
      ))}
    </ul>
      </Collapse>

      <Collapse title="ADD A BEER">
      <form onSubmit={handleAddBeer}>
        <input type="text" name="beer_name" placeholder="Beer name" />
        <input type="text" name="description" placeholder="Description" />
        <input type="number" name="abv" placeholder="ABV" />
        <input type="number" name="brewery_id" placeholder="Brewery ID" />
        {/* <input type="text" name="created_at" placeholder="Date de création" /> */}
        <input type="text" name="logo" placeholder="Logo" />
        <input type="number" name="category_id" placeholder="Category ID" />
        <button type="submit">Add</button>
      </form>
      </Collapse>
      <Collapse
    title="DELETE A BEER">
    <input
      type="number"
      placeholder="beer ID"
      value={beerIdToSearch}
      onChange={(e) => setBeerIdToSearch(Number(e.target.value))}
      />
    <button onClick={handleSearchBeerById}>
    Find !
    </button>
    {displayBeer && displayBeer.beer ? (
  <p>Beer find : {displayBeer.beer.name}</p>
) : (
  <p>No beer finded.</p>
)}
    <button onClick={() => handleDeleteBeer(Number(beerIdToSearch))}>
    🗑️ Delete !
    </button>
    {messageBeer && <p style={{ color: "green" }}>{messageBeer}</p>}
      </Collapse>


      </div>
    </div>
  );
}
}

export default Admin;