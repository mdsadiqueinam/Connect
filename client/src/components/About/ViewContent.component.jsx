import { lazy, Suspense } from "react";
import { useAuth } from "context/Auth";
import { StyledCardHeader } from "components/About/About.component";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import BeatLoader from "react-spinners/BeatLoader";
import useUpdateProfile from "utils/Hooks/useUpdateProfile";
import PropTypes from "prop-types";

const Menu = lazy(() => import("components/Menu/ToggleMenu"));

function ViewContent({
  content,
  contentStartsWith,
  isAuthorized,
  useContent,
  startIcon,
}) {
  const { setUserProfile } = useAuth();
  const {
    userId,
    contentName,
    displayContent,
    displayInput,
    setDisplayContent,
    setDisplayInput,
  } = useContent();

  const [updateProfile, { loading }] = useUpdateProfile(
    {
      update: (caches, { data }) => {
        setUserProfile(data.updateUserProfile);
        setDisplayContent(!displayContent);
      },
    },
    "Delete content"
  );

  const handleEdit = () => {
    setDisplayContent(!displayContent);
    setDisplayInput(!displayInput);
  };

  const values = {};
  if (!contentName) {
    throw new Error("contentName is required");
  } else if (typeof contentName === "string") {
    values[contentName] = "";
  } else if (Array.isArray(contentName)) {
    for (let i = 0; i < contentName.length; i++) {
      if (typeof contentName[i] !== "string") {
        throw new Error("contentName must be a string or an array of string");
      }
      values[contentName[i]] = "";
    }
  } else {
    throw new Error("contentName must be a string or an array of string");
  }

  const handleDelete = () => {
    updateProfile({ variables: { userId, ...values } });
  };

  return loading ? (
    <BeatLoader color="blue" />
  ) : (
    <StyledCardHeader
      avatar={startIcon}
      title={`${contentStartsWith}${content}`}
      action={
        isAuthorized && (
          <Suspense fallback={<BeatLoader color="blue" />}>
            <Menu
              handleButton1={handleEdit}
              handleButton2={handleDelete}
              button1StartIcon={<EditIcon />}
              button2StartIcon={<DeleteIcon />}
              button1Text="Edit"
              button2Text="Delete"
              button2Props={{
                className: "css-js-deleteButton",
              }}
            />
          </Suspense>
        )
      }
    />
  );
}

ViewContent.propTypes = {
  content: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  contentStartsWith: PropTypes.string,
  useContent: PropTypes.func.isRequired,
  startIcon: PropTypes.node,
};

ViewContent.defaultProps = {
  contentStartsWith: "",
};

export default ViewContent;
