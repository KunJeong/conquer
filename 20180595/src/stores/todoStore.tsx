//@ts-check
import { action, observable, computed, makeObservable, configure } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

configure({ enforceActions: "always" });

export class Todo {
  id: string = null;
  completed = false;
  name = "New Todo";
  store: TodoStore;

  constructor(store: TodoStore, id = uuidv4()) {
    this.store = store;
    this.id = id;
    makeObservable(this);
  }

  @action editName(newName: string) {
    this.name = newName;
  }
}

export class TodoStore {
  todos = [];
  constructor() {
    makeObservable(this);
  }

  @action addTodo(id: string) {
    let todo = new Todo(this, id);
    this.todos.push(todo);
  }
}
