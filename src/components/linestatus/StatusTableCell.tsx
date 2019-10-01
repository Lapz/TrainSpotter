import { makeStyles, TableCell } from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info"
import { useState } from "react"
import InfoDialog from "../website/InfoDialog"
const useStyles = makeStyles((theme) => ({
  root: {
    color: "white"
  },
  infoButton: {
    marginLeft: theme.spacing(2)
  }
}))

interface IStatusTableCellProps {
  disruption?: string
}

const StatusTableCell: React.FC<IStatusTableCellProps> = ({
  disruption,
  children
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (disruption) {
    return (
      <TableCell className={classes.root}>
        {children}

        <InfoIcon className={classes.infoButton} onClick={handleClickOpen} />
        <InfoDialog
          title="Cause of Disruption"
          open={open}
          onClose={handleClose}
        >
          {disruption}
        </InfoDialog>
      </TableCell>
    )
  } else {
    return <TableCell className={classes.root}>{children}</TableCell>
  }
}

export default StatusTableCell
