import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";

interface CardGridSkeletonProps {
  count?: number;
  minWidth?: number;
  mediaHeight?: number;
}

// Placeholder cards shown while a section's JSON is loading.
export const CardGridSkeleton: React.FC<CardGridSkeletonProps> = ({
  count = 3,
  minWidth = 280,
  mediaHeight = 0,
}) => (
  <Box
    aria-busy="true"
    aria-label="Loading"
    sx={{
      display: "grid",
      gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${minWidth}px), 1fr))`,
      gap: 3,
    }}
  >
    {Array.from({ length: count }).map((_, index) => (
      <Paper key={index} variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
        {mediaHeight > 0 && <Skeleton variant="rectangular" height={mediaHeight} />}
        <Box sx={{ p: 3 }}>
          <Skeleton variant="text" sx={{ fontSize: "1.4rem", width: "60%" }} />
          <Skeleton variant="text" />
          <Skeleton variant="text" sx={{ width: "80%", mb: 1.5 }} />
          <Skeleton variant="rounded" height={28} width={120} />
        </Box>
      </Paper>
    ))}
  </Box>
);

interface ErrorStateProps {
  what: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ what, onRetry }) => (
  <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
    <Typography sx={{ mb: 2 }} color="text.secondary">
      Couldn't load {what}.
    </Typography>
    <Button variant="outlined" startIcon={<RefreshIcon />} onClick={onRetry}>
      Try again
    </Button>
  </Paper>
);

export const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <Typography color="text.secondary" sx={{ py: 2 }}>
    {message}
  </Typography>
);
