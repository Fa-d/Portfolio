import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  CardMedia,
  SxProps,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProductStatusBadge, { ProductStatus } from "./ProductStatusBadge";
import ProductPlatformBadges, {
  ProductPlatformProps,
} from "./ProductPlatformBadges";
import ProductFeatureList, {
  ProductFeatureProps,
} from "./ProductFeatureList";

export interface ProductProps {
  id: string;
  name: string;
  tagline: string;
  longDescription: string;
  shortDescription: string;
  image: string;
  website?: string;
  github?: string;
  platforms: ProductPlatformProps[];
  features: ProductFeatureProps[];
  status: ProductStatus;
  featured: boolean;
  tags: string[];
  publishDate: string;
}

interface ProductCardProps {
  product: ProductProps;
  sx?: SxProps;
  isHomePage?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, sx = {}, isHomePage = false }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "2px solid transparent",
        "&:hover, &:focus-within": {
          transform: "translateY(-6px)",
          borderColor: "primary.main",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
        "@media (prefers-reduced-motion: reduce)": {
          transform: "none",
          transition: "none",
          "&:hover, &:focus-within": {
            transform: "none",
          },
        },
        ...sx,
      }}
    >
      {/* Status Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 2,
        }}
      >
        <ProductStatusBadge status={product.status} />
      </Box>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            display: "flex",
            gap: 0.5,
            flexWrap: "wrap",
            maxWidth: "50%",
            justifyContent: "flex-end",
          }}
        >
          {product.tags.slice(0, 2).map((tag, index) => (
            <Box
              key={index}
              sx={{
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                ...(index === 1 && {
                  display: { xs: "none", sm: "block" },
                }),
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      )}

      {/* Hero Image */}
      {product.image && !imgError ? (
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setImgError(true)}
          sx={{
            height: { xs: 180, sm: 220, md: 260 },
            width: "100%",
            objectFit: "cover",
            backgroundColor: "grey.100",
          }}
        />
      ) : (
        <Box
          sx={{
            height: { xs: 180, sm: 220, md: 260 },
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "white",
              lineHeight: 1,
            }}
          >
            {product.name.charAt(0)}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.85)", mt: 0.5 }}
          >
            {product.name}
          </Typography>
        </Box>
      )}

      {/* Content */}
      <Box sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Product Name and Tagline */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 0.5,
            fontSize: "1.5rem",
            lineHeight: 1.2,
            color: "text.primary",
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            color: "primary.main",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          {product.tagline}
        </Typography>

        {/* Short Description */}
        <Typography
          variant="body2"
          sx={{
            mb: 3,
            color: "text.secondary",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.shortDescription}
        </Typography>

        {/* Platform Badges */}
        <ProductPlatformBadges
          platforms={product.platforms}
          sx={{ mb: isHomePage ? 2 : 3 }}
        />

        {/* Feature Highlights - Only on Products page */}
        {!isHomePage && (
          <ProductFeatureList
            features={product.features}
            maxDisplay={3}
            sx={{ mb: 3, flex: 1 }}
          />
        )}

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: "auto" }}
          flexWrap="wrap"
          useFlexGap
        >
          {product.website && (
            <Button
              variant="contained"
              href={product.website}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 2.5,
                fontWeight: 600,
                flex: { xs: "1 1 100%", sm: "1 1 0" },
                minWidth: { sm: 120 },
              }}
            >
              Website
            </Button>
          )}
          {product.github && (
            <Button
              variant="outlined"
              href={product.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 2.5,
                fontWeight: 600,
                flex: { xs: "1 1 100%", sm: "1 1 0" },
                minWidth: { sm: 120 },
              }}
            >
              GitHub
            </Button>
          )}
          {isHomePage && (
            <Button
              variant="text"
              component={Link}
              to={`/products#${product.id}`}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 2,
                fontWeight: 600,
                color: "primary.main",
                flex: { xs: "1 1 100%", sm: "1 1 0" },
                minWidth: { sm: 120 },
              }}
            >
              Learn More
            </Button>
          )}
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProductCard;
