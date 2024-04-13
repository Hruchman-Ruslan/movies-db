import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import { Favorite } from "@mui/icons-material";
import { memo } from "react";

export interface MovieCardProps {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
  enableUserActions?: boolean;
  onAddFavorite?(id: number): void;
}

function MovieCard({
  id,
  overview,
  popularity,
  title,
  enableUserActions,
  onAddFavorite,
  image = "/movie-thumb.png",
}: MovieCardProps) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="div" image={image} sx={{ pt: "56.25%" }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
        <Typography variant="button" display="block" mt={2}>
          {popularity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={RouterLink} to={`/movies/${id}`} color="secondary">
          Details
        </Button>
        {enableUserActions && (
          <Tooltip title="Add to favorites">
            <IconButton onClick={() => onAddFavorite?.(id)}>
              <Favorite />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}

export default memo(MovieCard);
