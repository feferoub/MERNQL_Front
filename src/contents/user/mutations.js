import { gql } from "apollo-boost";

export const SIGNUP = gql`
  mutation($userName: String!, $password: String!, $email: String!) {
    signup(userName: $userName, password: $password, email: $email)
  }
`;

export const UPDATE_USER = gql`
  mutation(
    $userName: String!
    $lastName: String
    $firstName: String
    $email: String!
  ) {
    updateUser(
      userName: $userName
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      userName
      email
      lastName
      firstName
    }
  }
`;
