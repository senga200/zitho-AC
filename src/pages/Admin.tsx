import Collapse from "../components/Collapse";
import { useState } from "react";

function Admin() {
  const ADMIN_EMAIL = "test";
  const ADMIN_PASSWORD = "test";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const [breweryName, setBreweryName] = useState("");
  const [breweryCountry, setBreweryCountry] = useState("");
  const [breweryCreatedAt, setBreweryCreatedAt] = useState("");
  const [breweryLogo, setBreweryLogo] = useState("");

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
  localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  console.log("isAuthenticated", isAuthenticated);

  const handleAddBrewery = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newBrewery = {
      name: breweryName,
      country: breweryCountry,
      created_at: breweryCreatedAt,
      logo: breweryLogo,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/v1/breweries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBrewery),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Brasserie ajoutée :", data);
  
        setBreweryName("");
      setBreweryCountry("");
      setBreweryCreatedAt("");
      setBreweryLogo("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la brasserie :", error);
    }
  };

  const handleDeleteBrewery = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/breweries/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }
      const data = await response.json();
      console.log("Brasserie supprimée :", data);

    } catch (error) {
      console.error("Erreur lors de la suppression de la brasserie :", error);
    }
  }
  
  


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
        <p>Yo, t'es sur la page admin</p>

        <div>
          <h3>Bières</h3>
          <Collapse title="Ajouter une bière">
            <input
              type="text"
              name="name"
              placeholder="Nom de la bière"
              // value={}
              // onChange={handleInputChange}
            />
            <input
              type="text"
              name="brewery"
              placeholder="Nom de la brasserie"
              // value={}
              // onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description de la bière"
              // value={}
              // onChange={handleInputChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Catégorie de la bière"
              // value={}
              // onChange={handleInputChange}
            />
            <input
              type="number"
              name="abv"
              placeholder="ABV de la bière"
              // value={}
              // onChange={handleInputChange}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="URL de l'image"
              // value={}
              // onChange={handleInputChange}
            />
            <button>Ajouter</button>
          </Collapse>
          <Collapse title="Supprimer une bière">
            <input type="text" placeholder="ID de la bière" />
            <button>Supprimer</button>
          </Collapse>
          <Collapse title="Modifier une bière">
            <input type="text" placeholder="Nom de la bière" />
            <input type="text" placeholder="Nom de la brasserie" />
            <input type="text" placeholder="Description de la bière" />
            <input type="text" placeholder="Catégorie de la bière" />
            <input type="text" placeholder="ABV de la bière" />
            <input type="text" placeholder="URL de l'image" />
            <button>Modifier</button>
          </Collapse>
        </div>

        <div>
          <h2>Brasseries</h2>
          <Collapse title="Ajouter une brasserie">
            <form onSubmit={handleAddBrewery}>
              <input
                type="text"
                name="name"
                placeholder="Nom de la brasserie"
                value={breweryName}
                onChange={(e) => setBreweryName(e.target.value)}
              />
              <input
                type="text"
                name="country"
                placeholder="Pays de la brasserie"
                value={breweryCountry}
                onChange={(e) => setBreweryCountry(e.target.value)}
              />
              <input
                type="text"
                name="created_at"
                placeholder="Date de création"
                value={breweryCreatedAt}
                onChange={(e) => setBreweryCreatedAt(e.target.value)}
              />
              <input
                type="text"
                name="logo"
                placeholder="Logo de la brasserie"
                value={breweryLogo}
                onChange={(e) => setBreweryLogo(e.target.value)}
              />
              <button type="submit">Ajouter</button>
            </form>
          </Collapse>
          <Collapse title="Supprimer une brasserie">
            <input type="number" placeholder="ID de la brasserie" id="breweryIdToDelete" />
            <button onClick={() => {
              const id = parseInt((document.getElementById('breweryIdToDelete') as HTMLInputElement).value);
              handleDeleteBrewery(id);
            }}>Supprimer</button>
          </Collapse>
          <Collapse title="Modifier une brasserie">
          <input type="text" placeholder="Pays de la brasserie" />
            <input type="text" placeholder="Date de création de la brasserie" />
            <input type="text" placeholder="Logo de la brasserie" />
            <button>Modifier</button>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Admin;
