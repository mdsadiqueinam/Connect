import React, { lazy } from "react";
import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { FETCH_USER_SOME_DETAILS } from "utils/graphQl/queries";
import handleErrors from "config/handleErrors";

const Avatar = lazy(() => import("@material-ui/core/Avatar"));

function OthersUserAvatar({ userId, className, loading: _, ...rest }) {
  const { loading, data } = useQuery(FETCH_USER_SOME_DETAILS, {
    variables: { userId },
    onError: (error) => handleErrors(error, "At OthersUserAvatar"),
  });

  return loading ? (
    <CircularProgress size={24} />
  ) : data.getUserProfile.profilePicture &&
    data.getUserProfile.profilePicture.trim("https://") !== "" ? (
    <Avatar
      alt={data.getUserProfile.username}
      src={data.getUserProfile.profilePicture}
      className={className}
      {...rest}
    />
  ) : (
    <Avatar
      aria-label={data.getUserProfile.username}
      className={className ? className + " css-js-Avatar" : "css-js-Avatar"}
      {...rest}
    >
      {data.getUserProfile.username &&
        data.getUserProfile.username.charAt(0).toUpperCase()}
    </Avatar>
  );
}

OthersUserAvatar.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default React.memo(OthersUserAvatar);
