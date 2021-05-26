//@ts-check
import { action, observable, computed, makeObservable, configure } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

configure({ enforceActions: true });

export class Todo {
  id = null;
  completed = false;
  name = "New Todo";

  constructor(store, id = uuidv4()) {
    makeObservable(this);
  }

  @action editName(newName) {
    this.name = newName;
  }
}
export class TodoStore {
  todos = [];
  constructor() {
    makeObservable(this);
  }

  @action addTodo(id) {
    let todo = new Todo(this, id);
    this.todos.push(todo);
  }
}
