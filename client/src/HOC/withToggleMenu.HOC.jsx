import { useState } from "react";
import { StyledMenu } from "components/Menu/Menu";

const withToggleMenu = (MenuItems, Button) => {
  /**
   * @param {object} MenuItems [Required] - The menu Items component
   * @param {object} Button [Required] - The button component
   * @returns {React.Component}
   */

  if (!MenuItems || !Button) {
    throw new Error("Menu and Button are required");
  }

  function NewComponent({ disabled, ...props }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          disabled={disabled}
        />
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItems onClick={handleClose} {...props}/>
        </StyledMenu>
      </div>
    );
  }

  return NewComponent;
};

export default withToggleMenu;

