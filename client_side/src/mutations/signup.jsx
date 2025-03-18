import { gql } from '@apollo/client';

const SIGN_UP = gql`
  mutation Signup($username: String!, $email: String!, $password: String!, $role: String!) {
    signup(username: $username, email: $email, password: $password, role: $role) {
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export default SIGN_UP;
