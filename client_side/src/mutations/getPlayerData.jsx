import { gql } from '@apollo/client';

const GET_PLAYER_DATA = gql`
 query PlayerByUserId($userId: ID!) {
  playerByUserId(userId: $userId) {
    id
    ranking
    tournaments {
      id
      name
      game
      date
      status
    }
  }
}
`;

export default GET_PLAYER_DATA;
