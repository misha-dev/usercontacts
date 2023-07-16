import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";
import { IconButton, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";


import familyIcon from "assets/imgs/familyIcon.png";
import friendIcon from "assets/imgs/friendIcon.png";
import colleagueIcon from "assets/imgs/colleagueIcon.png";

import { useMatchMedia } from "hooks";
import { useAppDispatch } from "store/hooks";
import { ContactType } from "types";
import { ContactModal } from "features";
import { CustomizedSnackbar } from "components";
import { fetchDeleteContact } from "store/contactsSlice";

import cl from "./Contact.module.scss";

export const Contact = ({ id, fullName, phone, type }: ContactType) => {
  const [openCopySnackbar, setOpenCopySnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const dispatch = useAppDispatch();
  const [openEditModal, setOpenEditModal] = useState(false);
  const fullNameRef = useRef<HTMLDivElement>(null!);
  const [applyMinContentToFullName, setApplyMinContentToFullName] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  useEffect(() => {
    setApplyMinContentToFullName(fullNameRef.current.offsetWidth >= 216);
  }, [fullName]);

  const { isMobile } = useMatchMedia();

  return (
    <div className={cl.contactWrapper} data-testid="contact">
      <ContactModal contactId={id} fullName={fullName} phoneNumberText={phone} selectGroupTypeText={type} submitText={"Update"} modalVisible={openEditModal} setModalVisible={setOpenEditModal} />
      <div className={cl.iconFullName}>
        <img className={cl.typeIcon} src={type === "family" ? familyIcon : type === "colleague" ? colleagueIcon : friendIcon} alt="" />
        <div ref={fullNameRef} style={{ width: `${applyMinContentToFullName ? "min-content" : ""}` }} className={cl.fullName}>
          {fullName}
        </div>
        <IconButton
          onClick={() => {
            setOpenEditModal(true);
          }}
          disableRipple
          aria-label="edit"
          sx={{ padding: `${isMobile ? "3px" : "6px"}` }}
        >
          <EditIcon sx={{ fontSize: `${isMobile ? "1.05rem" : "1.2rem"} ` }} />
        </IconButton>
      </div>

      <div className={cl.phoneOptionsWrapper}>
        <CustomizedSnackbar
          originOfSnackbar={{ horizontal: "left", vertical: "bottom" }}
          message="Phone copied!"
          severity="success"
          autoHide={1500}
          open={openCopySnackbar}
          setOpen={setOpenCopySnackbar}
        />
        <div className={cl.phoneNumber}>{phone}</div>
        <Stack spacing={0.5} direction={"row"}>
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(phone.replace(/\D/g, "")).then(() => {
                setOpenCopySnackbar(true);
              });
            }}
            aria-label="copy"
            sx={{ padding: `${isMobile ? "5px" : "8px"}` }}
          >
            <ContentCopyIcon sx={{ fontSize: `${isMobile ? "1.2rem" : "1.5rem"} ` }} />
          </IconButton>
          <Link sx={{ marginLeft: "0px !important" }} href={`tel:${phone}`}>
            <IconButton sx={{ padding: `${isMobile ? "5px" : "8px"}` }} aria-label="phone">
              <PhoneIcon sx={{ fontSize: `${isMobile ? "1.2rem" : "1.5rem"} ` }} />
            </IconButton>
          </Link>
          <CustomizedSnackbar
            originOfSnackbar={{ horizontal: "left", vertical: "top" }}
            message="Couldn't delete contact!"
            severity="error"
            autoHide={1500}
            open={openErrorSnackbar}
            setOpen={setOpenErrorSnackbar}
          />
          <IconButton
            disabled={deleteButtonDisabled}
            onClick={() => {
              setDeleteButtonDisabled(true);
              dispatch(fetchDeleteContact(id!))
                .unwrap()
                .catch((error) => {
                  setOpenErrorSnackbar(true);
                  setDeleteButtonDisabled(false);
                });
            }}
            className={cl.deleteButton}
            aria-label="delete"
            sx={{ padding: `${isMobile ? "5px" : "8px"}` }}
          >
            <DeleteIcon sx={{ fontSize: `${isMobile ? "1.2rem" : "1.5rem"} ` }} />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
};
