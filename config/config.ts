import deepmerge from "deepmerge"
/* tslint:disable:no-var-requires */
let config = process.env.CONFIG_FILE ? require(process.env.CONFIG_FILE) : {}

config = deepmerge(require("./config.json"), config, {
  arrayMerge: (_, b) => b
})
/* tslint:enable:no-var-requires */

export default config
