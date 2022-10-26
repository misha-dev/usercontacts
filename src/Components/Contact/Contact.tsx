import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import { IconButton, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

import familyIcon from "../../imgs/familyIcon.png";
import friendIcon from "../../imgs/friendIcon.png";
import colleagueIcon from "../../imgs/colleagueIcon.png";
import { fetchDeleteContact } from "../../store/contactsSlice";
import { useAppDispatch } from "../../store/hooks";
import { ContactType } from "../../types/ContactType";
import { MuiCustomizedSnackbar } from "../Utils/MuiCustomizedSnackbar/MuiCustomizedSnackbar";

import cl from "./Contact.module.scss";

export const Contact = ({ id, fullName, phone, type }: ContactType) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();
  
  return (
    <div className={cl.contactWrapper}>
      <div className={cl.iconFullName}>
        <img className={cl.typeIcon} src={type === "Family" ? familyIcon : type === "Colleague" ? colleagueIcon : friendIcon} alt="" />
        <div className={cl.fullName}>{fullName}</div>
      </div>

      <div className={cl.phoneOptionsWrapper}>
        <MuiCustomizedSnackbar originOfSnackbar={{ horizontal: "left", vertical: "bottom" }} message="Phone copied!" severity="success" autoHide={1500} open={openSnackbar} setOpen={setOpenSnackbar} />
        <div className={cl.phoneNumber}>{phone}</div>
        <Stack spacing={0.5} direction={"row"}>
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(phone.replace(/\D/g, "")).then(() => {
                setOpenSnackbar(true);
              });
            }}
            aria-label="copy"
          >
            <ContentCopyIcon />
          </IconButton>
          <Link href={`tel:${phone}`}>
            <IconButton aria-label="phone">
              <PhoneIcon />
            </IconButton>
          </Link>
        </Stack>
        <IconButton
          onClick={() => {
            dispatch(fetchDeleteContact(id!));
          }}
          className={cl.deleteButton}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
