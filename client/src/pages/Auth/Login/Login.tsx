import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import { authApi } from '../../../api';
import { MSG, ROUTES } from '../../../utils/constants';
import { useAppDispatch } from '../../../hooks';
import { setTokens, showSnackbar } from '../../../store/slices';
import { CustomButton } from '../../../components';
import { LoginPayload } from '../../../api/types';
import { getAxiosErrorMessage } from '../../../utils/helpers';
import '../Auth.scss';

const validationSchema = yup.object({
  email: yup.string().email(MSG.VALIDATION.EMAIL.INVALID).required(MSG.VALIDATION.EMAIL.REQUIRED),
  password: yup
    .string()
    .min(MSG.VALIDATION.PASSWORD.MIN_LENGTH, MSG.VALIDATION.PASSWORD.LENGTH_ERROR)
    .required(MSG.VALIDATION.PASSWORD.REQUIRED),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async (values: LoginPayload) => {
    try {
      const { data } = await authApi.login(values);
      const accessToken = data.data.tokens.access.token;
      const refreshToken = data.data.tokens.refresh.token;
      dispatch(setTokens({ accessToken, refreshToken }));
      navigate(`/${ROUTES.TASK}`);
    } catch (error) {
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  return (
    <Box className="loginPageWrapper commonAuthWrapper">
      <h1 className="heading">Login</h1>
      <span className="subHeading">Hello Again! Welcome back</span>
      <Box className="formWrapper">
        <form onSubmit={formik.handleSubmit}>
          <Box className="commonInputWrap">
            <TextField
              fullWidth
              variant="standard"
              id="email"
              name="email"
              label="Email"
              autoComplete="off"
              className="commonInputFormControl"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box className="commonInputWrap">
            <TextField
              fullWidth
              variant="standard"
              id="password"
              name="password"
              label="Password"
              type="password"
              className="commonInputFormControl"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Box className="forgotLinkWrap">
            <Link className="aLink" to={`/${ROUTES.FORGOT_PASSWORD}`}>
              Forgot Password
            </Link>
          </Box>
          <Box className="actionBtnWrap">
            <CustomButton name="Login" type="submit" />
          </Box>
          <Box className="accountOrLoginOptWrap">
            <span className="txt">
              Don't have an account?
              <b>
                <Link className="aLink" to={`/${ROUTES.SIGNUP}`}>
                  Create
                </Link>
              </b>
            </span>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
