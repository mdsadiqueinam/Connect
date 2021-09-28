import { lazy } from "react";
import { useContent } from "components/About/Content.component";
import { useForm } from "utils/Hooks/hooks";
import { useAuth } from "context/Auth";
import { useAboutClasses } from "components/About/About.component";
import useUpdateProfile from "utils/Hooks/useUpdateProfile";
import Button from "@material-ui/core/Button";
import BeatLoader from "react-spinners/BeatLoader";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";

const TextField = lazy(() => import("@material-ui/core/TextField"));

export default function ContentInput({ inputType, selectValues }) {
  const classes = useAboutClasses();
  const { setUserProfile } = useAuth();
  const {
    userId,
    content,
    contentName,
    displayContent,
    displayInput,
    setDisplayContent,
    setDisplayInput,
  } = useContent();
  const { values, handleChange, handleSubmit } = useForm(onSubmit, {
    [contentName]: content,
  });
  
  const [updateProfile, { loading }] = useUpdateProfile(
    {
      update: (caches, { data }) => {
        setUserProfile(data.updateUserProfile);
        setDisplayContent(!displayContent);
        setDisplayInput(!displayInput);
      },
    },
    "Edit/Add Content"
  );

  const handleCancel = () => {
    if (content) setDisplayContent(!displayContent);
    setDisplayInput(!displayInput);
  };

  function onSubmit() {
    updateProfile({ variables: { userId, ...values } });
  }

  const label = contentName[0].toUpperCase() + contentName.slice(1);

  return (
    <form
      className={`css-js-container ${classes.contentInputContainer}`}
      onSubmit={handleSubmit}
    >
      <div className={classes.box}>
        <TextField
          id={`${contentName}-input`}
          variant="outlined"
          label={label}
          fullWidth
          name={contentName}
          value={values[contentName]}
          onChange={handleChange}
          select={inputType === "select"}
        >
          {inputType === "select" && selectValues && selectValues.map((value, idx) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={classes.buttonsContainer}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleCancel}
          disabled={loading}
          type="button"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
          disabled={values[contentName].trim() === "" || loading}
        >
          {loading ? <BeatLoader size={8} color="blue" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

ContentInput.propTypes = {
  inputType: PropTypes.oneOf(["text", "select"]),
  selectValues: PropTypes.arrayOf(PropTypes.string),
};
