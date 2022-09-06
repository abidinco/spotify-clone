import React from 'react';
import styles from './NavBarLinks.module.css';

const NavBarLinks = () => {
  return (
    <div className={styles.links}>
        <div>Premium</div>
        <div>Support</div>
        <div>Download</div>
        <div className={styles.divider}></div>
        <div>Sign up</div>
        <div>Log in</div>
    </div>
  )
}

export default NavBarLinks;