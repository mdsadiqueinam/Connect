import { lazy, Suspense, useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION } from "utils/graphQl/mutation";
import { FETCH_TIMELINE } from "utils/graphQl/queries";
import { useAuth } from "context/Auth";
import handleErrors from "config/handleErrors";

const Button = lazy(() => import("@material-ui/core/Button"));
const CardMedia = lazy(() => import("@material-ui/core/CardMedia"));
const InputBase = lazy(() => import("@material-ui/core/InputBase"));
const ImageIcon = lazy(() => import("@material-ui/icons/Image"));
const IconButton = lazy(() => import("@material-ui/core/IconButton"));
const CardActions = lazy(() => import("@material-ui/core/CardActions"));
const CardContent = lazy(() => import("@material-ui/core/CardContent"));
const YoutubeIcon = lazy(() => import("@material-ui/icons/YouTube"));

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  submit: {
    fontSize: "1.2rem",
    marginRight: theme.spacing(2),
  },
}));

export default function PostForm({ handleClose: handleCloseDialog }) {
  const { user } = useAuth();
  const classes = useStyles();
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // cleanup
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  const handleChange = (e) => {
    if (e.target.name === "body") {
      setBody(e.target.value);
    }
    if (e.target.name === "image" && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: { body, image },
    update: (cache, { data }) => {
      handleCloseDialog();
      cache.writeQuery({
        query: FETCH_TIMELINE,
        variables: { queryType: "timeline", userId: user.id },
        data: {
          getTimeline: [
            data.createPost,
            ...cache.readQuery({ query: FETCH_TIMELINE, variables: { queryType: "timeline", userId: user.id } }).getTimeline,
          ],
        },
      });
    },
    onError: (err) => {
      handleErrors(err, "createPost");
    },
  });

  return (
    <Suspense fallback={<CircularProgress />}>
      <CardContent>
        <InputBase
          id="standard-multiline-static"
          multiline
          rows={6}
          placeholder="Write a post"
          autoFocus
          fullWidth
          name="body"
          value={body}
          onChange={handleChange}
        />
        {preview && (
          <CardMedia className="css-js-media" image={preview} alt="preview" />
        )}
      </CardContent>
      <CardActions>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          name="image"
          onChange={handleChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <ImageIcon fontSize="large" />
          </IconButton>
        </label>
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <YoutubeIcon fontSize="large" />
          </IconButton>
        </label>
        <Button
          type="submit"
          color="primary"
          className={classes.submit}
          style={{ marginLeft: "auto" }}
          onClick={createPost}
          disabled={(body.trim() === "" && image === null) || loading}
        >
          {loading ? <CircularProgress size={24} /> : "Post"}
        </Button>
      </CardActions>
    </Suspense>
  );
}
