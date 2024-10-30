import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../../components";
import { ROUTES } from "../../../utils/constants/index";
import Images from "../../../assets/img/index";
import { Box } from "@mui/material";
import "./ResetPasswordSuccess.scss";

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box className="resetPasswordSuccessPageWrapper">
        <Box>
          <img src={Images.ResetPasswordSuccess} alt="delete" className="fluidImg successImg" />
          <h1 className="heading">Success!</h1>
          <span className="info">
            You have succesfully change password. Please use your new passwords when logging in.
          </span>
          <CustomButton name="Login" onClick={() => navigate(`/${ROUTES.LOGIN}`)} />
        </Box>
      </Box>
    </>
  );
};

export default ResetPasswordSuccess;
