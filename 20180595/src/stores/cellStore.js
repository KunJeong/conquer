//@ts-check
import { action, observable, computed, runInAction, makeObservable, autorun } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

export class CellStore {
  @observable cells = [
    {type: 'add', i: 0, j: 0, layer: 0},
  ];

  constructor() {
    makeObservable(this);
    // autorun(() => console.log(this.report));
  }

  @computed get groundCells() {
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
    if(!this.cells.some(e => {
      return e.i == i-1 && e.j == j
    })) { this.cells.push({
        type: 'add',
        i: i - 1,
        j: j,
        layer: i + j - 1
    })}
    if(!this.cells.some(e => {
      return e.i == i && e.j == j-1
    })) {
      this.cells.push({
        type: 'add',
        i: i,
        j: j-1,
        layer: i + j - 1
    })}
    if(!this.cells.some(e => {
      return e.i == i+1 && e.j == j
    })) {
      this.cells.push({
        type: 'add',
        i: i +1,
        j: j,
        layer: i + j + 1
    })}
    if(!this.cells.some(e => {
      return e.i == i && e.j == j+1
    })) {
      this.cells.push({
        type: 'add',
        i: i,
        j: j+1,
        layer: i + j+ 1
    })}
  }
}