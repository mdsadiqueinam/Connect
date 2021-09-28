import { lazy, Suspense, useState, createContext, useContext } from "react";
import { useProfile } from "context/Profile";
import { useAuth } from "context/Auth";
import { useAboutClasses } from "components/About/About.component";
import BeatLoader from "react-spinners/BeatLoader";

const Button = lazy(() => import("@material-ui/core/Button"));
const NameInput = lazy(() => import("./NameInput.component"));
const PersonIcon = lazy(() => import("@material-ui/icons/Person"));
const ViewContent = lazy(() => import("components/About/ViewContent.component"));
const AddCircleOutlineIcon = lazy(() => import("@material-ui/icons/AddCircleOutline"));

const NameContext = createContext();

function useName() {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useName must be used inside NameContext Provider");
  }
  return context;
}

export { NameContext, useName };

export default function Name() {
  const classes = useAboutClasses();
  const { user } = useAuth();
  const {profile: { firstName, lastName, id: userId }} = useProfile();
  const name = firstName || lastName ? `${firstName} ${lastName}` : null;
  const [displayContent, setDisplayContent] = useState(name && name.trim() !== "");
  const [displayInput, setDisplayInput] = useState(false);

  const handleAddName = () => {
    setDisplayInput(!displayInput);
  };

  const contentName = ["firstName", "lastName"];

  return (
    <div className={classes.container}>
      <NameContext.Provider
        value={{
          content: name,
          contentName,
          firstName,
          lastName,
          userId,
          displayContent,
          displayInput,
          setDisplayContent,
          setDisplayInput,
        }}
      >
        {displayContent && !displayInput && name && (
          <Suspense fallback={<BeatLoader color={"blue"} size={10} />}>
            <ViewContent
              startIcon={<PersonIcon color="primary" />}
              content={name}
              useContent={useName}
              isAuthorized={user.id === userId}
            />
          </Suspense>
        )}
        {user && user.id === userId && !displayContent && !displayInput && (
          <Suspense fallback={<BeatLoader color={"blue"} size={10} />}>
            <Button
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddName}
              className={classes.button}
            >
              Add Name
            </Button>
          </Suspense>
        )}
        {user && user.id === userId && !displayContent && displayInput && (
          <Suspense fallback={<BeatLoader color={"blue"} size={10} />}>
            <NameInput />
          </Suspense>
        )}
      </NameContext.Provider>
    </div>
  );
}
