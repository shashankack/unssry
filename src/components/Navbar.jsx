import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Divider,
  Badge,
  Typography,
} from "@mui/material";
import { ShoppingCart, Close, Menu, SearchOutlined } from "@mui/icons-material";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import SearchPopup from "./SearchPopup";

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const { cartItemCount, openCart, loading: cartLoading } = useCart();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "#shop" },
    { name: "About", path: "#about" },
    { name: "Contact", path: "/contact" },
  ];

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Search popup state
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  // Hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Render desktop nav links
  const renderDesktopNavLinks = () => (
    <Box
      component="nav"
      sx={{
        display: { xs: "none", md: "flex" },
        gap: 3,
        alignItems: "center",
      }}
    >
      {navLinks.map((link) => {
        const isActive =
          location.pathname === link.path ||
          (link.path.startsWith("#") && location.hash === link.path);

        if (link.path.startsWith("#")) {
          // Handle hash links (for same-page navigation)
          return (
            <Typography
              key={link.name}
              component="span"
              onClick={(e) => {
                e.preventDefault();
                const sectionId = link.path.substring(1); // Remove the #
                const element = document.getElementById(sectionId);
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                } else {
                  // Fallback: try to find element by data attribute or class
                  const fallbackElement =
                    document.querySelector(`[data-section="${sectionId}"]`) ||
                    document.querySelector(`.${sectionId}-section`);
                  if (fallbackElement) {
                    fallbackElement.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }
              }}
              sx={{
                fontWeight: isActive ? 700 : 500,
                fontSize: "1.1rem",
                px: 1,
                cursor: "pointer",
                transition: "color 0.2s",
                color: isActive ? "primary.secondary" : "text.primary",
                textDecoration: "none",
                "&:hover": { color: "text.secondary" },
              }}
            >
              {link.name}
            </Typography>
          );
        } else {
          // Handle router links
          return (
            <Typography
              key={link.name}
              component={RouterLink}
              to={link.path}
              sx={{
                fontWeight: isActive ? 700 : 500,
                fontSize: "1.1rem",
                px: 1,
                cursor: "pointer",
                transition: "color 0.2s",
                color: isActive ? "text.secondary" : "text.primary",
                textDecoration: "none",
                "&:hover": { color: "text.secondary" },
              }}
            >
              {link.name}
            </Typography>
          );
        }
      })}
    </Box>
  );

  // Render mobile drawer
  const renderMobileDrawer = () => (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      PaperProps={{
        sx: { width: 270, background: theme.palette.background.default },
      }}
    >
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navLinks.map((link) => {
          const isActive =
            location.pathname === link.path ||
            (link.path.startsWith("#") && location.hash === link.path);

          return (
            <ListItem
              key={link.name}
              onClick={() => {
                setDrawerOpen(false);
                if (link.path.startsWith("/")) {
                  navigate(link.path);
                } else if (link.path.startsWith("#")) {
                  // For hash links, use smooth scrolling
                  const sectionId = link.path.substring(1); // Remove the #
                  const element = document.getElementById(sectionId);
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  } else {
                    // Fallback: try to find element by data attribute or class
                    const fallbackElement =
                      document.querySelector(`[data-section="${sectionId}"]`) ||
                      document.querySelector(`.${sectionId}-section`);
                    if (fallbackElement) {
                      fallbackElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    } else {
                      // Last resort: set hash for manual handling
                      window.location.hash = link.path;
                    }
                  }
                }
              }}
              sx={{ cursor: "pointer" }}
            >
              <ListItemText
                primary={link.name}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "primary.main" : "inherit",
                  fontSize: "2rem",
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: showNavbar ? 0 : -92,
          transition: "top 0.25s cubic-bezier(.8,.2,.1,1)",
          bgcolor: "background.default",
          color: "text.primary",
          borderBottom: `3px solid black`,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          px={{ xs: 1.5, md: 4 }}
          minHeight={68}
        >
          {/* Logo */}
          <Box
            onClick={() => navigate("/")}
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.2rem", md: "1.45rem" },
              letterSpacing: "0.03em",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": { transform: "scale(1.05)" },
              transition: "transform 0.25s",
              mr: { xs: 1, md: 3 },
            }}
          >
            <Box
              component="img"
              src="/images/logos/black_logo.png"
              sx={{
                width: 150,
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
          {/* Desktop nav links */}
          {renderDesktopNavLinks()}

          {/* Actions: Search, Cart, Menu button */}
          <Box display="flex" alignItems="center" ml={1}>
            {/* Search Icon */}
            <IconButton
              color="inherit"
              aria-label="search"
              sx={{ mx: 1 }}
              onClick={() => setSearchOpen(true)}
            >
              <SearchOutlined />
            </IconButton>
            {/* Cart Icon */}
            <IconButton
              color="inherit"
              aria-label="cart"
              sx={{ mx: 1 }}
              onClick={openCart}
            >
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {/* Mobile drawer menu */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </AppBar>
      {/* Mobile drawer nav */}
      {renderMobileDrawer()}

      {/* Search Popup */}
      <SearchPopup open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
