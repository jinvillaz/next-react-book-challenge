import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface ConfirmDialogProps {
  state: boolean
  setOpen: (value: boolean) => void
  deleteItem: () => void
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ state, deleteItem, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  const handleOk = () => {
    deleteItem()
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="xs"
        open={state}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure to delete the book?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleOk} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
