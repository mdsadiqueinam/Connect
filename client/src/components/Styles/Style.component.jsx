import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ".css-js-container": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    ".css-js-page": {
      marginTop: theme.spacing(10),
    },
    ".css-js-register-container": {
      maxWidth: "700px",
      padding: theme.spacing(5),
      [theme.breakpoints.down("sm")]: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(2),
      },
    },
    ".css-js-root": {
      display: "flex",
      flexWrap: "wrap",
    },
    ".css-js-textField": {
      width: "100%",
      marginBottom: theme.spacing(5),
    },
    ".css-js-inputlabel": {
      fontSize: "1.3rem",
      paddingLeft: "3rem",
      paddingBottom: "3rem",
    },
    ".css-js-title": {
      marginBottom: theme.spacing(3),
    },
    ".css-js-divider": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(5),
      width: "100%",
    },
    ".css-js-color-primary": {
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    },
    ".css-js-primary-background": {
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    },
    ".css-js-color-secondary": {
      background: "linear-gradient(45deg, #2196F3 30%, #FF8E53 90%)",
    },
    ".css-js-Avatar": {
      color: "#fff",
      backgroundColor: red[500],
    },
    ".css-js-media": {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    ".css-js-profile-cover": {
      marginBottom: theme.spacing(5),
    },
    ".css-js-deleteButton": {
      color: red[500],
    },
    ".css-js-MoreMenuButton": {
      backgroundColor: theme.palette.primary.light,
    },
    ".autocomplete-dropdown-container": {
      position: "absolute",
      width: "100%",
      zIndex: 9,
    },
    ".autocomplete-container": {
      width: "100%",
      position: "relative",
      marginTop: theme.spacing(2),
    },
  },
}));

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1705,
      xxl: 1900,
    },
  },
  palette: {
    background: {
      default: "rgb(0, 0, 0, 0.08)",
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "rgb(0, 0, 0, 0.08)",
        },
      },
    },
  },
});

export default function GlobalCss(props) {
  useStyles();

  return <ThemeProvider theme={theme} {...props} />;
}
