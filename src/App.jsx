import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import "./App.css";
import About from "./views/About";
import Contact from "./views/Contact";
import Home from "./views/Home";
import Recipes from "./views/Recipes";
import Favourites from "./views/Favourites";


const router = createBrowserRouter([
  {
    path: "/dishdelights-exam/",
    element: <Layout />,
    children: [
      
      
      
      {
        path: "favourites",
        element: <Favourites />,
      },
      
      {
        path: "about",
        element: <About/>,
      },

      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "home",
        element: <Home />,

      
      },
      

      {
        path: "recipes",
        element: <Recipes />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
