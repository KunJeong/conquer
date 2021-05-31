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
}

export class UIStore {
  @observable mode: Mode = Mode.List;

  //selection
  @observable selection: number = null;
  @observable selectionPos = {
    selectionI: null,
    selectionJ: null,
  };

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
    if (this.mode != Mode.Focus) this.mode = Mode.List;
    this.selectionPos = { selectionI: null, selectionJ: null };
  }

  @action select(index: number, selectionI: number, selectionJ: number) {
    this.selection = index;
    if (this.mode != Mode.Focus) this.mode = Mode.Selected;
    this.selectionPos = { selectionI, selectionJ };
  }

  //timer
  @action startTimer() {
    this.secondsRemaining = 10;
    this.secondsTotal = 10;
    this.mode = Mode.Focus;
  }

  @action decreaseTimer() {
    this.secondsRemaining -= 1;
    if (this.secondsRemaining === 0) {
      this.mode = Mode.Selected;
    }
  }

  @computed get percentage() {
    return 100 - (this.secondsRemaining / this.secondsTotal) * 100;
  }
}
