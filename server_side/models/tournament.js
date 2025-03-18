// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },
  date: { type: Date, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed"],
    default: "Upcoming"
  }
});

module.exports = mongoose.model("Tournament", TournamentSchema);
