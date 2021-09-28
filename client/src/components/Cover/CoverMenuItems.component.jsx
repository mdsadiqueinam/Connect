import { Fragment, forwardRef } from "react";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import { StyledMenuItem } from "components/Menu/Menu";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const CoverMenuItems = forwardRef(({ onClick, onChange, ...rest }, ref) => {
  const handleChange = (event) => {
    onChange(event);
    onClick(event);
  };
  return (
    <Fragment>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="fileUpload"
        type="file"
        name="image"
        onChange={handleChange}
      />
      <StyledMenuItem
        component="label"
        htmlFor="fileUpload"
        ref={ref}
        autoFocus
      >
        <ListItemIcon>
          <EditIcon size="small" />
        </ListItemIcon>
        <ListItemText primary="Edit Picture" />
      </StyledMenuItem>
      <StyledMenuItem
        onClick={onClick}
        className={"css-js-deleteButton"}
        ref={ref}
      >
        <ListItemIcon>
          <DeleteIcon size="small" />
        </ListItemIcon>
        <ListItemText primary="Delete Picture" />
      </StyledMenuItem>
    </Fragment>
  );
});

export default CoverMenuItems;