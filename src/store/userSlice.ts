import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReduxType } from "../types/UserType.types";

const initialState: UserReduxType = {
  name: "",
  username: "",
  email: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: UserReduxType, action: PayloadAction<UserReduxType>) {},
    logOut(state: UserReduxType) {
      return {} as UserReduxType;
    },
  },
});

export default user.reducer;
export const { setUser, logOut } = user.actions;
