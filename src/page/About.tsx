import { Container } from "@mui/material";

import { CountdownText, CountdownVideo } from "../components";

export default function About() {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <CountdownText />
      <CountdownVideo />
    </Container>
  );
}
