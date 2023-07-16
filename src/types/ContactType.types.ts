export type PersonType = "friend" | "colleague" | "family";

export type ContactType = {
  id?: number;
  userId: number;
  fullName: string;
  phone: string;
  type: PersonType;
};
export type ContactsReduxType = {
  loadingAll: boolean;
  loadingModify: boolean;
  contacts: Array<ContactType>;
  error: string;
};
