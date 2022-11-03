export type UserLogin = {
  email: string;
  password: string;
};

export type UserType = {
  name: string;
} & UserLogin;

export type UserAuth = {
  userId: number;
  accessToken: string;
};

export type UserReduxType = Omit<UserType, "password"> & { id: number };
