import React from "react";
import styles from './PlaylistPage.module.css';
import Icon from '../UI/Icon';

const PlaylistPage = () => {
    return (
        <div>
            <div className={styles.header} style={{ backgroundColor: 'rgb(80, 56, 160)' }}>
                <div className={styles['header-image']}>
                    <img src="/playlist-cover-liked-songs.png" alt="Playlist Cover" />
                </div>
                <div className={styles['header-info']}>
                    <div className={styles['header-info-type']}>Playlist</div>
                    <div className={styles['header-info-name']}>Liked Songs | Playlist Name</div>
                    <div className={styles['header-info-bottom']}><img src="/pp.jfif" width={24} height={24} alt="Pp" /> <span>Abidin A.</span> • 2 songs, <span>15 min 28 sec</span></div>
                </div>
            </div>
            <div className={styles.actions}>
                <div className={styles.icon}>
                    <Icon name="player-play" width={24} height={24} color="#000" />
                </div>
            </div>
            <div className={styles.table}>
                <div className={styles['table-header']}># Title Album Date Added Duration</div>
                <div className={styles.playlist}>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                    <div>Song</div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistPage;