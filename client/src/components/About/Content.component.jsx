import { lazy, Suspense, useState, createContext, useContext, isValidElement } from "react";
import { useProfile } from "context/Profile";
import { useAuth } from "context/Auth";
import { useAboutClasses } from "components/About/About.component";
import BeatLoader from "react-spinners/BeatLoader";
import PropTypes from "prop-types";

const Button = lazy(() => import("@material-ui/core/Button"));
const ViewContent = lazy(() => import("./ViewContent.component"));
const ContentInput = lazy(() => import("./ContentInput.component"));
const AddCircleOutlineIcon = lazy(() => import("@material-ui/icons/AddCircleOutline"));

const ContentContext = createContext();

function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used inside ContentContext Provider");
  }
  return context;
}

export { ContentContext, useContent };

function Content({ contentName, contentStartsWith, startIcon, renderInput }) {
  const classes = useAboutClasses();
  const { user } = useAuth();
  const { profile : { [contentName]: content, id: userId } } = useProfile();
  const [displayContent, setDisplayContent] = useState(content && content.trim() !== "");
  const [displayInput, setDisplayInput] = useState(false);

  const handleAddContent = () => {
    setDisplayInput(!displayInput);
  };

  return (
    <div className={classes.container}>
      <ContentContext.Provider
        value={{
          content,
          userId,
          contentName,
          displayContent,
          displayInput,
          setDisplayContent,
          setDisplayInput,
        }}
      >
        {displayContent && !displayInput && Content && (
          <Suspense fallback={<BeatLoader color={"blue"} size={10} />}>
            <ViewContent
              startIcon={startIcon}
              content={content}
              contentStartsWith={contentStartsWith}
              isAuthorized={user && user.id === userId}
              useContent={useContent}
            />
          </Suspense>
        )}
        {user && user.id === userId && !displayContent && !displayInput && (
          <Suspense fallback={<BeatLoader color={"blue"} size={10} />}>
            <Button
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddContent}
              className={classes.button}
            >
              {`Add ${contentName}`}
            </Button>
          </Suspense>
        )}
        {user && user.id === userId && renderInput && !displayContent && displayInput && (
          <Suspense fallback={<BeatLoader color={"blue"} size={10} />}>
            {isValidElement(renderInput) ? renderInput : <ContentInput />}
          </Suspense>
        )}
      </ContentContext.Provider>
    </div>
  );
}

Content.prototype = {
  contentName: PropTypes.string.isRequired,
  contentStartsWith: PropTypes.string,
  startIcon: PropTypes.node,
  renderInput: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
};

Content.defaultProps = {
  contentStartsWith: "",
};

export default Content;
