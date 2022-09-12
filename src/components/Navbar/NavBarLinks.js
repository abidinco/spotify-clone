import React, { useContext } from 'react';
import styles from './NavBarLinks.module.css';
import Icon from '../UI/Icon';
import AppContext from '../../store';

const NavBarLinks = () => {

  const appCtx = useContext(AppContext);

  return (
    <div>
      {appCtx.isLoggedIn &&
        <div className={styles.buttons}>
          <div>Upgrade</div>
          <div tabIndex={0}>
            <span>Abidin A.</span>
            <Icon name="navbar-drop-down" color="#fff" width={16} height={16} />
            <div className={styles.dropdown}>
              <div>
                <span>Account</span>
                <span role="img" aria-label="External Link">🔗</span>
              </div>
              <div>Profile</div>
              <div>
                <span>Upgrade to Premium</span>
                <span role="img" aria-label="External Link">🔗</span>
              </div>
              <div>
                <span>Support</span>
                <span role="img" aria-label="External Link">🔗</span>
              </div>
              <div>
                <span>Download</span>
                <span role="img" aria-label="External Link">🔗</span>
              </div>
              <div>Settings</div>
              <div onClick={appCtx.handleLogout}>Log out</div>
            </div>
          </div>
        </div>
      }
      {!appCtx.isLoggedIn &&
        <div className={styles.links}>
          <div>Premium</div>
          <div>Support</div>
          <div>Download</div>
          <div className={styles.divider}></div>
          <div>Sign up</div>
          <div onClick={appCtx.handleLogin}>Log in</div>
        </div>
      }
    </div>
  )
}

export default NavBarLinks;