import { StoresContext } from '../contexts'
import { useLocalStore } from 'mobx-react-lite'
import { CellStore } from '../stores'

export function StoreProvider({ children, initialState }) {
  let cells = new CellStore()

  return <StoresContext.Provider value={{cells}}>{children}</StoresContext.Provider>
}