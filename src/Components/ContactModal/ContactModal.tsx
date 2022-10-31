import { useEffect, useState } from "react";

import { ImCross } from "react-icons/im";

import { useFormInput } from "../../hooks/useFormInput";
import { UserAuth } from "../../types/UserType.types";
import { GradientButton } from "../Utils/Buttons/GradientButton/GradientButton";
import { FormInputWithValidation } from "../Utils/FormInput/FormInputWithValidation/FormInputWithValidation";
import { SelectInput } from "../Utils/FormInput/SelectInput/SelectInput";

import { fetchAddContact, selectContacts } from "../../store/contactsSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ContactType, PersonType } from "../../types/ContactType";

import cl from "./ContactModal.module.scss";

export const ContactModal = ({ modalVisible, setModalVisible }: { modalVisible: boolean; setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const name = useFormInput("", { minLength: 3 }, "text");
  const surname = useFormInput("", {}, "text");
  const phoneNumber = useFormInput("", { phoneValid: /((\+7|8) \(\d{3}\) \d{3}-\d{2}-\d{2})|(\+\d{7,16})/g }, "tel");
  const [selectGroupType, setSelectGroupType] = useState<PersonType>("friend");
  const submitButtonIsDisabled = Boolean(name.valid.error) || Boolean(phoneNumber.valid.error);
  const { loadingAdd } = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setModalVisible(false);
    name.setDirty(false);
    name.setValue("");
    phoneNumber.setDirty(false);
    phoneNumber.setValue("");
    surname.setDirty(false);
    surname.setValue("");
    setSelectGroupType("friend");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id }: UserAuth = JSON.parse(localStorage.getItem("userAuth")!);
    if (!submitButtonIsDisabled) {
      if (!loadingAdd) {
        const contact: ContactType = { fullName: `${name.value.trim()} ${surname.value.trim()}`, phone: phoneNumber.value, type: selectGroupType, userId: id };
        dispatch(fetchAddContact(contact))
          .unwrap()
          .then((data: ContactType) => {
            if (data.userId) {
              closeModal();
            }
          });
      }
    } else {
      alert("Data is incorrect!");
    }
  };

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      const value = e.key;
      if (value === "Escape") {
        closeModal();
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
        closeModal();
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
            closeModal();
          }}
        />
        <form onSubmit={onSubmit}>
          <FormInputWithValidation id="name" name="name" handler={name} required={true} text={"Name"} type="text" />
          <FormInputWithValidation id="surname" name="surname" required={false} text={"Surname"} type="text" handler={surname} />
          <FormInputWithValidation id="phoneNumber" name="phoneNumber" required={true} text={"Phone"} type="tel" handler={phoneNumber} inputRef={phoneNumber.phoneInputRef} />
          <SelectInput id="groupType" name="groupType" options={["friend", "colleague", "family"]} required={true} value={selectGroupType} setValue={setSelectGroupType} />

          <GradientButton disabled={submitButtonIsDisabled} text={loadingAdd ? "Posting" : "Add contact"} type="submit" />
        </form>
      </div>
    </div>
  );
};
