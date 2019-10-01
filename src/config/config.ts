import deepmerge from "deepmerge"
import configFile from "./config.json"

/* tslint:disable:no-var-requires */
let config: { [key: string]: any } = process.env.CONFIG_FILE
  ? require(process.env.CONFIG_FILE)
  : {}

config = deepmerge(configFile, config, {
  arrayMerge: (_, b) => b
})
/* tslint:enable:no-var-requires */

export default config
