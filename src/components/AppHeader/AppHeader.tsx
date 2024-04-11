import { ReactNode, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import { LiveTvOutlined } from "@mui/icons-material";
import { AuthContext, anonymousUser } from "../../context";

interface AuthHeaderProps {
  onLogIn(): void;
  onLogout(): void;
}

export function AppHeader({ onLogIn, onLogout }: AuthHeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <LiveTvOutlined sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          The Movies DB
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Box>
        <AuthSection onLogIn={onLogIn} onLogout={onLogout} />
      </Toolbar>
    </AppBar>
  );
}

interface AuthSectionProps {
  onLogIn(): void;
  onLogout(): void;
}

function AuthSection({ onLogIn, onLogout }: AuthSectionProps) {
  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  if (loggedIn) {
    return (
      <>
        <Typography>Hello, {user.name}!</Typography>
        <Button
          color="inherit"
          variant="outlined"
          sx={{ ml: 1.5 }}
          onClick={onLogout}
        >
          Log out
        </Button>
      </>
    );
  }

  return (
    <Button color="inherit" variant="outlined" onClick={onLogIn}>
      Log in
    </Button>
  );
}

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
