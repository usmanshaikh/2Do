import React, { useState } from "react";
import { Icon, Avatar, IconButton } from "@mui/material";
import Images from "../../assets/img/images.js";
import EditProfileModal from "../../components/Modals/EditProfileModal/EditProfileModal.js";
import "./Profile.scss";

const Profile = () => {
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

  const openEditProfileHandler = () => {
    setOpenEditProfileModal(true);
  };

  const closeEditProfileModalHandler = () => {
    setOpenEditProfileModal(false);
  };

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
                <IconButton aria-label="delete" className="iconBtn" size="small" onClick={openEditProfileHandler}>
                  <Icon className="manageAccountsIcon">manage_accounts</Icon>
                </IconButton>
              </div>
            </div>
          </div>
          <div className="taskInfo">
            <span className="heading">Task</span>
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
            <span className="heading">Check List</span>
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
        </div>
        <div className="statisticCardWrap">
          <h1>Statistic</h1>
          <div className="chartBox">
            <span>Task</span>
          </div>
          <div className="chartBox">
            <span>Check List</span>
          </div>
        </div>
        <EditProfileModal open={openEditProfileModal} onClose={closeEditProfileModalHandler} />
      </div>
    </>
  );
};

export default Profile;
