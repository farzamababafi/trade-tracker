import { configureStore } from "@reduxjs/toolkit";
import conditionReducer from "./slices/conditionSlice";
import resultReducer from "./slices/resultSlice";
import userSlice from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    conditionSlice: conditionReducer,
    resultSlice: resultReducer,
    userSlice: userSlice,
  },
});
