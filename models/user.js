const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionShema = require("./transaction");
const userShema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true },
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    transactions: [transactionShema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userShema);
