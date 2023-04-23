import React, { useContext, useEffect, useState, useCallback } from "react";
import styles from "./NavbarLinks.module.css";
import Icon from "../UI/Icon";
import AppContext from "../../store";
import Spotify from "../../spotify/api";

const NavbarLinks = () => {
  const appCtx = useContext(AppContext);
  const [user, setUser] = useState();

  const getCurrentUser = useCallback(async () => {
    let currentUser = await Spotify.getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    appCtx.isUserLoggedIn && getCurrentUser();
  }, [appCtx.isUserLoggedIn, getCurrentUser]);

  return (
    <div>
      {!appCtx.isUserLoggedIn && (
        <div className={styles.links}>
          <div>Premium</div>
          <div>Support</div>
          <div>Download</div>
          <div className={styles.divider}></div>
          <div>Sign up</div>
          <div onClick={appCtx.handleUserLogin}>Log in</div>
        </div>
      )}
      {appCtx.isUserLoggedIn && (
        <div className={styles.buttons}>
          <div className="not-allowed">Upgrade</div>
          <div tabIndex={0}>
            <img
              loading="lazy"
              src={
                user
                  ? user.images[0]?.url
                  : "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021"
              }
              alt="Profile"
            />
            <span>{user ? user.display_name : null}</span>
            <Icon name="navbar-drop-down" color="#fff" width={16} height={16} />
            <div className={styles.dropdown}>
              <div className="not-allowed">
                <span>Account</span>
                <span role="img" aria-label="External Link">
                  🔗
                </span>
              </div>
              <div className="not-allowed">Profile</div>
              <div className="not-allowed">
                <span>Upgrade to Premium</span>
                <span role="img" aria-label="External Link">
                  🔗
                </span>
              </div>
              <div className="not-allowed">
                <span>Support</span>
                <span role="img" aria-label="External Link">
                  🔗
                </span>
              </div>
              <div className="not-allowed">
                <span>Download</span>
                <span role="img" aria-label="External Link">
                  🔗
                </span>
              </div>
              <div className="not-allowed">Settings</div>
              <div onClick={appCtx.handleUserLogout} className="pointer">
                Log out
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarLinks;
