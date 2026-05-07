import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authChecked: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setAuthChecked: (state) => {
      state.authChecked = true;
    },
  },
});

export const { setUser, removeUser, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;