import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core"
import { IDeparture, IArrival } from "../../interfaces/Departure"

interface IProps {
  departures: IArrival[]
}
const DestinationTable: React.FC<IProps> = ({ departures }) => {
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
        {departures
          .sort((departure) => {
            return Math.round(departure.timeToStation / 60)
          })
          .map((departure, index) => {
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
