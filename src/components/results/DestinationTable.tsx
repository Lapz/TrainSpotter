import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core"

import { IArrival } from "../../interfaces/Departure"
interface IProps {
  departures: IArrival[]
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    overflowX: "auto"
  }
})
const DestinationTable: React.FC<IProps> = ({ departures }) => {
  const classes = useStyles()

  let sorted = departures.sort((departure) => {
    return Math.round(departure.timeToStation / 60)
  })

  sorted = sorted.sort((a, b) => {
    return a.lineName > b.lineName ? 1 : -1
  })

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Line</TableCell>
          <TableCell>Platfrom</TableCell>
          <TableCell>Destination</TableCell>
          <TableCell>E.T.A</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sorted.map((departure, index) => {
          return (
            <TableRow key={`${departure.id}-${departure.naptanId}-${index}`}>
              <TableCell>{departure.lineName}</TableCell>
              <TableCell>{departure.platformName}</TableCell>
              <TableCell>{departure.destinationName}</TableCell>
              <TableCell>
                {Math.round(departure.timeToStation / 60)} mins
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default DestinationTable
