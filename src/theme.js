import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#211f1f" },
    secondary: { main: "#f50057", disabled: "#f5005760" },
    white: { main: "#FAFAFA", disabled: "#FAFAFA70" },
  },
});

export default theme;
