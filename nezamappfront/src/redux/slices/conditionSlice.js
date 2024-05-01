import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  balance: 0,
  score: 0,
  rr: 0,
  risk: 0,
  amountOfRisk: 0,
  lot: 0,
  position: "",
  emotionRate: 0,
  emotions: {
    health: 50,
    underthinking: 50,
    motivation: 50,
    pleasure: 50,
    unemotional: 50,
    calmness: 50,
    happiness: 50,
    not_gready: 50,
    not_to_be_afraid: 50,
    relationship_status: 50,
  },
  conditions: {
    fundamental: { filter1: "", filter2: "" },
    dxy: { filter1: "", filter2: "" },
    cdtd: { filter1: "", filter2: "" },
    trend: { filter1: "", filter2: "" },
    fiap: { filter1: "", filter2: "" },
    dm: { filter1: "", filter2: "" },
    otf: { filter1: "", filter2: "" },
    bp: { filter1: "", filter2: "" },
    ps: { filter1: "", filter2: "" },
    moabo: { filter1: "", filter2: "" },
    candle: { filter1: "", filter2: "" },
    av: { filter1: "", filter2: "" },
  },
};
export const conditionSlice = createSlice({
  name: "conditiontSlice",
  initialState,
  reducers: {
    definEmotions(state, action) {
      let key = action.payload.key;
      state.emotions[key] = action.payload.value;
    },
    definConditions(state, action) {
      let key = action.payload.key;
      let symbol = action.payload.symbol;
      state.conditions[key][symbol] = action.payload.value;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    calculateEmotionRate(state) {
      let result =
        (state.emotions.health * 1 +
          state.emotions.underthinking * 2 +
          state.emotions.motivation * 1 +
          state.emotions.pleasure * 1 +
          state.emotions.unemotional * 3 +
          state.emotions.calmness * 1 +
          state.emotions.happiness * 1 +
          state.emotions.not_gready * 3 +
          state.emotions.not_to_be_afraid * 3 +
          state.emotions.relationship_status * 2) /
        18;
      state.emotionRate = result;
    },
    setDefault(state) {
      state.name = "";
      state.conditions = {
        fundamental: { filter1: "", filter2: "" },
        dxy: { filter1: "", filter2: "" },
        cdtd: { filter1: "", filter2: "" },
        trend: { filter1: "", filter2: "" },
        fiap: { filter1: "", filter2: "" },
        dm: { filter1: "", filter2: "" },
        otf: { filter1: "", filter2: "" },
        bp: { filter1: "", filter2: "" },
        ps: { filter1: "", filter2: "" },
        moabo: { filter1: "", filter2: "" },
        candle: { filter1: "", filter2: "" },
        av: { filter1: "", filter2: "" },
      };
      state.emotions = {
        health: 50,
        underthinking: 50,
        motivation: 50,
        pleasure: 50,
        unemotional: 50,
        calmness: 50,
        happiness: 50,
        not_gready: 50,
        not_to_be_afraid: 50,
        relationship_status: 50,
      };
    },
    calculateLotRr(state, action) {
      state.rr = action.payload.tp / action.payload.sl;
      state.lot = state.amountOfRisk / (action.payload.sl * 10);
    },
    setBalance(state, action) {
      state.balance = action.payload.balance;
    },
    calculateScore(state) {
      let sym = state.name.includes("/USD") ? 1 : -1;
      let dxy = state.conditions.dxy.filter1 === "ASC" ? -1 : 1;
      let trend = state.conditions.trend.filter1 === "Up" ? -1 : 1;
      let patternPos =
        state.conditions.ps.filter1 === "Valuable upper 1/3"
          ? 1
          : state.conditions.ps.filter1 === "Middle 1/3"
          ? 0
          : -1;
      let moabo =
        state.conditions.moabo.filter1 === "Move out"
          ? 4
          : state.conditions.moabo.filter1 === "Break out"
          ? 4
          : 7.5;

      let a1;
      let a2;
      let a3;
      if (sym * dxy > 0) a1 = 1;
      else a1 = 0;
      if (dxy * trend > 0) a2 = 1;
      else a2 = 0;
      if (trend * patternPos >= 0) a3 = 1;
      else a3 = 0;
      if (a1 * a2 * a3 === 1 && trend === -1) state.position = "Long";
      else if (a1 * a2 * a3 === 1 && trend === 1) state.position = "Short";
      else
        state.position =
          "A suitable position to enter the transaction was not found";
      let factor1 = a1 * a2 * a3 === 1 ? 10 : 0;
      if (state.conditions.ps.filter2 === "Close to curve S/D area")
        factor1 *= 2;

      let factor2 =
        state.conditions.moabo.filter2 === "Strong" ? moabo * 2 : moabo;
      let factor3 =
        state.conditions.bp.filter2 === "RRR<3"
          ? 5
          : state.conditions.bp.filter2 === "3<RRR<5"
          ? 10
          : 15;
      let factor4 =
        state.conditions.candle.filter1 === "1-3"
          ? 15
          : state.conditions.candle.filter1 === "3-6"
          ? 7
          : 0;
      let factor5 = state.conditions.candle.filter2 === "First touch" ? 15 : 5;
      let factor6 =
        state.conditions.av.filter1 === "Powerfull"
          ? 10
          : state.conditions.av.filter1 === "Medium"
          ? 5
          : 0;
      if (state.conditions.av.filter2 === "Short term") factor6 *= 2;
      let score = factor1 + factor2 + factor3 + factor4 + factor5 + factor6;
      state.score = score;
      ///////////////////////////////////
      if (score >= 60 && score < 70) state.risk = 0.25;
      else if (score >= 70 && score < 80) state.risk = 0.5;
      else if (score >= 80 && score < 90) state.risk = 0.75;
      else if (score >= 90 && score <= 100) state.risk = 1;
      if (state.emotionRate >= 90) state.risk += 0.25;
      state.amountOfRisk = (state.balance * state.risk) / 100;
    },
  },
});
export const {
  setBalance,
  definEmotions,
  definConditions,
  setName,
  setDefault,
  calculateScore,
  calculateEmotionRate,
  calculateLotRr,
} = conditionSlice.actions;
export default conditionSlice.reducer;
