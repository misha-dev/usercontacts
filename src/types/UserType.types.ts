export type userType = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserReduxType = Omit<userType, "password">;
