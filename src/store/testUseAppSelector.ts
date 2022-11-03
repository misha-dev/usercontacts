import { RootState } from ".";

const state: RootState = {
  user: { id: 1, email: "misha@mail.ru", name: "misha" },
  contacts: {
    contacts: [{ fullName: "Misha Shabatin", phone: "+7 (951) 468-85-97", type: "family", userId: 1, id: 1 }],
    error: "",
    loadingAll: false,
    loadingModify: false,
  },
};

export const testUseAppSelector = (f: (state: RootState) => unknown) => f(state);
