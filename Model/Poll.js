const { model, Schema } = require("mongoose");

const pollSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  totalVote: {
    type: Number,
    default: 0,
  },
  options: {
    type: [
      {
        name: String,
        vote: Number,
      },
    ],
  },
});

const poll = model("Poll", pollSchema);
module.exports = poll;
