import { Fragment, useEffect, useState } from "react";
import { Icon, Avatar, IconButton, Button, Box } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { useNavigate } from "react-router-dom";
import { authApi, userApi } from "../../api";
import { EditProfileModal, CustomButton, StatisticChart } from "../../components";
import { ROUTES, MSG } from "../../utils/constants";
import { clearTokens, showSnackbar } from "../../store/slices";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { StatisticReportResponse, UserResponse } from "../../api/types";
import "./Profile.scss";

const Profile = () => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showModal } = useModal();
  const [userProfile, setUserProfile] = useState<UserResponse>();
  const [report, setReport] = useState<StatisticReportResponse>();

  useEffect(() => {
    fetchUserProfile();
    fetchStatisticReport();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data } = await userApi.myProfile();
      setUserProfile(data);
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  const fetchStatisticReport = async () => {
    try {
      const { data } = await userApi.statisticReport();
      setReport(data);
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  const updateUserProfile = async (payload: FormData) => {
    try {
      const { data } = await userApi.updateMyProfile(payload);
      setUserProfile(data);
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  const openEditProfileModalHandler = () => {
    const initialState = {
      name: userProfile?.name,
      onSubmitForm: (data: FormData) => updateUserProfile(data),
    };
    showModal(EditProfileModal, initialState, { destroyOnClose: true });
  };

  const handleSendVerifyEmailLink = async () => {
    try {
      await authApi.sendVerificationEmail();
      dispatch(showSnackbar({ message: MSG.USER_FEEDBACK.VERIFICATION_LINK_SENT, type: "info" }));
    } catch (error) {
      dispatch(showSnackbar({ message: error.data.message || MSG.ERROR_MESSAGE }));
    }
  };

  const handleLogout = async () => {
    const { refreshToken } = auth;
    if (refreshToken) {
      try {
        await authApi.logout({ refreshToken });
        performLogout();
      } catch {
        performLogout();
      }
    }
  };

  const performLogout = () => {
    dispatch(clearTokens());
    navigate(`/${ROUTES.LOGIN}`);
  };

  return (
    <Box className="profilePageWrapper">
      <Box className="profileCardWrap">
        <Box className="userInfo flexContainer ">
          <Box className="flexItemOne">
            {userProfile?.image?.data ? (
              <Avatar
                alt="Avatar"
                src={`data:image/png;base64,${userProfile.image.data}`}
                sx={{ width: 60, height: 60 }}
              />
            ) : (
              <Box className="nameInitial">{userProfile?.name.charAt(0)}</Box>
            )}
          </Box>
          <Box className="flexItemTwo">
            <p className="name">{userProfile?.name}</p>
            <p className="email">{userProfile?.email}</p>
            <Box className="editProfileBtnWrap">
              <IconButton aria-label="delete" className="iconBtn" size="small" onClick={openEditProfileModalHandler}>
                <Icon className="manageAccountsIcon">manage_accounts</Icon>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      {!userProfile?.isEmailVerified && (
        <Box className="emailVerifyCardWrap">
          <p className="infoTxt">
            <span className="bold">Your email is not verify yet.</span> Please verify your email to receive
            notifications releated to Task/Checklist reminder.
          </p>
          <Box className="center">
            <Button variant="outlined" onClick={handleSendVerifyEmailLink}>
              Verify Email Address
            </Button>
          </Box>
        </Box>
      )}
      {report && (report.taskStatistic[0].count || report.checklistStatistic[0].count) ? (
        <Box className="statisticCardWrap">
          <h1 className="heading">Statistic</h1>
          {report.taskStatistic[0].count !== 0 && (
            <Box className="taskInfo">
              <span className="title">Task</span>
              {report?.taskStatistic?.map((data) => {
                return (
                  <Fragment key={data?.label}>
                    <Box className="flexContainer">
                      <span className="label">{data?.label}</span>
                      <span className="count">{data?.count}</span>
                    </Box>
                  </Fragment>
                );
              })}
            </Box>
          )}
          {report.checklistStatistic[0].count !== 0 && (
            <Box className="taskInfo">
              <span className="title">Checklist</span>
              {report?.checklistStatistic?.map((data) => {
                return (
                  <Fragment key={data?.label}>
                    <Box className="flexContainer">
                      <span className="label">{data?.label}</span>
                      <span className="count">{data?.count}</span>
                    </Box>
                  </Fragment>
                );
              })}
            </Box>
          )}
          <Box className="statisticChartWrap">
            <Box className="flexContainer">
              {report.taskStatistic[0].count !== 0 && (
                <Box className="flexItem">
                  <Box className="chartBox">
                    <StatisticChart report={report?.taskStatistic} />
                  </Box>
                  <span className="label">Task</span>
                  <span className="label mg-0">Completed</span>
                </Box>
              )}
              {report.checklistStatistic[0].count !== 0 && (
                <Box className="flexItem">
                  <Box className="chartBox">
                    <StatisticChart report={report?.checklistStatistic} />
                  </Box>
                  <span className="label">Checklist</span>
                  <span className="label mg-0">Completed</span>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ) : null}
      <Box className="logoutBtnWrap">
        <CustomButton name="Logout" onClick={handleLogout} />
      </Box>
    </Box>
  );
};

export default Profile;
