import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  coords: {
    start: { id: null, lat: 1, lng: 1 },
    end: { id: null, lat: 2, lng: 2 },
  },
  showResults: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    firstStart: (state, action) => {
      const { lat, lng } = action.payload;
      state.coords.start = { id: nanoid(), lat, lng };
    },
    firstEnd: (state, action) => {
      const { lat, lng } = action.payload;
      state.coords.end = { id: nanoid(), lat, lng };
    },
    results: (state, action) => {
      const showResults = action.payload;
      state.showResults = { id: nanoid(), showResults };
    },
  },
});

export const { results, firstStart, firstEnd } = mapSlice.actions;

export default mapSlice.reducer;
