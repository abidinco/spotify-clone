import SECRET from './secret';

let spotifyAccessToken = "";
const clientId = SECRET.clientId;
const redirectUri = SECRET.redirectUri;

const Spotify = {
    getAccessToken() {
        const scopes = "ugc-image-upload user-read-playback-state streaming user-read-email playlist-read-collaborative user-modify-playback-state user-read-private playlist-modify-public user-library-modify user-top-read user-read-currently-playing playlist-read-private user-follow-read app-remote-control user-read-recently-played playlist-modify-private user-follow-modify user-library-read";
        if (spotifyAccessToken) {
            return spotifyAccessToken;
        }
        const accessToken = window.location.href.match(/access_token=([^&]*)/);
        const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (accessToken && expiresIn) {
            spotifyAccesToken = accessToken[1];
            localStorage.setItem("accessToken", spotifyAccesToken);
            let expiryTime = Number(expiresIn[1]);
            window.setTimeout(() => (spotifyAccesToken = ""), expiryTime * 1000);
            window.history.pushState("Access Token", " ", "/");
            return spotifyAccesToken;
        } else {
            const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}&response_type=token`;
            window.location.assign(url);
            return "";
        }
    }
}

export default Spotify;