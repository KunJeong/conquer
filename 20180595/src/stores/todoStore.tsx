//@ts-check
import { action, observable, computed, makeObservable, configure } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === "undefined");

configure({ enforceActions: "always" });

export class Todo {
  store: TodoStore;
  id: string = null;
  @observable completed = false;
  @observable name: string;

  constructor(
    store: TodoStore,
    name: string = "New Todo",
    save: boolean = true,
    id = uuidv4()
  ) {
    this.store = store;
    this.id = id;
    this.name = name;
    makeObservable(this);
    if (save)
      axios
        .post("http://localhost:3000/todos", { id, name })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          if (error.response) {
            console.log("error1");
          } else if (error.request) {
            console.log("error2");
          } else {
            console.log("error3");
          }
        });
  }

  @action editName(newName: string) {
    this.name = newName;
  }
  @action toggleComplete() {
    this.completed = !this.completed;
  }
}

export class TodoStore {
  @observable todos: Todo[] = [];
  constructor() {
    makeObservable(this);
  }

  @action getCells() {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        console.log(response);
        let newTodos = response.data.todos.map((todo) => {
          return new Todo(this, todo.name, false);
        });
        console.log(newTodos);
        this.todos = newTodos;
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error1");
        } else if (error.request) {
          console.log("error2");
        } else {
          console.log("error3");
        }
      });
  }

  @action addTodo(id: string, name: string) {
    let todo = new Todo(this, name, true, id);
    this.todos.push(todo);
  }

  todoById(id: string) {
    return this.todos.find((todo) => todo.id == id);
  }
  @computed get count() {
    return this.todos.length;
  }
}
