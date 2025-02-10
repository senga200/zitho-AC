
import Collapse from "../components/Collapse"
import {useState} from "react";

function Admin() {

const ADMIN_EMAIL = "admin@caramail.com";
  const ADMIN_PASSWORD = "adminpassword";

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
          <input type="text" placeholder="Nom de la bière" />
          <input type="text" placeholder="Nom de la brasserie" />
          <input type="text" placeholder="Description de la bière" />
          <input type="text" placeholder="Catégorie de la bière" />
          <input type="text" placeholder="ABV de la bière" />
          <input type="text" placeholder="URL de l'image" />
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
          <input type="text" placeholder="Nom de la brasserie" />
          <input type="text" placeholder="Pays de la brasserie" />
          <input type="text" placeholder="Date de création de la brasserie" />
          <input type="text" placeholder="Logo de la brasserie" />
          <button>Ajouter</button>
        </Collapse>
        <Collapse title="Supprimer une brasserie">
          <input type="text" placeholder="ID de la brasserie" />
          <button>Supprimer</button>
        </Collapse>
        <Collapse title="Modifier une brasserie">
          <input type="text" placeholder="Nom de la brasserie" />
          <input type="text" placeholder="Pays de la brasserie" />
          <input type="text" placeholder="Date de création de la brasserie" />
          <input type="text" placeholder="Logo de la brasserie" />
          <button>Modifier</button>
        </Collapse>
      </div>
    </div>
  );
}
};

export default Admin;

