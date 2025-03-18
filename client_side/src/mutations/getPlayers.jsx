import { gql } from '@apollo/client';

const GET_PLAYERS = gql`
 query {
  players {
    id
    username
    ranking
  }
}
`;

export default GET_PLAYERS;
