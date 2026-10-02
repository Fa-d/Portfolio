import React, { Suspense, lazy } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useJsonData } from "../../utils/useJsonData";

// The light player (SVG renderer only) is loaded after first paint, in its own chunk.
const Lottie = lazy(() => import("react-lottie-player/dist/LottiePlayerLight"));

const AvatarPlaceholder: React.FC = () => (
  <Box
    aria-hidden
    sx={{
      width: "90%",
      aspectRatio: "1 / 1",
      borderRadius: "50%",
      background: (theme) => theme.palette.custom.gradient,
      opacity: 0.85,
    }}
  />
);

const HeroAvatar: React.FC<{ name: string }> = ({ name }) => {
  const { data } = useJsonData<object>("/assets/hero-avatar.json");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <Box
      role="img"
      aria-label={`Illustrated portrait of ${name}`}
      sx={{
        width: "100%",
        maxWidth: { xs: 260, sm: 320, md: 400 },
        aspectRatio: "1 / 1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: "drop-shadow(0 20px 40px rgba(102, 126, 234, 0.25))",
      }}
    >
      {data ? (
        <Suspense fallback={<AvatarPlaceholder />}>
          <Lottie
            animationData={data}
            play={!reduceMotion}
            loop
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      ) : (
        <AvatarPlaceholder />
      )}
    </Box>
  );
};

export default HeroAvatar;
