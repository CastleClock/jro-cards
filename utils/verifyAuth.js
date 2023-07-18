import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const LOGGED_IN = gql`
  query isLoggedIn {
    me {
      company {
        name
      }
    }
  }
`;

export default async function Verify(user) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URI,
    credentials: "same-origin",
    cache: new InMemoryCache(),
    headers: {
      authorization: `JWT ${user.token}`,
    },
  });
  const { data } = await client.query({
    query: LOGGED_IN,
  });

  return data.me;
}
