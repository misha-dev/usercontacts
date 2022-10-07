export type UserLogin = {
  email: string;
  password: string;
};

export type userType = {
  name: string;
  username: string;
} & UserLogin;

export type UserReduxType = Omit<userType, "password">;
