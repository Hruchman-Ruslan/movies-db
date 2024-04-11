import { Outlet } from "react-router-dom";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { teal } from "@mui/material/colors";

import { AppHeader } from "./components";
import { AuthContext, AuthInfo, anonymousUser } from "./context";
import { useState } from "react";

const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: "#96000f",
    },
  },
});

const fakeAuth: AuthInfo = {
  user: {
    name: "Ruslan",
  },
};

function App() {
  const [auth, setAuth] = useState<AuthInfo>({ user: anonymousUser });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthContext.Provider value={auth}>
        <AppHeader
          onLogIn={() => setAuth(fakeAuth)}
          onLogout={() => setAuth({ user: anonymousUser })}
        />
        <main>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
