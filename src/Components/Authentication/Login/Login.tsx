import { ErrorMessage, Form, Formik, FormikHelpers, FormikState } from "formik";
import * as Yup from "yup";

import { UserLogin } from "../../../types/UserType.types";
import { GradientButton } from "../../Utils/Buttons/GradientButton/GradientButton";
import { LoginInput } from "../../Utils/FormInput/FormInput";
import { SimpleLink } from "../../Utils/Links/SimpleLink/SimpleLink";

import cl from "./Login.module.scss";
export const Login = () => {
  const initialValues: UserLogin = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email("Invalid email!"),
    password: Yup.string().required("Required").min(5, "Should be at least 5 letters"),
  });

  const onSubmit = (values: UserLogin, actions: FormikHelpers<any>) => {
    fetch("http://localhost:3001/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => {
        console.log("OKKK!!!");
      })
      .catch((error) => {
        actions.resetForm({ email: "", password: "" } as Partial<FormikState<any>>);
      });
  };
  return (
    <div className={cl.mainWrapper}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className={cl.registrationForm}>
          <div className={cl.registrationInputs}>
            <div className={cl.inputWrapper}>
              <LoginInput required={true} id="email" name="email" type="email" text="Email" />
              <ErrorMessage component="div" className={cl.registerFormError} name="email" />
            </div>

            <div className={cl.inputWrapper}>
              <LoginInput required={true} id="password" name="password" type="password" text="Password" />
              <ErrorMessage component="div" className={cl.registerFormError} name="password" />
            </div>
          </div>
          <div className={cl.loginWrapper}>
            <div className={cl.formLogin}>
              <SimpleLink link="#" text="Register" />
            </div>
            <div className={cl.formRegister}>
              <GradientButton text="Login" type="submit" />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
