import { Form, Formik, FormikHelpers, FormikState } from "formik";
import * as Yup from "yup";

import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/userSlice";

import { UserLogin, UserReduxType } from "../../../types/UserType.types";
import { GradientButton } from "../../Utils/Buttons/GradientButton/GradientButton";
import { FormInputWithValidation } from "../../Utils/FormInput/FormInputWithValidation/FormInputWithValidation";
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

  const onSubmit = (values: UserLogin, actions: FormikHelpers<any>) => {
    fetch("http://localhost:3001/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => {
        return res.json();
      })
      .then(({ user, accessToken }: { user: UserReduxType; accessToken: string }) => {
        localStorage.setItem("userAuth", JSON.stringify({ accessToken, id: user.id }));
        dispatch(setUser(user));
      })
      .catch((error) => {
        actions.resetForm({ email: "", password: "" } as Partial<FormikState<any>>);
        alert("Login or password are incorrect");
      });
  };

  return (
    <div className={cl.mainWrapper}>
      <div className={cl.formWrapper}>
        <GradientHeader text="Login" />
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className={cl.registrationForm}>
            <div className={cl.registrationInputs}>
              <FormInputWithValidation required={true} id="email" name="email" type="email" text="Email" />

              <FormInputWithValidation required={true} id="password" name="password" type="password" text="Password" />
            </div>
            <div className={cl.loginWrapper}>
              <div className={cl.formLogin}>
                <SimpleLink link="/usercontacts" text="Register here" />
              </div>
              <div className={cl.formLogin}>
                <GradientButton text="Login" type="submit" />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
