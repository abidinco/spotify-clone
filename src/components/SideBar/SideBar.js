import styles from "./SideBar.module.css";
import Icon from "../UI/Icon";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../store";
import SideBarLink from "./SideBarLink";
import Spotify from "../../spotify/api";

const Sidebar = () => {
  const appCtx = useContext(AppContext);
  const [playlists, setPlaylists] = useState();
  const getPlaylists = async () => {
    const playlists = await Spotify.getCurrentUsersPlaylists();
    setPlaylists(playlists);
  };

  useEffect(() => {
    appCtx.isLoggedIn && getPlaylists();
  }, [appCtx.isLoggedIn]);

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
      {appCtx.isLoggedIn && (
        <div className={styles.playlists}>
          <div></div>
          {playlists
            ? playlists.items.map((playlist) => (
                <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                  {playlist.name}
                </Link>
              ))
            : null}
        </div>
      )}
      {!appCtx.isLoggedIn && (
        <div className={styles.footer}>
          <span>Cookies</span>
          <span>Privacy</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
