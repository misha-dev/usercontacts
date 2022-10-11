import { useState } from "react";

import { FormInputWithValidation } from "../Utils/FormInput/FormInputWithValidation/FormInputWithValidation";

import cl from "./AddContactModal.module.scss";

export const AddContactModal = ({ modalVisible, setModalVisible }: { modalVisible: boolean; setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div
      onMouseDown={() => {
        setModalVisible(false);
      }}
      className={`${cl.modalWrapper} ${modalVisible ? cl.active : ""}`}
    >
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        className={cl.modalContent}
      >
        <form>
          <FormInputWithValidation id="name" name="name" required={true} text={"name"} type="text" value={name} setValue={setName} />
          <FormInputWithValidation id="surname" name="surname" required={false} text={"surname"} type="text" value={surname} setValue={setSurname} />
          <FormInputWithValidation id="phoneNumber" name="phoneNumber" required={true} text={"phoneNumber"} type="tel" value={phoneNumber} setValue={setPhoneNumber} />
        </form>
        {/* #TODO ADD role of the person*/}
      </div>
    </div>
  );
};
