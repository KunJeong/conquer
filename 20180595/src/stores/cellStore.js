//@ts-check
import { action, observable, computed, makeObservable, configure } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import axios from 'axios'
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

configure({ enforceActions: true })

export class CellStore {
  @observable cells = [
    {type: 'grass', i: 0, j: 0, layer: 0},
    {type: 'add', i: -1, j: 0, layer: -1},
    {type: 'add', i: 1, j: 0, layer: 1},
    {type: 'add', i: 0, j: -1, layer: -1},
    {type: 'add', i: 0, j: 1, layer: 1},
  ];

  constructor() {
    makeObservable(this);
  }

  @action getCells() {
    axios
    .get('http://localhost:3000/cells')
    .then((response) => {
      console.log(response)
      this.cells = response.data.cells
    })
  }

  @action initStore() {
    axios.delete('http://localhost:3000/cells').then((response) => {
      axios.post('http://localhost:3000/cells', { type: 'grass', i: 0, j: 0})
      axios.post('http://localhost:3000/cells', { type: 'add', i: 0, j: 1})
      axios.post('http://localhost:3000/cells', { type: 'add', i: 0, j: -1})
      axios.post('http://localhost:3000/cells', { type: 'add', i: 1, j: 0})
      axios.post('http://localhost:3000/cells', { type: 'add', i: -1, j: 0})
    }).then(this.getCells())
    
    // axios
    // .post('http://localhost:3000/cells', {
    //   type: 'grass', i: 0, j: 0, layer: 0
    // })
    // .then((response) => {
    //   console.log(response.cells)
    //   this.cells = response.cells
    // })
  }

  

  @computed get sortedCells() {
    return this.cells.slice().sort((a, b) => {
      if(a.layer > b.layer) return 1;
      if(a.layer < b.layer) return -1;
      if(a.i > b.i) return 1;
      if(a.i < b.i) return -1;
    })
  }

  @computed get mapSize() {
    let minI=10000;
    let minJ=10000;
    let maxI=-10000;
    let maxJ=-10000;
    this.cells.forEach((e) => {
      if(e.i < minI) minI = e.i
      if(e.i > maxI) maxI = e.i
      if(e.j < minJ) minJ = e.j
      if(e.j > maxJ) maxJ = e.j
    })
    return { minI, minJ, maxI, maxJ }
  }

  // @computed get allCells() {
  //   const { minI, minJ, maxI, maxJ } = this.mapSize

  // }

  @computed get cellCount() {
    return this.cells.length
  }

  @action startTimer(i, j) {
    let cellIndex = this.cells.findIndex(e => {
      return e.i == i && e.j == j
    })
    this.cells[cellIndex] = {
        type: 'timer',
        i: i,
        j: j,
        layer: i + j
    }
  }

  @action addCell(i, j) {
    let cellIndex = this.cells.findIndex(e => {
      return e.i == i && e.j == j
    })
    this.cells[cellIndex] = {
        type: 'grass',
        i: i,
        j: j,
        layer: i + j
    }
    axios.patch('http://localhost:3000/cells', {
      type: 'grass',
      i: i,
      j: j
    })
    if(!this.cells.some(e => {
      return e.i == i-1 && e.j == j
    })) {
      const cell = {
        type: 'add',
        i: i - 1,
        j: j,
        layer: i + j - 1
      }
      this.cells.push(cell);
      axios
      .post('http://localhost:3000/cells', cell)
      .then((response) => {})
    }
    if(!this.cells.some(e => {
      return e.i == i && e.j == j-1
    })) {
      const cell = {
        type: 'add',
        i: i,
        j: j-1,
        layer: i + j - 1
      }
      this.cells.push(cell);
      axios
      .post('http://localhost:3000/cells', cell)
      .then((response) => {})
    }
    if(!this.cells.some(e => {
      return e.i == i+1 && e.j == j
    })) {
      const cell = {
        type: 'add',
        i: i + 1,
        j: j,
        layer: i + j + 1
      }
      this.cells.push(cell);
      axios
      .post('http://localhost:3000/cells', cell)
      .then((response) => {})
    }
    if(!this.cells.some(e => {
      return e.i == i && e.j == j+1
    })) {
      const cell = {
        type: 'add',
        i: i,
        j: j + 1,
        layer: i + j + 1
      }
      this.cells.push(cell);
      axios
      .post('http://localhost:3000/cells', cell)
      .then((response) => {})
  }

  }
}