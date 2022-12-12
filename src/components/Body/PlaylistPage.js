import React, { useRef, useEffect, useState } from "react";
import styles from './PlaylistPage.module.css';
import Icon from '../UI/Icon';
import { useLocation } from 'react-router-dom';
import Spotify from "../../spotify/api";

const PlaylistPage = () => {
    const { pathname } = useLocation();
    const isArtistPage = pathname.startsWith('/artist');
    const isPlaylistPage = pathname.startsWith('/playlist');
    const isLikedSongsPage = pathname === '/collection/tracks';
    const tableHeaderElement = useRef(null);

    const [artist, setArtist] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [likedSongs, setLikedSongs] = useState(null);

    let getPlaylist = () => {};
    let getArtist = () => {};
    let getLikedSongs = () => {};

    if(isPlaylistPage) {
        getPlaylist = async () => {
            let arr = pathname.split("/");
            const playlist = await Spotify.getPlaylist(arr[arr.length-1]);
            setPlaylist(playlist);
        }
    } else if(isArtistPage) {
        getArtist = async () => {
            let arr = pathname.split("/");
            const artist = await Spotify.getArtist(arr[arr.length-1]);
            setArtist(artist);
        }
    } else if (isLikedSongsPage) {
        getLikedSongs = async () => {
            let arr = pathname.split("/");
            const likedSongs = await Spotify.getLikedSongs(arr[arr.length-1])
            setLikedSongs(likedSongs);
        }
    }

    useEffect(() => {
        const pinHeader = () => {
            let pageY = Math.abs(document.querySelector('#navbar-root').nextElementSibling.getBoundingClientRect().top - 64);
            if (isArtistPage && pageY >= 380) {
                isArtistPage && tableHeaderElement.current.classList.remove('pinned-table-header');
            } else if (!isArtistPage) {
                tableHeaderElement.current.classList.add('pinned-table-header');
            }
        }
        pinHeader();
    }, [isArtistPage]);

    useEffect(() => {
        if(isPlaylistPage) {
            getPlaylist();
        } else if(isArtistPage) {
            getArtist();
        } else if (isLikedSongsPage) {
            getLikedSongs();
        }
    }, [isArtistPage, isLikedSongsPage, isPlaylistPage]);

    return (
        <div>
            <div className={styles.header} style={{ backgroundColor: 'rgb(80, 56, 160)' }}>
                <div className={isArtistPage ? styles['header-image-artist'] : styles['header-image']}>
                    <img src="/playlist-cover-liked-songs.png" alt="Playlist Cover" />
                </div>
                <div className={styles['header-info']}>
                    {!isArtistPage && <div className={styles['header-info-type']}>Playlist</div>}
                    <div className={styles['header-info-name']}>
                        { isLikedSongsPage && 'Liked Songs' }
                        { isArtistPage && 'artist' }
                        
                    </div>
                    <div className={styles['header-info-bottom']}>
                        {!isArtistPage && <React.Fragment><img src="/pp.jfif" width={24} height={24} alt="Pp" /> <span>Abidin A.</span> • 2 songs, <span>15 min 28 sec</span></React.Fragment>}
                        {isArtistPage && <span>56,492 monthly listeners</span>}
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                <div className={styles.icon}>
                    <Icon name="player-play" width={24} height={24} color="#000" />
                </div>
            </div>
            {!isArtistPage &&
                <div className={styles.table}>
                    <div className={styles['table-header']} ref={tableHeaderElement}>
                        <span style={{ fontSize: 16, fontWeight: 300 }}>#</span>
                        <span>Title</span>
                        <span>Album</span>
                        <span>Date Added</span>
                        <span><Icon name="duration" height={16} width={16} color="#b3b3b3" /></span>
                    </div>
                    <div className={styles.playlist} style={{ height: 1000}}>
                        <div className={styles.item}>
                            <div className={styles.index}>
                                <div className={styles['index-number']}>1</div>
                                <div className={styles['index-icon']}>
                                    <Icon name="player-play" width={16} height={16} color="#fff" />
                                </div>
                            </div>
                            <div className={styles.meta}>
                                <img src="/browse-card-images/decades.jfif" alt="Song" />
                                <div>
                                    <div className={styles['song-name']}>Gnossienne No.1</div>
                                    <div>Erkan Oğur</div>
                                </div>
                            </div>
                            <div>Dönmez Yol</div>
                            <div className={styles.date}>Dec 5, 2021</div>
                            <div className={styles.duration}>
                                <span>4:39</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PlaylistPage;