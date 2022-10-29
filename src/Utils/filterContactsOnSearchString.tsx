import { ContactType } from "../types/ContactType";

export function filterContactsOnSearchString(contacts: ContactType[], searchString: string) {
  return contacts.filter((contact) => {
    if (Number.isNaN(Number(searchString)) && searchString[0] !== "+") {
      return contact.fullName.toLowerCase().includes(searchString.toLowerCase());
    } else {
      return contact.phone.includes(searchString);
    }
  });
}
