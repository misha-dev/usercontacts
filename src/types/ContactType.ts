export type PersonType = ("friend" | "colleague" | "family") & string;

export type ContactType = {
  id?: number;
  userId: number;
  fullName: string;
  phone: string;
  type: PersonType;
};
