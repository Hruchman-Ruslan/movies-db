import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.tsx";

import Home from "./page/Home/Home.tsx";
// import Movies from "./page/Movies/Movies.tsx";
import About from "./page/About/About.tsx";
import Extra from "./page/Extra/Extra.tsx";

const Movies = lazy(() => import("./page/Movies/Movies.tsx"));

import store from "./redux/store.ts";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary.tsx";
import { LinearProgress } from "@mui/material";

function AppEntrypoint() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppEntrypoint />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          element: (
            <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
              <Movies />
            </Suspense>
          ),
        },
        {
          path: "/extra",
          element: <Extra />,
        },
        {
          path: "/about",
          element: <About />,
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
