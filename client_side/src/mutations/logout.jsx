import { gql } from '@apollo/client';

const LOG_OUT = gql`
  mutation {
    logout
  }
`;

export default LOG_OUT;
