//@ts-check
import { useContext } from "react";
import { StoresContext } from "../contexts";

export default function useStores() {
  const context = useContext(StoresContext);
  if (
    context.root === undefined ||
    context.cells === undefined ||
    context.ui === undefined ||
    context.todos == undefined
  ) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
