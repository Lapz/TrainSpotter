import {
  Card,
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core"
import axios from "axios"
import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { ILineData } from "../../../interfaces/Line"

import StatusTableCell from "./StatusTableCell"
import StatusTableRow from "./StatusTableRow"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    overflowX: "auto"
  },
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const StatusTable = () => {
  const [hasError] = useState<boolean>(false)
  const [lineData, setLineData] = useState<ILineData[]>([])
  const classes = useStyles()

  useAsyncEffect(async () => {
    const result = await axios.get(
      "https://api.tfl.gov.uk/Line/Mode/tube/Status"
    )

    setLineData(result.data)
  }, [])

  return (
    <div className={classes.root}>
      {hasError ? (
        <p> Their was an error</p>
      ) : lineData.length === 0 ? (
        <CircularProgress />
      ) : (
        <Card className={classes.card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Line</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lineData.map((row, index) => (
                <StatusTableRow key={index} data={row}>
                  <StatusTableCell>{row.name}</StatusTableCell>
                  <StatusTableCell disruption={row.lineStatuses[0].reason}>
                    {row.lineStatuses[0].statusSeverityDescription}
                  </StatusTableCell>
                </StatusTableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}

export default StatusTable
