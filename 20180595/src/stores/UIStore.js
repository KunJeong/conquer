//@ts-check
import { action, observable, computed, runInAction, makeObservable, autorun } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

export class UIStore {
  @observable selection = -1;

  constructor() {
    makeObservable(this);
  }

  @action select(index) {
    this.selection = index;
  }
}