import React, {
  // useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Spotify from "../../spotify/api";
// import AppContext from "../../store";
import Icon from "../UI/Icon";
import styles from "./NavbarLinks.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../store/reducers/authReducer";

const NavbarLinks = () => {
  // const appCtx = useContext(AppContext);
  const userLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const dispatch = useDispatch();

  const [user, setUser] = useState();

  const getCurrentUser = useCallback(async () => {
    let currentUser = await Spotify.getFromSpotify("CURRENT_USER");
    setUser(currentUser);
  }, []);

  useEffect(() => {
    userLoggedIn && getCurrentUser();
  }, [userLoggedIn, getCurrentUser]);

  return (
    <div>
      {!userLoggedIn && (
        <div className={styles.links}>
          <div>Premium</div>
          <div>Support</div>
          <div>Download</div>
          <div className={styles.divider}></div>
          <div>Sign up</div>
          <div onClick={() => dispatch(login())}>Log in</div>
        </div>
      )}
      {userLoggedIn && (
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
              <div onClick={() => dispatch(logout())} className="pointer">
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
