
// Handle the errors received from apollo-server
export default function handleErrors(error, errorlocation) {
    /**
     * @param {Object} error - The error object received from apollo-server
     * @param {string} errorlocation - The location of the error
     */

    if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(`[At ${errorlocation}]:, [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }

    if (error.networkError) {
        console.error(`[At ${errorlocation}]:, [Network error]: ${error.networkError}`);
    }

    if (error.message) {
        console.error(`[At ${errorlocation}]:, [Message]: ${error.message}`);
    }

    if (error.stack) {
        console.error(`[At ${errorlocation}]:, [Stack trace]: ${error.stack}`);
    }

    if (error.extraInfo) {
        console.error(`[At ${errorlocation}]:, [Extra info]: ${error.extraInfo}`);
    }
}
