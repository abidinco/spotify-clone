import React, { useEffect, useState, useContext } from "react";
import styles from "./PlaylistRoot.module.css";
import Icon from "../../UI/Icon";
import { useLocation } from "react-router-dom";
import Spotify from "../../../spotify/api";
import PlaylistRootHeader from "./PlaylistRootHeader";
import SongList from "./SongList";
import AppContext from "../../../store";

import { calculatePlaylistDuration } from "../../../utils";

const PlaylistRoot = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const isArtistPage = pathname.startsWith("/artist");
  const isPlaylistPage = pathname.startsWith("/playlist");
  const isLikedSongsPage = pathname === "/collection/tracks";

  const [artist, setArtist] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
  const [artistTracks, setArtistTracks] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  const appCtx = useContext(AppContext);

  let getPlaylist = () => {};
  let getArtist = () => {};
  let getLikedSongs = () => {};
  let getCurrentUser = () => {};
  let getArtistTracks = () => {};

  if (isPlaylistPage) {
    getPlaylist = async () => {
      let arr = pathname.split("/");
      const playlist = await Spotify.getPlaylist(arr[arr.length - 1]);
      setPlaylist(playlist);
      appCtx.changeNavbarNowPlaying(playlist.name);
      console.log(playlist);
    };
  } else if (isArtistPage) {
    getArtist = async () => {
      let arr = pathname.split("/");
      const artist = await Spotify.getArtist(arr[arr.length - 1]);
      setArtist(artist);
      appCtx.changeNavbarNowPlaying(artist.name);
    };
    getArtistTracks = async () => {
      let arr = pathname.split("/");
      const artist = await Spotify.getArtistsTopTracks(arr[arr.length - 1]);
      setArtistTracks(artist);
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
      appCtx.changeNavbarNowPlaying("Liked songs");
    };
  }

  useEffect(() => {
    if (isPlaylistPage) {
      getPlaylist();
    } else if (isArtistPage) {
      getArtist();
      getArtistTracks();
    } else if (isLikedSongsPage) {
      getCurrentUser();
      getLikedSongs();
    }
  }, [isArtistPage, isLikedSongsPage, isPlaylistPage, location.key]);

  return (
    <div>
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
        followers={isPlaylistPage ? playlist && playlist.followers.total : null}
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
      <div className={styles.wrapper}>
        <div className={styles.noise}></div>
        <div className={styles.actions}>
          <div className={styles.icon}>
            <Icon name="player-play" width={24} height={24} color="#000" />
          </div>
        </div>
        <SongList
          page={
            isLikedSongsPage
              ? "likedSongs"
              : isArtistPage
              ? "artist"
              : "playlist"
          }
          songs={
            isLikedSongsPage
              ? likedSongs && likedSongs.items
              : isPlaylistPage
              ? playlist && playlist.tracks.items
              : artistTracks && artistTracks.tracks
          }
        />
      </div>
    </div>
  );
};

export default PlaylistRoot;
