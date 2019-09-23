import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core"

export interface IInfoDialogProps {
  open: boolean
  title: string
  onClose: () => void
}

const InfoDialog: React.FC<IInfoDialogProps> = ({
  onClose,
  open,
  title,
  children
}) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default InfoDialog
