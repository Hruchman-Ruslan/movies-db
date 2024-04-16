import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { LiveTvOutlined } from "@mui/icons-material";
import { HeaderLink } from "../HeaderLink/HeaderLink";
import { AuthSection } from "../AuthSection/AuthSection";
import { useAuth0 } from "@auth0/auth0-react";

export function AppHeader() {
  const { isAuthenticated } = useAuth0();

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
            <HeaderLink to="/extra">Extra</HeaderLink>
            {isAuthenticated && (
              <HeaderLink to="/protected">Protected</HeaderLink>
            )}
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Box>
        <AuthSection />
      </Toolbar>
    </AppBar>
  );
}
