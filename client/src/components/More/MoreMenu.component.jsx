import { Fragment, forwardRef } from "react";
import withToggleMenu from "HOC/withToggleMenu.HOC";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import { StyledMenuItem } from "components/Menu/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const MoreMenuButton = (props) => (
  <IconButton {...props}>
    <MoreVertIcon />
  </IconButton>
);

const MoreMenu = forwardRef(
  ({ onClick, handleButton1, handleButton2, children, ...rest }, ref) => (
    <Fragment>
      <StyledMenuItem
        onClick={handleButton1 ? handleButton1 : onClick}
        ref={ref}
        autoFocus
      >
        <ListItemIcon>
          <EditIcon size="small" />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </StyledMenuItem>
      <StyledMenuItem
        onClick={handleButton2 ? handleButton2 : onClick}
        className={"css-js-deleteButton"}
        ref={ref}
      >
        <ListItemIcon>
          <DeleteIcon size="small" />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </StyledMenuItem>
      {children}
    </Fragment>
  )
);

MoreMenu.propTypes = {
  onClick: PropTypes.func,
  handleButton1: PropTypes.func,
  handleButton2: PropTypes.func,
  button1: PropTypes.node,
  button2: PropTypes.node,
  children: PropTypes.node,
};

export { MoreMenuButton, MoreMenu };

export default withToggleMenu(MoreMenu, MoreMenuButton);
