import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  SxProps,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SyncIcon from "@mui/icons-material/Sync";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export interface ProductFeatureProps {
  title: string;
  description: string;
  icon?: string;
}

interface ProductFeatureListProps {
  features: ProductFeatureProps[];
  maxDisplay?: number;
  sx?: SxProps;
}

const iconMap: Record<string, React.ReactElement> = {
  track_changes: <TrackChangesIcon fontSize="small" />,
  wb_sunny: <WbSunnyIcon fontSize="small" />,
  sync: <SyncIcon fontSize="small" />,
  analytics: <AnalyticsIcon fontSize="small" />,
  notifications_active: <NotificationsActiveIcon fontSize="small" />,
  dark_mode: <DarkModeIcon fontSize="small" />,
};

const ProductFeatureList: React.FC<ProductFeatureListProps> = ({
  features,
  maxDisplay = 3,
  sx = {},
}) => {
  const [expanded, setExpanded] = useState(false);
  const showExpandable = features.length > maxDisplay;
  const displayedFeatures = features.slice(0, maxDisplay);

  return (
    <Box sx={{ ...sx }}>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          display: "block",
          mb: 1.5,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Key Features
      </Typography>
      <Stack spacing={1.5}>
        {displayedFeatures.map((feature, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "flex-start" }}
          >
            <Box
              sx={{
                color: "primary.main",
                mt: 0.2,
                display: "flex",
                alignItems: "center",
              }}
            >
              {iconMap[feature.icon || ""] || <CheckCircleIcon fontSize="small" />}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  mb: 0.2,
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  lineHeight: 1.4,
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
      {showExpandable && (
        <>
          <Collapse in={expanded}>
            <Box sx={{ mt: 1.5 }}>
              {features.slice(maxDisplay).map((feature, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "flex-start", mb: 1.5 }}
                >
                  <Box
                    sx={{
                      color: "primary.main",
                      mt: 0.2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {iconMap[feature.icon || ""] || (
                      <CheckCircleIcon fontSize="small" />
                    )}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        mb: 0.2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.85rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Box>
          </Collapse>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              size="small"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              }
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              {expanded
                ? "Show less"
                : `Show ${features.length - maxDisplay} more`}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductFeatureList;
