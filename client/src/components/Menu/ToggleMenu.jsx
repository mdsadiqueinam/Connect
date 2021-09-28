import { IconButton, ListItemIcon, ListItemText } from "@material-ui/core";
import { StyledMenuItem } from "components/Menu/Menu";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import withToggleMenu from "HOC/withToggleMenu.HOC";

const MoreButton = (props) => (
  <IconButton className="css-js-MoreMenuButton" size="small" {...props}>
    <MoreHorizIcon />
  </IconButton>
);

const MoreMenu = forwardRef(
  (
    {
      onClick,
      handleButton1,
      handleButton2,
      button1StartIcon,
      button2StartIcon,
      button1Text,
      button2Text,
      button1Props,
      button2Props,
      ...rest
    },
    ref
  ) => (
    <>
      <StyledMenuItem
        onClick={handleButton1 ? handleButton1 : onClick}
        ref={ref}
        autoFocus
        {...button1Props}
      >
        {button1StartIcon && <ListItemIcon>{button1StartIcon}</ListItemIcon>}
        {button1Text && <ListItemText primary={button1Text} />}
      </StyledMenuItem>
      <StyledMenuItem
        onClick={handleButton2 ? handleButton2 : onClick}
        {...button2Props}
        ref={ref}
      >
        {button2StartIcon && <ListItemIcon>{button2StartIcon}</ListItemIcon>}
        {button2Text && <ListItemText primary={button2Text} />}
      </StyledMenuItem>
    </>
  )
);

MoreMenu.propTypes = {
  onClick: PropTypes.func,
  handleButton1: PropTypes.func,
  handleButton2: PropTypes.func,
  button1StartIcon: PropTypes.node,
  button2StartIcon: PropTypes.node,
  button1Text: PropTypes.string,
  button2Text: PropTypes.string,
  button1Props: PropTypes.object,
  button2Props: PropTypes.object,
};

MoreMenu.defaultProps = {
  onClick: () => {},
  button1Props: {},
  button2Props: {},
}

export default withToggleMenu(MoreMenu, MoreButton);
