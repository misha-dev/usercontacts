export type ContactType = {
  id: number;
  userId: string;
  fullName: string;
  phone: string;
  type: "Friend" | "Colleague" | "Family";
};
