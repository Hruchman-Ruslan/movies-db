import { useContext, useEffect } from "react";

import { Container, Grid, LinearProgress, Typography } from "@mui/material";

import { fetchNextPage } from "../../redux/reducers/moviesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

import { MovieCard } from "../../components";
import { AuthContext, anonymousUser } from "../../context";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export default function Movies() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      dispatch(fetchNextPage());
    }
  }, [dispatch, entry?.isIntersecting, hasMorePages]);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Now playing
      </Typography>

      <Grid container spacing={4}>
        {movies.map((m) => (
          <Grid item key={m.id} xs={12} sm={6} md={4}>
            <MovieCard
              key={m.id}
              id={m.id}
              title={m.title}
              overview={m.overview}
              popularity={m.popularity}
              image={m.image}
              enableUserActions={loggedIn}
            />
          </Grid>
        ))}
      </Grid>
      <div ref={targetRef}>
        {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
      </div>
    </Container>
  );
}
