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
  const [statisticReport, setStatisticReport] = useState<StatisticReportResponse>();

  useEffect(() => {
    loadUserProfile();
    loadStatisticReport();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data } = await userApi.myProfile();
      setUserProfile(data);
    } catch (error) {
      dispatch(showSnackbar({ message: error.data?.message || MSG.ERROR_MESSAGE }));
    }
  };

  const loadStatisticReport = async () => {
    try {
      const { data } = await userApi.statisticReport();
      setStatisticReport(data);
    } catch (error) {
      dispatch(showSnackbar({ message: error.data?.message || MSG.ERROR_MESSAGE }));
    }
  };

  const handleProfileUpdate = async (payload: FormData) => {
    try {
      const { data } = await userApi.updateMyProfile(payload);
      setUserProfile(data);
    } catch (error) {
      dispatch(showSnackbar({ message: error.data?.message || MSG.ERROR_MESSAGE }));
    }
  };

  const openEditProfileModal = () => {
    showModal(
      EditProfileModal,
      {
        name: userProfile?.name,
        onSubmitForm: (data: FormData) => handleProfileUpdate(data),
      },
      { destroyOnClose: true }
    );
  };

  const handleSendVerifyEmail = async () => {
    try {
      await authApi.sendVerificationEmail();
      dispatch(
        showSnackbar({
          message: MSG.USER_FEEDBACK.VERIFICATION_LINK_SENT,
          type: "info",
        })
      );
    } catch (error) {
      dispatch(showSnackbar({ message: error.data?.message || MSG.ERROR_MESSAGE }));
    }
  };

  const handleLogout = async () => {
    const { refreshToken } = auth;
    if (refreshToken) {
      try {
        await authApi.logout({ refreshToken });
      } finally {
        completeLogout();
      }
    }
  };

  const completeLogout = () => {
    dispatch(clearTokens());
    navigate(`/${ROUTES.LOGIN}`);
  };

  const profileHeader = (
    <Box className="profileCardWrap">
      <Box className="userInfo flexContainer">
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
            <IconButton aria-label="edit profile" className="iconBtn" size="small" onClick={openEditProfileModal}>
              <Icon className="manageAccountsIcon">manage_accounts</Icon>
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const emailVerification = !userProfile?.isEmailVerified && (
    <Box className="emailVerifyCardWrap">
      <p className="infoTxt">
        <span className="bold">Your email is not verified yet.</span>
        Please verify your email to receive notifications related to Task/Checklist reminders.
      </p>
      <Box className="center">
        <Button variant="outlined" onClick={handleSendVerifyEmail}>
          Verify Email Address
        </Button>
      </Box>
    </Box>
  );

  const statistics = statisticReport && (
    <Box className="statisticCardWrap">
      <h1 className="heading">Statistics</h1>
      {statisticReport.taskStatistic[0].count !== 0 && (
        <Box className="taskInfo">
          <span className="title">Task</span>
          {statisticReport.taskStatistic.map((data) => (
            <Fragment key={data.label}>
              <Box className="flexContainer">
                <span className="label">{data.label}</span>
                <span className="count">{data.count}</span>
              </Box>
            </Fragment>
          ))}
        </Box>
      )}
      {statisticReport.checklistStatistic[0].count !== 0 && (
        <Box className="taskInfo">
          <span className="title">Checklist</span>
          {statisticReport.checklistStatistic.map((data) => (
            <Fragment key={data.label}>
              <Box className="flexContainer">
                <span className="label">{data.label}</span>
                <span className="count">{data.count}</span>
              </Box>
            </Fragment>
          ))}
        </Box>
      )}
      <Box className="statisticChartWrap">
        <Box className="flexContainer">
          {statisticReport.taskStatistic[0].count !== 0 && (
            <Box className="flexItem">
              <Box className="chartBox">
                <StatisticChart report={statisticReport.taskStatistic} />
              </Box>
              <span className="label">Task</span>
              <span className="label mg-0">Completed</span>
            </Box>
          )}
          {statisticReport.checklistStatistic[0].count !== 0 && (
            <Box className="flexItem">
              <Box className="chartBox">
                <StatisticChart report={statisticReport.checklistStatistic} />
              </Box>
              <span className="label">Checklist</span>
              <span className="label mg-0">Completed</span>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box className="profilePageWrapper">
      {profileHeader}
      {emailVerification}
      {statistics}
      <Box className="logoutBtnWrap">
        <CustomButton name="Logout" onClick={handleLogout} />
      </Box>
    </Box>
  );
};

export default Profile;
