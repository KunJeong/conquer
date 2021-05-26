import React from "react";
import { CellStore, TodoStore, UIStore } from "../stores";

type Context = {
  cells: CellStore;
  ui: UIStore;
  todos: TodoStore;
};
export const StoresContext = React.createContext<Context>({
  cells: undefined,
  ui: undefined,
  todos: undefined,
});
