import './App.css';
import BeersList from './components/BeersList';
import BreweriesList from './components/BreweriesList';
import BeerDetails from './components/BeerDetails';
import BreweryDetails from './components/BreweryDetails';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Zitho</h1>
        </header>

        <Routes>
          <Route path="/" element={<h2>Welcome to Zitho</h2>} />
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
