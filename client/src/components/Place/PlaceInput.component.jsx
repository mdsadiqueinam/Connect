import { lazy, useState } from "react";
import { useAuth } from "context/Auth";
import { useContent } from "components/About/Content.component";
import { useAboutClasses } from "components/About/About.component";
import useUpdateProfile from "utils/Hooks/useUpdateProfile";
import BeatLoader from "react-spinners/BeatLoader";

const Button = lazy(() => import("@material-ui/core/Button"));
const LocationSearchInput = lazy(() => import("components/Input/LocationSearchInput.component"));

function SearchPlacesInput({
  value,
  handleChange,
  handleSelect,
  searchOptions,
  loading,
  handleCancel,
  handleSubmit,
  selected,
}) {
  const classes = useAboutClasses();
  return (
    <div className="css-js-container">
      <div className={classes.box}>
        <LocationSearchInput
          value={value}
          onChange={handleChange}
          onSelect={handleSelect}
          searchOptions={searchOptions}
          disabled={loading}
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
          type="submit"
          onClick={handleSubmit}
          disabled={!selected || loading}
        >
          {loading ? <BeatLoader size={8} color="blue" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

function PlaceInput() {
  const { setUserProfile } = useAuth();
  const searchOptions = { types: ["(cities)"] };
  const {
    userId,
    content,
    contentName,
    displayContent,
    setDisplayContent,
    displayInput,
    setDisplayInput,
  } = useContent();

  const [value, setValue] = useState({ [contentName]: content });
  const [selected, setSelected] = useState(null);

  const [updateProfile, { loading }] = useUpdateProfile(
    {
      update: (caches, { data }) => {
        setUserProfile(data.updateUserProfile);
        setDisplayContent(!displayContent);
        setDisplayInput(!displayInput);
      },
    },
    "Edit/Add Place"
  );

  const handleSelect = (address) => {
    setSelected(address);
    setValue({ [contentName]: address });
  };

  const handleChange = (address) => {
    setValue({ [contentName]: address });
  };

  const handleCancel = () => {
    if (content) setDisplayContent(!displayContent);
    setDisplayInput(!displayInput);
  };

  const handleSubmit = () => {
    updateProfile({ variables: { userId, ...value } });
  };

  return (
    <SearchPlacesInput
      value={value[contentName]}
      {...{
        handleChange,
        handleSelect,
        searchOptions,
        selected,
        loading,
        handleCancel,
        handleSubmit,
      }}
    />
  );
}


export { SearchPlacesInput };
export default PlaceInput;