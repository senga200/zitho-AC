
import { useState, useEffect } from "react";
import Collapse from "../components/Collapse";
import { fetchBreweries, fetchBreweryById, addBrewery, updateBrewery, deleteBrewery } from "../utils/FetchBreweries";
import { Brewery } from "../types/Brewery";




function Admin() {

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



  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [breweryIdToUpdate, setBreweryIdToUpdate] = useState<number | "">("");

  const [breweryIdToSearch, setBreweryIdToSearch] = useState<number | "">("");
  const [displayBrewery, setDisplayBrewery] = useState<{ id?: number; name?: string } | null>(null);
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
  
  const handleUpdateBrewery = async (id: number) => {
    const updatedBrewery = { name: "Brasserie Modifiée", country: "Belgique" };
    await updateBrewery(id, updatedBrewery);
  };

  const handleDeleteBrewery = async (id: number) => {
    await deleteBrewery(id);
    setMessage("Brasserie supprimée !");
    setDisplayBrewery(null);
    fetchAllBreweries();
  };

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
      <button onClick={() => handleDeleteBrewery(Number(breweryIdToSearch))}>Supprimer</button>
      {displayBrewery && <p>Brasserie trouvée : {displayBrewery.name}</p>}
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
      <button onClick={() => handleUpdateBrewery(Number(breweryIdToUpdate))}>Modifier</button>
      </Collapse>

    </div>
  );
}
}

export default Admin;
