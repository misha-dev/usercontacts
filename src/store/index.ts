import { configureStore } from "@reduxjs/toolkit";

import contactsSlice from "./contactsSlice";

import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    contacts: contactsSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
