import { useState } from "react";
import {
  EpisodesQuery,
  useGetEpisodesQuery,
} from "../../services/rickandmorty";
import { Container, Grid, LinearProgress } from "@mui/material";
import { EpisodeCard, Pager } from "../../components";

const defaultQuery = { page: 1 };

export default function Extra() {
  const [query, setQuery] = useState<EpisodesQuery>(defaultQuery);
  const { data, isFetching } = useGetEpisodesQuery(query);

  return (
    <Container sx={{ py: 3 }} maxWidth="xl">
      <Pager
        current={query.page}
        onNext={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}
        onPrev={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}
      />
      {isFetching && <LinearProgress sx={{ mb: 2 }} />}
      <Grid container spacing={2}>
        {data?.results.map((e) => (
          <Grid item key={e.episode} xs={12} sm={6} md={4} lg={3}>
            <EpisodeCard
              name={e.name}
              episode={e.episode}
              airDate={e.are_date}
              characters={e.characters}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
