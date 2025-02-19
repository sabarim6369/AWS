const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  mobilenumber: {
    type: Number,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ["unassigned", "assigned", "warm", "cold", "hot", "fulfilled"],
    default: "unassigned",
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Telecaller",
      default: null,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
  },
  country: {
    type: String,
  },
  age: {
    type: Number,
  },
  date: {
    type: String,
  },
  id: {
    type: Number,
  },
  notes: [
    {
      note: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      telecallerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Telecaller",
      },
      callbackTime: {
        type: Date,
      },
      callbackScheduled: {
        type: Boolean,
        default: false,
      },
    },
  ],
  
});

module.exports = leadSchema;
