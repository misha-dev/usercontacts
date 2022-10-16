export type ContactType = {
  userId: number;
  fullName: string;
  phone: string;
  type: "Friend" | "Colleague" | "Family";
};
