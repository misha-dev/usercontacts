import { useEffect, useState } from "react";

import { ImCross } from "react-icons/im";

import { GradientButton } from "../Utils/Buttons/GradientButton/GradientButton";

import { FormInputWithValidation } from "../Utils/FormInput/FormInputWithValidation/FormInputWithValidation";
import { SelectInput } from "../Utils/FormInput/SelectInput/SelectInput";

import cl from "./AddContactModal.module.scss";

export const AddContactModal = ({ modalVisible, setModalVisible }: { modalVisible: boolean; setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  // form values
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectGroupType, setSelectGroupType] = useState("Friend");

  // form errors

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      const value = e.key;
      if (value === "Escape") {
        setModalVisible(false);
      }
    };
    document.addEventListener("keydown", escapeHandler);

    return () => {
      document.removeEventListener("keydown", escapeHandler);
    };
  }, []);

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
        <ImCross
          className={cl.cross}
          onClick={() => {
            setModalVisible(false);
          }}
        />
        <form>
          <FormInputWithValidation id="name" name="name" required={true} text={"Name"} type="text" value={name} setValue={setName} />
          <FormInputWithValidation id="surname" name="surname" required={false} text={"Surname"} type="text" value={surname} setValue={setSurname} />
          <FormInputWithValidation id="phoneNumber" name="phoneNumber" required={true} text={"Phone"} type="tel" value={phoneNumber} setValue={setPhoneNumber} />
          <SelectInput id="groupType" name="groupType" options={["Friend", "Colleague", "Family"]} required={true} value={selectGroupType} setValue={setSelectGroupType} />

          <GradientButton text="Add contact" type="submit" />
        </form>
      </div>
    </div>
  );
};
