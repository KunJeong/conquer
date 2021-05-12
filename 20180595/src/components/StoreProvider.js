import { StoresContext } from '../contexts'
import { useLocalStore } from 'mobx-react-lite'
import { CellStore, UIStore } from '../stores'

export function StoreProvider({ children, initialState }) {
  let cells = new CellStore()
  let ui = new UIStore()

  return <StoresContext.Provider value={{cells, ui}}>{children}</StoresContext.Provider>
}