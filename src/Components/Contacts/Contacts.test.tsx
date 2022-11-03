import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as useMatchMedia from "../../hooks/useMatchMedia";
import * as ReduxHooks from "../../store/hooks";
import { testUseAppSelector } from "../../store/testUseAppSelector";

import { Contacts } from "./Contacts";

describe("Contacts", () => {
  const mockedSelector = jest.spyOn(ReduxHooks, "useAppSelector");
  const mockedDispatch = jest.spyOn(ReduxHooks, "useAppDispatch");

  beforeEach(() => {
    mockedSelector.mockImplementation(testUseAppSelector);
    mockedDispatch.mockImplementation(() => jest.fn());
    jest.spyOn(useMatchMedia, "useMatchMedia").mockImplementation(() => {
      return { isMobile: false, isDesktop: true };
    });
  });

  test("should render", () => {
    render(<Contacts />);
    const searchInput = screen.getByRole("textbox", { name: /search/i });
    const mishaContact = screen.getByText(/misha gin/i);
    const annaContact = screen.getByText(/\+7 \(991\) 329-31-29/i);
    const contacts = screen.getAllByTestId("contact");
    [searchInput, mishaContact, annaContact].forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(contacts.length).toEqual(4);
  });
  test("should search contact", async () => {
    render(<Contacts />);
    const searchInput = screen.getByRole("textbox", { name: /search/i });
    const crossButton = screen.getByLabelText("resetInput");
    userEvent.type(searchInput, "misha");
    expect(searchInput).toHaveValue("misha");
    // have to wait due to debounce function
    await new Promise((resolve) => setTimeout(resolve, 700));
    const friendContacts = screen.getAllByTestId("contact");

    expect(friendContacts.length).toEqual(2);
    userEvent.click(crossButton);
    // have to wait due to debounce function
    await new Promise((resolve) => setTimeout(resolve, 700));
    const contacts = screen.getAllByTestId("contact");

    expect(searchInput).toHaveValue("");
    expect(contacts.length).toEqual(4);
  });

  test("should filter on friend", async () => {
    render(<Contacts />);
    const filterOnFriend = screen.getByText(/friends/i);
    userEvent.click(filterOnFriend);
    // have to wait due to debounce function
    await new Promise((resolve) => setTimeout(resolve, 500));
    const friendContacts = screen.getAllByTestId("contact");
    expect(friendContacts.length).toEqual(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
