import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authApi } from "../../../api";
import { CustomButton } from "../../../components";
import { MSG, ROUTES } from "../../../utils/constants";
import Images from "../../../assets/img";
import { RootState } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Box } from "@mui/material";
import { showSnackbar } from "../../../store/slices";
import "./VerifyEmail.scss";
import { getAxiosErrorMessage } from "../../../utils/helpers";

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth);
  let [searchParams, setSearchParams] = useSearchParams();
  const [isVerifyEmailSuccess, setIsVerifyEmailSuccess] = useState<boolean>(false);
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    tokenRef.current = searchParams.get("token");
    if (tokenRef.current) {
      searchParams.delete("token");
      setSearchParams(searchParams);
      verifyEmail(tokenRef.current);
    }
  }, [searchParams, setSearchParams]);

  const verifyEmail = async (token: string) => {
    try {
      await authApi.verifyEmail({ token });
      setIsVerifyEmailSuccess(true);
    } catch (error) {
      dispatch(showSnackbar({ message: getAxiosErrorMessage(error) }));
    }
  };

  return (
    <>
      {isVerifyEmailSuccess && (
        <Box className="verifyEmailPageWrapper">
          <Box>
            <img src={Images.ResetPasswordSuccess} alt="delete" className="fluidImg successImg" />
            <h1 className="heading">Congratulations!</h1>
            <span className="info">Your account has been verified.</span>
            {!auth.isLoggedIn && <CustomButton name="Login" onClick={() => navigate(`/${ROUTES.LOGIN}`)} />}
          </Box>
        </Box>
      )}
    </>
  );
};

export default VerifyEmail;
