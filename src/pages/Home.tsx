import { Link } from 'react-router-dom';
import './../styles/HomeStyle.css';

function Home() {
  return (
    <div className='home-container'>

        <h2 className='home-title'>La bible des amateurs de bières</h2>
        <Link to="/beers" className='link-style'>Voir les bières</Link>
        <br />
        <Link to="/breweries" className='link-style'>Voir les brasseries</Link>
        
      
    </div>
  )
}

export default Home
