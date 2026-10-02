import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import LaunchIcon from "@mui/icons-material/Launch";
import SectionContainer from "../common/SectionContainer";
import SectionHeader from "../common/SectionHeader";
import { CardGridSkeleton, EmptyState, ErrorState } from "../common/DataStates";
import { useJsonData } from "../../utils/useJsonData";

export interface ArticlesNoteProps {
  title: string;
  date: string;
  url: string;
}

const ArticleNote: React.FC<{ isArticle: boolean }> = ({ isArticle }) => {
  const kind = isArticle ? "articles" : "notes";
  const { data, loading, error, retry } = useJsonData<ArticlesNoteProps[]>(`/data/${kind}.json`);
  const items = data ?? [];

  return (
    <SectionContainer id={kind}>
      <SectionHeader title={isArticle ? "Articles" : "Notes"} />

      {error ? (
        <ErrorState what={kind} onRetry={retry} />
      ) : loading ? (
        <CardGridSkeleton count={2} minWidth={340} />
      ) : items.length === 0 ? (
        <EmptyState message={`No ${kind} published yet.`} />
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          }}
        >
          {items.map((item, index) => {
            const content = (
              <Box sx={{ p: 3, display: "flex", gap: 2, alignItems: "flex-start", height: "100%" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h3" sx={{ fontSize: "1.15rem", lineHeight: 1.4, mb: 1.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.date}
                  </Typography>
                </Box>
                {item.url && (
                  <LaunchIcon fontSize="small" sx={{ color: "primary.main", mt: 0.5 }} aria-hidden />
                )}
              </Box>
            );

            return (
              <Card
                component="article"
                key={item.url || index}
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                  "&:hover, &:focus-within": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                    borderColor: "primary.main",
                  },
                }}
              >
                {item.url ? (
                  <CardActionArea
                    component="a"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.title} (opens in a new tab)`}
                    sx={{ height: "100%" }}
                  >
                    {content}
                  </CardActionArea>
                ) : (
                  content
                )}
              </Card>
            );
          })}
        </Box>
      )}
    </SectionContainer>
  );
};

export default ArticleNote;
