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
    setFirstStart: (state, action) => {
      const { lat, lng } = action.payload;
      state.coords.start = { id: nanoid(), lat, lng };
    },
    setFirstEnd: (state, action) => {
      const { lat, lng } = action.payload;
      state.coords.end = { id: nanoid(), lat, lng };
    },
    results: (state, action) => {
      const showResults = action.payload;
      state.showResults = { id: nanoid(), showResults };
    },
  },
});

export const { results, setFirstStart, setFirstEnd } = mapSlice.actions;

export default mapSlice.reducer;
