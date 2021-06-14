import { StoresContext } from "../contexts";
import { RootStore } from "../stores";

export function StoreProvider({ children }) {
  let root = new RootStore();

  return (
    <StoresContext.Provider
      value={{
        root,
        cells: root.cellStore,
        ui: root.uiStore,
        todos: root.todoStore,
      }}
    >
      {children}
    </StoresContext.Provider>
  );
}
