import React, { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface SectionHeaderProps {
  title: string;
  subtitle?: ReactNode;
  // Renders a "See all" link to the section's own page.
  seeAllTo?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, seeAllTo }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 2,
      mb: { xs: 3, md: 4 },
    }}
  >
    <Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1.75rem", md: "2.25rem" },
          color: "text.primary",
          position: "relative",
          pb: 1.5,
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 48,
            height: 4,
            borderRadius: 2,
            background: (theme) => theme.palette.custom.gradient,
          },
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 640 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
    {seeAllTo && (
      <Button
        component={RouterLink}
        to={seeAllTo}
        variant="outlined"
        endIcon={<ArrowForwardIcon />}
        sx={{ flexShrink: 0, borderRadius: 2, px: 2 }}
      >
        See all
      </Button>
    )}
  </Box>
);

export default SectionHeader;
