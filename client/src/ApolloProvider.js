import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist";
import App from "./App";

const httpLink = createUploadLink({
  uri: "http://192.168.0.8:4000/",
  headers: {
    "keep-alive": "true",
  },
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getTimeline: {
          keyArgs: ["userId", "queryType"],
          merge(existing, incoming) {
            if (!existing) return incoming;
            if (!incoming) return existing;
            return {
              ...incoming,
              posts: [...existing.posts, ...incoming.posts],
            }
          }
        },
        getFriends: {
          keyArgs: ["userId"],
          merge(existing, incoming, { args }) {
            if (!existing) return incoming;
            if (!incoming) return existing;
            if (args.offset === 0) return incoming;
            return {
              ...incoming,
              friendsDetails: [
                ...existing.friendsDetails,
                ...incoming.friendsDetails,
              ],
            };
          },
        },
        getReceivedRequests: {
          merge(existing, incoming, { args }) {
            console.log(existing, incoming);
            if (!existing) return incoming;
            if (!incoming) return existing;
            if (args.offset === 0) return incoming;
            return {
              ...incoming,
              requests: [...existing.requests, ...incoming.requests],
            };
          }
        },
        getSentRequests: {
          merge(existing, incoming, { args }) {
            if (!existing) return incoming;
            if (!incoming) return existing;
            if (args.offset === 0) return incoming;
            return {
              ...incoming,
              requests: [...existing.requests, ...incoming.requests],
            };
          }
        },
      },
    },
  },
});

const init = async () => {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
    key: "connect-cache-storage",
    debug: true,
  });
}

init();


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default (
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
);
