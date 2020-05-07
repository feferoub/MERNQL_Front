import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { onError } from "apollo-link-error";

const cache = new InMemoryCache();

const uri = "http://localhost:8000/graphql";

const logoutLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError && networkError.statusCode === 401) {
    window.postMessage("Disconnect", "*");
  }
});

const httpLink = new HttpLink({ uri: uri, credentials: "include" });
const client = new ApolloClient({
  cache,
  link: logoutLink.concat(httpLink),
  connectToDevTools: true,
});

export default client;
