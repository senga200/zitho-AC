
import { useState, useEffect } from "react";
import Collapse from "../components/Collapse";
import { fetchBreweries, fetchBreweryById, addBrewery, updateBrewery, deleteBrewery } from "../utils/FetchBreweries";
import { Brewery } from "../types/Brewery";




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
  );
}
}

export default Admin;
