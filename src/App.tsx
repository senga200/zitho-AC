import './App.css';
import BeersList from './pages/BeersList';
import BreweriesList from './pages/BreweriesList';
import BeerDetails from './pages/BeerDetails';
import BreweryDetails from './pages/BreweryDetails';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <header className="App-header">
          <h1 className='header-title'>Zythologists</h1>
        </header>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/beers" element={<BeersList />} />
          <Route path="/beerDetails/:beer_id" element={<BeerDetails />} />
          <Route path="/breweries" element={<BreweriesList />} />
          <Route path="/breweryDetails/:brewery_id" element={<BreweryDetails />} />

          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
