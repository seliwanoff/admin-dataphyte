import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the user
interface UserState {
  isAuthenticated: boolean;
  username: string;
  email: string;
  profile: { [key: string]: string } | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  username: "",
  email: "",
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; email: string }>) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = "";
      state.email = "";
      state.profile = null;
    },
    setUserProfile(state, action: PayloadAction<{ [key: string]: string }>) {
      state.profile = action.payload;
    },
  },
});

export const { login, logout, setUserProfile } = userSlice.actions;
export default userSlice.reducer;
