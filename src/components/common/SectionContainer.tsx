import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";

interface SectionContainerProps {
  id?: string;
  children: ReactNode;
  maxWidth?: number;
  sx?: SxProps<Theme>;
}

// Consistent horizontal gutter, vertical rhythm and max width for every section.
const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  children,
  maxWidth = 1200,
  sx,
}) => (
  <Box
    component="section"
    id={id}
    sx={[
      {
        color: "text.primary",
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 5, md: 8 },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box sx={{ maxWidth, mx: "auto", width: "100%" }}>{children}</Box>
  </Box>
);

export default SectionContainer;
