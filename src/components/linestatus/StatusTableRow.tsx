import { TableRow, Theme } from "@material-ui/core"
import { getColorCode } from "../../helpers/LineStatus"
import { ILineData } from "../../interfaces/Line"
import { makeStyles, createStyles } from "@material-ui/core/styles"

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
