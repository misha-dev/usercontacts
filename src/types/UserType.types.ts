export type UserLogin = {
  email: string;
  password: string;
};

export type userType = {
  name: string;
} & UserLogin;

export type UserAuth = {
  id: number;
  accessToken: string;
};

export type UserReduxType = Omit<userType, "password"> & { id: number };
