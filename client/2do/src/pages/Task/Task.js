import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import TaskCard from "../../components/Cards/TaskCard/TaskCard";
import Calendar from "../../components/Calendar/Calendar";
import useSetCategoryAndFilterBy from "../../utils/hooks/useSetCategoryAndFilterBy";
import "./Task.scss";

const Task = () => {
  const [tabTitle, setTabTitle] = useState(0);
  const setHeaderTitle = useSetCategoryAndFilterBy();

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
      <div className="taskPageWrapper">
        <div className="tabWrapper">
          <div className="tabHeaderbox">
            <Tabs value={tabTitle} variant="fullWidth" onChange={onChangeTabHandler}>
              <Tab label="Today" {...a11yProps(0)} />
              <Tab label="Month" {...a11yProps(1)} />
            </Tabs>
          </div>
          <div className="tabContentbox">
            <div hidden={tabTitle !== 0} id="full-width-tabcontent-0">
              {tabTitle === 0 && <TaskCard />}
            </div>
            <div hidden={tabTitle !== 1} id="full-width-tabcontent-1">
              {tabTitle === 1 && (
                <>
                  <Calendar />
                  <TaskCard />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
