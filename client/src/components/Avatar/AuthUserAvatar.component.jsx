import React from "react";
import { useAuth } from "context/Auth";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

function AuthUserAvatar({ className, loading, ...rest }) {
  const { profile: { profilePicture: avatarUrl, username } } = useAuth();

  return avatarUrl && avatarUrl.trim("https://") !== "" && !loading ? (
    <Avatar alt={username} src={avatarUrl} className={className} {...rest} />
  ) : (
    <Avatar
      aria-label={username}
      className={className ? className + " css-js-Avatar" : "css-js-Avatar"}
      {...rest}
    >
      {loading ? (<CircularProgress color="primary"/>) : username.charAt(0).toUpperCase()}
    </Avatar>
  );
}

AuthUserAvatar.propTypes = {
  className: PropTypes.string,
};

export default React.memo(AuthUserAvatar);
