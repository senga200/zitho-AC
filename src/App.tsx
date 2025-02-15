import './App.css';
import BeersList from './pages/BeersList';
import BreweriesList from './pages/BreweriesList';
import BeerDetails from './pages/BeerDetails';
import BreweryDetails from './pages/BreweryDetails';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

function AdminLink() {
  const location = useLocation(); 

  return location.pathname !== "/admin" ? (
    <div className='admin-container'>

      <Link to="/admin" className='link-style'>Admin Area</Link>
    </div>
  ) : null;
}

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <header className="App-header">
          <h1 className='header-title'>Zythologists</h1>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beers" element={<BeersList />} />
          <Route path="/beerDetails/:beer_id" element={<BeerDetails />} />
          <Route path="/breweries" element={<BreweriesList />} />
          <Route path="/breweryDetails/:brewery_id" element={<BreweryDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </div>
      <AdminLink />
    </Router>
  );
}

export default App;
