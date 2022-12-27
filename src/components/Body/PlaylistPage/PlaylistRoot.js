import React, { useRef, useEffect, useState } from "react";
import styles from "./PlaylistRoot.module.css";
import Icon from "../../UI/Icon";
import { useLocation, Link } from "react-router-dom";
import Spotify from "../../../spotify/api";
import PlaylistRootHeader from "./PlaylistRootHeader";

import {
  formatDate,
  millisToMinutesAndSeconds,
  calculatePlaylistDuration,
} from "../../../utils";

const PlaylistRoot = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const isArtistPage = pathname.startsWith("/artist");
  const isPlaylistPage = pathname.startsWith("/playlist");
  const isLikedSongsPage = pathname === "/collection/tracks";

  const tableHeaderElement = useRef(null);
  const [pageKey, setPageKey] = useState(location.key);

  const [artist, setArtist] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  let getPlaylist = () => {};
  let getArtist = () => {};
  let getLikedSongs = () => {};
  let getCurrentUser = () => {};

  if (isPlaylistPage) {
    getPlaylist = async () => {
      let arr = pathname.split("/");
      const playlist = await Spotify.getPlaylist(arr[arr.length - 1]);
      setPlaylist(playlist);
    };
  } else if (isArtistPage) {
    getArtist = async () => {
      let arr = pathname.split("/");
      const artist = await Spotify.getArtist(arr[arr.length - 1]);
      setArtist(artist);
    };
  } else if (isLikedSongsPage) {
    getCurrentUser = async () => {
      let currentUser = await Spotify.getCurrentUser();
      setCurrentUser(currentUser);
    };
    getLikedSongs = async () => {
      let arr = pathname.split("/");
      const likedSongs = await Spotify.getCurrentUserSavedTracks(
        arr[arr.length - 1]
      );
      setLikedSongs(likedSongs);
    };
  }

  useEffect(() => {
    // this func for stick to header of playlist when scroll
    const pinHeader = () => {
      let pageY = Math.abs(
        document
          .querySelector("#navbar-root")
          .nextElementSibling.getBoundingClientRect().top - 64
      );
      if (isArtistPage && pageY >= 380) {
        isArtistPage &&
          tableHeaderElement.current.classList.remove("pinned-table-header");
      } else if (!isArtistPage) {
        tableHeaderElement.current.classList.add("pinned-table-header");
      }
    };
    pinHeader();
  }, [isArtistPage]);

  useEffect(() => {
    setPageKey(location.key);
    if (isPlaylistPage) {
      getPlaylist();
    } else if (isArtistPage) {
      getArtist();
    } else if (isLikedSongsPage) {
      getCurrentUser();
      getLikedSongs();
    }
  }, [isArtistPage, isLikedSongsPage, isPlaylistPage, location.key]);

  return (
    <div>
      {/* {console.log(playlist && playlist)} */}
      {/* {console.log(likedSongs && likedSongs)} */}
      {/* {console.log(artist && artist)} */}
      {/* {console.log(currentUser && currentUser)} */}
      <PlaylistRootHeader
        page={
          isLikedSongsPage ? "likedSongs" : isArtistPage ? "artist" : "playlist"
        }
        image={
          isLikedSongsPage
            ? "/playlist-cover-liked-songs.png"
            : isPlaylistPage
            ? playlist && playlist.images[0]
              ? playlist.images[0].url
                ? playlist.images[0].url
                : "/blank.jpg"
              : "/blank.jpg"
            : artist && artist.images[0]
            ? artist.images[0].url
            : "/blank.jpg"
        }
        name={
          isLikedSongsPage
            ? "Liked Songs"
            : isPlaylistPage
            ? playlist && playlist.name
            : artist && artist.name
        }
        description={isPlaylistPage ? playlist && playlist.description : null}
        owner={
          isLikedSongsPage
            ? currentUser && currentUser.display_name
            : isPlaylistPage
            ? playlist && playlist.owner.display_name
            : null
        }
        ownerPP={
          isLikedSongsPage
            ? currentUser && currentUser.images[0]
              ? currentUser.images[0].url
              : "/blank.jpg"
            : "/blank.jpg"
        }
        count={
          isLikedSongsPage
            ? likedSongs && likedSongs.total
            : isPlaylistPage
            ? playlist && playlist.tracks.total
            : null
        }
        duration={
          isLikedSongsPage
            ? likedSongs && calculatePlaylistDuration(likedSongs.items)
            : isPlaylistPage
            ? playlist && calculatePlaylistDuration(playlist.tracks.items)
            : null
        }
        listeners={artist && artist.followers.total}
      />
      <div className={styles.actions}>
        <div className={styles.icon}>
          <Icon name="player-play" width={24} height={24} color="#000" />
        </div>
      </div>
      {!isArtistPage && (
        <div className={styles.table}>
          <div className={styles["table-header"]} ref={tableHeaderElement}>
            <span style={{ fontSize: 16, fontWeight: 300 }}>#</span>
            <span>Title</span>
            <span>Album</span>
            <span>Date Added</span>
            <span>
              <Icon name="duration" height={16} width={16} color="#b3b3b3" />
            </span>
          </div>
          <div className={styles.playlist}>
            {isLikedSongsPage && likedSongs
              ? likedSongs.items.map((song, index) => (
                  <div className={styles.item} key={song.track.id}>
                    <div className={styles.index}>
                      <div className={styles["index-number"]}>{index + 1}</div>
                      <div className={styles["index-icon"]}>
                        <Icon
                          name="player-play"
                          width={16}
                          height={16}
                          color="#fff"
                        />
                      </div>
                    </div>
                    <div className={styles.meta}>
                      <img
                        src={
                          song.track.album.images[0].url
                            ? song.track.album.images[0].url
                            : "/blank.jpg"
                        }
                        alt="Song"
                      />
                      <div>
                        <div className={styles["song-name"]}>
                          {song.track.name}
                        </div>
                        <div>
                          {song.track.artists.map((artist, i) => (
                            <Link
                              className={styles["song-link"]}
                              key={i}
                              to={`/artist/${artist.id}`}
                            >
                              {artist.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>{song.track.album.name}</div>
                    <div className={styles.date}>
                      {song ? formatDate(song.added_at) : "..."}
                    </div>
                    <div className={styles.duration}>
                      <span>
                        {millisToMinutesAndSeconds(song.track.duration_ms)}
                      </span>
                    </div>
                  </div>
                ))
              : null}
            {isPlaylistPage && playlist
              ? playlist.tracks.items.map((song, index) => (
                  <div className={styles.item} key={song.track.id}>
                    <div className={styles.index}>
                      <div className={styles["index-number"]}>{index + 1}</div>
                      <div className={styles["index-icon"]}>
                        <Icon
                          name="player-play"
                          width={16}
                          height={16}
                          color="#fff"
                        />
                      </div>
                    </div>
                    <div className={styles.meta}>
                      <img
                        src={
                          song.track.album.images[0].url
                            ? song.track.album.images[0].url
                            : "/blank.jpg"
                        }
                        alt="Song"
                      />
                      <div>
                        <div className={styles["song-name"]}>
                          {song.track.name}
                        </div>
                        <div>
                          {song.track.artists.map((artist, i) => (
                            <Link
                              className={styles["song-link"]}
                              key={i}
                              to={`/artist/${artist.id}`}
                            >
                              {artist.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>{song.track.album.name}</div>
                    <div className={styles.date}>
                      {song ? formatDate(song.added_at) : "..."}
                    </div>
                    <div className={styles.duration}>
                      <span>
                        {millisToMinutesAndSeconds(song.track.duration_ms)}
                      </span>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistRoot;
