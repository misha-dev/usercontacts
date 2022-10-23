export type PersonType = "Friend" | "Colleague" | "Family";

export type ContactType = {
  id: number;
  userId: number;
  fullName: string;
  phone: string;
  type: PersonType;
};
