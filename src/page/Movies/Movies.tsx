import { useCallback, useState } from "react";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";

import { MoviesFilter } from "../../components";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

import MovieCard from "../../components/MovieCard/MovieCard";
import {
  MoviesQuery,
  useGetConfigurationQuery,
  useGetMoviesQuery,
} from "../../services/tmdb";
import { useAuth0 } from "@auth0/auth0-react";

const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
};

export default function Movies() {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);

  const movies = data?.results ?? [];
  const hasMorePages = data?.hasMorePages;

  function formatImageUrl(path?: string) {
    return path && configuration
      ? `${configuration?.images.base_url}w780${path}`
      : undefined;
  }

  const { isAuthenticated, user } = useAuth0();

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targetRef] = useIntersectionObserver({ onIntersect });

  const handleAddFavorite = useCallback(
    (id: number) => {
      alert(
        `Not implemented! Action: ${user?.name} is adding to movie ${id} to favorites.`
      );
    },
    [user?.name]
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
      <Grid item xs="auto">
        <MoviesFilter
          onApply={(f) => {
            const moviesFilters = {
              keywords: f?.keywords.map((k) => k.id),
              genres: f?.genres,
            };
            setQuery({
              page: 1,
              filters: moviesFilters,
            });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!isFetching && !movies.length && (
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
                  image={formatImageUrl(m.backdrop_path)}
                  enableUserActions={isAuthenticated}
                  onAddFavorite={handleAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}
