import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useScrollbar } from "../../hooks/useScrollbar";

import { fetchContacts, selectContacts } from "../../store/contactsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { searchSort } from "../../Utils/searchSort";
import "./ContactsAnimation.scss";

import { Contact } from "../Contact/Contact";
import { ContactModal } from "../ContactModal/ContactModal";

import { SearchInput } from "../Utils/SearchInput/SearchInput";

import { PersonType } from "../../types/ContactType";
import { ContactsFilter } from "../ContactsFilter/ContactsFilter";

import { filterContactsOnSearchString } from "../../Utils/filterContactsOnSearchString";

import { LoaderCircle } from "../Utils/LoaderCircle/LoaderCircle";

import cl from "./Contacts.module.scss";
import { NoContacts } from "./NoContacts/NoContacts";

export const Contacts = () => {
  const contactsRef = useRef<HTMLDivElement>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
  const { contacts, loadingAll, error } = useAppSelector(selectContacts);
  const [typeSelected, setTypeSelected] = useState<PersonType | null>(null);
  const [searchString, setSearchString] = useState("");

  useScrollbar(contactsRef, contacts.length > 0);

  const filteredContacts = useMemo(() => {
    let sortedContacts = [...contacts].sort(searchSort);
    if (typeSelected !== null) {
      sortedContacts = sortedContacts.filter((contact) => contact.type === typeSelected);
    }
    return filterContactsOnSearchString(sortedContacts, searchString);
  }, [contacts, searchString, typeSelected]);

  return (
    <div className={cl.mainWrapper}>
      <SearchInput setSearchString={setSearchString} />
      <div className={cl.addContact}>
        <div
          onClick={() => {
            setModalVisible(true);
          }}
          className={cl.addContactButton}
        >
          <AiOutlinePlus className={cl.plus} />
        </div>
        <ContactModal modalVisible={modalVisible} fullName={""} phoneNumberText={""} selectGroupTypeText={"friend"} submitText={"Add contact"} setModalVisible={setModalVisible} />
      </div>
      <ContactsFilter typeSelected={typeSelected} filterTypes={["family", "colleague", "friend"]} setType={setTypeSelected} />
      <div className={cl.contactsWrapper}>
        {!loadingAll ? (
          filteredContacts.length !== 0 ? (
            <div ref={contactsRef} className={cl.contacts}>
              <div>
                <TransitionGroup>
                  {filteredContacts.map(({ userId, id, fullName, phone, type }) => {
                    return (
                      <CSSTransition key={id} timeout={300} classNames={"contactTransitionGroup"}>
                        <Contact id={id} userId={userId} fullName={fullName} phone={phone} type={type} />
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
              </div>
            </div>
          ) : (
            <NoContacts text="No contacts!" />
          )
        ) : (
          <LoaderCircle size={5} />
        )}
      </div>
    </div>
  );
};
