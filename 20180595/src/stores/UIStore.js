//@ts-check
import { action, observable, computed, runInAction, makeObservable, autorun } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

export class UIStore {
  @observable selection = -1;
  @observable selectionPos = {
    selectionI: -10000,
    selectionJ: -10000
  }

  //timer
  @observable secondsTotal = 30
  @observable secondsRemaining = 30
  @observable timerMode = false

  constructor() {
    makeObservable(this);
  }

  @action select(index, selectionI, selectionJ) {
    this.selection = index;
    this.selectionPos = { selectionI, selectionJ }
  }

  //timer
  @action startTimer() {
    this.secondsRemaining = 10
    this.secondsTotal = 10
    this.timerMode = true
  }

  @action decreaseTimer() {
    this.secondsRemaining -=1
    if(this.secondsRemaining === 0){ 
      this.timerMode = false
    }
  }

  @computed get percentage() {
    return 100 - this.secondsRemaining / this.secondsTotal * 100
  }
}