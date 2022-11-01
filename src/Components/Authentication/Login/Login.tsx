import { Form, Formik, FormikHelpers, FormikState } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/userSlice";

import { UserAuth, UserLogin, UserReduxType } from "../../../types/UserType.types";
import { JSON_API } from "../../../Utils/constants";
import { GradientButton } from "../../Utils/Buttons/GradientButton/GradientButton";
import { CustomizedSnackbar } from "../../Utils/CustomizedSnackbar/CustomizedSnackbar";
import { FormInputWithValidationFormik } from "../../Utils/FormInput/FormInputWithValidation/FormInputWithValidationFormik";
import { GradientHeader } from "../../Utils/Headers/GradientHeader/GradientHeader";
import { SimpleLink } from "../../Utils/Links/SimpleLink/SimpleLink";

import cl from "./Login.module.scss";
export const Login = () => {
  const dispatch = useAppDispatch();
  const initialValues: UserLogin = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid email!"),
    password: Yup.string().required("Required"),
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = (values: UserLogin, actions: FormikHelpers<UserLogin>) => {
    fetch(`${JSON_API}/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => {
        return res.json();
      })
      .then(({ user, accessToken }: { user: UserReduxType; accessToken: string }) => {
        localStorage.setItem("userAuth", JSON.stringify({ accessToken, userId: user.id } as UserAuth));
        dispatch(setUser(user));
      })
      .catch((error) => {
        actions.resetForm({ values: { email: values.email, password: "" } } as Partial<FormikState<UserLogin>>);
        setOpenSnackbar(true);
      });
  };

  return (
    <div className={cl.mainWrapper}>
      <div className={cl.formWrapper}>
        <CustomizedSnackbar
          originOfSnackbar={{ horizontal: "center", vertical: "top" }}
          message="Login or password is incorrect!"
          severity="error"
          autoHide={2000}
          open={openSnackbar}
          setOpen={setOpenSnackbar}
        />
        <GradientHeader text="Login" />
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ dirty, isValid }) => {
            return (
              <Form className={cl.registrationForm}>
                <div className={cl.registrationInputs}>
                  <FormInputWithValidationFormik required={true} id="email" name="email" type="email" text="Email" />

                  <FormInputWithValidationFormik required={true} id="password" name="password" type="password" text="Password" />
                </div>
                <div className={cl.loginWrapper}>
                  <div className={cl.formLogin}>
                    <SimpleLink link="/usercontacts" text="Register here" />
                  </div>
                  <div className={cl.formLogin}>
                    <GradientButton disabled={!dirty || !isValid} text="Login" type="submit" />
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
