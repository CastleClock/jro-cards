import { gql } from "@apollo/client";

export const USER_LOOKUP = gql`
  query userLookup($code: String!) {
    userLookup(code: $code) {
      id
      signedUp
      firstName
      lastName
      companyName
      position
      linkedinUrl
      linkedinProfilePicUrl
      email
      code
    }
  }
`;
