import Page from '../components/Page'
import { Container, Box, Grid, Paper, Typography, TextField, Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import IsometricGrid from '../components/IsometricGrid';
import axios from 'axios'
// import useSWR from 'swr'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

// const getter = url => axios.get(url).then(res => res.data)

function AddTodo(props) {
  const classes = useStyles();

  const [title, setTitle] = React.useState("")
  const editTitle = (event) => {
    setTitle(event.target.value)
  }
  
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
  )
}

export default function Index() {
  const classes = useStyles();
  const [todos, setTodos] = React.useState([])
  const [addingTodo, setAddingTodo] = React.useState(false)
  const [selectedI, setSelectedI] = React.useState(0)
  const [selectedJ, setSelectedJ] = React.useState(0)

  const addTodo = (i, j) => {
    // const newTodos = todos.push({i, j, title: "something"})
    // setTodos(newTodos)
    setAddingTodo(true);
    setSelectedI(i);
    setSelectedJ(j);
  }

  const createTodo = (title) => () => {
    console.log(`title: ${title}, i: ${selectedI}, j: ${selectedJ}`)

    axios.post('http://localhost:3000/todos', {
      title: title,
      i: selectedI,
      j: selectedJ
    }).then(function (response) {
      
    })
  }
  return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <IsometricGrid
            width={300}
            height={600}
            childWidth={160}
            spacing={10}
            onClickCell={addTodo}
          />
        </Grid>
        <Grid item xs={3}>
        { addingTodo ? <AddTodo addTodo={createTodo}/> : (
          <Paper className={classes.paper} elevation={3} margin={4}>
            <Box>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                My Todo List
              </Typography>
              {/* {todos.map((todo) => {
                <Typography>
                  {"Todo: " + todo.title}
                </Typography>
              })} */}
            </Box>
          </Paper>
        )}
        </Grid>
      </Grid>
  )
  
}
