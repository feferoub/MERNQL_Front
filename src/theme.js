import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#211f1f" },
    secondary: { main: "#f50057", disabled: "#f5005760" },
    white: "#FAFAFA",
  },
});

export default theme;
