import { gql } from '@apollo/client';

const GET_TOURNAMENTS = gql`
 query{
  tournaments {
  id
  name
  game
  date
  status
  players {
    id
    ranking
    username
  }
  }
}
`;

export default GET_TOURNAMENTS;
