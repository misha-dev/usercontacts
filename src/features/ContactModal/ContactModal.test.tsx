import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

import * as ReduxHooks from "store/hooks";
import { testUseAppSelector } from "store/testUseAppSelector";

import { ContactModal } from "./ui/ContactModal";

describe("Contacts modal", () => {
  const mockedSelector = jest.spyOn(ReduxHooks, "useAppSelector");
  const mockedDispatch = jest.spyOn(ReduxHooks, "useAppDispatch");
  beforeEach(() => {
    mockedSelector.mockImplementation(testUseAppSelector);
  });

  test("should render", () => {
    render(
      <ContactModal
        fullName="Misha Shabatin"
        modalVisible={true}
        phoneNumberText={"+7 (991) 329-31-29"}
        selectGroupTypeText="colleague"
        setModalVisible={jest.fn()}
        submitText="Update"
        contactId={1}
      />,
      { wrapper: HashRouter },
    );
    const name = screen.getByDisplayValue("Misha");
    const surname = screen.getByDisplayValue("Shabatin");
    const phone = screen.getByDisplayValue("+7 (991) 329-31-29");
    [name, surname, phone].forEach((input) => {
      expect(input).toBeInTheDocument();
    });
  });

  test("should render error message: Enter correct phone number!", async () => {
    render(
      <ContactModal
        fullName="Misha Shabatin"
        modalVisible={true}
        phoneNumberText={"+7 (991) 329-31-29"}
        selectGroupTypeText="colleague"
        setModalVisible={jest.fn()}
        submitText="Update"
        contactId={1}
      />,
      { wrapper: HashRouter },
    );
    const phone = screen.getByDisplayValue("+7 (991) 329-31-29");
    fireEvent.change(phone, { target: { value: "788123" } });
    const error = await screen.findByText(/enter correct phone number/i);
    expect(error).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
