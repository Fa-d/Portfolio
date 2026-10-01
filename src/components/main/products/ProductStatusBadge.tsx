import React from "react";
import { Chip, SxProps, Theme } from "@mui/material";
import { keyframes } from "@emotion/react";

export type ProductStatus = "released" | "beta" | "coming-soon";

interface ProductStatusBadgeProps {
  status: ProductStatus;
  sx?: SxProps<Theme>;
}

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
`;

const statusConfig: Record<
  ProductStatus,
  { label: string; bgColor: string; animation?: string }
> = {
  released: {
    label: "Released",
    bgColor: "success.main",
  },
  beta: {
    label: "Beta",
    bgColor: "warning.main",
  },
  "coming-soon": {
    label: "Coming Soon",
    bgColor: "grey.400",
    animation: `${pulseAnimation} 2s ease-in-out infinite`,
  },
};

const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({
  status,
  sx = {},
}) => {
  const config = statusConfig[status];

  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        borderRadius: 1,
        pl: 1,
        pr: 1,
        backdropFilter: "blur(4px)",
        bgcolor: config.bgColor,
        color: "white",
        fontWeight: 600,
        animation: config.animation,
        ...sx,
      } as SxProps<Theme>}
    />
  );
};

export default ProductStatusBadge;
