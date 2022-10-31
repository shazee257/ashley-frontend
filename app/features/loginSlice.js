import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  status: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.data = action.payload;
      state.status = true;
    },
    setLogout(state) {
      state.data = null;
      state.status = false;
    },
  },
});

export const { setLogin, setLogout } = loginSlice.actions;

export default loginSlice.reducer;

export const selectLoginData = (state) => state.login.data;
export const selectLoginStatus = (state) => state.login.status;
