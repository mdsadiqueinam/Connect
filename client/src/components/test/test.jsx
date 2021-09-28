import {
  ClickAwayListener,
  MenuItem,
  MenuList,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

export default function CoverMenu({
  autoFocusItem,
  onKeyDown,
  onClick,
  onClickAway,
  onChange,
}) {
  const handleChange = (event) => {
    onClick(event);
    onChange(event);
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <MenuList
        autoFocusItem={autoFocusItem}
        id="menu-list-grow"
        onKeyDown={onKeyDown}
      >
        <MenuItem component={"span"}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="fileUpload"
            type="file"
            name="image"
            onChange={handleChange}
          />
          <Button
            startIcon={<EditIcon />}
            component="label"
            htmlFor="fileUpload"
          >
            Update Picture
          </Button>
        </MenuItem>
        <MenuItem onClick={onClick} style={{ color: "red" }}>
          Delete Picture
        </MenuItem>
      </MenuList>
    </ClickAwayListener>
  );
}
