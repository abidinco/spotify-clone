import React, { useContext, useState, useEffect, useCallback } from "react";
import TopItem from "../UI/TopItem";
import PlayCard from "../UI/PlayCard";

import { Link } from 'react-router-dom';
import AppContext from '../../store';
import styles from './HomePage.module.css';
import Spotify from '../../spotify/api';

const HomePage = () => {
    const [playlists, setPlaylists] = useState();
    const getCurrentUsersPlaylists = useCallback(async () => {
        const listOfPlaylist = await Spotify.getCurrentUsersPlaylists();
        setPlaylists(listOfPlaylist);
    }, []);
    const welcomingMessage = () => {
        let date = new Date();
        if (date.getHours() < 12) return "Good morning"
        if (date.getHours() < 17) return "Good afternoon"
        if (date.getHours() < 25) return "Good evening"
    }
    useEffect(() => {
        getCurrentUsersPlaylists();
    }, [getCurrentUsersPlaylists]);
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
                    <div className={styles.title}>Your playlists</div>
                    <div className={styles['cards-container']}>
                        <PlayCard href="/playlist/1" cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya, Ebru Gündeş, Ahmet Kaya" />
                    </div>
                    <div className={styles.title}>Episodes for you</div>
                    <div className={styles['cards-container']}>
                        <PlayCard href="/playlist/1" cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                    </div>
                    <div className={styles.title}>Recently played</div>
                    <div className={styles['cards-container']}>
                        <PlayCard href="/playlist/1" cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                    </div>
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