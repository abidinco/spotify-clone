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
)}&response_type=token&show_dialog=true`;

const Spotify = {
  getNow() {
    let now = new Date();
    return now.getTime();
  },
  // TODO: Too much repetitive functions going on here. Will be fixed.
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
  async getCurrentUser() {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(`https://api.spotify.com/v1/me/`, {
      headers: headers,
      method: "GET",
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getCurrentUsersPlaylists() {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
      headers: headers,
      method: "GET",
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getCurrentUserSavedTracks() {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(`https://api.spotify.com/v1/me/tracks`, {
      headers: headers,
      method: "GET",
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getCurrentUserSavedShows() {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(`https://api.spotify.com/v1/me/shows`, {
      headers: headers,
      method: "GET",
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getCurrentUserFollowedArtists() {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(
      `https://api.spotify.com/v1/me/following?type=artist`,
      {
        headers: headers,
        method: "GET",
      }
    );
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getCurrentUserSavedAlbums() {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(`https://api.spotify.com/v1/me/albums`, {
      headers: headers,
      method: "GET",
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getCurrentUserTopArtists() {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(`https://api.spotify.com/v1/me/top/artists`, {
      headers: headers,
      method: "GET",
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getCurrentUserTopTracks() {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(`https://api.spotify.com/v1/me/top/tracks`, {
      headers: headers,
      method: "GET",
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getCurrentUserRecentlyPlayedTracks() {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played`,
      {
        headers: headers,
        method: "GET",
      }
    );
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getPlaylist(playlist_id) {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}`,
      {
        headers: headers,
        method: "GET",
      }
    );
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getPlaylistItems(playlist_id) {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: headers,
        method: "GET",
      }
    );
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getArtist(artist_id) {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(
      `https://api.spotify.com/v1/artists/${artist_id}`,
      {
        headers: headers,
        method: "GET",
      }
    );
    let jsonResponse = await response.json();
    return jsonResponse;
  },
  async getArtistsTopTracks(artist_id) {
    let token = localStorage.getItem("accessToken");
    let headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    let response = await fetch(
      `https://api.spotify.com/v1/artists/${artist_id}/top-tracks?market=TR`,
      {
        headers: headers,
        method: "GET",
      }
    );
    let jsonResponse = await response.json();
    return jsonResponse;
  },
};

export default Spotify;
