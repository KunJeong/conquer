import Page from '../components/Page'
import dynamic from 'next/dynamic'
import NoSSR from 'react-no-ssr';
// import IsometricGrid from 'react-isometric-grid'
import { Container, Box, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { get } from 'mobx';

const IsometricGrid = dynamic(() => import('react-isometric-grid'), {
  ssr: false
})
const Cell = dynamic(import('react-isometric-grid').then(module => {
  const {Cell} = module
  return Cell
}), {
  ssr: false
});


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

export default function Index() {
  const classes = useStyles();

  const defaultCell = {todo: false, title: "none"}

  const [cells, setCells] = React.useState([
    defaultCell, defaultCell, defaultCell,
    defaultCell
    // , defaultCell, defaultCell,
    // defaultCell, defaultCell, defaultCell,
    // defaultCell, defaultCell, defaultCell,
    // defaultCell, defaultCell, defaultCell,
    // defaultCell
  ])

  const addTodo = (index) => {
    console.log("add");
    console.log(cells)
    console.log(index)
    const newCells = cells.map((cell, i) => {
      if(index==i) return {todo: true, title: "todo"}
      else return cell
    })
    console.log(newCells)
    setCells(newCells)
  }
  const removeTodo = (index) => {
    console.log("add");
    console.log(cells)
    console.log(index)
    const newCells = cells.map((cell, i) => {
      if(index==i) return {todo: false, title: "none"}
      else return cell
    })
    console.log(newCells)
    setCells(newCells)
  }
  

  
  return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          { typeof window !== 'undefined' && 
          <IsometricGrid
            shadow
            perspective={0}
            transform="rotateX(45deg) rotateZ(45deg)"
            style={{ height: '600px', width: '600px', position: 'absolute', left: 0, top: 0 }}
          >
            {cells.map((cell, index) => (
                <Cell
                key={index}
                onClick={cell.todo ? () => removeTodo(index) : () => addTodo(index)}
                title={cell.title}
                layers={cell.todo ? [
                  '#1aff43',
                  '#c322a3',
                  '#9eb5c2',
                ] : [
                  
                  '#ffffff',
                  '#a1a1a1',
                  '#ffffff',
                ]}
              />
            ))}
          </IsometricGrid>
          }
        </Grid>
        <Grid item xs={3}>
        <Paper className={classes.paper} elevation={3}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              My Todo List
            </Typography>
            {cells.map((cell, index) => {
            if(cell.todo) return (
              <Typography>
                {"Todo: " + cell.title}
              </Typography>
            )
            else return (
              <Box></Box>
            )
          })}
        </Paper>
        </Grid>
      </Grid>
  )
  
}
