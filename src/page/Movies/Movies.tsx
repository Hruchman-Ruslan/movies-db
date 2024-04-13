import {
  Suspense,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { Container, Grid, LinearProgress, Typography } from "@mui/material";

import { fetchNextPage, resetMovies } from "../../redux/reducers/moviesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

import { Filters } from "../../components";
import { AuthContext, anonymousUser } from "../../context";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

import MovieCard from "../../components/MovieCard/MovieCard";

const MoviesFilter = lazy(
  () => import("../../components/MoviesFilter/MoviesFilter")
);

export default function Movies() {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<Filters>();
  const movies = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      const moviesFilters = filters
        ? {
            keywords: filters?.keywords.map((k) => k.id),
            genres: filters?.genres,
          }
        : undefined;

      dispatch(fetchNextPage(moviesFilters));
    }
  }, [dispatch, entry?.isIntersecting, hasMorePages, filters]);

  const handleAddFavorite = useCallback(
    (id: number) => {
      alert(
        `Not implemented! Action: ${user.name} is adding to movie ${id} to favorites.`
      );
    },
    [user.name]
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
      <Grid item xs="auto">
        <Suspense fallback={<span>Loading filters...</span>}>
          <MoviesFilter
            onApply={(filters) => {
              dispatch(resetMovies());
              setFilters(filters);
            }}
          />
        </Suspense>
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!loading && !movies.length && (
            <Typography variant="h6">
              No movies were found that match your query.
            </Typography>
          )}
          <Grid container spacing={4}>
            {movies.map((m, i) => (
              <Grid item key={`${m.id}-${i}`} xs={12} sm={6} md={4}>
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  overview={m.overview}
                  popularity={m.popularity}
                  image={m.image}
                  enableUserActions={loggedIn}
                  onAddFavorite={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}
