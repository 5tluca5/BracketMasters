// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ranking: Number,
    username: String,
    tournaments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tournament" }]
  });


module.exports = mongoose.model('Player', PlayerSchema);