import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: "",
  kindOfResult: "",
  amount: 0,
};
export const reslutSlice = createSlice({
  name: "resultSlice",
  initialState,
  reducers: {
    setResult(state, action) {
      state.result = action.payload;
    },
    setKindOfResult(state, action) {
      state.kindOfResult = action.payload;
    },
    setAmount(state, action) {
      state.amount = action.payload;
    },

    setDefaultResult(state) {
      state.result = "";
      state.kindOfResult = "";
      state.amount = 0;
    },
  },
});
export const { setAmount, setDefaultResult, setResult, setKindOfResult } =
  reslutSlice.actions;
export default reslutSlice.reducer;
