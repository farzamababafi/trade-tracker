import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  balance: 0,
  transactions: [],
  createdAt: "",
};
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions;
      state.createdAt = action.payload.createdAt;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
