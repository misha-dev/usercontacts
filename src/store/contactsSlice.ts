import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../types/reduxUserType.types";

const initialState: userType = {
  nickname: "",
  email: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: userType, action: PayloadAction<userType>) {
    },
    logOut(state: userType) {
      return {} as userType;
    },

  },
});

export default user.reducer;
export const { setUser, logOut } = user.actions;
