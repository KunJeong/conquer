import { Container, Box, Grid, Paper, Typography, TextField, Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Isometric from '../components/Isometric';
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useStores } from '../hooks/useStores';
// import useSWR from 'swr'

const useStyles = makeStyles({
  // bullet: {
  //   display: 'inline-block',
  //   margin: '0 2px',
  //   transform: 'scale(0.8)',
  // },
  title: props => ({
    ...props.style,
    fontSize: 30,
  }),
  body: props => ({
    ...props.style,
    fontSize: 20,
  }),
  // pos: {
  //   marginBottom: 12,
  // },
  paper: {
    padding: '20px',
    textAlign: 'center',
  },

});

// const getter = url => axios.get(url).then(res => res.data)

// function AddTodo(props) {
//   const classes = useStyles();

//   const [title, setTitle] = React.useState("")
//   const editTitle = (event) => {
//     setTitle(event.target.value)
//   }
  
//   return (
//     <Paper className={classes.paper} elevation={3} margin={4}>
//       <Box>
//         <TextField
//           label="Title"
//           value={title}
//           onChange={editTitle}
//           margin="normal"
          
//         ></TextField>
//         <Button onClick={props.addTodo(title)}>Create</Button>
//       </Box>
//     </Paper>
//   )
// }

const Index = observer(function Index() {
  const classes = useStyles();
  const { ui } = useStores();
  const [todos, setTodos] = React.useState([])
  const [addingTodo, setAddingTodo] = React.useState(false)
  const [selectedI, setSelectedI] = React.useState(0)
  const [selectedJ, setSelectedJ] = React.useState(0)

  const seconds = new Date(ui.secondsRemaining * 1000).toISOString().substr(11, 8);

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
        <Grid item xs={4}>
          {ui.timerMode
          ? (
          <Paper className={classes.paper} elevation={3} margin={4}>
            <Box>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Focus on a task for {ui.secondsTotal} seconds!
              </Typography>
              <Typography className={classes.seconds} color="textSecondary" gutterBottom>
                {seconds}
              </Typography>
            </Box>
          </Paper>
          ) : (
            <Paper className={classes.paper} elevation={3} margin={4}>
              <Box>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  no selection
                </Typography>
              </Box>
            </Paper>
          )}
        </Grid>
        <Grid item xs={6}>
          <Isometric/>
        </Grid>
        
      </Grid>
  )
  
})

export default Index
