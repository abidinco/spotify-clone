import React from "react";
import PlayerBar from "./PlayerBar/PlayerBar";
import SideBar from "./SideBar/SideBar";
import Body from "./Body/Body";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <Body />
      <PlayerBar />
    </div>
  );
};

export default Layout;
