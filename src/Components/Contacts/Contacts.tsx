import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { useScrollbar } from "../../hooks/useScrollbar";

import { fetchContacts, selectContacts } from "../../store/contactsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

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

  useScrollbar(contactsWrapper, contacts.length > 4);

  return (
    <div className={cl.mainWrapper}>
      <SearchInput />
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
          {!loadingAll
            ? contacts.map(({ userId, id, fullName, phone, type }) => {
              return <Contact id={id} userId={userId} key={id} fullName={fullName} phone={phone} type={type} />;
            })
            : null}
        </div>
      </div>
    </div>
  );
};
