import React from "react";
import Avatar from "@mui/material/Avatar";
import Images from "../../assets/img/images.js";

import "./Profile.scss";

const Profile = () => {
  return (
    <>
      <div className="profilePageWrapper">
        <div className="profileCardWrap">
          <div className="userInfo flexContainer ">
            <div className="flexItemOne">
              <Avatar alt="Remy Sharp" src={Images.Portrait} sx={{ width: 65, height: 65 }} />
            </div>
            <div className="flexItemTwo">
              <p className="name">Usman Shaikh</p>
              <p className="email">shaikhusasdsadsadman57@gmail.com</p>
            </div>
          </div>
          <span className="heading">Task</span>
          <div className="taskInfo flexContainer">
            <div className="flexItemOne">
              <span className="label">
                Create - <span className="count">120</span>
              </span>
            </div>
            <div className="flexItemTwo">
              <span className="label">
                Completed - <span className="count">80</span>
              </span>
            </div>
          </div>
          <span className="heading">Check List</span>
          <div className="taskInfo flexContainer">
            <div className="flexItemOne">
              <span className="label">
                Create - <span className="count">77</span>
              </span>
            </div>
            <div className="flexItemTwo">
              <span className="label">
                Completed - <span className="count">45</span>
              </span>
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
      </div>
    </>
  );
};

export default Profile;
