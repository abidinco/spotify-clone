import React, { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Spotify from "../spotify/api";

const initialState = {
  isUserLoggedIn: false,
  isSearching: false,
  searchText: "",
  navbarNowPlayingText: "Liked songs",
  playerVolume: 0.5,
  playerMuted: false,
  playerLooped: false,
  playerTrackSrc: "/soolokisa.mp3",
};

const AppContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, isUserLoggedIn: true };
    case "USER_LOGOUT":
      return { ...state, isUserLoggedIn: false };
    case "SEARCH":
      return {
        ...state,
        searchText: action.payload.searchText,
        isSearching: action.payload.isSearching,
      };
    case "SEARCH_CLEAR":
      return { ...state, searchText: "", isSearching: false };
    case "NAVBAR_CHANGE_NOW_PLAYING":
      return {
        ...state,
        navbarNowPlayingText: action.payload.navbarNowPlayingText,
      };
    case "PLAYER_SET_VOLUME":
      return { ...state, playerVolume: action.payload.playerVolume };
    case "PLAYER_MUTE":
      return { ...state, playerMuted: action.payload.playerMuted };
    case "PLAYER_LOOP":
      return { ...state, playerLooped: action.payload.playerLooped };
    case "PLAYER_CHANGE_TRACK":
      return { ...state, playerTrackSrc: action.payload.playerTrackSrc };
    default:
      return state;
  }
};

export const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleUserLogin = () => {
    if (localStorage.getItem("accessToken")) {
      dispatch({ type: "USER_LOGIN" });
    } else {
      Spotify.getAccessToken();
    }
  };

  const handleUserLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch({ type: "USER_LOGOUT" });
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const handleSearch = (text) => {
    dispatch({
      type: "SEARCH",
      payload: {
        searchText: text,
        isSearching: text.trim() === "" ? false : true,
      },
    });
    navigateToSearchTerm("/search/" + text.trim());
  };

  const handleSearchClear = () => {
    dispatch({ type: "SEARCH_CLEAR" });
  };

  const navigateToSearchTerm = (to) => {
    navigate(to);
  };

  const handleChangeNavbarNowPlayingText = (playlistName) => {
    dispatch({
      type: "NAVBAR_CHANGE_NOW_PLAYING",
      payload: {
        navbarNowPlayingText: playlistName,
      },
    });
  };

  const handlePlayerVolume = (volumeLevel) => {
    dispatch({
      type: "PLAYER_SET_VOLUME",
      payload: {
        playerVolume: volumeLevel,
      },
    });
  };

  const handlePlayerMute = (willBeMuted) => {
    dispatch({
      type: "PLAYER_MUTE",
      payload: {
        playerMuted: willBeMuted,
      },
    });
  };

  const handlePlayerLoop = (willBeLooped) => {
    dispatch({
      type: "PLAYER_LOOP",
      payload: {
        playerLooped: willBeLooped,
      },
    });
  };

  const handlePlayerChangeTrack = (trackUrl) => {
    dispatch({
      type: "PLAYER_CHANGE_TRACK",
      payload: {
        playerTrackSrc: trackUrl,
      },
    });
  };

  return (
    <AppContext.Provider
      value={{
        handleUserLogin: handleUserLogin,
        handleUserLogout: handleUserLogout,
        handleSearch: handleSearch,
        handleSearchClear: handleSearchClear,
        isUserLoggedIn: appState.isUserLoggedIn,
        searchText: appState.searchText,
        isSearching: appState.isSearching,
        handleChangeNavbarNowPlayingText: handleChangeNavbarNowPlayingText,
        navbarNowPlayingText: appState.navbarNowPlayingText,
        handlePlayerVolume: handlePlayerVolume,
        playerVolume: appState.playerVolume,
        handlePlayerChangeTrack: handlePlayerChangeTrack,
        playerTrackSrc: appState.playerTrackSrc,
        handlePlayerMute: handlePlayerMute,
        playerMuted: appState.playerMuted,
        handlePlayerLoop: handlePlayerLoop,
        playerLooped: appState.playerLooped,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
