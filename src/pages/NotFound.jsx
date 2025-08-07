import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home, ArrowBack } from "@mui/icons-material";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            black 20px,
            black 21px
          )`,
        }}
      />

      <Stack
        spacing={4}
        alignItems="center"
        textAlign="center"
        sx={{ zIndex: 1, maxWidth: 600, px: 4 }}
      >
        {/* 404 Large Text */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "8rem", md: "12rem" },
            fontWeight: 800,
            color: "primary.main",
            lineHeight: 0.8,
            textShadow: "4px 4px 0px rgba(255, 0, 0, 0.3)",
            userSelect: "none",
          }}
        >
          404
        </Typography>

        {/* Main Message */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            color: "text.secondary",
            mb: 2,
            letterSpacing: 3,
          }}
        >
          PAGE NOT FOUND
        </Typography>

        {/* Subtext */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.2rem" },
            color: "text.primary",
            fontFamily: "Space Mono, monospace",
            maxWidth: 400,
            lineHeight: 1.6,
          }}
        >
          The page you're looking for doesn't exist or has been moved. It's
          probably unnecessary anyway.
        </Typography>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "primary.main",
              color: "background.default",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontFamily: "Oswald, sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
              border: "2px solid black",
              "&:hover": {
                backgroundColor: "background.default",
                color: "primary.main",
                transform: "translateY(-2px)",
                boxShadow: "5px 5px 0px rgba(255, 0, 0, 0.5)",
              },
            }}
          >
            Go Home
          </Button>

          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              borderColor: "text.secondary",
              color: "text.secondary",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontFamily: "Oswald, sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
              border: "2px solid",
              borderColor: "text.secondary",
              "&:hover": {
                backgroundColor: "text.secondary",
                color: "background.default",
                transform: "translateY(-2px)",
                boxShadow: "5px 5px 0px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Go Back
          </Button>
        </Stack>

        {/* Brand Message */}
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: "2px solid",
            borderColor: "primary.main",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.9rem",
              color: "text.primary",
              opacity: 0.7,
              letterSpacing: 1,
            }}
          >
            UNSSRY - Built for the Unnecessary
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default NotFound;
