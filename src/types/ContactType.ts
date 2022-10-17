export type PersonType = "Friend" | "Colleague" | "Family";

export type ContactType = {
  userId: number;
  fullName: string;
  phone: string;
  type: PersonType;
};
