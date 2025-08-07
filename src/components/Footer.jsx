import React from "react";
import {
  Box,
  Stack,
  Link,
  Button,
  Typography,
  TextField,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import whiteLogo from "/images/logos/white_logo.png";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const footerLinks = [
    { label: "Size Guide", redirect: "#" },
    { label: "Returns", redirect: "#" },
    { label: "Privacy Policy", redirect: "/privacy-policy" },
    { label: "Terms of Service", redirect: "#" },
  ];

  return (
    <Stack
      overflow="hidden"
      width="100%"
      bgcolor="primary.main"
      color="white"
      px={2}
      py={6}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        width={{
          xs: "100%",
          sm: "90%",
          md: "85%",
        }}
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo Section */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Box
            component="img"
            src={whiteLogo}
            alt="Logo"
            sx={{
              width: { xs: 120, md: 150 },
              height: "auto",
              marginBottom: 2,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.85rem",
              opacity: 0.8,
              maxWidth: 200,
              lineHeight: 1.4,
            }}
          >
            Unnecessary products for unnecessary people
          </Typography>
        </Box>

        {/* Quick Links */}
        <Stack spacing={2} alignItems={{ xs: "center", md: "flex-start" }}>
          <Typography
            variant="h6"
            color="text.secondary"
            fontFamily="Oswald, sans-serif"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Quick Links
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row", md: "column" }}
            spacing={{ xs: 1, sm: 3, md: 1.5 }}
            alignItems={{ xs: "center", md: "flex-start" }}
          >
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.redirect}
                underline="none"
                color="background.default"
                fontFamily="Space Mono, monospace"
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "text.secondary",
                    transform: "translateX(5px)",
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Stack>

        {/* Newsletter Section */}
        <Stack
          spacing={2}
          alignItems={{ xs: "center", md: "flex-start" }}
          width={{ xs: "100%", md: "auto" }}
          maxWidth={{ xs: "100%", md: 350 }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            fontFamily="Oswald, sans-serif"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Stay Updated
          </Typography>
          <Stack
            spacing={2}
            width="100%"
            direction={{ xs: "column", sm: "row" }}
          >
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              type="email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: "white",
                    borderRadius: 2,
                  },
                  "&:hover fieldset": {
                    borderColor: "#ff0000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff0000",
                  },
                },
                "& .MuiInputBase-input": {
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.9rem",
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "red",
                color: "white",
                padding: "12px 24px",
                border: "2px solid red",
                fontFamily: "Oswald, sans-serif",
                textTransform: "uppercase",
                borderRadius: 2,
                minWidth: { xs: "100%", sm: "auto" },
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "text.secondary",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Subscribe
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Divider
        sx={{
          width: "85%",
          marginY: 4,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      />

      <Stack
        width="85%"
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography
          sx={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.85rem",
            opacity: 0.8,
          }}
        >
          © 2025 UNNECESSARY. All rights reserved.
        </Typography>
        <Typography
          sx={{
            fontFamily: "Oswald, sans-serif",
            fontSize: "0.9rem",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Built for the Unnecessary
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
