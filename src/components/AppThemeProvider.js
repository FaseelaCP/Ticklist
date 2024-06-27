import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import "@fontsource/bungee"; // Assuming you've installed it via npm or yarn

export default function AppThemeProvider({ children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#AB47BC",
        light: "#CE93D8",
        dark: "#8E24AA",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif , Bungee",
      fontWeight: 400,
      fontStyle: "normal",
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
