import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Button,
  Paper,
  Skeleton,
} from "@mui/material";
import ProductCard, { ProductProps } from "./ProductCard";

const Products: React.FC = () => {
  const [items, setItems] = useState<ProductProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Show featured products on home page, max 2
  const maxItems = 2;

  // Show all products on the /products route, featured subset elsewhere
  const showAll = location.pathname === "/products";

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/data/products.json");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch products data: ${response.statusText}`
        );
      }
      const data: ProductProps[] = await response.json();
      setItems(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred while fetching products"
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Scroll to the anchored product once data has loaded
  useEffect(() => {
    if (!loading && location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading, location.hash]);

  // On home page, show featured products only (max 2)
  const displayedItems = showAll
    ? items
    : items.filter((item) => item.featured).slice(0, maxItems);

  return (
    <Box
      sx={{
        color: "text.primary",
        px: { xs: 2, md: 12 },
        pb: { xs: 4, md: 8 },
        pt: 4,
      }}
    >
      {error ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="error" sx={{ mb: 2 }}>
            Couldn't load products
          </Typography>
          <Button variant="outlined" onClick={fetchProducts}>
            Retry
          </Button>
        </Paper>
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Products
            </Typography>
            {!loading && items.length > maxItems && location.pathname !== "/products" && (
              <Button
                variant="outlined"
                onClick={() => navigate("/products")}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                See All
              </Button>
            )}
          </Stack>

          {!loading && displayedItems.length === 0 && (
            <Typography>No products found.</Typography>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: 3,
              width: "100%",
              maxWidth: showAll ? "1200px" : "900px",
              mx: "auto",
            }}
          >
            {loading
              ? Array.from({ length: showAll ? 3 : 2 }).map((_, index) => (
                  <Paper
                    key={index}
                    elevation={2}
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      sx={{ height: { xs: 180, sm: 220, md: 260 } }}
                    />
                    <Box sx={{ p: 3 }}>
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1.5rem", width: "60%" }}
                      />
                      <Skeleton variant="text" width="40%" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" sx={{ mb: 2 }} />
                      <Skeleton
                        variant="rounded"
                        height={32}
                        width={140}
                      />
                    </Box>
                  </Paper>
                ))
              : displayedItems.map((item, index) => (
                  <Box
                    component="article"
                    key={item.id || index}
                    id={item.id}
                    sx={{
                      scrollMarginTop: { xs: 72, md: 80 },
                      display: "flex",
                      minHeight: 0,
                    }}
                  >
                    <ProductCard
                      product={item}
                      isHomePage={!showAll}
                    />
                  </Box>
                ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Products;
