import { gql } from '@apollo/client';

const CREATE_TOURNAMENT = gql`
  mutation CreateTournament($name: String!, $game: String!, $date: String!, $status: String!) {
    createTournament(name: $name, game: $game, date: $date, status: $status) {
    id
    name
    game
    date
    status
    }
  }
`;

export default CREATE_TOURNAMENT;
