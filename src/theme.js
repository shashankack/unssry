import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ff0000",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#ff0000",
    },
  },

  typography: {
    fontFamily: '"Space Mono", monospace',
    h1: {
      fontFamily: "Oswald, sans-serif",
      letterSpacing: 2,
      fontWeight: 800,
      textTransform: "uppercase",
    },
    h6: {
      fontFamily: "Oswald, sans-serif",
      fontWeight: 600,
      textTransform: "uppercase",
    },
    body1: {
      fontWeight: 400,
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          transition: "all 0.3s ease",
          "&:hover": {
            color: theme.palette.text.secondary,
            backgroundColor: "transparent",
            transform: "scale(1.1)",
          },
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Arial, sans-serif",
          fontWeight: 600,
          padding: {
            xs: "10px 20px",
            md: "10px 40px",
          },
          borderRadius: "8px",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  },
});

export default theme;
