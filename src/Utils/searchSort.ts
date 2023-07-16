import { ContactType } from "../types/ContactType.types";

export function searchSort(a: ContactType, b: ContactType) {
  return a.fullName.localeCompare(b.fullName);
}
