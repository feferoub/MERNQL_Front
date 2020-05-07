import { gql } from "apollo-boost";

export const SIGNUP = gql`
  mutation($userName: String!, $password: String!) {
    signup(userName: $userName, password: $password)
  }
`;
