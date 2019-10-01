import { createStyles, makeStyles, Theme } from "@material-ui/core"
import { TableRow } from "@material-ui/core"
import { getColorCode } from "../../helpers/LineStatus"
import { ILineData } from "../../../interfaces/Line"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: (props: ILineData) => getColorCode(props.name)
    },
    table: {
      color: "white"
    }
  })
)

const StatusTableRow: React.FC<{ data: ILineData }> = ({ data, children }) => {
  const classes = useStyles(data)

  return <TableRow className={classes.root}>{children}</TableRow>
}

export default StatusTableRow
