import React from "react";
import { RootStore, CellStore, TodoStore, UIStore } from "../stores";

type Context = {
  root: RootStore;
  cells: CellStore;
  ui: UIStore;
  todos: TodoStore;
};
export const StoresContext = React.createContext<Context>({
  root: undefined,
  cells: undefined,
  ui: undefined,
  todos: undefined,
});
