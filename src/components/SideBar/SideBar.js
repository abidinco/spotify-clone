import styles from './SideBar.module.css';
import Icon from '../UI/Icon';

const SideBar = () => {
    return (
        <div className={styles['side-bar']}>
            <div>
                <div className={styles.logo}>
                    <Icon name="logo-white" color="#FFFFFF" width={130} height={40} />
                </div>
                <div className={styles["navigation-links"]}>
                    <div>
                        <Icon name="sidebar-home-active" color="#FFF" width={24} height={24} />
                        <span>Home</span>
                    </div>
                    <div>
                        <Icon name="sidebar-search" color="#FFF" width={24} height={24} />
                        <span>Search</span>
                    </div>
                    <div className="popover-wrapper">
                        <Icon name="sidebar-library" color="#FFF" width={24} height={24} />
                        <div className="popover-title">
                            <span>Your Library</span>
                        </div>
                        <div className="popover-content">
                            <div className="popover-content-title">Enjoy Your Library</div>
                            <div className="popover-content-text">Log in to see saved songs, podcasts, artists, and playlists in Your Library.</div>
                            <div className="popover-content-actions">
                                <div>Not now</div>
                                <div>Log in</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["navigation-links"]}>
                    <div className="popover-wrapper">
                        <div className={styles["create-playlist-icon"]}>
                            <Icon name="sidebar-create-playlist" color="#000" width={12} height={12} />
                        </div>
                        <div className="popover-title">
                            <span>Create Playlist</span>
                        </div>
                        <div className="popover-content">
                            <div className="popover-content-title">Create a playlist</div>
                            <div className="popover-content-text">Log in to create and share playlists.</div>
                            <div className="popover-content-actions">
                                <div>Not now</div>
                                <div>Log in</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles["liked-songs-icon"]}>
                            <Icon name="sidebar-liked-songs" color="#fff" width={12} height={12} />
                        </div>
                        <span>Liked Songs</span>
                    </div>
                </div>
            </div>
            <div className={styles["navigation-footer-links"]}>
                <span>Cookies</span>
                <span>Privacy</span>
            </div>
        </div>
    )
}

export default SideBar;