import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

let apolloClient;

const createApolloClient = () => {
  const blobLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_URI,
  });

  const authLink = setContext((_, context) => {
    const { token } = context;
    return {
      headers: {
        ...context.headers,
        authorization: token ? `JWT ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(blobLink),
    credentials: "same-origin",
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) _apolloClient.cache.restore(initialState);
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return apolloClient;
};

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
};
