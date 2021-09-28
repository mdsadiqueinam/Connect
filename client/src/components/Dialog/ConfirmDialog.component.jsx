import { lazy, Suspense } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const Button = lazy(() => import("@material-ui/core/Button"));
const Dialog = lazy(() => import("@material-ui/core/Dialog"));
const Divider = lazy(() => import("@material-ui/core/Divider"));
const DialogTitle = lazy(() => import("@material-ui/core/DialogTitle"));
const DialogActions = lazy(() => import("@material-ui/core/DialogActions"));
const DialogContentText = lazy(() => import("@material-ui/core/DialogContentText"));

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 9999,
    color: '#fff',
  },
}));

export default function ConfirmDialog({
  open,
  title,
  message,
  handleConfirm,
  confirmButtonProps,
  handleClose,
  loading,
}) {
  const classes = useStyles();

  return (
    <div>
      <Suspense fallback={<CircularProgress />}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
          <Divider  />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus >
              Cancel
            </Button>
            <Button onClick={(e) => { handleConfirm(e); handleClose(e); }} color="secondary" {...confirmButtonProps}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Backdrop open={loading ? true : false} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Suspense>
    </div>
  );
}

ConfirmDialog.prototype = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  confirmButtonProps: PropTypes.object,
};

ConfirmDialog.defaultProps = {
  title: "",
  loading: false,
  confirmButtonProps: {},
};