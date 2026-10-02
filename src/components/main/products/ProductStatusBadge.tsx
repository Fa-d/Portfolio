import React from "react";
import { Chip, SxProps, Theme } from "@mui/material";

export type ProductStatus = "released" | "beta" | "coming-soon";

interface ProductStatusBadgeProps {
  status: ProductStatus;
  sx?: SxProps<Theme>;
}

const statusConfig: Record<
  ProductStatus,
  { label: string; bgColor: string }
> = {
  released: {
    label: "Released",
    bgColor: "success.dark",
  },
  beta: {
    label: "Beta",
    bgColor: "warning.dark",
  },
  "coming-soon": {
    label: "Coming Soon",
    bgColor: "grey.700",
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
        color: "common.white",
        fontWeight: 600,
        ...sx,
      } as SxProps<Theme>}
    />
  );
};

export default ProductStatusBadge;
