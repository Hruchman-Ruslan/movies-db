import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.tsx";
import About from "./page/About.tsx";
import Movies from "./page/Movies.tsx";
import store from "./redux/store.ts";

import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Provider store={store}>
          <App />
        </Provider>
      ),
      children: [
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
      ],
    },
  ],
  { basename: "/movies-db/" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
