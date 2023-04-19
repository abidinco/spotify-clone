import React, { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Spotify from "../spotify/api";

const initialState = {
  isLoggedIn: false,
  searchText: "",
  isSearching: false,
  navbarNowPlaying: "Liked songs",
  playerVolume: 0.5,
  playerMuted: false,
};

const AppContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
    case "SEARCH":
      return {
        ...state,
        searchText: action.payload.searchText,
        isSearching: action.payload.isSearching,
      };
    case "NAVBAR_NOW_PLAYING":
      return { ...state, navbarNowPlaying: action.payload.navbarNowPlaying };
    case "SEARCH_CLEAR":
      return { ...state, searchText: "", isSearching: false };
    case "PLAYER_VOLUME":
      return { ...state, playerVolume: action.payload.playerVolume };
    case "PLAYER_MUTE":
      return { ...state, playerMuted: action.payload.playerMuted };
    default:
      return state;
  }
};

export const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (localStorage.getItem("accessToken")) {
      dispatch({ type: "LOGIN" });
    } else {
      Spotify.getAccessToken();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT" });
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

  const handleResetSearch = () => {
    dispatch({ type: "SEARCH_CLEAR" });
  };

  const navigateToSearchTerm = (to) => {
    navigate(to);
  };

  const changeNavbarNowPlaying = (playlistName) => {
    dispatch({
      type: "NAVBAR_NOW_PLAYING",
      payload: {
        navbarNowPlaying: playlistName,
      },
    });
  };

  const setVolume = (volume) => {
    dispatch({
      type: "PLAYER_VOLUME",
      payload: {
        playerVolume: volume,
      },
    });
  };

  const mutePlayer = (willBeMute) => {
    dispatch({
      type: "PLAYER_MUTE",
      payload: {
        playerMuted: willBeMute
      }
    })
  }

  return (
    <AppContext.Provider
      value={{
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleSearch: handleSearch,
        resetSearch: handleResetSearch,
        isLoggedIn: appState.isLoggedIn,
        searchText: appState.searchText,
        isSearching: appState.isSearching,
        navbarNowPlaying: appState.navbarNowPlaying,
        changeNavbarNowPlaying: changeNavbarNowPlaying,
        playerVolume: appState.playerVolume,
        setVolume: setVolume,
        mutePlayer: mutePlayer,
        playerMuted: appState.playerMuted,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
