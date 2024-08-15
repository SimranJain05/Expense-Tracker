import { createSlice } from "@reduxjs/toolkit";

export const successSlice = createSlice({
  name: "success",
  initialState: {
    success: false,
  },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
});

export const { setSuccess, clearSuccess } = successSlice.actions;

export default successSlice.reducer;
