//@ts-check
import { action, observable, computed, makeObservable, autorun } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { RootStore } from "./RootStore";

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

// configure({ enforceActions: "always" });

export enum CellType {
  Grass = "grass",
  Todo = "todo",
  Timer = "timer",
  Add = "add",
}

export class Cell {
  store: CellStore;
  id: string = null;
  hasElement: string = null;
  @observable type: CellType;
  @observable i: number;
  @observable j: number;

  constructor(
    store: CellStore,
    i: number,
    j: number,
    type: CellType = CellType.Grass,

    save: boolean = true,
    hasElement = null,
    id = uuidv4()
  ) {
    this.store = store;
    this.id = id;
    this.i = i;
    this.j = j;
    this.type = type;
    this.hasElement = hasElement;
    console.log(`created cell: ${i}, ${j}, ${type.toString()}, ${hasElement}`);
    if (save) {
      this.addToServer();
    }
    makeObservable(this);
  }

  // @action editName(newName: string) {
  //   this.name = newName;
  // }

  @computed get x() {
    return this.i - this.j;
  }

  @computed get y() {
    //layer
    return this.i + this.j;
  }

  @action async addToServer() {
    return await axios
      .post("http://localhost:3000/cells", {
        id: this.id,
        type: this.type.toString(),
        i: this.i,
        j: this.j,
        hasElement: this.hasElement,
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

  @action modify(args) {
    console.log("modify", this.id, args);
    const { i, j, type, hasElement } = args;
    if (i !== undefined) this.i = i;
    if (j !== undefined) this.j = j;
    if (type) this.type = type;
    if (hasElement) this.hasElement = hasElement;
  }

  @action async modifyToServer(args) {
    const type = args.type?.toString();
    return await axios
      .patch(`http://localhost:3000/cells/${this.id}`, { ...args, type })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error1");
        } else if (error.request) {
          console.log("error2");
        } else {
          console.log("@modifytoserver- error3");
        }
      });
  }
}
export class CellStore {
  rootStore: RootStore;
  @observable cells: Cell[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
    autorun(() => console.log(this.cells));
  }

  @action private deleteCells() {
    this.cells = [];
  }

  @action private async deleteCellsAndSave() {
    this.deleteCells();
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

  @action async getCells() {
    return await axios
      .get("http://localhost:3000/cells")
      .then((response) => {
        console.log(response);
        let newCells = response.data.cells.map((cell) => {
          return new Cell(
            this,
            cell.i,
            cell.j,
            cell.type,
            false,
            cell.hasElement,
            cell._id
          );
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
  @action addTodo(cellId: string, todoId: string) {
    // const index = this.cells.findIndex((cell) => cell.id === cellId);
    // const { id } = this.cells[index];
    this.modifyCellAndSave(cellId, {
      type: CellType.Todo,
      hasElement: todoId,
    });
  }

  //TESTING
  @action initStore() {
    this.deleteCellsAndSave()
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
      if (a.y > b.y) return 1;
      if (a.y < b.y) return -1;
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

  @action startTimer(id: string) {
    this.modifyCellById(id, { type: CellType.Timer });
  }

  @action stopTimer(id: string) {
    this.modifyCellById(id, { type: CellType.Add });
  }

  @action _addCellAndSave(i: number, j: number, type: CellType) {
    const cell = new Cell(this, i, j, type);

    this.cells.push(cell);
    // axios.post("http://localhost:3000/cells", { i, j, type });
  }

  @action private modifyCellById(id: string, args) {
    this.cellById(id).modify(args);
    // const cell = this.cells[cellIndex];
    // this.cells[cellIndex] = new Cell(
    //   this,
    //   args.i ?? cell.i,
    //   args.j ?? cell.j,
    //   args.type ?? cell.type,
    //   false,
    //   args.hasElement ?? cell.hasElement,
    //   id
    // );
  }

  @action private async modifyCellAndSave(id: string, args) {
    this.modifyCellById(id, args);
    return await this.cellById(id).modifyToServer(args);
    // this._modifyCellById(id, args);
    // return await axios.patch(`http://localhost:3000/cells/${id}`, { ...args });
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
    const id = this.cellByPosition(i, j).id;
    this.modifyCellAndSave(id, { type: CellType.Grass });
    this._checkAndAddCellAndSave(i - 1, j, CellType.Add);
    this._checkAndAddCellAndSave(i + 1, j, CellType.Add);
    this._checkAndAddCellAndSave(i, j - 1, CellType.Add);
    this._checkAndAddCellAndSave(i, j + 1, CellType.Add);
  }

  @action async swapCells(from: string, to: string) {
    const fromCell = this.cellById(from);
    const toCell = this.cellById(to);
    const fromI = fromCell.i;
    const fromJ = fromCell.j;
    const toI = toCell.i;
    const toJ = toCell.j;

    console.log(fromI, fromJ, toI, toJ);
    console.log(this.cellById(from));
    console.log(this.cellById(to));
    this.modifyCellAndSave(from, { i: toI, j: toJ });
    this.modifyCellAndSave(to, { i: fromI, j: fromJ });
    console.log("after");
    console.log(this.cellById(from));
    console.log(this.cellById(to));
  }

  cellById(id: string) {
    return this.cells.find((cell) => cell.id === id);
  }

  cellIndexById(id: string) {
    return this.cells.findIndex((cell) => cell.id === id);
  }

  cellByPosition(i: number, j: number) {
    return this.cells.find((cell) => cell.i == i && cell.j == j);
  }

  cellIndexByPosition(i: number, j: number) {
    return this.cells.findIndex((cell) => cell.i == i && cell.j == j);
  }
}
