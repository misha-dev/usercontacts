import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ContactsReduxType, ContactType } from "../types/ContactType";
import { UserAuth } from "../types/UserType.types";

import { JSON_API } from "../Utils/constants";

import { RootState } from ".";

const initialState: ContactsReduxType = {
  loadingAll: false,
  loadingModify: false,
  contacts: [] as Array<ContactType>,
  error: "",
};

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", () => {
  const { accessToken, userId }: UserAuth = JSON.parse(localStorage.getItem("userAuth")!);
  return fetch(`${JSON_API}/660/contacts?userId=${userId}`, {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
  }).then((data) => {
    return data.json();
  });
});

export const fetchAddContact = createAsyncThunk("contacts/addContact", (contact: ContactType) => {
  const { accessToken }: UserAuth = JSON.parse(localStorage.getItem("userAuth")!);
  return fetch(`${JSON_API}/660/contacts`, {
    method: "post",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(contact),
  }).then((data) => {
    return data.json();
  });
});

export const fetchEditContact = createAsyncThunk("contacts/editContact", (contact: ContactType) => {
  const { accessToken }: UserAuth = JSON.parse(localStorage.getItem("userAuth")!);
  return fetch(`${JSON_API}/660/contacts/${contact.id}`, {
    method: "put",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(contact),
  }).then((data) => {
    return data.json();
  });
});

export const fetchDeleteContact = createAsyncThunk("contacts/fetchDeleteContact", (id: number) => {
  const { accessToken }: UserAuth = JSON.parse(localStorage.getItem("userAuth")!);
  return fetch(`${JSON_API}/660/contacts/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
  }).then((data) => {
    return { id };
  });
});

const contacts = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all comments
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loadingAll = true;
        state.error = "";
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<ContactType[]>) => {
        state.loadingAll = false;
        state.error = "";
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.loadingAll = false;
        state.error = "Server is not responding!";
      });

    // add contact
    builder
      .addCase(fetchAddContact.pending, (state) => {
        state.loadingModify = true;
        state.error = "";
      })
      .addCase(fetchAddContact.fulfilled, (state, action: PayloadAction<ContactType & { id: number }>) => {
        state.loadingModify = false;
        state.error = "";
        state.contacts = state.contacts.concat(action.payload);
      })
      .addCase(fetchAddContact.rejected, (state) => {
        state.loadingModify = false;
        state.error = "Could't add contact!";
      });

    // edit contact
    builder
      .addCase(fetchEditContact.pending, (state) => {
        state.loadingModify = true;
        state.error = "";
      })
      .addCase(fetchEditContact.fulfilled, (state, action: PayloadAction<ContactType>) => {
        state.loadingModify = false;
        state.error = "";
        state.contacts.forEach((contact, i) => {
          if (contact.id === action.payload.id) {
            state.contacts[i] = action.payload;
          }
        });
      })
      .addCase(fetchEditContact.rejected, (state) => {
        state.loadingModify = false;
        state.error = "Couldn't edit contact!";
      });

    // delete contact
    builder
      .addCase(fetchDeleteContact.rejected, (state) => {
        state.error = "Couldn't delete contact!";
      })
      .addCase(fetchDeleteContact.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload.id);
      });
  },
});

export default contacts.reducer;
export const contactActions = contacts.actions;
export const selectContacts = (state: RootState) => state.contacts;
