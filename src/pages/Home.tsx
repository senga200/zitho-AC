import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>

        <h1>bienvenue chez ceux qui aiment bien la bière</h1>
        <Link to="/beers">Voir les bières</Link>
        <br />
        <Link to="/breweries">Voir les brasseries</Link>
        
      
    </div>
  )
}

export default Home
