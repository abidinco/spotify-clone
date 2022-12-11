import SECRET from './secret';

const CLIENT_ID = SECRET.clientId;
const REDIRECT_URI = "http://localhost:3000/callback";
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
    "user-read-email"
];

export const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

const Spotify = {
    getAccessToken() {
        if(localStorage.getItem('accessToken')) {
            spotifyAccessToken = localStorage.getItem('accessToken');
            return spotifyAccessToken;
        }
        const accessToken = window.location.hash.match(/access_token=([^&]*)/);
        const expiresIn = window.location.hash.match(/expires_in=([^&]*)/);
        if (accessToken && expiresIn) {
            spotifyAccessToken = accessToken[1];
            localStorage.setItem("accessToken", spotifyAccessToken);
            let expiryTime = Number(expiresIn[1]);
            window.setTimeout(() => (spotifyAccessToken = ""), expiryTime * 1000);
            window.history.pushState("Access Token", " ", "/");
            return spotifyAccessToken;
        } else {
            window.location.assign(LOGIN_URL);
            return "";
        }
    }
}

export default Spotify;