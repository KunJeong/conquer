//@ts-check
import { action, observable, computed, runInAction, makeObservable, autorun } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

class CellStore {
  @observable cells = [
    {type: 'add', i: 0, j: 0, layer: 0},
    {type: 'grass', i: 0, j: 1, layer: 1},
    {type: 'grass', i: 1, j: 0, layer: 2},
    {type: 'add', i: 1, j: 1, layer: 3},
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

  @computed get cellCount() {
    return this.cells.length
  }

  @action addCell(cell) {
    this.cells.push({
      type: 'add',
      i: cell.i,
      j: cell.j,
      layer: cell.i + cell.j
    });
  }
}

const cellStore = new CellStore();

export default cellStore