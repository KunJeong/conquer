//@ts-check
import {
  Container,
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Card,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useStores } from "../hooks/useStores";
import { useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Inspector, Map } from "../components";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  title: (props) => ({
    ...props.style,
    fontSize: 18,
  }),
  body: (props) => ({
    ...props.style,
    fontSize: 20,
  }),
  seconds: (props) => ({
    ...props.style,
    fontSize: 30,
  }),
  paper: {
    padding: "20px",
    textAlign: "center",
  },
});

function AddTodo(props) {
  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const editTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Paper className={classes.paper} elevation={3} margin={4}>
      <Box>
        <TextField
          label="Title"
          value={title}
          onChange={editTitle}
          margin="normal"
        ></TextField>
        <Button onClick={props.addTodo(title)}>Create</Button>
      </Box>
    </Paper>
  );
}

const Index = observer(function Index() {
  const classes = useStyles();
  const { cells, ui } = useStores();
  const seconds = new Date(ui.secondsRemaining * 1000)
    .toISOString()
    .substr(11, 8);

  useEffect(() => {
    cells.getCells();
  }, []);

  return (
    <Box mx={2}>
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <Inspector />
        </Grid>
        <Grid item xs={8}>
          <Map />
        </Grid>
      </Grid>
    </Box>
  );
});

export default Index;
