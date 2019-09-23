export enum TrainLineId {
  BAKERLOO = "bakerloo",
  CENTRAL = "central",
  CIRCLE = "circle",
  DISTRICT = "district",
  HAMMERSMITH_CITY = "hammersmith-city",
  JUBILEE = "jubilee",
  METROPOLITAN = "metropolitan",
  NORTHERN = "northern",
  PICCADILLY = "piccadilly",
  VICTORIA = "victoria",
  WATERLOO_CITY = "waterloo-city"
}
export enum TrainLineMode {
  TUBE = "tube",
  DLR = "dlr"
}

export interface ILineData {
  id: TrainLineId
  name: string
  modeName: TrainLineMode
  created: Date
  modified: Date
  lineStatuses: ILineStatus[]
}

export interface ILineStatus {
  id: number
  statusSeverity: 10
  statusSeverityDescription: string
  reason?: string
  disruption: ILineDisruption
}

export interface ILineDisruption {
  description: string
  closureText: string
}
