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
  name: string;
  store: TodoStore;

  constructor(store: TodoStore, id = uuidv4(), name: string = "New Todo") {
    this.store = store;
    this.id = id;
    this.name = name;
    makeObservable(this);
  }

  @action editName(newName: string) {
    this.name = newName;
  }
}

export class TodoStore {
  @observable todos: Todo[] = [];
  constructor() {
    makeObservable(this);
  }

  @action addTodo(id: string, name: string) {
    let todo = new Todo(this, id, name);
    this.todos.push(todo);
  }

  todoById(id: string) {
    return this.todos.find((todo) => todo.id == id);
  }
  @computed get count() {
    return this.todos.length;
  }
}
