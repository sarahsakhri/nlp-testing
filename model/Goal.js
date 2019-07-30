var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var goalSchema = new Schema({
  // `title` is of type String
  // title: String,
  // `body` is of type String
  goal: {
    type: String
  },
  correct: Boolean,
  duration: {
    type: String
  },
  startTime: {
    type: Date
  }
}
);

// This creates our model from the above schema, using mongoose's model method
var Goal = mongoose.model("goal", goalSchema);

// Export the Note model
module.exports = Goal;