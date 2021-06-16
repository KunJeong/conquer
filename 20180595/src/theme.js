import { createMuiTheme } from "@material-ui/core/styles";
import { purple, red, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[300],
    },
    secondary: {
      main: red[500],
    },
  },
});

theme.spacing(2);

export default theme;
