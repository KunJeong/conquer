import { StoresContext } from "../contexts";
import { useLocalStore } from "mobx-react-lite";
import { CellStore, UIStore, TodoStore } from "../stores";

export function StoreProvider({ children, initialState }) {
  let cells = new CellStore();
  let ui = new UIStore();
  let todos = new TodoStore();

  return (
    <StoresContext.Provider value={{ cells, ui, todos }}>
      {children}
    </StoresContext.Provider>
  );
}
