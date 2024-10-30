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
  const [profile, setProfile] = useState<UserResponse>();
  const [report, setReport] = useState<StatisticReportResponse>();

  useEffect(() => {
    fetchUserProfile();
    fetchStatisticReport();
  }, []);

  const fetchUserProfile = async () => {
    const res = await userApi.myProfile();
    setProfile(res.data);
  };

  const fetchStatisticReport = async () => {
    const res = await userApi.statisticReport();
    setReport(res.data);
  };

  const updateMyProfile = async (payload: FormData) => {
    const res = await userApi.updateMyProfile(payload);
    setProfile(res.data);
  };

  const openEditProfileModalHandler = () => {
    const initialState = {
      name: profile?.name,
      onSubmitForm: (data: FormData) => updateMyProfile(data),
    };
    showModal(EditProfileModal, initialState, { destroyOnClose: true });
  };

  const sendVerifyEmailLinkHander = () => {
    authApi.sendVerificationEmail().then(() => {
      dispatch(
        showSnackbar({
          message: MSG.USER_FEEDBACK.VERIFICATION_LINK_SENT,
          type: "info",
        })
      );
    });
  };

  const onLogoutHandler = async () => {
    const { refreshToken } = auth;
    if (refreshToken) {
      try {
        await authApi.logout({ refreshToken });
        logout();
      } catch {
        logout();
      }
    }
  };

  const logout = () => {
    dispatch(clearTokens());
    navigate(`/${ROUTES.LOGIN}`);
  };

  return (
    <>
      <Box className="profilePageWrapper">
        <Box className="profileCardWrap">
          <Box className="userInfo flexContainer ">
            <Box className="flexItemOne">
              {profile?.image?.data ? (
                <Avatar
                  alt="Avatar"
                  src={`data:image/png;base64,${profile.image.data}`}
                  sx={{ width: 60, height: 60 }}
                />
              ) : (
                <Box className="nameInitial">{profile?.name.charAt(0)}</Box>
              )}
            </Box>
            <Box className="flexItemTwo">
              <p className="name">{profile?.name}</p>
              <p className="email">{profile?.email}</p>
              <Box className="editProfileBtnWrap">
                <IconButton aria-label="delete" className="iconBtn" size="small" onClick={openEditProfileModalHandler}>
                  <Icon className="manageAccountsIcon">manage_accounts</Icon>
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        {!profile?.isEmailVerified && (
          <Box className="emailVerifyCardWrap">
            <p className="infoTxt">
              <span className="bold">Your email is not verify yet.</span> Please verify your email to receive
              notifications releated to Task/Checklist reminder.
            </p>
            <Box className="center">
              <Button variant="outlined" onClick={sendVerifyEmailLinkHander}>
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
          <CustomButton name="Logout" onClick={onLogoutHandler} />
        </Box>
      </Box>
    </>
  );
};

export default Profile;
