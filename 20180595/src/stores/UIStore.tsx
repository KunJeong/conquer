//@ts-check
import { action, observable, computed, makeObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

export enum Mode {
  List,
  Selected,
  Focus,
}

export class UIStore {
  @observable mode: Mode = Mode.List;

  //selection
  @observable selection = null;
  @observable selectionPos = {
    selectionI: null,
    selectionJ: null,
  };

  //timer
  @observable secondsTotal = 30;
  @observable secondsRemaining = 30;

  constructor() {
    makeObservable(this);
  }

  @action deselect() {
    // this.selection = null;
    this.selectionPos = { selectionI: null, selectionJ: null };
  }

  @action select(index, selectionI, selectionJ) {
    this.selection = index;
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
