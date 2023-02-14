import { createTheme } from "@mui/material";

const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#212121",
      light: "#484848",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e65100",
      light: "#ff833a",
      dark: "#ab1a00",
      contrastText: "#ffffff",
      
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
    },
    error: {
      main: "#e00000",
    },
  },
});

export default LightTheme;
