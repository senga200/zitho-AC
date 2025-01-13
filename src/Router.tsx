
  
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BeerList from "./components/BeerList";
import BreweriesList from "./components/BreweriesList";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <h2>Home</h2>,
  },
  {
    path: "/beerList",
    element: <BeerList />,
  },
  {
    path: "/breweriesList",
    element: <BreweriesList />,
  },
  {
    path: "*",
    element: <h2>Page not found</h2>,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
