import { createStyles, makeStyles, Theme } from "@material-ui/core"
import { ILineData } from "../../interfaces/Line"
import { getColorCode } from "../../helpers/LineStatus"
import { TableRow } from "@material-ui/core"

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
