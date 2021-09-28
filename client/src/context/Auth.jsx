import { useReducer, createContext, useContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = { user: null, profile: null };

if (localStorage.getItem("jwtToken") && localStorage.getItem("connect-cache-storage")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
    initialState.profile = JSON.parse(localStorage.getItem("connect-cache-storage"))[`User:${decodedToken.id}`];
  }
} else {
  localStorage.removeItem("jwtToken");
}

const AuthContext = createContext({
  user: null,
  profile: null,
  login: (userData) => {},
  logout: () => {},
  setUserProfile: (userData) => {},
});


function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        profile: action.payload.profile,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        profile: null,
      };
    case "SET_USER_PROFILE":
      return {
        ...state,
        profile: action.payload,
      }; 
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: { user: jwtDecode(userData.token), profile: userData },
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  const setUserProfile = (userData) => {
    if(!userData) {
      throw new Error(`User data cannot be ${userData}`);
    }
    dispatch({
      type: "SET_USER_PROFILE",
      payload: userData,
    });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, setUserProfile }}
      {...props}
    />
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

function AuthConsumer({ children }) {
  return (
    <AuthContext.Consumer>
      {context => {
        if (context === undefined) {
          throw new Error("AuthConsumer must be used within a AuthProvider");
        }
        return children(context);
      }}
    </AuthContext.Consumer>
  )
}
export { AuthContext, AuthProvider, AuthConsumer, useAuth };
