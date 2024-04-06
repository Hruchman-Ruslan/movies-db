import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import About from "./page/About.tsx";
import Movies from "./page/Movies.tsx";

const router = createBrowserRouter([
  {
    path: "/movies-db/",
    element: <App />,
    children: [
      {
        path: "/movies-db/about",
        element: <About />,
      },
      {
        path: "/movies-db/movies",
        element: <Movies />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
