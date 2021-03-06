import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

export const AlertDialog = ({ isOpen = false, title, contentText, handleCloseDialog }) => {

  const handleClose = () => {
    handleCloseDialog && handleCloseDialog(false);
  };

  const handleAgree = () => {
    handleCloseDialog && handleCloseDialog(true);
  };

  return (
    <Dialog
      open={ isOpen }
      onClose={ handleClose }
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        { title || 'Are you sure?'}
      </DialogTitle>
      { contentText ?
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{ contentText }</DialogContentText>
        </DialogContent> :
        null
      }
      <DialogActions>
        <Button onClick={ handleClose } color="primary">
          Disagree
        </Button>
        <Button onClick={ handleAgree } color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}