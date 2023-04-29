import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Spotify from "../../../spotify/api";
import AppContext from "../../../store";
import { calculatePlaylistDuration } from "../../../utils";

import PlaylistRootHeader from "./PlaylistRootHeader";
import SongList from "./SongList";

import Icon from "../../UI/Icon";
import styles from "./PlaylistRoot.module.css";

const PlaylistRoot = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const isArtistPage = pathname.startsWith("/artist");
  const isPlaylistPage = pathname.startsWith("/playlist");
  const isAlbumPage = pathname.startsWith("/album");
  const isLikedSongsPage = pathname === "/collection/tracks";

  const [artist, setArtist] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [likedSongs, setLikedSongs] = useState(null);
  const [album, setAlbum] = useState(null);
  const [artistTracks, setArtistTracks] = useState(null);
  const [currentUser, setCurrentUser] = useState();

  const appCtx = useContext(AppContext);

  let getPlaylist = () => {};
  let getArtist = () => {};
  let getAlbum = () => {};
  let getLikedSongs = () => {};
  let getCurrentUser = () => {};
  let getArtistTracks = () => {};

  if (isPlaylistPage) {
    getPlaylist = async () => {
      let arr = pathname.split("/");
      const playlist = await Spotify.getFromSpotify(
        "PLAYLIST_BY_ID",
        arr[arr.length - 1]
      );
      setPlaylist(playlist);
      appCtx.handleChangeNavbarNowPlayingText(playlist.name);
    };
  } else if (isArtistPage) {
    getArtist = async () => {
      let arr = pathname.split("/");
      const artist = await Spotify.getFromSpotify(
        "ARTIST_BY_ID",
        arr[arr.length - 1]
      );
      setArtist(artist);
      appCtx.handleChangeNavbarNowPlayingText(artist.name);
    };
    getArtistTracks = async () => {
      let arr = pathname.split("/");
      const artist = await Spotify.getFromSpotify(
        "ARTIST_TOP_TRACKS_BY_ID",
        arr[arr.length - 1]
      );
      setArtistTracks(artist);
    };
  } else if (isLikedSongsPage) {
    getCurrentUser = async () => {
      let currentUser = await Spotify.getFromSpotify("CURRENT_USER");
      setCurrentUser(currentUser);
    };
    getLikedSongs = async () => {
      const likedSongs = await Spotify.getFromSpotify(
        "CURRENT_USER_SAVED_TRACKS"
      );
      setLikedSongs(likedSongs);
      appCtx.handleChangeNavbarNowPlayingText("Liked songs");
    };
  } else if (isAlbumPage) {
    getAlbum = async () => {
      let arr = pathname.split("/");
      const album = await Spotify.getFromSpotify(
        "ALBUM_BY_ID",
        arr[arr.length - 1]
      );
      setAlbum(album);
      appCtx.handleChangeNavbarNowPlayingText(album.name);
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
    } else if (isAlbumPage) {
      getAlbum();
    }
  }, [
    isAlbumPage,
    isArtistPage,
    isLikedSongsPage,
    isPlaylistPage,
    location.key,
  ]);
  return (
    <div>
      <PlaylistRootHeader
        page={
          isLikedSongsPage
            ? "likedSongs"
            : isArtistPage
            ? "artist"
            : isAlbumPage
            ? "album"
            : "playlist"
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
            : isAlbumPage
            ? album && album.images[0].url
            : artist && artist.images[0]
            ? artist.images[0].url
            : "/blank.jpg"
        }
        name={
          isLikedSongsPage
            ? "Liked Songs"
            : isPlaylistPage
            ? playlist && playlist.name
            : isAlbumPage
            ? album && album.name
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
          isLikedSongsPage && currentUser !== null
            ? currentUser?.images[0]
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
            : isAlbumPage
            ? album && album.total_tracks
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
              : isAlbumPage
              ? "album"
              : "playlist"
          }
          songs={
            isLikedSongsPage
              ? likedSongs && likedSongs.items
              : isPlaylistPage
              ? playlist && playlist.tracks.items
              : isAlbumPage
              ? album && album.tracks.items
              : artistTracks && artistTracks.tracks
          }
        />
      </div>
    </div>
  );
};

export default PlaylistRoot;
