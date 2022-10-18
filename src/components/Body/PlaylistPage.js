import React, { useRef, useEffect, useCallback } from "react";
import styles from './PlaylistPage.module.css';
import Icon from '../UI/Icon';
import { useLocation } from 'react-router-dom';

const PlaylistPage = (props) => {
    const { pathname } = useLocation();
    const isPlaylistPage = pathname.startsWith('/playlist') || pathname === '/collection/tracks';

    const tableHeaderElement = useRef(null);

    const pinHeader = useCallback(() => {
        if (isPlaylistPage && props.scrollFromTop >= 380) {
            tableHeaderElement.current.classList.add('pinned-table-header');
        } else if (isPlaylistPage) {
            isPlaylistPage && tableHeaderElement.current.classList.remove('pinned-table-header');
        }
    }, [props.scrollFromTop]);

    useEffect(() => {
        pinHeader();
    }, [pinHeader]);

    return (
        <div>
            <div className={styles.header} style={{ backgroundColor: 'rgb(80, 56, 160)' }}>
                <div className={isPlaylistPage ? styles['header-image'] : styles['header-image-artist']}>
                    <img src="/playlist-cover-liked-songs.png" alt="Playlist Cover" />
                </div>
                <div className={styles['header-info']}>
                    {isPlaylistPage && <div className={styles['header-info-type']}>Playlist</div>}
                    <div className={styles['header-info-name']}>Liked Songs</div>
                    <div className={styles['header-info-bottom']}>
                        {isPlaylistPage && <React.Fragment><img src="/pp.jfif" width={24} height={24} alt="Pp" /> <span>Abidin A.</span> • 2 songs, <span>15 min 28 sec</span></React.Fragment>}
                        {!isPlaylistPage && <span>56,492 monthly listeners</span>}
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                <div className={styles.icon}>
                    <Icon name="player-play" width={24} height={24} color="#000" />
                </div>
            </div>
            <div style={{ height: 10000 }}></div>
            {isPlaylistPage &&
                <div className={styles.table}>
                    <div className={styles['table-header']} ref={tableHeaderElement}>
                        <span style={{ fontSize: 16, fontWeight: 300 }}>#</span>
                        <span>Title</span>
                        <span>Album</span>
                        <span>Date Added</span>
                        <span><Icon name="duration" height={16} width={16} color="#b3b3b3" /></span>
                    </div>
                    <div className={styles.playlist}>
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