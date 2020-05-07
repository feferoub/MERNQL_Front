import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    user {
      firstName
      lastName
      userName
      id
    }
  }
`;

export const GET_USER = gql`
  query($id: ID) {
    user(id: $id) {
      firstName
      lastName
      userName
      id
    }
  }
`;

export const LOGIN = gql`
  query($userName: String!, $password: String!) {
    login(userName: $userName, password: $password)
  }
`;
