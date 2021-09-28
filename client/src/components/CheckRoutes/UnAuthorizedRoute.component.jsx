import React, { useContext } from 'react';
import { AuthContext } from 'context/Auth';
import { Redirect, Route } from 'react-router-dom';

export default function UnAuthorizedRoute({ component: Component, redirectTo = '/home', ...rest }) {
    const { user } = useContext(AuthContext);

    return (
      <Route
        {...rest}
        render={(props) =>
          !user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={redirectTo}
            />
          )
        }
      />
    )
  }