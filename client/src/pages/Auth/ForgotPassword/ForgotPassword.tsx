import * as yup from "yup";
import { useFormik } from "formik";
import { useModal } from "mui-modal-provider";
import { Box, Icon, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api";
import { SuccessModal, CustomButton } from "../../../components";
import { MSG, ROUTES } from "../../../utils/constants";
import { showSnackbar } from "../../../store/slices";
import { useAppDispatch } from "../../../hooks";
import { getAxiosErrorMessage } from "../../../utils/helpers";
import "../Auth.scss";

const validationSchema = yup.object({
  email: yup.string().email(MSG.VALIDATION.EMAIL.INVALID).required(MSG.VALIDATION.EMAIL.REQUIRED),
});

const ForgotPassword = () => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: { email: string }) => {
    try {
      await authApi.forgotPassword(values);
      const initialState = {
        message: MSG.USER_FEEDBACK.RESET_LINK_SEND,
        onClose: navigateTo,
      };
      showModal(SuccessModal, initialState, { destroyOnClose: true });
    } catch (error) {
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  const navigateTo = () => {
    navigate(`/${ROUTES.LOGIN}`);
  };

  return (
    <Box className="forgotPageWrapper commonAuthWrapper">
      <Box className="backBtnWrap">
        <Link to={`/${ROUTES.LOGIN}`}>
          <Icon>keyboard_backspace</Icon>
        </Link>
      </Box>
      <h1 className="heading">Forgot Password</h1>
      <span className="subHeading">Please enter your email below to received your password reset instructions</span>
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
          <Box className="actionBtnWrap">
            <CustomButton name="Send Request" type="submit" />
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
