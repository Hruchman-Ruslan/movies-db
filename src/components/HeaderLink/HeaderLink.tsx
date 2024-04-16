import { Link } from "@mui/material";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

export function HeaderLink({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
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
