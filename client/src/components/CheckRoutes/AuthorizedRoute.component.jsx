import { useAuth } from 'context/Auth';
import { Redirect, Route } from 'react-router-dom';

export default function AuthorizedRoute({ component: Component, redirectTo , ...rest }) {
    const signInURL = '/login';
    const { user } = useAuth();
    return (
      <Route
        {...rest}
        render={(props) =>
            user ? (
            redirectTo?
            <Redirect
              to={{
                pathname: redirectTo,
                search: `from=${props.location.pathname}`,
                state: { from: props.location },
              }}
            />
            :
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: signInURL,
                search: `from=${props.location.pathname}`,
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )
  }
  