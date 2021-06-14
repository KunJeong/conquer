//@ts-check
import { enableStaticRendering } from "mobx-react-lite";
import { CellStore, TodoStore, UIStore } from "./index";

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

export class RootStore {
  cellStore: CellStore;
  todoStore: TodoStore;
  uiStore: UIStore;

  constructor() {
    this.cellStore = new CellStore(this);
    this.todoStore = new TodoStore(this);
    this.uiStore = new UIStore(this);
  }
}
