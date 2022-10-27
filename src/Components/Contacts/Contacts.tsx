import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useScrollbar } from "../../hooks/useScrollbar";

import { fetchContacts, selectContacts } from "../../store/contactsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { searchSort } from "../../Utils/searchSort";

import { AddContactModal } from "../AddContactModal/AddContactModal";
import { Contact } from "../Contact/Contact";

import { SearchInput } from "../Utils/SearchInput/SearchInput";

import cl from "./Contacts.module.scss";

export const Contacts = () => {
  const contactsWrapper = useRef<HTMLDivElement>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
  const { contacts, loadingAll, error } = useAppSelector(selectContacts);
  const [searchString, setSearchString] = useState("");

  useScrollbar(contactsWrapper, contacts.length > 4);

  const filteredContacts = useMemo(() => {
    const sortedContacts = [...contacts].sort(searchSort);
    return sortedContacts.filter((contact) => contact.fullName.toLowerCase().includes(searchString.toLowerCase()));
  }, [contacts, searchString]);

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
        <AddContactModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </div>
      <div ref={contactsWrapper} className={cl.contactsWrapper}>
        <div>
          {!loadingAll ? (
            <TransitionGroup>
              {filteredContacts.map(({ userId, id, fullName, phone, type }) => {
                return (
                  <CSSTransition key={id} timeout={500} classNames={"contactTransitionGroup"}>
                    <Contact id={id} userId={userId} key={id} fullName={fullName} phone={phone} type={type} />
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          ) : null}
        </div>
      </div>
    </div>
  );
};
