import { gql } from '@apollo/client';

const LOG_IN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export default LOG_IN;
