import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types
} from "mobx-state-tree"

import makeInspectable from "mobx-devtools-mst"

import { useLocalStore } from "mobx-react-lite"
import { createContext, useContext } from "react"
import { User } from "./user"

let store: IStore = null as any

export const Store = types
  .model({
    user: types.maybe(User)
  })
  .actions((self) => ({
    setUser(newUser: any) {
      self.user = newUser
    },
    logOut() {
      self.user = undefined
    }
  }))

export type IStore = Instance<typeof Store>
export type IStoreSnapshotIn = SnapshotIn<typeof Store>
export type IStoreSnapshotOut = SnapshotOut<typeof Store>

export const initializeStore = (isServer: boolean, snapshot = null) => {
  if (isServer) {
    store = Store.create({ user: undefined })
  }
  if ((store as any) === null) {
    store = Store.create({ user: undefined })
  }
  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}

export const StoreProvider: React.FC<{}> = ({ children }) => {
  const storeInstance = store
  return (
    <storeContext.Provider value={storeInstance}>
      {children}
    </storeContext.Provider>
  )
}

export const storeContext = createContext<IStore | null>(null)

export function useStore() {
  const storeInstance = useContext(storeContext)

  if (!storeInstance) {
    throw new Error("useStore must be used within a StoreProvider.")
  }
  makeInspectable(storeInstance)

  return storeInstance
}
