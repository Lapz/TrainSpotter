import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types
} from "mobx-state-tree"

import { User } from "./user"

let store: IStore = null as any

const Store = types.model({
  user: types.maybe(User)
})

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
