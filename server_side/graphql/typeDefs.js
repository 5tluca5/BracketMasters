// typeDefs.js is a file that contains the GraphQL 
// schema definition language (SDL) that defines the types, 
// queries, and mutations that the GraphQL server supports. 
// The schema is defined using the GraphQL schema definition 
// language (SDL).
const typeDefs = `#graphql
  type User {
  id: ID!
  username: String!
  email: String!
  role: String!
}

type Player {
  id: ID!
  user: User!
  username: String!
  ranking: Int
  tournaments: [Tournament]
}

type Tournament {
  id: ID!
  name: String!
  game: String!
  date: String!
  players: [Player]
  status: String!
}

type Query {
  me: User
  players: [Player]
  playerByUserId(userId: ID!): Player
  tournaments: [Tournament]
}


type Mutation {
  signup(
  username: String!,
  email: String!, 
  password: String!,
  role: String!
  ): AuthPayload

  login(
  username: String!, 
  password: String!
  ): AuthPayload

  logout: Boolean

  createUser(
    username: String!,
    email: String!, 
    password: String!,
    role: String!
    ): AuthPayload

  createTournament(
  name: String!, 
  game: String!, 
  date: String!,
  status: String!
  ): Tournament

  joinTournament(
  tournamentId: ID!,
  playerId: ID!
  ): Boolean
}

type AuthPayload {
  user: User
}



`;

module.exports = typeDefs;
