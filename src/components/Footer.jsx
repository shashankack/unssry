import React from "react";
import {
  Grid,
  Box,
  Stack,
  Link,
  Button,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import whiteLogo from "/images/logos/white_logo.png";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { label: "New Arrivals", redirect: "#" },
        { label: "Outwear", redirect: "#" },
        { label: "Bottoms", redirect: "#" },
        { label: "Accessories", redirect: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Size Guide", redirect: "#" },
        { label: "Returns", redirect: "#" },
        { label: "Privacy Policy", redirect: "/privacy-policy" },
        { label: "Terms of Service", redirect: "#" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { label: "Instagram", redirect: "#" },
        { label: "TikTok", redirect: "#" },
        { label: "Twitter", redirect: "#" },
        { label: "Discord", redirect: "#" },
      ],
    },
  ];

  const renderFooterSection = (section, index) => {
    const content = section.links.map((link, linkIndex) => (
      <Link
        key={linkIndex}
        href={link.redirect}
        underline="none"
        color="background.default"
        fontFamily={"Oswald, sans-serif"}
        sx={{
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "text.secondary",
          },
        }}
      >
        {link.label}
      </Link>
    ));

    if (isMobile) {
      return (
        <Accordion
          key={index}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            borderTop: "2px solid white",
            "&:last-child": {
              borderBottom: "2px solid white",
            },

            "&:before": {
              display: "none",
            },
            "& .MuiAccordionSummary-root": {
              padding: 0,
              minHeight: "auto",
            },
            "& .MuiAccordionDetails-root": {
              padding: "8px 0",
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMore
                sx={{
                  color: "white",
                  fontSize: "20px",
                }}
              />
            }
            sx={{
              "& .MuiAccordionSummary-content": {
                margin: "12px 0",
              },
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              fontFamily="Oswald, sans-serif"
              textTransform="uppercase"
            >
              {section.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1.5}>{content}</Stack>
          </AccordionDetails>
        </Accordion>
      );
    }

    return (
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 4,
        }}
        key={index}
      >
        <Stack spacing={2} padding={2}>
          <Typography variant="h6" color="text.secondary">
            {section.title}
          </Typography>
          <Stack spacing={1.5}>{content}</Stack>
        </Stack>
      </Grid>
    );
  };

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
          sm: "row",
        }}
        width={{
          xs: "100%",
          sm: "75%",
        }}
      >
        {/* Logo */}
        <Box
          height="100%"
          width={isMobile ? "100%" : 300}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mb={isMobile ? 3 : 0}
        >
          <Box
            component="img"
            src={whiteLogo}
            alt="Logo"
            sx={{
              width: 150,
              height: "auto",
              marginBottom: 2,
            }}
          />
        </Box>

        {/* Footer Links */}
        {isMobile ? (
          <Stack width="100%" spacing={0}>
            {footerLinks.map((section, index) =>
              renderFooterSection(section, index)
            )}
          </Stack>
        ) : (
          <Grid container flex={1}>
            {footerLinks.map((section, index) =>
              renderFooterSection(section, index)
            )}
          </Grid>
        )}

        {/* Newsletter */}
        <Box
          width={isMobile ? "100%" : 400}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="start"
          padding={2}
          mt={isMobile ? 2 : 0}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            marginBottom={2}
            fontFamily="Oswald, sans-serif"
            textTransform="uppercase"
          >
            Stay Updated
          </Typography>
          <Stack
            spacing={2}
            width="100%"
            direction={{
              xs: "column",
              sm: "row",
            }}
          >
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              type="email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: "white",
                    borderRadius: 3,
                  },
                  "&:hover fieldset": {
                    borderColor: "#ff0000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff0000",
                  },
                },
                "& .MuiInputBase-input": {
                  fontFamily: "Oswald, sans-serif",
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "red",
                color: "white",
                padding: "10px 40px",
                border: "2px solid red",
                fontFamily: "Oswald, sans-serif",
                textTransform: "uppercase",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "text.secondary",
                },
              }}
            >
              Subscribe
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Divider
        sx={{
          width: "75%",
          marginY: 4,
          backgroundColor: "white",
        }}
      />

      <Stack
        width="75%"
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography>© 2025 UNNECESSARY. All rights reserved.</Typography>
        <Typography>BUILT FOR THE UNNECESSARY</Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
