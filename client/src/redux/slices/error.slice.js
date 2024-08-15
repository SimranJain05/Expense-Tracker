import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    error: false,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = false;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
