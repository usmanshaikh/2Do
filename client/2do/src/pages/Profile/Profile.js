import React from "react";
import { Icon, Avatar, IconButton } from "@mui/material";
import { useModal } from "mui-modal-provider";
import Images from "../../assets/img/images.js";
import EditProfileModal from "../../components/Modals/EditProfileModal/EditProfileModal.js";
import CustomButton from "../../components/CustomButton/CustomButton.js";
import "./Profile.scss";

const Profile = () => {
  const { showModal } = useModal();

  const openEditProfileModalHandler = () => {
    const initialState = {
      onSubmitForm: (data) => saveFormHandler(data),
    };
    showModal(EditProfileModal, initialState, { destroyOnClose: true });
  };

  const saveFormHandler = (data) => {
    console.log({ data });
  };

  const onLogoutHandler = () => {};

  return (
    <>
      <div className="profilePageWrapper">
        <div className="profileCardWrap">
          <div className="userInfo flexContainer ">
            <div className="flexItemOne">
              <Avatar alt="Remy Sharp" src={Images.Portrait} sx={{ width: 60, height: 60 }} />
            </div>
            <div className="flexItemTwo">
              <p className="name">Usman Shaikh</p>
              <p className="email">shaikhusman57@gmail.com</p>
              <div className="editProfileBtnWrap">
                <IconButton aria-label="delete" className="iconBtn" size="small" onClick={openEditProfileModalHandler}>
                  <Icon className="manageAccountsIcon">manage_accounts</Icon>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
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
            <span className="title">Check List</span>
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
          <div className="chartBox">
            <span>Task</span>
          </div>
          <div className="chartBox">
            <span>Check List</span>
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
