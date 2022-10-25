import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";

import familyIcon from "../../imgs/familyIcon.png";
import { ContactType } from "../../types/ContactType";

import cl from "./Contact.module.scss";

export const Contact = ({ id, fullName, phone, type }: ContactType) => {
  return (
    <div className={cl.contactWrapper}>
      <div className={cl.iconFullName}>
        <img className={cl.typeIcon} src={familyIcon} alt="" />
        <div className={cl.fullName}>{fullName}</div>
      </div>

      <div className={cl.phoneOptionsWrapper}>
        <div className={cl.phoneNumber}>{phone}</div>
        <Stack spacing={0.5} direction={"row"}>
          <IconButton aria-label="copy">
            <ContentCopyIcon />
          </IconButton>
          <IconButton aria-label="phone">
            <PhoneIcon />
          </IconButton>
        </Stack>
        <IconButton className={cl.deleteButton} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
