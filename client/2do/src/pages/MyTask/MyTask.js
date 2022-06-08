import React from "react";
import styles from "./MyTask.module.scss";
import Menu from "../../components/Menu/Menu";

const MyTask = () => {
  return (
    <>
      <Menu />
      <div className={styles.myTaskPageWrapper}>
        <h1>My Task</h1>
      </div>
    </>
  );
};

export default MyTask;
