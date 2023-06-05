import { gql } from "@apollo/client";

export const SUBMIT_JACKALOPE = gql`
  mutation submitJackalopeRequest(
    $email: String!
    $name: ID!
    $employees: String!
  ) {
    submitJackalopeRequest(
      numberOfEmployees: $employees
      orgName: $name
      requestEmail: $email
    ) {
      success
    }
  }
`;
