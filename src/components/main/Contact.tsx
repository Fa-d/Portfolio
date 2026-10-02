import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DownloadIcon from "@mui/icons-material/Download";
import SectionContainer from "../common/SectionContainer";
import { CONTACT_EMAIL, ContactItems } from "./ContactItems";
import { RESUME_PATH } from "../../utils/siteStrings";

const Contact: React.FC = () => (
  <SectionContainer id="contact" sx={{ pb: { xs: 6, md: 10 } }}>
    <Box
      sx={{
        borderRadius: 4,
        px: { xs: 3, md: 8 },
        py: { xs: 5, md: 7 },
        textAlign: "center",
        color: "common.white",
        background: (theme) => theme.palette.custom.gradient,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          top: -160,
          right: -80,
          background: "rgba(255,255,255,0.08)",
        },
      }}
    >
      <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" }, mb: 1.5, position: "relative" }}>
        Let's work together
      </Typography>
      <Typography sx={{ opacity: 0.9, maxWidth: 560, mx: "auto", mb: 4, position: "relative" }}>
        Have a project, a role, or an open-source idea in mind? I'm happy to talk about Android, mobile and
        full-stack work.
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        justifyContent="center"
        sx={{ mb: 4, position: "relative" }}
      >
        <Button
          href={`mailto:${CONTACT_EMAIL}`}
          variant="contained"
          size="large"
          startIcon={<MailOutlineIcon />}
          sx={{
            bgcolor: "common.white",
            color: "secondary.dark",
            borderRadius: 2.5,
            px: 3,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          {CONTACT_EMAIL}
        </Button>
        <Button
          href={RESUME_PATH}
          download
          variant="outlined"
          size="large"
          startIcon={<DownloadIcon />}
          sx={{
            color: "common.white",
            borderColor: "rgba(255,255,255,0.7)",
            borderRadius: 2.5,
            px: 3,
            "&:hover": { borderColor: "common.white", bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          Download resume
        </Button>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
        <ContactItems onDark size={40} />
      </Box>
    </Box>
  </SectionContainer>
);

export default Contact;
