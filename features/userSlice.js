// lib/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: null,
    name: null,
    role: null,
  },
  reducers: {
    addUserData: (state, action) => {
      const { id, email, name, role } = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
      state.role = role;
    },
    removeUserData: (state) => {
      state.id = null;
      state.email = null;
      state.name = null;
      state.role = null;
    },
  },
});

export const { addUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
