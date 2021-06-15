//@ts-check
import { action, observable, computed, makeObservable, autorun } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { mapDimensions } from "../constants";
import gsap from "gsap";
import { RootStore } from "./RootStore";
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

export enum Mode {
  List,
  Selected,
  Focus,
  AddingTodo,
  AddingTimer,
  Edit,
}

export class UIStore {
  rootStore: RootStore;
  @observable mode: Mode = Mode.List;
  @observable width: number = 150;
  @observable spacing: number = 5;
  minWidth = 90;
  maxWidth = 300;

  @observable offsetX = 0;
  @observable offsetY = 0;

  timer: NodeJS.Timeout;
  timerOnCell: string;

  mouseX: number = 0;
  mouseY: number = 0;

  //selection
  @observable selectedCell: string = undefined;

  @observable isPanning: boolean = false;

  //timer
  @observable secondsTotal: number = 30;
  @observable secondsRemaining: number = 30;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);

    autorun(() => {
      console.log(`Mode: ${this.mode}`);
    });
  }

  @action deselect() {
    if (this.mode != Mode.Focus && this.mode != Mode.Edit)
      this.mode = Mode.List;
    this.selectedCell = undefined;
  }

  @action startPan() {
    this.isPanning = true;
  }

  @action endPan() {
    this.isPanning = false;
  }

  @action select(id: string) {
    this.selectedCell = id;
    if (this.mode != Mode.Focus && this.mode != Mode.Edit) {
      this.mode = Mode.Selected;
      this.panToCell(id);
    }
  }

  @action selectWithoutModeChange(id: string) {
    this.selectedCell = id;
  }

  //timer
  @action startTimer(minutes: number, cellId: string) {
    this.secondsRemaining = minutes * 60;
    this.secondsTotal = minutes * 60;
    this.timerOnCell = cellId;
    console.log(this.timerOnCell);
    this.mode = Mode.Focus;
  }
  @action runTimer(cellId: string) {
    this.timer = setInterval(() => {
      this.decreaseTimer(cellId);
    }, 1000);
  }

  @action stopTimer() {
    clearInterval(this.timer);

    this.select(this.timerOnCell);
    console.log(this.timerOnCell);

    this.rootStore.cellStore.stopTimer(this.timerOnCell);
    this.mode = Mode.Selected;
  }

  @action decreaseTimer(cellId: string) {
    const cell = this.rootStore.cellStore.cellById(cellId);

    this.secondsRemaining -= 1;
    if (this.secondsRemaining === 0) {
      clearInterval(this.timer);
      this.select(cellId);
      this.panToCell(cellId);
      this.rootStore.cellStore.addCell(cell.i, cell.j);
      this.mode = Mode.Selected;
    }
  }

  @computed get percentage() {
    return 100 - (this.secondsRemaining / this.secondsTotal) * 100;
  }

  @action setMode(mode: Mode) {
    this.mode = mode;
  }

  @action panMap(x: number, y: number) {
    this.offsetX += x - this.mouseX;
    this.offsetY += y - this.mouseY;
    console.log("pan to:", this.offsetX, this.offsetY);
  }

  @action zoom(out: boolean) {
    if (out) {
      this.width -= 30;
      gsap.to(this, {
        // width: this.width - 30,
        offsetX: (this.offsetX * (this.width - 30)) / this.width,
        offsetY: (this.offsetY * (this.width - 30)) / this.width,
        duration: 0.01,
      });
    }
    // this.width -= 30;
    else {
      this.width += 30;

      gsap.to(this, {
        // width: this.width + 30,
        offsetX: (this.offsetX * (this.width + 30)) / this.width,
        offsetY: (this.offsetY * (this.width + 30)) / this.width,
        duration: 0.01,
      });
    }
    console.log("zooming", this.width, this.offsetX, this.offsetY);
  }

  @action saveMouse(x: number, y: number) {
    this.mouseX = x;
    this.mouseY = y;
  }

  @action panToCell(id: string) {
    const cell = this.rootStore.cellStore.cellById(id);

    let x = cell.i - cell.j;
    let y = cell.i + cell.j;
    const xFactor = this.width * 0.5 + this.spacing;
    const yFactor = xFactor * mapDimensions.sqrt1over3;
    gsap.to(this, {
      offsetX: x * xFactor,
      offsetY: -y * yFactor,
      duration: 0.4,
    });
    console.log("pan to:", this.offsetX, this.offsetY);
  }
}
