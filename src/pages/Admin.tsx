import { useState, useEffect } from "react";
import Collapse from "../components/Collapse";
import { fetchBreweries, fetchBreweryById, addBrewery, updateBrewery, deleteBrewery } from "../utils/FetchBreweries";
import { fetchBeers, fetchBeersById, deleteBeer, addBeer } from "../utils/FetchBeers";
import { Brewery } from "../types/Brewery";
import { Beer } from "../types/Beer";




function Admin() {

  ///////gestion connexion

  const ADMIN_EMAIL = "test";
  const ADMIN_PASSWORD = "test";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Email ou mot de passe incorrect !");
      setIsAuthenticated(false);
    }
  };
  // localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  // console.log("isAuthenticated", isAuthenticated);

//gestion des brasseries
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [breweryIdToUpdate, setBreweryIdToUpdate] = useState<number | "">("");
  const [breweryToEdit, setBreweryToEdit] = useState<Brewery | null>(null);
  const [updatedBreweryData, setUpdatedBreweryData] = useState<Brewery | null>(null);
  const [breweryIdToSearch, setBreweryIdToSearch] = useState<number | "">("");
  const [displayBrewery, setDisplayBrewery] = useState<{ id?: number; name?: string; country?: string } | null>(null);
  const [message, setMessage] = useState<string>("");


  const fetchAllBreweries  = async () => {
    const data = await fetchBreweries();
    setBreweries(data);
  };
  useEffect(() => {
    fetchAllBreweries ();
  }, []);
  
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
  
  
///gestion des bières
  const [beers, setBeers] = useState<Beer[]>([]);
  //const [beerIdToUpdate, setBeerIdToUpdate] = useState<number | "">("");
  //const [beerToEdit, setBeerToEdit] = useState<Beer | null>(null);
  //const [updatedBeerData, setUpdatedBeerData] = useState<Beer | null>(null);
  const [beerIdToSearch, setBeerIdToSearch] = useState<number | "">("");
  const [displayBeer, setDisplayBeer] = useState<{ beer?: Beer } | null>(null);
  const [messageBeer, setMessageBeer] = useState<string>("");

  const fetchAllBeers = async () => {
    const data = await fetchBeers();
    setBeers(data);
  };
  useEffect(() => {
    fetchAllBeers();
  }, []);

  const handleSearchBeerById = async () => {
    if (!beerIdToSearch) return;
    const response = await fetchBeersById(Number(beerIdToSearch));
    if (response) {
      setDisplayBeer({ beer: response });
      console.log("bière en question", response);
      setMessageBeer("");
    } else {
      setDisplayBeer(null);
      setMessageBeer("Aucune bière trouvée avec cet ID.");
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

  
    setMessage("Beer ajoutée avec succès.");
    fetchAllBeers (); // rfesh la liste après ajout
  };

  const handleDeleteBeer = async (id:number) => {
    const confirmDelete = window.confirm(`Etes-vous surr de vouloir supprimer la bière ID ${id} ?`);
    
    if (confirmDelete) {
      await deleteBeer(id);
      setMessageBeer("Bière supprimée!");
      setDisplayBeer(null);
      fetchAllBeers();
    } else {
      setMessageBeer("Suppression annulée.");
    }
  };

  console.log("displayBeer state:", displayBeer);


  if (!isAuthenticated) {
    return (
      <div>
        <h2>Connexion Administrateur</h2>
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  } else {
  return (
    <div>
      <h2>Administration</h2>
      <div>
      <h3>Gestion des brasseries</h3>
      <Collapse title="Voir toutes les brasseries">
      <button onClick={fetchAllBreweries }>go les brasseries</button>
      <ul>
      {breweries.map((brewery) => (
      <li key={brewery.brewery_id}>{brewery.name} - {brewery.brewery_id}</li>
      ))}
    </ul>
      </Collapse>
      <Collapse title="Supprimer une brasserie">
      <input
      type="number"
      placeholder="ID de la brasserie"
      value={breweryIdToSearch}
      onChange={(e) => setBreweryIdToSearch(Number(e.target.value))}
      />
      <button onClick={handleSearchBreweryById}>
      Rechercher
      </button>
      {displayBrewery && <p>Brasserie trouvée : {displayBrewery.name}</p>}
      <button onClick={() => handleDeleteBrewery(Number(breweryIdToSearch))}>
      🗑️ Supprimer
      </button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      </Collapse>
      <Collapse title="Ajouter une brasserie">
      <form onSubmit={handleAddBrewery}>
        <input type="text" name="name" placeholder="Nom de la brasserie" />
        <input type="text" name="country" placeholder="Pays de la brasserie" />
        <input type="text" name="created_at" placeholder="Date de création" />
        <input type="text" name="logo" placeholder="Logo de la brasserie" />
        <button type="submit">Ajouter</button>
      </form>
      </Collapse>
      <Collapse title="Modifier une brasserie">
      <input 
      type="number" 
      name="id" 
      placeholder="ID de la brasserie" 
      value={breweryIdToUpdate}
      onChange={(e) => setBreweryIdToUpdate(Number(e.target.value))}
      />
      <button onClick={handleSearchBreweryToUpdate}>Rechercher</button>

  {breweryToEdit && updatedBreweryData && (
    <div>
      <h3>Modifier : {breweryToEdit.name}</h3>
      <input 
        type="text" 
        name="name" 
        value={updatedBreweryData.name || ""} 
        onChange={handleInputChange} 
        placeholder="Nom de la brasserie"
      />
      <input 
        type="text" 
        name="country" 
        value={updatedBreweryData.country || ""}  
        onChange={handleInputChange} 
        placeholder="Pays"
      />
      <input 
        type="text" 
        name="created_at" 
        value={updatedBreweryData.created_at || ""} 
        onChange={handleInputChange} 
        placeholder="Date de création"
      />
      <input 
        type="text" 
        name="logo" 
        value={updatedBreweryData.logo || ""} 
        onChange={handleInputChange} 
        placeholder="Logo"
      />
      <button onClick={handleUpdateBrewery}>Enregistrer</button>
    </div>
  )}

  {message && <p style={{ color: "green" }}>{message}</p>}
      </Collapse>
      </div>
      <div>
      <h3>Gestion des bières</h3>
      <Collapse title="Voir toutes les bières">
      <button onClick={fetchAllBeers}>go les bières</button>
      <ul>
      {beers.map((beer) => (
      <li key={beer.beer_id}>{beer.beer_name} - {beer.beer_id}</li>
      ))}
    </ul>
      </Collapse>

      <Collapse title="Ajouter une bière">
      <form onSubmit={handleAddBeer}>
        <input type="text" name="beer_name" placeholder="Nom de la bière" />
        <input type="text" name="description" placeholder="Description" />
        <input type="number" name="abv" placeholder="ABV" />
        <input type="number" name="brewery_id" placeholder="ID de la brasserie" />
        <input type="text" name="created_at" placeholder="Date de création" />
        <input type="text" name="logo" placeholder="Logo" />
        <input type="number" name="category_id" placeholder="ID de la catégorie" />
        <button type="submit">Ajouter</button>
      </form>
      </Collapse>
      <Collapse
    title="Supprimer une bière">
    <input
      type="number"
      placeholder="ID de la bière"
      value={beerIdToSearch}
      onChange={(e) => setBeerIdToSearch(Number(e.target.value))}
      />
    <button onClick={handleSearchBeerById}>
    Rechercher
    </button>
    {displayBeer && displayBeer.beer ? (
  <p>Bière trouvée : {displayBeer.beer.name}</p>
) : (
  <p>Aucune bière trouvée.</p>
)}
    <button onClick={() => handleDeleteBeer(Number(beerIdToSearch))}>
    🗑️ Supprimer
    </button>
    {messageBeer && <p style={{ color: "green" }}>{messageBeer}</p>}
      </Collapse>


      </div>
    </div>
  );
}
}

export default Admin;