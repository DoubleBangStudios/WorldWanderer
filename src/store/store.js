import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "../features/map/mapSlice";

export const store = configureStore({
  reducer: mapReducer,
});

export default store;
