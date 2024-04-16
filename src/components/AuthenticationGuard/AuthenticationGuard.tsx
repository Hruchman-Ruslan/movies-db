import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LinearProgress } from "@mui/material";
import { ComponentType } from "react";

export interface AuthenticationGuardProps {
  component: ComponentType;
}

export default function AuthenticationGuard({
  component,
}: AuthenticationGuardProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LinearProgress />,
  });

  return <Component />;
}
