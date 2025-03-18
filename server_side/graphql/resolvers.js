const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Player = require("../models/Player");
const Tournament = require("../models/Tournament");

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user.id);
    },
    players: async () => {
      try {
        const players = await Player.find().populate("user").exec();
        return players;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    playerByUserId: async (_, { userId }) => {
      return await Player.findOne({ user: userId }).populate("tournaments");
    },
    tournaments: async () => {
      try {
        const tournaments = await Tournament.find().populate("players").exec();
        return tournaments;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },

  Mutation: {
    signup: async (_, { username, email, password, role }, { res }) => {
      // throw new Error("TEST ERROR: Signup resolver is being called!");
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      console.log("Creating user");
      const user = new User({ username, email, password, role });
      await user.save();

      if (role === "Player") {
        console.log("Creating player");
        // Create a Player profile for the new user
        const player = new Player({ user: user._id, username: user.username });
        await player.save();
      }

      console.log("Generating JWT Token");
      // Generate JWT Token
      const jwtSecret = process.env.JWT_SECRET || "default_secret_key";
      const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: "7d" });

      console.log("setting HTTPOnly Cookie");
      // Set HTTPOnly Cookie
      res.cookie("token", token, { httpOnly: true, secure: false });

      console.log("Returning user");
      return { user };
    },

    login: async (_, { username, password }, { res }) => {
      console.log("Resolver: logging-in...");
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");

      console.log("Resolver: validing...");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");

      console.log("Resolver: generating JWT token");
      // Generate JWT Token
      const jwtSecret = process.env.JWT_SECRET || "default_secret_key";
      const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: "7d" });

      console.log("Resolver: Setting HTTPOnly Cookie");
      // Set HTTPOnly Cookie
      res.cookie("token", token, { httpOnly: true, secure: false });

      console.log("Resolver: login success.")
      return { user };
    },

    logout: (_, __, { res }) => {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false, // Set to `true` in production with HTTPS
      });
      return true;
    },
    createUser: async (_, { username, email, password, role }, { res }) => {
      // throw new Error("TEST ERROR: Signup resolver is being called!");
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      console.log("Creating user");
      const user = new User({ username, email, password, role });
      await user.save();

      if (role === "Player") {
        console.log("Creating player");
        // Create a Player profile for the new user
        const player = new Player({ user: user._id, username: user.username });
        await player.save();
      }

      console.log("Returning user");
      return { user };
    },
    createTournament: async (_, { name, game, date, status }, { user }) => {
      if (!user || user.role !== "Admin") throw new Error("Unauthorized");

      const tournament = new Tournament({ name, game, date, players: [], status });
      return await tournament.save();
    },
    joinTournament: async (_, { tournamentId, playerId }, { user }) => {
      if (!user) throw new Error("Unauthorized");
    
      // Find the tournament
      console.log("Resolver: tournament id: ", tournamentId);
      const tournament = await Tournament.findById(tournamentId);
      if (!tournament) throw new Error("Tournament not found");
    
      // Find the player
      console.log("Resolver: player id: ", playerId);
      const player = await Player.findById(playerId);
      if (!player) throw new Error("Player not found. ID: ", playerId);
    
      // Check if player is already in the tournament
      const alreadyJoined = tournament.players.some(p => p.equals(player._id));
      if (alreadyJoined) throw new Error("You have already joined this tournament");
    
      // Add player to the tournament
      console.log("Resolver: pushing player id ", player._id, "to tournament");
      tournament.players.push(player._id);

      console.log("Resolver: pushing tournament id ", tournament._id, "to player");
      player.tournaments.push(tournament._id);
      await tournament.save();
      await player.save();
    
      return true;
    }
  }
};

module.exports = resolvers;
