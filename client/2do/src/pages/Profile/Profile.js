import React, { useContext, useEffect, useState } from "react";
import { Icon, Avatar, IconButton, Button } from "@mui/material";
import { useModal } from "mui-modal-provider";
import { useNavigate } from "react-router-dom";
import { AuthAPI, UserAPI } from "../../api";
import { EditProfileModal } from "../../components/Modals";
import CustomButton from "../../components/CustomButton/CustomButton.js";
import StatisticChart from "../../components/StatisticChart/StatisticChart.js";
import { useGlobalContext } from "../../utils/hooks";
import * as Helpers from "../../utils/Helpers";
import constants from "../../utils/constants";
import "./Profile.scss";
import { GlobalSnackbarAlertContext } from "../../utils/contexts";

const ROUTE = constants.routePath;

const Profile = () => {
  const { showModal } = useModal();
  const { setHeaderTitleHandler, setAuthenticateHandler } = useGlobalContext();
  const [profile, setProfile] = useState();
  const navigate = useNavigate();
  const snackbarAlert = useContext(GlobalSnackbarAlertContext);

  useEffect(() => {
    setHeaderTitleHandler("Profile");
    myProfile();
  }, []);

  const myProfile = () => {
    UserAPI.myProfile()
      .then((res) => {
        setProfile(res);
      })
      .catch((err) => {
        snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
      });
  };

  const openEditProfileModalHandler = () => {
    const initialState = {
      name: profile?.name,
      onSubmitForm: (data) => updateMyProfile(data),
    };
    showModal(EditProfileModal, initialState, { destroyOnClose: true });
  };

  const updateMyProfile = (payload) => {
    UserAPI.updateMyProfile(payload)
      .then((res) => {
        setProfile(res);
      })
      .catch((err) => {
        snackbarAlert.showSnackbarAlert({ msg: err.message, type: "error" });
      });
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
    const refreshToken = Helpers.getLocalRefreshToken();
    await AuthAPI.logout({ refreshToken });
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
              {profile && (
                <>
                  {profile?.image?.data ? (
                    <Avatar
                      alt="Remy Sharp"
                      src={`data:image/png;base64,${profile.image.data}`}
                      sx={{ width: 60, height: 60 }}
                    />
                  ) : (
                    <div className="nameInitial">{profile?.name.charAt(0)}</div>
                  )}
                </>
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
        {profile && (
          <>
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
          </>
        )}
        <div className="statisticCardWrap">
          <h1 className="heading">Statistic</h1>
          <div className="taskInfo">
            <span className="title">Task</span>
            <div className="flexContainer">
              <span className="label">Create</span>
              <span className="count">106</span>
            </div>
            <div className="flexContainer">
              <span className="label">Completed</span>
              <span className="count">50</span>
            </div>
            <div className="flexContainer">
              <span className="label">Pending</span>
              <span className="count">98</span>
            </div>
          </div>
          <div className="taskInfo">
            <span className="title">Checklist</span>
            <div className="flexContainer">
              <span className="label">Create</span>
              <span className="count">106</span>
            </div>
            <div className="flexContainer">
              <span className="label">Completed</span>
              <span className="count">50</span>
            </div>
            <div className="flexContainer">
              <span className="label">Pending</span>
              <span className="count">98</span>
            </div>
          </div>
          <div className="statisticChartWrap">
            <div className="flexContainer">
              <div className="flexItem">
                <div className="chartBox">
                  <StatisticChart taskCompleted={350} taskPending={150} />
                </div>
                <span className="label">Task</span>
                <span className="label mg-0">Completed</span>
              </div>
              <div className="flexItem">
                <div className="chartBox">
                  <StatisticChart taskCompleted={30} taskPending={80} />
                </div>
                <span className="label">Checklist</span>
                <span className="label mg-0">Completed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="logoutBtnWrap">
          <CustomButton name="Logout" onClick={onLogoutHandler} />
        </div>
      </div>
    </>
  );
};

export default Profile;
