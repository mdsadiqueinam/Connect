import React, { lazy, Suspense } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const Dialog = lazy(() => import("@material-ui/core/Dialog"));
const DialogContent = lazy(() => import("@material-ui/core/DialogContent"));
const DialogTitle = lazy(() => import("@material-ui/core/DialogTitle"));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
  },
  dialog: {
    borderStartEndRadius: 20,
  },
}));

export default function ResponsiveDialog({
  open,
  handleClose,
  title,
  children,
  ...rest
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Suspense fallback={<CircularProgress />}>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          maxWidth="sm"
          fullWidth
          className={classes.dialog}
          {...rest}
        >
          <Suspense fallback={<CircularProgress />}>
            <DialogTitle id="responsive-dialog-title" className={classes.root}>
              {title}
            </DialogTitle>
            <DialogContent dividers className={classes.root}>
              {children}
            </DialogContent>
          </Suspense>
        </Dialog>
      </Suspense>
    </div>
  );
}
