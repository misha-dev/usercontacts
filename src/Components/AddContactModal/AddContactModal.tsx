import { useEffect, useState } from "react";

import { ImCross } from "react-icons/im";

import { useFormInput } from "../../hooks/useFormInput";
import { UserAuth } from "../../types/UserType.types";
import { GradientButton } from "../Utils/Buttons/GradientButton/GradientButton";
import { FormInputWithValidation } from "../Utils/FormInput/FormInputWithValidation/FormInputWithValidation";
import { SelectInput } from "../Utils/FormInput/SelectInput/SelectInput";


import { ContactType } from "../../types/ContactType";

import cl from "./AddContactModal.module.scss";

export const AddContactModal = ({ modalVisible, setModalVisible }: { modalVisible: boolean; setModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const name = useFormInput("", { minLength: 3 }, "text");
  const surname = useFormInput("", {}, "text");
  const phoneNumber = useFormInput("", { phoneValid: /((\+7|8) \(\d{3}\) \d{3}-\d{2}-\d{2})|(\+\d{7,16})/g }, "tel");
  const [selectGroupType, setSelectGroupType] = useState("Friend");
  const submitButtonIsDisabled = Boolean(name.valid.error) || Boolean(phoneNumber.valid.error);

  const closeModal = () => {
    setModalVisible(false);
    name.setDirty(false);
    name.setValue("");
    phoneNumber.setDirty(false);
    phoneNumber.setValue("");
    surname.setDirty(false);
    surname.setValue("");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, accessToken }: UserAuth = JSON.parse(localStorage.getItem("userAuth")!);
    if (!submitButtonIsDisabled) {
      fetch("http://localhost:3001/660/contacts", {
        method: "post",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ fullName: `${name.value.trim()} ${surname.value.trim()}`, phone: phoneNumber.value, type: selectGroupType, userId: id } as ContactType),
      })
        .then((data) => {
          return data.json();
        })
        .then((data: ContactType & { id: number }) => {
          console.log(data);
          closeModal();
        })
        .catch((error) => {
          alert("Data is incorrect!");
        });
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
          <FormInputWithValidation
            id="name"
            name="name"
            required={true}
            text={"Name"}
            type="text"
            value={name.value}
            setValue={name.setValue}
            onBlur={name.onBlur}
            onChange={name.onChange}
            dirty={name.dirty}
            valid={name.valid}
          />
          <FormInputWithValidation
            id="surname"
            name="surname"
            required={false}
            text={"Surname"}
            type="text"
            value={surname.value}
            setValue={surname.setValue}
            onBlur={surname.onBlur}
            onChange={surname.onChange}
            dirty={surname.dirty}
            valid={surname.valid}
          />
          <FormInputWithValidation
            id="phoneNumber"
            name="phoneNumber"
            required={true}
            text={"Phone"}
            type="tel"
            value={phoneNumber.value}
            setValue={phoneNumber.setValue}
            onBlur={phoneNumber.onBlur}
            onChange={phoneNumber.onChange}
            dirty={phoneNumber.dirty}
            valid={phoneNumber.valid}
            inputRef={phoneNumber.phoneInputRef}
          />
          <SelectInput id="groupType" name="groupType" options={["Friend", "Colleague", "Family"]} required={true} value={selectGroupType} setValue={setSelectGroupType} />

          <GradientButton disabled={submitButtonIsDisabled} text="Add contact" type="submit" />
        </form>
      </div>
    </div>
  );
};
