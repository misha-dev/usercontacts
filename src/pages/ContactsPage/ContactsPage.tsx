import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { LoaderCircle, SearchInput } from "components";
import { Contact, ContactModal, ContactsFilter } from "features";
import { filterContactsOnSearchString, searchSort } from "helpers";
import { useScrollbar } from "hooks";
import { fetchContacts, selectContacts } from "store/contactsSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { PersonType } from "types";

import cl from "./ContactsPage.module.scss";
import { NoContacts } from "./NoContacts/NoContacts";

export const ContactsPage = () => {
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
          error === "Server is not responding!" ? (
            <NoContacts text="Server is not responding" />
          ) : filteredContacts.length !== 0 ? (
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
            <NoContacts text="No contacts" />
          )
        ) : (
          <LoaderCircle size={5} />
        )}
      </div>
    </div>
  );
};
