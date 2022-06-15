import React from "react";
import { Tabs, Tab } from "@mui/material";
import TaskCard from "../../components/Cards/TaskCard/TaskCard";
import Calendar from "../../components/Calendar/Calendar";
import "./MyTask.scss";

const MyTask = () => {
  const [tabTitle, setTabTitle] = React.useState(0);

  const onChangeTabHandler = (event, newValue) => {
    setTabTitle(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabcontent-${index}`,
    };
  };

  return (
    <>
      <div className="myTaskPageWrapper">
        <div className="tabWrapper">
          <div className="tabHeaderbox">
            <Tabs value={tabTitle} variant="fullWidth" onChange={onChangeTabHandler}>
              <Tab label="Today" {...a11yProps(0)} />
              <Tab label="Month" {...a11yProps(1)} />
            </Tabs>
          </div>
          <div className="tabContentbox">
            <div role="tabcontent" hidden={tabTitle !== 0} id="full-width-tabcontent-0">
              <TaskCard />
            </div>
            <div role="tabcontent" hidden={tabTitle !== 1} id="full-width-tabcontent-1">
              <Calendar />
              <TaskCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTask;
