//@ts-check
import { action, observable, computed, makeObservable, configure } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

configure({ enforceActions: "always" });

export enum CellType {
  Grass = "grass",
  Todo = "todo",
  Timer = "timer",
  Add = "add",
}

export class Cell {
  store: CellStore;
  id: string = null;
  @observable type: CellType;
  @observable name: string = "";
  i: number;
  j: number;

  constructor(
    store: CellStore,
    i: number,
    j: number,
    type = CellType.Grass,

    save: boolean = true,
    id = uuidv4()
  ) {
    this.store = store;
    this.id = id;
    this.i = i;
    this.j = j;
    this.type = type;
    console.log(`created cell: ${i}, ${j}, ${type.toString()}`);
    if (save) {
      this.save();
    }
    makeObservable(this);
  }

  @action editName(newName: string) {
    this.name = newName;
  }

  @computed get layer() {
    return this.i + this.j;
  }

  @action save() {
    axios
      .post("http://localhost:3000/cells", {
        id: this.id,
        type: this.type.toString(),
        i: this.i,
        j: this.j,
      })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error1");
        } else if (error.request) {
          console.log("error2");
        } else {
          console.log("error3");
        }
      });
  }
}
export class CellStore {
  @observable cells = [];

  constructor() {
    // this.initStore();
    makeObservable(this);
  }

  @action _deleteCells() {
    this.cells = [];
  }
  @action async _deleteCellsAndSave() {
    this._deleteCells();
    return await axios
      .delete("http://localhost:3000/cells")
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error1");
        } else if (error.request) {
          console.log("error2");
        } else {
          console.log("error3");
        }
      });
  }

  @action getCells() {
    axios
      .get("http://localhost:3000/cells")
      .then((response) => {
        console.log(response);
        let newCells = response.data.cells.map((cell) => {
          return new Cell(this, cell.i, cell.j, cell.type, false);
        });
        console.log(newCells);
        this.cells = newCells;
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error1");
        } else if (error.request) {
          console.log("error2");
        } else {
          console.log("error3");
        }
      });
  }

  //PROTOTYPE
  @action addTodo(selection: number) {
    let { id, i, j } = this.sortedCells[selection];

    let cellIndex = this.cells.findIndex((e) => {
      return e.i == i && e.j == j;
    });
    this.cells[cellIndex] = new Cell(this, i, j, CellType.Todo, false, id);
    this._modifyCellAndSave(i, j, CellType.Todo);
  }

  //TESTING
  @action initStore() {
    this._deleteCellsAndSave()
      .then(
        () =>
          (this.cells = [
            new Cell(this, 0, 0, CellType.Grass),
            new Cell(this, -1, 0, CellType.Add),
            new Cell(this, 1, 0, CellType.Add),
            new Cell(this, 0, -1, CellType.Add),
            new Cell(this, 0, 1, CellType.Add),
          ])
      )
      .then(() => this.getCells());
  }

  @computed get sortedCells() {
    return this.cells.slice().sort((a, b) => {
      if (a.layer > b.layer) return 1;
      if (a.layer < b.layer) return -1;
      if (a.i > b.i) return 1;
      if (a.i < b.i) return -1;
    });
  }

  @computed get mapSize() {
    let minI = 10000;
    let minJ = 10000;
    let maxI = -10000;
    let maxJ = -10000;
    this.cells.forEach((e) => {
      if (e.i < minI) minI = e.i;
      if (e.i > maxI) maxI = e.i;
      if (e.j < minJ) minJ = e.j;
      if (e.j > maxJ) maxJ = e.j;
    });
    return { minI, minJ, maxI, maxJ };
  }

  @computed get cellCount() {
    return this.cells.length;
  }

  @action startTimer(i: number, j: number) {
    this._modifyCell(i, j, CellType.Timer);
  }

  @action _addCellAndSave(i: number, j: number, type: CellType) {
    const cell = new Cell(this, i, j, type);
    this.cells.push(cell);
    // axios.post("http://localhost:3000/cells", { i, j, type });
  }

  @action _modifyCell(i: number, j: number, type: CellType) {
    let cellIndex = this.cells.findIndex((e) => {
      return e.i == i && e.j == j;
    });
    this.cells[cellIndex] = new Cell(this, i, j, type, false);
  }

  @action _modifyCellAndSave(i: number, j: number, type: CellType) {
    this._modifyCell(i, j, type);
    axios.patch("http://localhost:3000/cells", { i, j, type });
  }

  @action _checkAndAddCellAndSave(i: number, j: number, type: CellType) {
    if (
      !this.cells.some((e) => {
        return e.i == i && e.j == j;
      })
    ) {
      this._addCellAndSave(i, j, type);
    }
  }

  @action addCell(i: number, j: number) {
    this._modifyCellAndSave(i, j, CellType.Grass);
    this._checkAndAddCellAndSave(i - 1, j, CellType.Add);
    this._checkAndAddCellAndSave(i + 1, j, CellType.Add);
    this._checkAndAddCellAndSave(i, j - 1, CellType.Add);
    this._checkAndAddCellAndSave(i, j + 1, CellType.Add);
  }
}
