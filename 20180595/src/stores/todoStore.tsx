//@ts-check
import { action, observable, computed, makeObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { RootStore } from "./RootStore";
import gsap from "gsap";
// eslint-disable-next-line react-hooks/rules-of-hooks

enableStaticRendering(typeof window === "undefined");

// configure({ enforceActions: "always" });

export class Todo {
  store: TodoStore;
  id: string = null;
  onCell: string = null;
  @observable completed: boolean = false;
  @observable name: string;
  @observable imageName: string = null;
  @observable completedOpacity: number = 0;
  @observable incompleteOpacity: number = 1;

  constructor(
    store: TodoStore,
    name: string = "New Todo",
    completed: boolean = false,
    imageName: string,
    save: boolean = true,
    onCell = null,
    id = uuidv4()
  ) {
    this.store = store;
    this.id = id;
    this.name = name;
    this.imageName = imageName;
    this.completed = completed;
    this.completedOpacity = completed ? 1 : 0;
    this.incompleteOpacity = completed ? 0 : 1;
    this.onCell = onCell;
    makeObservable(this);
    console.log(`id:${id}`);
    if (save)
      axios
        .post("http://localhost:3000/todos", { id, name, onCell, imageName })
        .then((response) => {
          console.log(response.data.todo);
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

  @action setName(newName: string) {
    this.name = newName;
  }

  @action async setComplete(completed: boolean) {
    this.completed = completed;
    const target = completed ? 1 : 0;
    gsap.to(this, {
      completedOpacity: target,
      snap: { completedOpacity: 0.05 },
      duration: 0.3,
      ease: completed ? "power1" : "power1.in",
    });
    gsap.to(this, {
      incompleteOpacity: 1 - target,
      snap: { incompleteOpacity: 0.05 },
      duration: 0.3,
      ease: completed ? "power2.in" : "power2",
    });

    this.modifyToServer({ completed: this.completed });
  }

  @action modify(args) {
    console.log("modify todo", this.id, args);
    const { completed, name, imageName } = args;
    if (completed !== undefined) this.completed = completed;
    if (name) this.name = name;
    if (imageName) this.imageName = imageName;
  }

  @action async modifyToServer(args) {
    return await axios
      .patch(`http://localhost:3000/todos/${this.id}`, { ...args })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error1");
        } else if (error.request) {
          console.log("error2");
        } else {
          console.log("@modifytoserver- error3");
        }
      });
  }
}

export class TodoStore {
  rootStore: RootStore;
  @observable todos: Todo[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action _deleteTodos() {
    this.todos = [];
  }
  @action async _deleteTodosAndSave() {
    this._deleteTodos();
    return await axios
      .delete("http://localhost:3000/todos")
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

  @action initStore() {
    this._deleteTodosAndSave().then(() => this.getTodos());
  }

  @action async getTodos() {
    return await axios
      .get("http://localhost:3000/todos")

      // .then((res) => {
      //   return res;
      // });

      .then((response) => {
        console.log(response);
        let newTodos = response.data.todos.map((todo) => {
          return new Todo(
            this,
            todo.name,
            todo.completed,
            todo.imageName,
            false,
            todo.onCell,
            todo._id
          );
        });
        console.log(newTodos);
        this.todos = newTodos;
        return response;
      })
      .catch((error) => {
        if (error.response) {
          console.log("error1");
        } else if (error.request) {
          console.log("error2");
        } else {
          console.log("error3");
        }
      });
  }

  @action addTodo(name: string, id: string, imageName: string, onCell: string) {
    let todo = new Todo(this, name, false, imageName, true, onCell, id);
    this.todos.push(todo);
  }

  todoById(id: string) {
    return this.todos.find((todo) => todo.id == id);
  }
  @computed get count() {
    return this.todos.length;
  }
}
