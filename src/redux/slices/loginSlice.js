import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: { status: false },
  reducers: {
    login: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
