import React from 'react';
import Playerbar from './Playerbar/Playerbar';
import Sidebar from './Sidebar/Sidebar';
import Body from './Body/Body';
import styles from './Layout.module.css';

const Layout = () => {
    return(
        <div className={styles.container}>
            <Sidebar />
            <Body />
            <Playerbar />
        </div>
    )
}

export default Layout;