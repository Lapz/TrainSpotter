import { MAPS_API_KEY } from "../../config/google"

interface IProps {
  mode: "place" | "search" | "view" | "directions" | "streetview"
  query: string
  width: number | string
  height: number
  lat: number
  long: number
}

const MiniMap: React.FunctionComponent<IProps> = ({
  lat,
  long,
  mode,
  height,
  width,
  query
}) => (
  <iframe
    width={width}
    height={height}
    src={`https://www.google.com/maps/embed/v1/${mode}?${
      query ? `&q=${query}` : ""
    }&key=${MAPS_API_KEY}&center=${lat},${long}`}
  >
    >
  </iframe>
)

export default MiniMap
