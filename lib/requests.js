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
      cardQrCode
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String, $password: String!) {
    tokenAuth(username: $email, password: $password) {
      token
      errors
      user {
        pk
        firstName
        lastName
        phoneNumber
        position
        companyName
        email
        linkedinProfilePicUrl
        linkedinUrl
        company {
          name
        }
      }
    }
  }
`;

/** ONBOARDING */
/** ************************************************************************************************************************************* */

export const RESET_REQUEST = gql`
  mutation resetPasswordRequest($email: String!) {
    resetPasswordRequest(email: $email) {
      success
      errorMsg
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword(
    $linkCode: String!
    $password: String!
    $passwordMatch: String!
  ) {
    resetPassword(
      linkCode: $linkCode
      password: $password
      passwordMatch: $passwordMatch
    ) {
      success
      errorMsg
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateAccount(
    $first: String
    $last: String
    $email: String
    $position: String
    $role: String
    $phoneNumber: String
    $link: String
    $isAvailable: Boolean
    $linkedinUrl: String
    $companyName: String
  ) {
    updateAccount(
      firstName: $first
      lastName: $last
      email: $email
      role: $role
      position: $position
      phoneNumber: $phoneNumber
      bookingLink: $link
      isAvailable: $isAvailable
      linkedinUrl: $linkedinUrl
      companyName: $companyName
    ) {
      error
      user {
        firstName
        lastName
        email
        position
        companyName
        phoneNumber
        linkedinUrl
      }
    }
  }
`;
