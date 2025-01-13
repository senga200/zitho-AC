
  
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BeersList from "./components/BeersList";
import BreweriesList from "./components/BreweriesList";
import BeerDetails from "./components/BeerDetails";
import BreweryDetails from "./components/BreweryDetails";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <h2>Home</h2>,
  },
  {
    path: "/beerList",
    element: <BeersList />,
  },
  {
    path: "/beerDetails/:id",
    element: <BeerDetails />,
  },

  {
    path: "/breweriesList",
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
