import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!, $role: String!) {
    createUser(username: $username, email: $email, password: $password, role: $role) {
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export default CREATE_USER;
