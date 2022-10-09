import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserReduxType } from "../types/UserType.types";

const initialState: UserReduxType = {} as UserReduxType;

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: UserReduxType, action: PayloadAction<UserReduxType>) {
      const { id, email, name, phoneNumber } = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
      state.phoneNumber = phoneNumber;
    },
    logOut(state: UserReduxType) {
      return {} as UserReduxType;
    },
  },
});

export default user.reducer;
export const { setUser, logOut } = user.actions;
