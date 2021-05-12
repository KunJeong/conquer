import { useContext } from 'react'
import { StoresContext } from '../contexts'

export function useStores() {
  const context = useContext(StoresContext)
  if (context.cells === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }
  
  return context
}