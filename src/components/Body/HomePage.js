import React, { useContext, useState, useEffect, useCallback } from "react";
import TopItem from "../UI/TopItem";
import PlayCard from "../UI/PlayCard";

import AppContext from "../../store";
import styles from "./HomePage.module.css";
import Spotify from "../../spotify/api";

import { welcomingMessage } from "../../utils";

const HomePage = () => {
  const appCtx = useContext(AppContext);
  const [playlists, setPlaylists] = useState();
  // const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState();

  const getCurrentUsersPlaylists = useCallback(async () => {
    let listOfPlaylist = await Spotify.getCurrentUsersPlaylists();
    setPlaylists(listOfPlaylist);
  }, []);
  // const getCurrentUserTopArtists = useCallback(async () => {
  //     let listOfArtists = await Spotify.getCurrentUserTopArtists();
  //     setTopArtists(listOfArtists);
  // }, []);
  const getCurrentUserTopTracks = useCallback(async () => {
    let listOfTracks = await Spotify.getCurrentUserTopTracks();
    setTopTracks(listOfTracks);
  }, []);
  const getCurrentUserRecentlyPlayedTracks = useCallback(async () => {
    let listOfTracks = await Spotify.getCurrentUserRecentlyPlayedTracks();
    setRecentlyPlayedTracks(listOfTracks);
  }, []);

  useEffect(() => {
    appCtx.isLoggedIn && getCurrentUsersPlaylists();
    // getCurrentUserTopArtists();
    appCtx.isLoggedIn && getCurrentUserTopTracks();
    appCtx.isLoggedIn && getCurrentUserRecentlyPlayedTracks();
  }, [
    appCtx.isLoggedIn,
    getCurrentUserRecentlyPlayedTracks,
    getCurrentUserTopTracks,
    getCurrentUsersPlaylists,
  ]);
  return (
    <div className={styles.wrapper}>
      {appCtx.isLoggedIn && (
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
          <div className={styles.title}>Recently played tracks</div>
          <div className={styles["cards-container"]}>
            {recentlyPlayedTracks
              ? recentlyPlayedTracks.items.map((item, i) => (
                  <PlayCard
                    key={i}
                    cover={item.track.album.images[0].url}
                    title={item.track.name}
                    subtitle={item.track.artists.map(
                      (artist) => artist.name + " "
                    )}
                  />
                ))
              : null}
          </div>
          <div className={styles.title}>Your top tracks</div>
          <div className={styles["cards-container"]}>
            {topTracks
              ? topTracks.items.map((item, i) => (
                  <PlayCard
                    key={i}
                    cover={item.album.images[0].url}
                    title={item.name}
                    subtitle={item.artists.map((artist) => artist.name + " ")}
                  />
                ))
              : null}
          </div>
        </React.Fragment>
      )}
      {!appCtx.isLoggedIn && (
        <React.Fragment>
          <div className={styles.title}>Login to see</div>
          {
            // TODO: Add fancy "login to see" thing here.
          }
        </React.Fragment>
      )}
    </div>
  );
};

export default HomePage;
