import React, { useContext, useState, useEffect, useCallback } from "react";
import TopItem from "../UI/TopItem";
import PlayCard from "../UI/PlayCard";

import { Link } from 'react-router-dom';
import AppContext from '../../store';
import styles from './HomePage.module.css';
import Spotify from '../../spotify/api';

const HomePage = () => {
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
    const welcomingMessage = () => {
        let date = new Date();
        if (date.getHours() < 12) return "Good morning"
        if (date.getHours() < 17) return "Good afternoon"
        if (date.getHours() < 25) return "Good evening"
    }
    useEffect(() => {
        getCurrentUsersPlaylists();
        // getCurrentUserTopArtists();
        getCurrentUserTopTracks();
        getCurrentUserRecentlyPlayedTracks();
    }, [getCurrentUserRecentlyPlayedTracks, getCurrentUserTopTracks, getCurrentUsersPlaylists]);
    const appCtx = useContext(AppContext);
    return (
        <div className={styles.wrapper}>
            {appCtx.isLoggedIn &&
                <React.Fragment>
                    <div className={styles.message}>{welcomingMessage()}</div>
                    <div className={styles['top-items']}>
                        <TopItem href="/collection/tracks" image="/playlist-cover-liked-songs.png" name="Liked Songs" />
                        { playlists
                            ? playlists.items.map((playlist) => (
                                <TopItem
                                    key={playlist.id}
                                    href={`/playlist/${playlist.id}`}
                                    image={playlist.images[0] ? playlist.images[0].url : 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2'}
                                    name={playlist.name} />
                            ))
                            : null
                        }
                    </div>
                    <div className={styles.title}>Recently played tracks</div>
                    <div className={styles['cards-container']}>
                        { recentlyPlayedTracks
                            ? recentlyPlayedTracks.items.map((item, i) => (
                                <PlayCard
                                    key={i}
                                    cover={item.track.album.images[0].url}
                                    title={item.track.name}
                                    subtitle={item.track.artists.map((artist) => artist.name + " ")} />
                            ))
                            : null
                        }
                    </div>
                    <div className={styles.title}>Your top tracks</div>
                    <div className={styles['cards-container']}>
                        { topTracks
                            ? topTracks.items.map((item, i) => (
                                <PlayCard
                                    key={i}
                                    cover={item.album.images[0].url}
                                    title={item.name}
                                    subtitle={item.artists.map((artist) => artist.name + " ")} />
                            ))
                            : null
                        }
                    </div>
                    {/* I haven't top artists so it's not showing.
                    <div className={styles.title}>Your top artists</div>
                    <div className={styles['cards-container']}> 
                         { topTracks
                            ? topTracks.items.map((item, i) => (
                                <PlayCard
                                    key={}
                                    cover={}
                                    title={}
                                    subtitle={} />
                            ))
                            : null
                        } 
                    </div>
                    */}
                </React.Fragment>}
            {!appCtx.isLoggedIn &&
                <React.Fragment>
                    <div className={styles.title}>Your playlists</div>
                    <div className={styles['cards-container']}>
                        <PlayCard href="/playlist/1" cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya, Ebru Gündeş, Ahmet Kaya" />
                    </div>
                    <div className={styles.title}><div>Focus</div><Link to="#">SEE ALL</Link></div>
                    <div className={styles['cards-container']}>
                        <PlayCard href="/playlist/1" cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya, Ebru Gündeş, Ahmet Kaya" />
                    </div>
                    <div className={styles.title}>Sleep</div>
                    <div className={styles['cards-container']}>
                        <PlayCard href="/playlist/1" cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya, Ebru Gündeş, Ahmet Kaya" />
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default HomePage;