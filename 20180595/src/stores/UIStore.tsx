//@ts-check
import { action, observable, computed, makeObservable, autorun } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
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
  @observable mode: Mode = Mode.List;
  @observable width: number = 160;
  minWidth = 80;
  maxWidth = 280;

  //selection
  @observable selectedCell: string = "";

  @observable isPanning: boolean = false;

  //timer
  @observable secondsTotal: number = 30;
  @observable secondsRemaining: number = 30;

  constructor() {
    makeObservable(this);

    autorun(() => {
      console.log(`Mode: ${this.mode}`);
    });
  }

  @action deselect() {
    if (this.mode != Mode.Focus && this.mode != Mode.Edit)
      this.mode = Mode.List;
    this.selectedCell = "";
  }

  @action startPan() {
    this.isPanning = true;
  }

  @action endPan() {
    this.isPanning = false;
  }

  @action select(id: string) {
    this.selectedCell = id;
    if (this.mode != Mode.Focus && this.mode != Mode.Edit)
      this.mode = Mode.Selected;
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

  @action zoom(out: boolean) {
    if (out) this.width -= 40;
    else this.width += 40;
  }
}
