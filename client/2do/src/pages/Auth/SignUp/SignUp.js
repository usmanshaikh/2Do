import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import * as yup from "yup";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CustomButton from "../../../components/CustomButton/CustomButton";
import * as Constants from "../../../utils/constants/message.constants";
import styles from "./SignUp.module.scss";

const validationSchema = yup.object({
  name: yup
    .string()
    .required(Constants.NAME_REQUIRED)
    .matches(/^[aA-zZ\s]+$/, Constants.NAME_ONLY_ALPHABETS),
  email: yup.string().email(Constants.EMAIL_INVALID).required(Constants.EMAIL_REQUIRED),
  password: yup.string().min(Constants.PASSWORD_LENGTH, Constants.PASSWORD_MIN).required(Constants.PASSWORD_REQUIRED),
  confirmPassword: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("password")], Constants.PASSWORD_NOT_MATCH),
  }),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <div className={styles.signUpPageWrapper}>
      <Link to="/login">
        <KeyboardBackspaceIcon />
      </Link>
      <h1>Create Account</h1>
      <span>Hello! Sign up to get started</span>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          variant="standard"
          id="name"
          name="name"
          label="Name"
          autoComplete="off"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
        <TextField
          fullWidth
          variant="standard"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <CustomButton name="Sign up" type="submit" />
      </form>
      <span>
        Already have a account?{" "}
        <b>
          <Link to="/login">Login</Link>
        </b>
      </span>
    </div>
  );
};

export default SignUp;
