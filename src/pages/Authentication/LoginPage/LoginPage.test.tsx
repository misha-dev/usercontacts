import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

import * as ReduxHooks from "store/hooks";
import { testUseAppSelector } from "store/testUseAppSelector";

import { LoginPage } from "./ui/LoginPage";



describe("Login", () => {
  const mockedSelector = jest.spyOn(ReduxHooks, "useAppSelector");
  const mockedDispatch = jest.spyOn(ReduxHooks, "useAppDispatch");
  beforeEach(() => {
    mockedSelector.mockImplementation(testUseAppSelector);
  });
  it("should render", () => {
    render(<LoginPage />, { wrapper: HashRouter });
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const submitLoginButton = screen.getByRole("button");
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitLoginButton).toBeInTheDocument();
    expect(submitLoginButton).toHaveAttribute("disabled");
  });

  it("should render error messages: Required", async () => {
    render(<LoginPage />, { wrapper: HashRouter });
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    [email, password].forEach((input) => {
      fireEvent.click(input);
      fireEvent.blur(input);
    });
    const errorRequiredEmailPass = await screen.findAllByText(/required/i);
    expect(errorRequiredEmailPass.length).toEqual(2);
  });
  it("should render error messages: Invalid email", async () => {
    render(<LoginPage />, { wrapper: HashRouter });
    const email = screen.getByPlaceholderText(/email/i);
    fireEvent.change(email, { target: { value: "mishaj1jkkj.ru" } });
    fireEvent.blur(email);
    const errorInvalidEmail = await screen.findByText(/invalid email!/i);
    expect(errorInvalidEmail).toBeInTheDocument();
  });
  it("should enable login button", () => {
    render(<LoginPage />, { wrapper: HashRouter });
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const submitLoginButton = screen.getByRole("button");
    fireEvent.change(email, { target: { value: "misha@mail.ru" } });
    fireEvent.change(password, { target: { value: "misha777" } });
    expect(submitLoginButton).not.toHaveAttribute("disabled");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
