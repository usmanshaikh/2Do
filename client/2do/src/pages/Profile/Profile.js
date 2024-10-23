import React, { Fragment, useContext, useEffect, useState } from "react";
import { Icon, Avatar, IconButton, Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { useNavigate } from "react-router-dom";
import { AuthAPI, UserAPI } from "../../api";
import { EditProfileModal } from "../../components/Modals";
import { useGlobalContext } from "../../utils/hooks";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";
import { getLocalRefreshToken } from "../../utils/helpers";
import CustomButton from "../../components/CustomButton/CustomButton.js";
import StatisticChart from "../../components/StatisticChart/StatisticChart.js";
import constants from "../../utils/constants";
import "./Profile.scss";

const ROUTE = constants.routePath;

const Profile = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { setAuthenticateHandler } = useGlobalContext();
  const [profile, setProfile] = useState();
  const [report, setReport] = useState();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  useEffect(() => {
    myProfile();
    statisticReport();
  }, []);

  const myProfile = () => {
    UserAPI.myProfile()
      .then((res) => setProfile(res))
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const statisticReport = () => {
    UserAPI.statisticReport()
      .then((res) => setReport(res))
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const updateMyProfile = (payload) => {
    UserAPI.updateMyProfile(payload)
      .then((res) => setProfile(res))
      .catch((err) => snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" }));
  };

  const openEditProfileModalHandler = () => {
    const initialState = {
      name: profile?.name,
      onSubmitForm: (data) => updateMyProfile(data),
    };
    showModal(EditProfileModal, initialState, { destroyOnClose: true });
  };

  const sendVerifyEmailLinkHander = () => {
    AuthAPI.sendVerificationEmail()
      .then((res) => {
        const msg = "A verification link has been sent to your email account.";
        snackbarAlert.showSnackbarAlert({ msg });
      })
      .catch((err) => {
        snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
      });
  };

  const onLogoutHandler = async () => {
    const refreshToken = getLocalRefreshToken();
    AuthAPI.logout({ refreshToken })
      .then(() => logout())
      .catch(() => logout());
  };

  const logout = () => {
    localStorage.clear();
    setAuthenticateHandler(false);
    navigate(`/${ROUTE.LOGIN}`);
  };

  return (
    <>
      <div className="profilePageWrapper">
        <div className="profileCardWrap">
          <div className="userInfo flexContainer ">
            <div className="flexItemOne">
              {profile?.image?.data ? (
                <Avatar
                  alt="Remy Sharp"
                  src={`data:image/png;base64,${profile.image.data}`}
                  sx={{ width: 60, height: 60 }}
                />
              ) : (
                <div className="nameInitial">{profile?.name.charAt(0)}</div>
              )}
            </div>
            <div className="flexItemTwo">
              <p className="name">{profile?.name}</p>
              <p className="email">{profile?.email}</p>
              <div className="editProfileBtnWrap">
                <IconButton aria-label="delete" className="iconBtn" size="small" onClick={openEditProfileModalHandler}>
                  <Icon className="manageAccountsIcon">manage_accounts</Icon>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        {!profile?.isEmailVerified && (
          <div className="emailVerifyCardWrap">
            <p className="infoTxt">
              <span className="bold">Your email is not verify yet.</span> Please verify your email to receive
              notifications releated to Task/Checklist reminder.
            </p>
            <div className="center">
              <Button variant="outlined" onClick={sendVerifyEmailLinkHander}>
                Verify Email Address
              </Button>
            </div>
          </div>
        )}
        {report && (report.taskStatistic[0].count || report.checklistStatistic[0].count) ? (
          <div className="statisticCardWrap">
            <h1 className="heading">Statistic</h1>
            {report.taskStatistic[0].count !== 0 && (
              <div className="taskInfo">
                <span className="title">Task</span>
                {report?.taskStatistic?.map((data) => {
                  return (
                    <Fragment key={data?.label}>
                      <div className="flexContainer">
                        <span className="label">{data?.label}</span>
                        <span className="count">{data?.count}</span>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            )}
            {report.checklistStatistic[0].count !== 0 && (
              <div className="taskInfo">
                <span className="title">Checklist</span>
                {report?.checklistStatistic?.map((data) => {
                  return (
                    <Fragment key={data?.label}>
                      <div className="flexContainer">
                        <span className="label">{data?.label}</span>
                        <span className="count">{data?.count}</span>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            )}
            <div className="statisticChartWrap">
              <div className="flexContainer">
                {report.taskStatistic[0].count !== 0 && (
                  <div className="flexItem">
                    <div className="chartBox">
                      <StatisticChart report={report?.taskStatistic} />
                    </div>
                    <span className="label">Task</span>
                    <span className="label mg-0">Completed</span>
                  </div>
                )}
                {report.checklistStatistic[0].count !== 0 && (
                  <div className="flexItem">
                    <div className="chartBox">
                      <StatisticChart report={report?.checklistStatistic} />
                    </div>
                    <span className="label">Checklist</span>
                    <span className="label mg-0">Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
        <div className="logoutBtnWrap">
          <CustomButton name="Logout" onClick={onLogoutHandler} />
        </div>
      </div>
    </>
  );
};

export default Profile;
