import React, { useEffect, useState } from "react";

import { ImCross } from "react-icons/im";



import { ContactType, PersonType, UserAuth } from "types";
import { useFormInput } from "hooks";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchAddContact, fetchEditContact, selectContacts } from "store/contactsSlice";
import { CustomizedSnackbar, FormInputWithValidation, GradientButton, Portal, SelectInput } from "components";

import cl from "./ContactModal.module.scss";
type props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  contactId?: number;
  fullName: string;
  phoneNumberText: string;
  selectGroupTypeText: PersonType;
  submitText: string;
};

export const ContactModal = ({ modalVisible, setModalVisible, fullName, phoneNumberText, selectGroupTypeText, submitText, contactId }: props) => {
  useEffect(() => {
    if (submitText === "Update") {
      name.setDirty(true);
      surname.setDirty(true);
      phoneNumber.setDirty(true);
    }
  }, []);
  const [nameText = "", surnameText = ""] = fullName.split(" ");
  const name = useFormInput(nameText, { minLength: 3 }, "text");

  const surname = useFormInput(surnameText, {}, "text");

  const phoneNumber = useFormInput(phoneNumberText, { phoneValid: 1 }, "tel");

  const [selectGroupType, setSelectGroupType] = useState<PersonType>(selectGroupTypeText);
  const submitButtonIsDisabled = Boolean(name.valid.error) || Boolean(phoneNumber.valid.error);
  const { loadingModify, error } = useAppSelector(selectContacts);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    // prevent from receiving an errors when user sends form by pressing enter or closes with escape on focused phone number input field
    [name, surname, phoneNumber].forEach((ref) => {
      ref.inputRef.current?.blur();
    });
    if (submitText === "Add contact") {
      name.setDirty(false);
      name.setValue("");
      phoneNumber.setDirty(false);
      phoneNumber.setValue("");
      surname.setDirty(false);
      surname.setValue("");
      setSelectGroupType("friend");
    }

    setModalVisible(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userId }: UserAuth = JSON.parse(localStorage.getItem("userAuth")!);
    if (!submitButtonIsDisabled) {
      if (!loadingModify) {
        const contact: ContactType = { fullName: `${name.value.trim()} ${surname.value.trim()}`, phone: phoneNumber.value, type: selectGroupType, userId };
        if (contactId) {
          contact.id = contactId;
          dispatch(fetchEditContact(contact))
            .unwrap()
            .then((data: ContactType) => {
              if (data.userId) {
                closeModal();
              }
            })
            .catch((error) => {
              setOpenSnackbar(true);
            });
        } else {
          dispatch(fetchAddContact(contact))
            .unwrap()
            .then((data: ContactType) => {
              if (data.userId) {
                closeModal();
              }
            })
            .catch((error) => {
              setOpenSnackbar(true);
            });
        }
      }
    } else {
      setOpenSnackbar(true);
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
    <Portal>
      <CustomizedSnackbar originOfSnackbar={{ horizontal: "left", vertical: "top" }} message="Couldn't update data!" severity="error" autoHide={1500} open={openSnackbar} setOpen={setOpenSnackbar} />
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
            <FormInputWithValidation id="phoneNumber" name="phoneNumber" required={true} text={"Phone"} type="tel" handler={phoneNumber} />
            <SelectInput id="groupType" name="groupType" options={["friend", "colleague", "family"]} required={true} value={selectGroupType} setValue={setSelectGroupType} />

            <GradientButton disabled={submitButtonIsDisabled || loadingModify} text={loadingModify ? "Posting" : submitText} type="submit" />
          </form>
        </div>
      </div>
    </Portal>
  );
};
