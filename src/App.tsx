import { ReactNode } from "react";

import { Link as RouterLink, Outlet } from "react-router-dom";

import {
  AppBar,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { LiveTvOutlined } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

function HeaderLink({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Link
      component={RouterLink}
      variant="button"
      color="inherit"
      sx={{ my: 1, mx: 1.5 }}
      to={to}
    >
      {children}
    </Link>
  );
}

const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: "#96000f",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <LiveTvOutlined sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            The Movies DB
          </Typography>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
