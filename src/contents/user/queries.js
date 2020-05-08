import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    users {
      firstName
      lastName
      userName
      id
    }
  }
`;

export const GET_USER = gql`
  query($id: ID, $userName: String, $email: String) {
    user(id: $id, userName: $userName, email: $email) {
      firstName
      lastName
      userName
      email
      id
    }
  }
`;

export const CHECK_USER_EXIST = gql`
  query($userName: String, $email: String) {
    checkIfUserExists(userName: $userName, email: $email)
  }
`;

export const LOGIN = gql`
  query($userName: String!, $password: String!, $email: String!) {
    login(userName: $userName, password: $password, email: $email)
  }
`;
