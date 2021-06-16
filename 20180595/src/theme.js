import { createMuiTheme } from "@material-ui/core/styles";
import { purple, blueGrey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[200],
    },
    secondary: {
      main: purple[200],
    },
  },
});

theme.spacing(2);

export default theme;
