import React, { useContext, useState, useEffect, useCallback } from "react";
import Spotify from "../../spotify/api";

import TopItem from "../UI/TopItem";
import PlayCard from "../UI/PlayCard";
import BrowseCard from "../UI/BrowseCard";
import AppContext from "../../store";
import styles from "./HomePage.module.css";

import { welcomingMessage, getRandomRGB } from "../../utils";

const HomePage = () => {
  const appCtx = useContext(AppContext);
  const [playlists, setPlaylists] = useState();
  // const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  // const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState();

  const getCurrentUsersPlaylists = useCallback(async () => {
    let listOfPlaylist = await Spotify.getFromSpotify("CURRENT_USER_PLAYLISTS");
    setPlaylists(listOfPlaylist);
  }, []);
  // const getCurrentUserTopArtists = useCallback(async () => {
  //     let listOfArtists = await Spotify.getCurrentUserTopArtists();
  //     setTopArtists(listOfArtists);
  // }, []);
  const getCurrentUserTopTracks = useCallback(async () => {
    let listOfTracks = await Spotify.getFromSpotify("CURRENT_USER_TOP_TRACKS");
    setTopTracks(listOfTracks);
  }, []);
  // const getCurrentUserRecentlyPlayedTracks = useCallback(async () => {
  //   let listOfTracks = await Spotify.getCurrentUserRecentlyPlayedTracks();
  //   setRecentlyPlayedTracks(listOfTracks);
  // }, []);

  useEffect(() => {
    appCtx.isUserLoggedIn && getCurrentUsersPlaylists();
    // getCurrentUserTopArtists();
    appCtx.isUserLoggedIn && getCurrentUserTopTracks();
    // appCtx.isLoggedIn && getCurrentUserRecentlyPlayedTracks();
  }, [
    appCtx.isUserLoggedIn,
    /* getCurrentUserRecentlyPlayedTracks, */
    getCurrentUserTopTracks,
    getCurrentUsersPlaylists,
  ]);
  return (
    <div className={styles.wrapper}>
      {appCtx.isUserLoggedIn && (
        <React.Fragment>
          <div className={styles.message}>{welcomingMessage()}</div>
          <div className={styles["top-items"]}>
            <TopItem
              href="/collection/tracks"
              image="/playlist-cover-liked-songs.png"
              name="Liked Songs"
            />
            {playlists
              ? playlists.items.map((playlist) => (
                  <TopItem
                    key={playlist.id}
                    href={`/playlist/${playlist.id}`}
                    image={
                      playlist.images[0] ? playlist.images[0].url : "/blank.jpg"
                    }
                    name={playlist.name}
                  />
                ))
              : null}
          </div>
          {/* <div className={styles.title}>Recently played tracks</div>
          <div className={styles["cards-container"]}>
            {recentlyPlayedTracks
              ? recentlyPlayedTracks.items.map((item, i) => (
                  <PlayCard
                    key={i}
                    cover={item.track?.album?.images[0].url}
                    title={item.track.name}
                    subtitle={item.track.artists.map(
                      (artist) => artist.name + " "
                    )}
                  />
                ))
              : null}
          </div> */}
          <div className={styles.title}>Your top tracks</div>
          <div className={styles["cards-container"]}>
            {topTracks
              ? topTracks.items.map((item, i) => (
                  <PlayCard
                    key={i}
                    cover={item.album.images[0].url}
                    title={item.name}
                    subtitle={item.artists.map((artist) => artist.name + " ")}
                    trackUrl={item.preview_url}
                  />
                ))
              : null}
          </div>
        </React.Fragment>
      )}
      {!appCtx.isUserLoggedIn && (
        <React.Fragment>
          <div className={styles.title}>
            🙎‍♂️{" "}
            <span
              className="pointer"
              title="Copy to clipboard"
              onClick={() => navigator.clipboard.writeText("udummy@bk.ru")}
            >
              udummy@bk.ru
            </span>{" "}
            🔑 testuser
          </div>
          <div>
            <span className="link" onClick={() => appCtx.handleUserLogin()}>
              Login
            </span>{" "}
            the app with the spotify account created for test. Otherwise you
            can't properly use, because of{" "}
            <a
              className="link"
              href="https://developer.spotify.com/documentation/general/guides/authorization/#which-oauth-flow-should-i-use"
              target="_blank"
              rel="noreferrer"
            >
              oauth flows' restrictions
            </a>
          </div>
          <div style={{ height: 100 }}></div>
          <div className="divider-centered-text">
            some UI elements to fill the home
          </div>
          <div className={styles["cards-container"]}>
            <PlayCard
              cover="/playlist-cover-liked-songs.png"
              title="Liked Songs"
              subtitle="Your liked songs"
            />
            <BrowseCard
              image="/browse-card-images/pop.jfif"
              name="Genre Cards"
              color={getRandomRGB(255)}
              className="not-allowed"
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default HomePage;
