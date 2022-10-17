import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserReduxType } from "../types/UserType.types";

import { RootState } from ".";


const initialState: UserReduxType = {} as UserReduxType;

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: UserReduxType, action: PayloadAction<UserReduxType>) {
      const { id, email, name } = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
    },
    logOut(state: UserReduxType) {
      return {} as UserReduxType;
    },
  },
});

export default user.reducer;
export const { setUser, logOut } = user.actions;
export const selectUser = (state: RootState) => state.user;
