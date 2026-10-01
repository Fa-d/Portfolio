import React from "react";
import {
  Box,
  Button,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import ExtensionIcon from "@mui/icons-material/Extension";
import LanguageIcon from "@mui/icons-material/Language";
import LaptopIcon from "@mui/icons-material/Laptop";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";

export type PlatformType =
  | "android"
  | "ios"
  | "chrome"
  | "web"
  | "windows"
  | "macos";

export interface ProductPlatformProps {
  platform: PlatformType;
  name: string;
  url: string;
  icon?: string;
}

interface ProductPlatformBadgesProps {
  platforms: ProductPlatformProps[];
  sx?: SxProps<Theme>;
}

const platformConfig: Record<
  PlatformType,
  { icon: React.ReactElement; bgColor: string; badgeText: string }
> = {
  android: {
    icon: <AndroidIcon />,
    bgColor: "#01875f",
    badgeText: "GET IT ON",
  },
  ios: {
    icon: <AppleIcon />,
    bgColor: "#000000",
    badgeText: "Download on the",
  },
  chrome: {
    icon: <ExtensionIcon />,
    bgColor: "linear-gradient(135deg, #4285f4, #34a853)",
    badgeText: "Add to",
  },
  web: {
    icon: <LanguageIcon />,
    bgColor: "#1976d2",
    badgeText: "Open on",
  },
  windows: {
    icon: <LaptopIcon />,
    bgColor: "#0078d4",
    badgeText: "Get it from",
  },
  macos: {
    icon: <DesktopMacIcon />,
    bgColor: "#555555",
    badgeText: "Download for",
  },
};

const ProductPlatformBadges: React.FC<ProductPlatformBadgesProps> = ({
  platforms,
  sx = {},
}) => {
  return (
    <Box sx={{ ...sx }}>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          display: "block",
          mb: 1,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Available On
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {platforms.map((platform) => {
          const config = platformConfig[platform.platform];
          return (
            <Button
              key={platform.platform}
              variant="contained"
              size="small"
              startIcon={config.icon}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${config.badgeText} ${platform.name}`}
              sx={{
                background: config.bgColor,
                color: "white",
                textTransform: "none",
                borderRadius: 1.5,
                px: 1.5,
                fontWeight: 500,
                fontSize: "0.85rem",
                "&:hover": {
                  background: config.bgColor,
                  filter: "brightness(1.1)",
                },
              }}
            >
              {platform.name}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ProductPlatformBadges;
