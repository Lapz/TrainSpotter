import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core"
import { IDeparture } from "../../interfaces/Departure"

interface IProps {
  departures: IDeparture[]
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
        {departures.map((departure) => {
          return (
            <TableRow>
              <TableCell>{departure.line}</TableCell>
              <TableCell>{departure.platform}</TableCell>
              <TableCell>{departure.destination}</TableCell>
              <TableCell>{departure.eta}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default DestinationTable
