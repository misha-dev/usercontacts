import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { AddContactModal } from "../AddContactModal/AddContactModal";
import { Contact } from "../Contact/Contact";

import { SearchInput } from "../Utils/SearchInput/SearchInput";

import cl from "./Contacts.module.scss";

export const Contacts = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
        <Contact id={1} fullName="Misha Shabatin" phone="+7 (951) 468 -85-97" type="Family" userId={1} />
      </div>
    </div>
  );
};
