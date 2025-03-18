import { gql } from '@apollo/client';

const CHECK_AUTH = gql`
  query {
  me {
    id
    username
    email
    role
  }
}
`;

export default CHECK_AUTH;
