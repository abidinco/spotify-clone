import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../store";
import Spotify from "../../spotify/api";
import SideBarLink from "./SideBarLink";
import Icon from "../UI/Icon";
import styles from "./SideBar.module.css";

const Sidebar = () => {
  const appCtx = useContext(AppContext);
  const [playlists, setPlaylists] = useState();
  const getPlaylists = async () => {
    const playlists = await Spotify.getCurrentUsersPlaylists();
    setPlaylists(playlists);
  };

  useEffect(() => {
    appCtx.isUserLoggedIn && getPlaylists();
  }, [appCtx.isUserLoggedIn]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.navigation}>
        <Link to="/" style={{ marginBottom: 20 }}>
          <Icon name="logo-white" color="#FFFFFF" width={130} height={40} />
        </Link>
        <SideBarLink to="/" name="Home" icon="home" />
        <SideBarLink to="/search/" name="Search" icon="search" />
        <SideBarLink
          to="/collection/playlists"
          name="Your Library"
          icon="library"
          popoverContentTitle="Enjoy Your Library"
          popoverContentText="Log in to see saved songs, podcasts, artists, and playlists in Your Library."
        />
        <div style={{ height: 24 }}></div>
        <SideBarLink
          className="not-allowed"
          to="#"
          name="Create Playlist"
          icon="create-playlist"
          popoverContentTitle="Create a playlist"
          popoverContentText="Log in to create and share playlists."
        />
        <SideBarLink
          to="/collection/tracks"
          name="Liked Songs"
          icon="liked-songs"
          popoverContentTitle="Enjoy your Liked Songs"
          popoverContentText="Log in to see all the songs you've liked in one easy playlist."
        />
      </div>
      <div className={styles.divider}></div>
      {appCtx.isUserLoggedIn && (
        <div className={styles["playlists-wrapper"]}>
          <div className={styles.playlists}>
            {playlists
              ? playlists.items.map((playlist) => (
                  <div key={playlist.id}>
                    <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
      {!appCtx.isUserLoggedIn && (
        <div className={styles.footer}>
          <span>Cookies</span>
          <span>Privacy</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
