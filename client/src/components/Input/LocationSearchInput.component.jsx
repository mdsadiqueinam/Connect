import { CardHeader, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import PlacesAutocomplete from "react-places-autocomplete";
import BeatLoader from "react-spinners/BeatLoader";
import Paper from "@material-ui/core/Paper";

function LocationSearchInput({ disabled, ...rest }) {
  return (
    <PlacesAutocomplete {...rest}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="autocomplete-container">
          <TextField
            label="Search Location"
            id="outlined-basic"
            variant="outlined"
            fullWidth
            disabled={disabled}
            {...getInputProps({})}
          />
          <Paper
            elevation={15}
            className="autocomplete-dropdown-container"
          >
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#e6e6e6", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              // console.log(suggestion);
              return (
                <CardHeader
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  title={suggestion.description}
                  titleTypographyProps={{
                    variant: "body1",
                    color: "inherit",
                  }}
                />
              );
            })}
            {loading && (
              <div className="css-js-container">
                <BeatLoader className="css-js-loader" size={8} />
              </div>
            )}
          </Paper>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

LocationSearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onError: PropTypes.func,
  onSelect: PropTypes.func,
  searchOptions: PropTypes.shape({
    bounds: PropTypes.object,
    componentRestrictions: PropTypes.object,
    location: PropTypes.object,
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    radius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    types: PropTypes.array,
  }),
  debounce: PropTypes.number,
  highlightFirstSuggestion: PropTypes.bool,
  shouldFetchSuggestions: PropTypes.bool,
  googleCallbackName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default LocationSearchInput;
