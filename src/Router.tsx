
  
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BeersList from "./pages/BeersList";
import BreweriesList from "./pages/BreweriesList";
import BeerDetails from "./pages/BeerDetails";
import BreweryDetails from "./pages/BreweryDetails";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/beers",
    element: <BeersList />,
  },
  {
    path: "/beerDetails/:id",
    element: <BeerDetails />,
  },

  {
    path: "/breweries",
    element: <BreweriesList />,
  },
  {
    path: "/breweryDetails/:brewery_id",
    element: <BreweryDetails />,
  },
  {
    path: "*",
    element: <h2>Page not found</h2>,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
