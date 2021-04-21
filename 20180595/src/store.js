//@ts-check
import { action, observable, computed, runInAction, makeObservable, autorun } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

class TodoStore {
  @observable todos = [];
  @observable pendingRequests = 0;

  constructor() {
    makeObservable(this);
    autorun(() => console.log(this.report));
  }

  @computed get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  @computed get report() {
    if (this.todos.length === 0)
      return "<none>";
    const nextTodo = this.todos.find(todo => todo.completed === false);
    return `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  @action addTodo(task) {
    this.todos.push({
      task: task,
      completed: false
    });
  }
}

export const todoStore = new TodoStore();


// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState])
//   return store
// // }
