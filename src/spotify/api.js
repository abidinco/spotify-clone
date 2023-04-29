const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

let spotifyAccessToken;

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-follow-modify",
  "user-follow-read",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-modify",
  "user-library-read",
  "user-read-private",
  "user-read-email",
];

export const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
  "%20"
)}&response_type=token`;

const generateEndPoint = (type, param) => {
  switch (type) {
    case "CURRENT_USER":
      return "https://api.spotify.com/v1/me/";
    case "CURRENT_USER_PLAYLISTS":
      return "https://api.spotify.com/v1/me/playlists";
    case "CURRENT_USER_SAVED_TRACKS":
      return "https://api.spotify.com/v1/me/tracks";
    case "CURRENT_USER_SAVED_SHOWS":
      return "https://api.spotify.com/v1/me/shows";
    case "CURRENT_USER_SAVED_ALBUMS":
      return "https://api.spotify.com/v1/me/albums";
    case "CURRENT_USER_TOP_ARTISTS":
      return "https://api.spotify.com/v1/me/top/artists";
    case "CURRENT_USER_TOP_TRACKS":
      return "https://api.spotify.com/v1/me/top/tracks";
    case "CURRENT_USER_FOLLOWED_ARTISTS":
      return "https://api.spotify.com/v1/me/following?type=artist";
    case "PLAYLIST_BY_ID":
      return `https://api.spotify.com/v1/playlists/${param}`;
    case "PLAYLIST_ITEMS_BY_ID":
      return `https://api.spotify.com/v1/playlists/${param}/tracks`;
    case "ARTIST_BY_ID":
      return `https://api.spotify.com/v1/artists/${param}/`;
    case "ARTIST_TOP_TRACKS_BY_ID":
      return `https://api.spotify.com/v1/artists/${param}/top-tracks?market=TR`;
    case "ALBUM_BY_ID":
      return `https://api.spotify.com/v1/albums/${param}`;
    case "SEVERAL_BROWSE_CATEGORIES":
      return `https://api.spotify.com/v1/browse/categories?country=TR&locale=tr_TR&limit=${param}`;
    case "FEATURED_PLAYLISTS":
      return `https://api.spotify.com/v1/browse/featured-playlists?country=TR&locale=tr_TR&limit=${param}`;
    default:
      throw new Error(
        ">>> Endpoint_type for SpotifyAPI isn't matching. Pass an available endpoint_type. <<<"
      );
  }
};

const Spotify = {
  // The app stores access_token_expiry_time in local storage.
  // To determine when is expiry_time;
  // We sum up now_in_milliseconds and expiry_time_in_milliseconds,
  // Then, checking is it expired or not at /App.js:14
  getNow() {
    let now = new Date();
    return now.getTime();
  },
  getAccessToken() {
    let accessToken = window.location.hash.match(/access_token=([^&]*)/);
    let expiresIn = window.location.hash.match(/expires_in=([^&]*)/);
    if (accessToken && expiresIn) {
      spotifyAccessToken = accessToken[1];
      localStorage.setItem("accessToken", spotifyAccessToken);
      let expiryTime = Number(expiresIn[1]) * 1000;
      localStorage.setItem("accessTokenExpiry", this.getNow() + expiryTime);
      window.history.pushState("Access Token", " ", "/");
      return spotifyAccessToken;
    } else {
      window.location.assign(LOGIN_URL);
      return "";
    }
  },
  async search(query, type, limit, offset) {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=${type}&market=TR${
        limit ? "&limit=" + limit : ""
      }${offset ? "&offset=" + offset : ""}`,
      {
        headers: headers,
        method: "GET",
      }
    );
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getUserId(token) {
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let userId;
    let response = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    });
    let jsonResponse = await response.json();
    if (jsonResponse) userId = jsonResponse.id;
    return userId;
  },
  async getFromSpotify(type, param) {
    if (!localStorage.getItem("accessToken")) {
      return null;
    }
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(generateEndPoint(type, param), {
      headers: headers,
      method: "GET",
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },

  // Disabling this endpoint
  // It crashes app with too many requests message
  // Checked dashboard: Over 20k requested by this func.
  // async getCurrentUserRecentlyPlayedTracks() {
  //   let token = localStorage.getItem("accessToken");
  //   let headers = {
  //     Authorization: `Bearer ${token}`,
  //     "content-type": "application/json",
  //   };
  //   let response = await fetch(
  //     `https://api.spotify.com/v1/me/player/recently-played`,
  //     {
  //       headers: headers,
  //       method: "GET",
  //     }
  //   );
  //   let jsonResponse = await response.json();
  //   return jsonResponse;
  // },
};

export default Spotify;
