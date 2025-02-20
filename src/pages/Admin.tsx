import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import Collapse from "../components/Collapse";
import { fetchBreweries, fetchBreweryById, addBrewery, updateBrewery, deleteBrewery } from "../utils/FetchBreweries";
import { fetchBeers, fetchBeersById, deleteBeer, addBeer, updateBeer } from "../utils/FetchBeers";
import { Brewery } from "../types/Brewery";
import { Beer } from "../types/Beer";
import './../styles/AdminStyle.css';





function Admin() {
///////////HOOKS BRASSERIE /////////////////////////////
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [breweryIdToUpdate, setBreweryIdToUpdate] = useState<number | "">("");
  const [breweryToEdit, setBreweryToEdit] = useState<Brewery | null>(null);
  const [updatedBreweryData, setUpdatedBreweryData] = useState<Brewery | null>(null);
  const [breweryIdToSearch, setBreweryIdToSearch] = useState<number | "">("");
  const [displayBrewery, setDisplayBrewery] = useState<{ id?: number; name?: string; country?: string } | null>(null);
  const [messageDelete, setMessageDelete] = useState<string>("");
  const [messageUpdate, setMessageUpdate] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Removed duplicate useEffect for fetchAllBreweries
///////////HOOKS BIERES /////////////////////////////
  const [beers, setBeers] = useState<Beer[]>([]);
  const [beerIdToUpdate, setBeerIdToUpdate] = useState<number | "">("");
  const [beerToEdit, setBeerToEdit] = useState<Beer | null>(null);
  const [updatedBeerData, setUpdatedBeerData] = useState<Beer | null>(null);
  const [beerIdToSearch, setBeerIdToSearch] = useState<number | "">("");
  const [displayBeer, setDisplayBeer] = useState<{ beer?: Beer } | null>(null);
  const [messageBeerDelete, setMessageBeerDelete] = useState<string>("");
  const [messageBeerUpdate, setMessageBeerUpdate] = useState<string>("");
  const [messageBeer, setMessageBeer] = useState<string>("");

  useEffect(() => {
    fetchAllBreweries();
    fetchAllBeers();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    console.error("Erreur : AuthContext pas là");
    return <div>Déso, auth context error</div>; 
  } else {
    console.log("AuthContext OK est true !", authContext);
  }

  // maintenant que authcontext n est pas null ou undefined on peut desctructurer et extraire les valeurs de l objet authcontext : isAuthenticated est , login (email+password), logout
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
      setMessageDelete("");
    } else {
      setDisplayBrewery(null);
      setMessageDelete("no brewery with this id.");
    }
  };

  const handleAddBrewery = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newBrewery = { 
      brewery_id: 0, 
      name: String(formData.get("name")),
      country: String(formData.get("country")),
      created_at: String(formData.get("created_at")),
      logo: String(formData.get("logo")),
    };
    await addBrewery(newBrewery);
  
    setMessage("Brasserie ajoutée avec succès.");
    fetchAllBreweries (); // rfesh la liste après ajout
  };

  const handleDeleteBrewery = async (id: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this brewery  ${id} ?`);
    
    if (confirmDelete) {
      await deleteBrewery(id);
      setMessageDelete("brewery deleted !");
      setDisplayBrewery(null);
      fetchAllBreweries();
    } else {
      setMessageDelete("deleting canceled.");
    }
  };

  const handleSearchBreweryToUpdate = async () => {
    if (!breweryIdToUpdate) return;
  
    const response = await fetchBreweryById(Number(breweryIdToUpdate));
    
    if (response?.brewery) {
      setBreweryToEdit(response.brewery);
      setUpdatedBreweryData(response.brewery); // Préremplit le formulaire
      setMessageUpdate("");
    } else {
      setBreweryToEdit(null);
      setMessageUpdate("No brewery found.");
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
    
    // On copie les données actuelles du brewery dans un nouvel objet pour ne pas modifier le original
    await updateBrewery(breweryToEdit.brewery_id, updatedBreweryData);
    setMessageUpdate("Brewery updated successfully !");
    setBreweryToEdit(null);
    fetchAllBreweries();
  };
  
  
/////////////gestion des bières //////

  const fetchAllBeers = async () => {
    const data = await fetchBeers();
    console.log("Beers fetched:", data); 
    setBeers(data);
  };


  const handleSearchBeerById = async () => {
    if (!beerIdToSearch) return;
    const response = await fetchBeersById(Number(beerIdToSearch));
    if (response?.beer) {
      setDisplayBeer({ beer: response.beer });
      setMessageBeerDelete("");
      console.log("bière en question", response);
    } else {
      setDisplayBeer(null);
      setMessageBeerDelete("no beer found with this id.");
    }
  };

  const handleAddBeer = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newBeer = {
      beer_name: String(formData.get("name")),
      beer_id: 0,
      name: String(formData.get("name")),
      description: String(formData.get("description")), 
      abv: Number(formData.get("abv")),
      brewery_id: Number(formData.get("brewery_id")),
      category_id: Number(formData.get("category_id")),
      logo_url: String(formData.get("logo")), 
      brewery_name: String(formData.get("brewery_name")),

    };
    console.log("1. Données envoyées à l'API:", JSON.stringify(newBeer));

    await addBeer(newBeer);
    console.log("2. Données envoyées à l'API:", JSON.stringify(newBeer));

  
    setMessageBeer("Berr added successfully.");
    fetchAllBeers (); // rfesh la liste après ajout
  };

  const handleDeleteBeer = async (id:number) => {
    const confirmDelete = window.confirm(`Are you sure to delete this beer ${id} ?`);
    
    if (confirmDelete) {
      await deleteBeer(id);
      setMessageBeerDelete("Beer deleted !");
      setDisplayBeer(null);
      fetchAllBeers();
    } else {
      setMessageBeerDelete("deleting canceled.");
    }
  };

  console.log("displayBeer state:", displayBeer);

  const handleSearchBeerToUpdate = async () => {
    if (!beerIdToUpdate) return;
    const response = await fetchBeersById(Number(beerIdToUpdate));

    if (response?.beer) {
      setBeerToEdit(response.beer);
      setUpdatedBeerData(response.beer);
      setMessageBeerUpdate("");
    } else {
      setBeerToEdit(null);
      setMessageBeerUpdate("no beer found.");
    }
  };
  const handleInputChangeBeer = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updatedBeerData) return;
    
    setUpdatedBeerData({
     ...updatedBeerData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateBeer = async () => {
    if (!beerToEdit || !updatedBeerData) return;
    await updateBeer(beerToEdit.beer_id, updatedBeerData);
    setMessageBeerUpdate("Beer updated successfully!");
    setBeerToEdit(null);
    fetchAllBeers();
  };


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
    <div className="admin-area">
      <div className="admin-header">
        <h2>Admin area</h2>
        <button onClick={logout}>Log out</button>
      </div>
      <p className="admin-description">Here, you can manage breweries & beers. <br></br>Add, Delete, Update it's soooo fun ! </p>
      <div>
      <h3>Breweries Managment</h3>
      <Collapse title="SEE ALL BREWERIES">
        <ul>
        {breweries.map((brewery) => (
          <li key={brewery.brewery_id}>Brasserie : {brewery.name} - Id : {brewery.brewery_id}</li>))}
        </ul>
      </Collapse>
      <Collapse title="ADD A BREWERY">
      <form onSubmit={handleAddBrewery}>
        <input type="text" name="name" placeholder="Brewery name" />
        <input type="text" name="country" placeholder="Brewery country" />
        <input type="text" name="created_at" placeholder="Created at" />
        <input type="text" name="logo" placeholder="Logo" />
        <button type="submit">Add</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
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

      {messageUpdate && <p style={{ color: "green" }}>{messageUpdate}</p>}
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
  {displayBrewery && (
    <button onClick={() => handleDeleteBrewery(Number(breweryIdToSearch))}>
      🗑️ Delete !
    </button>
  )}
  {messageDelete && <p style={{ color: "green" }}>{messageDelete}</p>}
      </Collapse>
      </div>
      <div>
      <h3>Beer managment</h3>
      <Collapse title="SEE ALL BEERS">
        <ul>
        {beers.map((beer) => (
          <li key={beer.beer_id}>Bière : {beer.beer_name} - Id : {beer.beer_id}</li>
          ))} 
        </ul>
      </Collapse>
      <Collapse title="ADD A BEER">
        <form onSubmit={handleAddBeer}>
          <input type="text" name="name" placeholder="Beer name" />
          <input type="text" name="description" placeholder="Description" />
          <input type="number" name="abv" placeholder="ABV" />
          <input type="number" name="brewery_id" placeholder="Brewery ID" />
          <input type="text" name="logo" placeholder="Logo" />
          <input type="number" name="category_id" placeholder="Category ID" />
          <button type="submit">Add</button>
        </form>
        {messageBeer && <p style={{ color: "green" }}>{messageBeer}</p>}
      </Collapse>
      <Collapse title="UPDATE A BEER">
      <input
      type="number"
      name="beer_id"
      placeholder="Beer ID"
      value={beerIdToUpdate}
      onChange={(e) => setBeerIdToUpdate(Number(e.target.value))}
      />
      <button onClick={handleSearchBeerToUpdate}>
      Find
      </button>
      {beerToEdit && updatedBeerData && (
        <div>
          <h3>Update : {beerToEdit.name}</h3>
          <input
            type="text"
            name="name"
            value={updatedBeerData.name || ""}
            onChange={handleInputChangeBeer}
            placeholder="Beer Name"
          />
          <input
            type="text"
            name="description"
            value={updatedBeerData.description || ""}
            onChange={handleInputChangeBeer}
            placeholder="Description"
          />
          <input
            type="number"
            name="abv"
            value={updatedBeerData.abv || ""}
            onChange={handleInputChangeBeer}
            placeholder="ABV"
          />
          <input
            type="number"
            name="brewery_id"
            value={updatedBeerData.brewery_id || ""}
            onChange={handleInputChangeBeer}
            placeholder="Brewery ID"
          />
          <input
            type="text"
            name="logo"
            value={updatedBeerData.logo_url || ""}
            onChange={handleInputChangeBeer}
            placeholder="Logo"
          />
          <input
            type="number"
            name="category_id"
            value={updatedBeerData.category_id || ""}
            onChange={handleInputChangeBeer}
            placeholder="Category ID"
          />
          <button onClick={handleUpdateBeer}>Update</button>
        </div>
      )}
      {messageBeerUpdate && <p style={{ color: "green" }}>{messageBeerUpdate}</p>}
      </Collapse>
      <Collapse title="DELETE A BEER">
        <input
        type="number"
        placeholder="beer ID"
        value={beerIdToSearch}
        onChange={(e) => setBeerIdToSearch(Number(e.target.value))}
        />
        <button onClick={handleSearchBeerById}>
        Find !
        </button>
        {displayBeer && displayBeer.beer && <p>Beer find : {displayBeer.beer.name}</p>} 
        {displayBeer && displayBeer.beer && (
          <button onClick={() => handleDeleteBeer(Number(beerIdToSearch))}>
            🗑️ Delete !
          </button>
        )}
        {messageBeerDelete && <p style={{ color: "green" }}>{messageBeerDelete}</p>}
      </Collapse>
      </div>
    </div>
  );
}
}

export default Admin;