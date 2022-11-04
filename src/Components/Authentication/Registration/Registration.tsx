import { Form, Formik } from "formik";
import { useState } from "react";

import * as Yup from "yup";

import logo from "../../../imgs/logo.png";
import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/userSlice";
import { UserAuth, UserReduxType, UserType } from "../../../types/UserType.types";
import { JSON_API } from "../../../Utils/constants";
import { GradientButton } from "../../Utils/Buttons/GradientButton/GradientButton";
import { CustomizedSnackbar } from "../../Utils/CustomizedSnackbar/CustomizedSnackbar";
import { FormInputWithValidationFormik } from "../../Utils/FormInput/FormInputWithValidation/FormInputWithValidationFormik";
import { GradientHeader } from "../../Utils/Headers/GradientHeader/GradientHeader";
import { SimpleLink } from "../../Utils/Links/SimpleLink/SimpleLink";
import { WhiteLink } from "../../Utils/Links/WhiteLink/WhiteLink";

import cl from "./Registration.module.scss";

export const Registration = () => {
  const [registerButtonText, setRegisterButtonText] = useState("Register");
  const dispatch = useAppDispatch();
  const onSubmit = ({ email, name, password }: UserType) => {
    setRegisterButtonText("Loading...");
    fetch(`${JSON_API}/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then(({ user, accessToken }: { user: UserReduxType; accessToken: string }) => {
        localStorage.setItem("userAuth", JSON.stringify({ accessToken, userId: user.id } as UserAuth));
        dispatch(setUser(user));
      })
      .catch((error) => {
        setRegisterButtonText("Register");
        setOpenSnackbar(true);
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required").min(3, "Should be at least 3 letters!"),
    email: Yup.string().required("Required").email("Invalid email format!"),
    password: Yup.string().required("Required").min(5, "Should be at least 5 letters!"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Password is not the same!"),
  });

  const initialValues: UserType & { confirmPassword: string } = { name: "", email: "", password: "", confirmPassword: "" };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <div className={cl.mainWrapper}>
      <CustomizedSnackbar originOfSnackbar={{ horizontal: "center", vertical: "top" }} message="Email is taken!" severity="error" autoHide={2000} open={openSnackbar} setOpen={setOpenSnackbar} />
      <div className={cl.logoSection}>
        <div className={cl.logoWithText}>
          <img src={logo} alt="logo" />
          <p>JOIN US</p>
        </div>

        <div className={cl.projectInfoWithText}>
          <p>See how project</p>
          <p>is implemented</p>
          <p>on GitHub</p>
          <WhiteLink text="About Project" link="https://github.com/misha-dev/usercontacts" />
        </div>
      </div>
      <div className={cl.registrationSection}>
        <GradientHeader text="Register Here" />
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ dirty, isValid }) => {
            return (
              <Form className={cl.registrationForm}>
                <div className={cl.registrationInputs}>
                  <FormInputWithValidationFormik required={true} id="name" name="name" type="text" text="Name" />

                  <FormInputWithValidationFormik required={true} id="email" name="email" type="email" text="Email" />

                  <FormInputWithValidationFormik required={true} id="password" name="password" type="password" text="Password" />

                  <FormInputWithValidationFormik required={true} id="confirmPassword" name="confirmPassword" type="password" text="Confirm password" />
                </div>
                <div className={cl.loginWrapper}>
                  <div className={cl.formLogin}>
                    <SimpleLink link="/usercontacts/login" text="Log in here" />
                  </div>
                  <div className={cl.formRegister}>
                    <GradientButton disabled={!dirty || !isValid || registerButtonText === "Loading..."} text={registerButtonText} type="submit" />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
