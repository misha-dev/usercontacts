import { ContactType } from "../types/ContactType";

export function searchSort(a: ContactType, b: ContactType) {
  return a.fullName.localeCompare(b.fullName);
}
