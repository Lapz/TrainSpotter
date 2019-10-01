import { types } from "mobx-state-tree"

export const User = types.model({
  displayName: types.string
})
