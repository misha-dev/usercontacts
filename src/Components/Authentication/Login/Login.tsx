import { useFormik } from "formik";

import { GradientButton } from "../../Buttons/GradientButton/GradientButton";

import { GradientHeader } from "../../Headers/GradientHeader/GradientHeader";
import { SimpleLink } from "../../Links/SimpleLink/SimpleLink";

import cl from "./Login.module.scss";
import { LoginInput } from "../../FormInput/FormInput";

export const Login = () => {
  interface ILoginFormik {
    name: string;
    username: string;
    email: string;
    password: string;
  }
  const formik = useFormik<ILoginFormik>({
    initialValues: { name: "", username: "", email: "", password: "" },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className={cl.mainWrapper}>
      <div className={cl.logoSection}>k</div>
      <div className={cl.loginSection}>
        <GradientHeader text="Register Here" />
        <form className={cl.loginForm} onSubmit={formik.handleSubmit}>
          <div className={cl.loginInputs}>
            <LoginInput required={true} id="name" name="name" type="text" value={formik.values.name} onChange={formik.handleChange} text="Name" />
            <LoginInput required={true} id="username" name="username" type="text" onChange={formik.handleChange} value={formik.values.username} text="Username" />
            <LoginInput required={true} id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} text="Email" />
            <LoginInput required={true} id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} text="Password" />
          </div>
          <div className={cl.loginRegisterWrapper}>
            <div className={cl.formLogin}>
              <SimpleLink link="#ll" text="Log in here" fontSize={1} />
            </div>
            <div className={cl.formRegister}>
              <GradientButton fontSize={1.2} text="Register" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
