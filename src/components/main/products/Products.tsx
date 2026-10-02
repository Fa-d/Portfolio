import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import ProductCard, { ProductProps } from "./ProductCard";
import SectionContainer from "../../common/SectionContainer";
import SectionHeader from "../../common/SectionHeader";
import { CardGridSkeleton, EmptyState, ErrorState } from "../../common/DataStates";
import { useJsonData } from "../../../utils/useJsonData";

const Products: React.FC = () => {
  const { data, loading, error, retry } = useJsonData<ProductProps[]>("/data/products.json");
  const location = useLocation();
  const items = data ?? [];

  // Show featured products on home page, max 2
  const maxItems = 2;

  // Show all products on the /products route, featured subset elsewhere
  const showAll = location.pathname === "/products";

  // Scroll to the anchored product once data has loaded
  useEffect(() => {
    if (!loading && location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading, location.hash]);

  const displayedItems = showAll
    ? items
    : items.filter((item) => item.featured).slice(0, maxItems);

  return (
    <SectionContainer id="products">
      <SectionHeader
        title="Products"
        subtitle="Apps I build and ship on my own."
        seeAllTo={!showAll && items.length > displayedItems.length ? "/products" : undefined}
      />

      {error ? (
        <ErrorState what="products" onRetry={retry} />
      ) : loading ? (
        <CardGridSkeleton count={showAll ? 3 : 2} minWidth={340} mediaHeight={200} />
      ) : displayedItems.length === 0 ? (
        <EmptyState message="No products listed yet." />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: 3,
          }}
        >
          {displayedItems.map((item, index) => (
            <Box
              component="article"
              key={item.id || index}
              id={item.id}
              sx={{ display: "flex", minHeight: 0 }}
            >
              <ProductCard product={item} isHomePage={!showAll} />
            </Box>
          ))}
        </Box>
      )}
    </SectionContainer>
  );
};

export default Products;
