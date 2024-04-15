import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Character } from "../../services/rickandmorty";

interface EpisodeCardProps {
  name: string;
  episode: string;
  airDate: string;
  characters: Character[];
}

export function EpisodeCard({
  name,
  episode,
  airDate,
  characters,
}: EpisodeCardProps) {
  return (
    <Card sx={{ maxHeight: 500 }}>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography color="text.secondary">{episode}</Typography>
        <Typography>{airDate}</Typography>
        <Typography variant="h6">Characters</Typography>
        <Box sx={{ maxHeight: 300, overflow: "auto" }}>
          <List>
            {characters.map((c) => (
              <ListItem key={c.id} sx={{ p: 0 }}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar src={c.image} />
                  </ListItemAvatar>
                  <ListItemText>{c.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}
