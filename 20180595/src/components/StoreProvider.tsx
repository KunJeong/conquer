import { StoresContext } from "../contexts";
import { CellStore, UIStore, TodoStore } from "../stores";

export function StoreProvider({ children }) {
  let cells = new CellStore();
  let ui = new UIStore(cells);
  let todos = new TodoStore();

  return (
    <StoresContext.Provider value={{ cells, ui, todos }}>
      {children}
    </StoresContext.Provider>
  );
}
