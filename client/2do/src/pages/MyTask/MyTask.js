import React from "react";
import styles from "./MyTask.module.scss";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContent from "../../components/MyTask/TabContent";
import TaskItem from "../../components/MyTask/TaskItem";

const MyTask = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabcontent-${index}`,
    };
  };

  return (
    <>
      <div className={styles.myTaskPageWrapper}>
        <h1>My Task</h1>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Today" {...a11yProps(0)} />
              <Tab label="Month" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabContent value={value} index={0}>
            Today
            {/* <TaskItem /> */}
          </TabContent>
          <TabContent value={value} index={1}>
            Month
          </TabContent>
        </Box>
      </div>
    </>
  );
};

export default MyTask;
