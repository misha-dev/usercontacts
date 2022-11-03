import { RootState } from ".";

const state: RootState = {
  user: { id: 1, email: "misha@mail.ru", name: "misha" },
  contacts: {
    contacts: [
      { fullName: "Misha Shabatin", phone: "+7 (951) 468-85-97", type: "family", userId: 1, id: 1 },
      {
        fullName: "Nikolay Luk",
        phone: "+321919322913",
        type: "colleague",
        userId: 1,
        id: 2,
      },
      {
        fullName: "Misha Gin",
        phone: "+7 (993) 219-21-39",
        type: "family",
        userId: 1,
        id: 3,
      },
      {
        fullName: "Anna Mir",
        phone: "+7 (991) 329-31-29",
        type: "friend",
        userId: 1,
        id: 4,
      },
    ],
    error: "",
    loadingAll: false,
    loadingModify: false,
  },
};

export const testUseAppSelector = (f: (state: RootState) => unknown) => f(state);
