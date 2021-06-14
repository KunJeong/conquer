//@ts-check
import {
  action,
  observable,
  computed,
  makeObservable,
  autorun,
  runInAction,
} from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { mapDimensions } from "../constants";
import { Cell, CellStore } from "./CellStore";
import gsap from "gsap";

import anime from "animejs";
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
  @observable width: number = 160;
  @observable spacing: number = 5;
  minWidth = 80;
  maxWidth = 280;

  @observable offsetX = 0;
  @observable offsetY = 0;

  @observable mouseX: number = 0;
  @observable mouseY: number = 0;

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
  @action startTimer(minutes: number) {
    this.secondsRemaining = minutes * 60;
    this.secondsTotal = minutes * 60;
    this.mode = Mode.Focus;
  }

  @action decreaseTimer(cellId: string) {
    this.secondsRemaining -= 1;
    if (this.secondsRemaining === 0) {
      this.select(cellId);
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
  }

  @action zoom(out: boolean) {
    if (out) this.width -= 40;
    else this.width += 40;
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
      snap: {
        mapX: 0.01 * xFactor,
        mapY: 0.01 * yFactor,
      },
    });
  }
}
