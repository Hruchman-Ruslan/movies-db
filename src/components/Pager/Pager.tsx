import { SkipNext, SkipPrevious } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";

interface PagerProps {
  current: number;
  onNext(): void;
  onPrev(): void;
}

export function Pager({ current, onNext, onPrev }: PagerProps) {
  return (
    <Stack direction="row" sx={{ mb: 3 }} spacing={2}>
      <Button variant="contained" startIcon={<SkipPrevious />} onClick={onPrev}>
        Previous
      </Button>
      <Button variant="outlined" disabled>
        {current}
      </Button>
      <Button variant="contained" endIcon={<SkipNext />} onClick={onNext}>
        Next
      </Button>
    </Stack>
  );
}
