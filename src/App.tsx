import './App.css';
import BeerList from './components/BeerList';
import BreweriesList from './components/BreweriesList';
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
          <Route path="/beers" element={<BeerList />} />
          <Route path="/breweries" element={<BreweriesList />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
