const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionShema = new Schema({
  count: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  balance: {
    type: Number,
    required: true,
  },
  changeAmount: Number,
  date: {
    type: String,
    required: true,
  },
  result: String,
  kindOfResult: String,
  amountOfRisk: {
    type: Number,
    required: true,
  },

  emotionRate: {
    type: Number,
    required: true,
  },
  lot: {
    type: Number,
    required: true,
  },
  risk: {
    type: Number,
    required: true,
  },
  rr: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  firstPictureOpinion: {
    type: String,
    required: true,
  },
  secondPictureOpinion: {
    type: String,
  },
  emotion: {
    health: Number,
    underthinking: Number,
    motivation: Number,
    pleasure: Number,
    unemotional: Number,
    calmness: Number,
    happiness: Number,
    not_gready: Number,
    not_to_be_afraid: Number,
    relationship_status: Number,
  },
  condition: {
    fundamental: { filter1: String, filter2: String },
    dxy: { filter1: String, filter2: String },
    cdtd: { filter1: String, filter2: String },
    trend: { filter1: String, filter2: String },
    fiap: { filter1: String, filter2: String },
    dm: { filter1: String, filter2: String },
    otf: { filter1: String, filter2: String },
    bp: { filter1: String, filter2: String },
    ps: { filter1: String, filter2: String },
    moabo: { filter1: String, filter2: String },
    candle: { filter1: String, filter2: String },
    at: { filter1: String, filter2: String },
  },
  firstImageUrl: String,
  secondImageUrl: String,
});

transactionShema.statics.lengthOfCollection = function () {
  return this.find().then((result) => result.length);
};
module.exports = mongoose.Schema(transactionShema);
