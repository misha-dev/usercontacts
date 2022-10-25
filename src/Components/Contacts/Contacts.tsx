import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { fetchContacts, selectContacts } from "../../store/contactsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { AddContactModal } from "../AddContactModal/AddContactModal";
import { Contact } from "../Contact/Contact";

import { SearchInput } from "../Utils/SearchInput/SearchInput";

import cl from "./Contacts.module.scss";

export const Contacts = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
  const { contacts, loadingAll, error } = useAppSelector(selectContacts);
  console.log(loadingAll);

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
      <div className={cl.contactsWrapper}>
        {!loadingAll
          ? contacts.map(({ userId, id, fullName, phone, type }) => {
            return <Contact id={id} userId={userId} key={id} fullName={fullName} phone={phone} type={type} />;
          })
          : null}
      </div>
    </div>
  );
};
