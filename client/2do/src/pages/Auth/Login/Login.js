import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import * as Msg from "../../../utils/constants/message.constants";
import * as Path from "../../../utils/constants/routePath.constants";
import CustomButton from "../../../components/CustomButton/CustomButton";
import styles from "./Login.module.scss";

const validationSchema = yup.object({
  email: yup.string().email(Msg.EMAIL_INVALID).required(Msg.EMAIL_REQUIRED),
  password: yup.string().min(Msg.PASSWORD_LENGTH, Msg.PASSWORD_MIN).required(Msg.PASSWORD_REQUIRED),
});

const Login = () => {
  const navigate = useNavigate();

  const onLoginHandler = () => {
    navigate(`/${Path.MY_TASK}`);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <div className={styles.loginPageWrapper}>
      <h1>Login</h1>
      <span>Hello Again! Welcome back</span>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          variant="standard"
          id="email"
          name="email"
          label="Email"
          autoComplete="off"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          variant="standard"
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Link to={`/${Path.AUTH}/${Path.FORGOT_PASSWORD}`}>Forgot Password</Link>
        <CustomButton name="Login" type="submit" onClick={onLoginHandler} />
        <span>
          Don't have an account?
          <b>
            <Link to={`/${Path.AUTH}/${Path.SIGNUP}`}>Create</Link>
          </b>
        </span>
      </form>
    </div>
  );
};

export default Login;
