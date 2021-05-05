//@ts-check
import { action, observable, computed, runInAction, makeObservable, autorun } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import _ from 'lodash';
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

class CellStore {
  @observable cells = [
    // {type: 'add', i: 0, j: 0, layer: 0},
    {type: 'grass', i: 0, j: 1, layer: 1},
    {type: 'grass', i: 1, j: 0, layer: 1},
    // {type: 'add', i: 1, j: 1, layer: 2},
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

  @computed get allCells() {
    let set = this.cells.slice();
    this.cells.forEach(({i, j}) => {
      if(!set.some(e => {
        return e.i == i-1 && e.j == j
      })) { set.push({
        type: 'add',
        i: i - 1,
        j: j,
        layer: i + j - 1
      })}
      if(!set.some(e => {
        return e.i == i && e.j == j-1
      })) {
        set.push({
        type: 'add',
        i: i,
        j: j-1,
        layer: i + j - 1
      })}
      if(!set.some(e => {
        return e.i == i+1 && e.j == j
      })) {
        set.push({
        type: 'add',
        i: i +1,
        j: j,
        layer: i + j +1
      })}
      if(!set.some(e => {
        return e.i == i && e.j == j+1
      })) {
        set.push({
        type: 'add',
        i: i,
        j: j+1,
        layer: i + j+ 1
      })}
    })
    return set.sort((a, b) => {
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
    return { minI: minI-1, minJ: minJ-1, maxI: maxI+1, maxJ: maxJ+1}
  }

  @computed get cellCount() {
    return this.cells.length
  }

  @action addCell(i, j) {
    // let cellIndex = this.cells.findIndex(e => {
    //   return e.i == i && e.j == j
    // })
    // console.log(`cellIndex:${cellIndex}`)
    // this.cells[cellIndex] = {
    //   type: 'grass',
    //   i: i,
    //   j: j,
    //   layer: i + j
    // };
    this.cells.push({
      type: 'grass',
      i: i,
      j: j,
      layer: i + j
    })
  }
}

const cellStore = new CellStore();

export default cellStore