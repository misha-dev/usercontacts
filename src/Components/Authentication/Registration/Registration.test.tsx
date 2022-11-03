import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

import * as ReduxHooks from "../../../store/hooks";
import { testUseAppSelector } from "../../../store/testUseAppSelector";

import { Registration } from "./Registration";

describe("Registration", () => {
  const mockedSelector = jest.spyOn(ReduxHooks, "useAppSelector");
  const mockedDispatch = jest.spyOn(ReduxHooks, "useAppDispatch");
  beforeEach(() => {
    mockedSelector.mockImplementation(testUseAppSelector);
  });
  test("should render", () => {
    render(<Registration />, { wrapper: HashRouter });
    const name = screen.getByPlaceholderText(/name/i);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText("Password");
    const passwordConfirmed = screen.getByPlaceholderText(/confirm password/i);
    [name, email, password, passwordConfirmed].forEach((input) => {
      expect(input).toBeInTheDocument();
    });
    const registerButton = screen.getByRole("button", {
      name: /register/i,
    });
    expect(registerButton).toHaveAttribute("disabled");
  });
  test("should render error message: Required", async () => {
    render(<Registration />, { wrapper: HashRouter });
    const name = screen.getByPlaceholderText(/name/i);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText("Password");
    const passwordConfirmed = screen.getByPlaceholderText(/confirm password/i);
    [name, email, password, passwordConfirmed].forEach((input) => {
      fireEvent.focus(input);
      fireEvent.blur(input);
    });
    const errorsRequired = await screen.findAllByText(/required/i);
    expect(errorsRequired.length).toEqual(4);
  });
  test("should render error message: Invalid email", async () => {
    render(<Registration />, { wrapper: HashRouter });
    const email = screen.getByPlaceholderText(/email/i);
    fireEvent.change(email, { target: { value: "misha@mail" } });
    fireEvent.blur(email);
    const errorRequired = await screen.findByText(/invalid email/i);
    expect(errorRequired).toBeInTheDocument();
  });
  test("should render error message: Password is not the same", async () => {
    render(<Registration />, { wrapper: HashRouter });
    const password = screen.getByPlaceholderText("Password");
    const passwordConfirmed = screen.getByPlaceholderText(/confirm password/i);
    fireEvent.change(password, { target: { value: "misha777" } });
    fireEvent.change(passwordConfirmed, { target: { value: "MDKDkj" } });
    fireEvent.blur(passwordConfirmed);
    const errorsPassword = await screen.findByText(/password is not the same!/i);
    expect(errorsPassword).toBeInTheDocument();
  });
  test("should enable register button", async () => {
    render(<Registration />, { wrapper: HashRouter });
    const name = screen.getByPlaceholderText(/name/i);
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText("Password");
    const passwordConfirmed = screen.getByPlaceholderText(/confirm password/i);
    fireEvent.change(name, { target: { value: "Misha" } });
    fireEvent.change(email, { target: { value: "misha@mail.ru" } });
    fireEvent.change(password, { target: { value: "misha777" } });
    fireEvent.change(passwordConfirmed, { target: { value: "misha777" } });
    const registerButton = screen.getByRole("button", {
      name: /register/i,
    });
    expect(registerButton).not.toHaveAttribute("disabled");
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
