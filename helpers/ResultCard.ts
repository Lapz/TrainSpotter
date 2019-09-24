export const getRailLogo = (railType: string) => {
  switch (railType) {
    case "tube":
      return "static/tfl/tube.svg"

    case "national-rail":
      return "static/tfl/national-rail.svg"

    case "tflrail":
      return "static/tfl/tflrail.svg"
    case "bus":
      return "static/tfl/bus.svg"
    case "overground":
      return "static/tfl/overground.svg"
    case "dlr":
      return "static/tfl/dlr.svg"

    default:
      return `unknown rail type: ${railType}`
  }
}
