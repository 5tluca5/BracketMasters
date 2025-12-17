require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

// Import configurations
const configureMongoose = require("./config/mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

// Load environment variables
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";


const User = require("./models/User");

const ensureAdminExists = async () => {
    const existingAdmin = await User.findOne({ role: "Admin" });

    if (!existingAdmin) {
        const user = new User({ username: "admin", email: "admin@example.com", password: "1234", role: "Admin" });
        await user.save();
        
        console.log("Default admin user created (username: admin, password: 1234)");
    }
    else {
      console.log("Default admin user (username: admin, password: 1234)");

    }
};

// Initialize Express app
const app = express();

// ✅ Middleware setup
function configureMiddleware() {
  app.use(
    cors({
      origin: CLIENT_ORIGIN,
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

// Authentication middleware
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }
  next();
}

// ✅ Start Apollo Server
async function startServer() {
  await configureMongoose();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  configureMiddleware();
  app.use(authMiddleware);

  // Apollo GraphQL middleware
  app.use(
    "/graphql",
    (req, res, next) => {
      req.res = res; // Attach response object
      next();
    },
    expressMiddleware(server, {
      context: async ({ req }) => ({ req, res: req.res, user: req.user }),
    })
  );

  app.listen(PORT, async () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
    await ensureAdminExists();
  });
}

startServer();
