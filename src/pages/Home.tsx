import { Link } from 'react-router-dom';
import './../styles/HomeStyle.css';

function Home() {
  return (
    <div className='home'>
      <div className='home-container'>
        <h2 className='home-title'>The Beer Lover's Guide</h2>
        <Link to="/beers" className='link-style'>See all beers</Link>
        <br />
        <Link to="/breweries" className='link-style'>See all breweries</Link>
        <div className='admin-container'>
        <Link to="/admin" className='link-style'>Admin Area</Link>
    
      </div>

      </div>
      


        
      
    </div>
  )
}

export default Home
