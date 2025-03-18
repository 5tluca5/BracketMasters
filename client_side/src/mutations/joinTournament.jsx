import { gql } from '@apollo/client';

const JOIN_TOURNAMENT = gql`
  mutation JoinTournament($tournamentId: ID!, $playerId: ID!) {
    joinTournament(tournamentId: $tournamentId, playerId: $playerId)
  }
`;

export default JOIN_TOURNAMENT;