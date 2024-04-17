import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { LinearProgress } from "@mui/material";

import App from "./App.tsx";

import Home from "./page/Home/Home.tsx";
import About from "./page/About/About.tsx";
import Extra from "./page/Extra/Extra.tsx";
import AuthCallback from "./page/AuthCallback/AuthCallback.tsx";
import Profile from "./page/Profile/Profile.tsx";
import Protected from "./page/Protected/Protected.tsx";

const Movies = lazy(() => import("./page/Movies/Movies.tsx"));

import store from "./redux/store.ts";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary.tsx";
import { StateFullAuthProvider } from "./components/index.ts";
import AuthenticationGuard from "./components/AuthenticationGuard/AuthenticationGuard.tsx";

function AppEntrypoint() {
  return (
    <StateFullAuthProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </StateFullAuthProvider>
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
          path: "movies",
          element: (
            <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
              <Movies />
            </Suspense>
          ),
        },
        {
          path: "extra",
          element: <Extra />,
        },
        {
          path: "profile",
          element: <AuthenticationGuard component={Profile} />,
        },
        {
          path: "protected",
          element: <AuthenticationGuard component={Protected} />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "callback",
          element: <AuthCallback />,
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
