import { lazy } from "react";
import { useName } from "./Name.component";
import { useForm } from "utils/Hooks/hooks";
import { useAuth } from "context/Auth";
import { useAboutClasses } from "components/About/About.component";
import useUpdateProfile from "utils/Hooks/useUpdateProfile";
import Button from "@material-ui/core/Button";
import BeatLoader from "react-spinners/BeatLoader";

const TextField = lazy(() => import("@material-ui/core/TextField"));

export default function NameInput() {
  const classes = useAboutClasses();
  const { setUserProfile } = useAuth();
  const {
    userId,
    firstName,
    lastName,
    displayContent,
    displayInput,
    setDisplayContent,
    setDisplayInput,
  } = useName();
  const { values, handleChange, handleSubmit } = useForm(onSubmit, {
    firstName,
    lastName,
  });

  const [updateProfile, { loading }] = useUpdateProfile(
    {
      update: (caches, { data }) => {
        setUserProfile(data.updateUserProfile);
        setDisplayContent(!displayContent);
        setDisplayInput(!displayInput);
      },
    },
    "Edit/Add Name"
  );

  const handleCancel = () => {
    if (firstName && lastName) setDisplayContent(!displayContent);
    setDisplayInput(!displayInput);
  };

  function onSubmit() {
    updateProfile({ variables: { userId, ...values } });
  }

  return (
    <form className={`css-js-container ${classes.contentInputContainer}`}>
      <div className={classes.box}>
        <TextField
          variant="outlined"
          label={"First Name"}
          fullWidth
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          label={"Last Name"}
          fullWidth
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
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
          onClick={handleSubmit}
          type="submit"
          disabled={
            (values.firstName.trim() === "" && values.lastName.trim() === "") ||
            loading
          }
        >
          {loading ? <BeatLoader size={8} color="blue" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}
