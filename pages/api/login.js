import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String, $password: String!) {
    tokenAuth(username: $email, password: $password) {
      token
      errors
      user {
        pk
        firstName
        lastName
        email
        position
        linkedinUrl
        linkedinProfilePicUrl
        company {
          name
        }
      }
    }
  }
`;

async function initClient(token) {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URI,
    credentials: "same-origin",
    cache: new InMemoryCache(),
    headers: {
      authorization: `JWT ${token}`,
    },
  });
}

async function loginRoute(req, res) {
  try {
    const client = await initClient();
    const userResponse = await client.mutate({
      mutation: LOGIN,
      variables: {
        email: req.body?.email,
        password: req.body?.password,
      },
      onError: (e) => alert(e),
    });

    if (userResponse.data?.tokenAuth.errors)
      throw {
        message: userResponse.data.tokenAuth.errors.nonFieldErrors[0].message,
      };
    if (!userResponse.data?.tokenAuth?.token) throw new Exception();
    let token = userResponse.data?.tokenAuth?.token;
    const {
      pk,
      linkedinProfilePicUrl,
      email,
      company,
      firstName,
      lastName,
      position,
      phoneNumber,
      linkedinUrl,
    } = userResponse.data?.tokenAuth?.user;

    const user = {
      id: pk,
      firstName,
      lastName,
      profile: linkedinProfilePicUrl,
      position,
      email,
      phoneNumber,
      companyName: company?.name,
      isLoggedIn: true,
      token: token,
      linkedinUrl,
    };

    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
