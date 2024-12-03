import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice"; // Import the auth slice

// Create the store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
