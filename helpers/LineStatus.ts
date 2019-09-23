export const getColorCode = (stationName: string) => {
  switch (stationName) {
    case "Bakerloo":
      return "#8d6e63"

    case "Central":
      return "#ef5350"

    case "Circle":
      return "#ffee58"

    case "District":
      return "#66bb6a"

    case "Hammersmith & City":
      return "#ec407a"

    case "Jubilee":
      return "#bdbdbd"

    case "Metropolitan":
      return "#212121"

    case "Northern":
      return "#000000"

    case "Piccadilly":
      return "#0d47a1"

    case "Victoria":
      return "#29b6f6"

    case "Waterloo & City":
      return "#26a69a"

    default:
      return ""
  }
}
