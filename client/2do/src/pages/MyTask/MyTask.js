import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContent from "../../components/MyTask/TabContent";
import TaskItem from "../../components/MyTask/TaskItem";
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
            <TabContent value={tabTitle} index={0}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sit commodi, vero voluptates molestias
                obcaecati voluptate sapiente harum consectetur earum voluptatibus. Minima tempore distinctio molestias
                eveniet saepe! Ut, eum ipsam!LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Sed sit
                commodi, vero voluptates molestias obcaecati voluptate sapiente harum consectetur earum voluptatibus.
                Minima tempore distinctio molestias eveniet saepe! Ut, eum ipsam!LoremLorem ipsum dolor sit amet
                consectetur adipisicing elit. Sed sit commodi, vero voluptates molestias obcaecati voluptate sapiente
                harum consectetur earum voluptatibus. Minima tempore distinctio molestias eveniet saepe! Ut, eum
                ipsam!LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Sed sit commodi, vero voluptates
                molestias obcaecati voluptate sapiente harum consectetur earum voluptatibus. Minima tempore distinctio
                molestias eveniet saepe! Ut, eum ipsam!LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                sit commodi, vero voluptates molestias obcaecati voluptate sapiente harum consectetur earum
                voluptatibus. Minima tempore distinctio molestias eveniet saepe! Ut, eum ipsam!LoremLorem ipsum dolor
                sit amet consectetur adipisicing elit. Sed sit commodi, vero voluptates molestias obcaecati voluptate
                sapiente harum consectetur earum voluptatibus. Minima tempore distinctio molestias eveniet saepe! Ut,
                eum ipsam!LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Sed sit commodi, vero voluptates
                molestias obcaecati voluptate sapiente harum consectetur earum voluptatibus. Minima tempore distinctio
                molestias eveniet saepe! Ut, eum ipsam!LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                sit commodi, vero voluptates molestias obcaecati voluptate sapiente harum consectetur earum
                voluptatibus. Minima tempore distinctio molestias eveniet saepe! Ut, eum ipsam!LoremLorem ipsum dolor
                sit amet consectetur adipisicing elit. Sed sit commodi, vero voluptates molestias obcaecati voluptate
                sapiente harum consectetur earum voluptatibus. Minima tempore distinctio molestias eveniet saepe! Ut,
                eum ipsam!LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Sed sit commodi, vero voluptates
                molestias obcaecati voluptate sapiente harum consectetur earum voluptatibus. Minima tempore distinctio
                molestias eveniet saepe! Ut, eum ipsam!LoremLorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                sit commodi, vero voluptates molestias obcaecati voluptate sapiente harum consectetur earum
                voluptatibus. Minima tempore distinctio molestias eveniet saepe! Ut, eum ipsam!LoremLorem ipsum dolor
                sit amet consectetur adipisicing elit. Sed sit commodi, vero voluptates molestias obcaecati voluptate
                sapiente harum consectetur earum voluptatibus. Minima tempore distinctio molestias eveniet saepe! Ut,
                eum ipsam!Lorem
              </p>
              {/* <TaskItem /> */}
            </TabContent>
            <TabContent value={tabTitle} index={1}>
              {/* <TaskItem /> */}
            </TabContent>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyTask;
