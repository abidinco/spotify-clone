import styles from './SideBar.module.css';
import Icon from '../UI/Icon';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../../store';


const SideBar = () => {

    const location = useLocation().pathname;

    const appCtx = useContext(AppContext);

    const resetFocus = () => {
        document.getElementById('to-lose-focus-to-sidebar-popover').focus();
    }

    return (
        <div className={styles['side-bar']}>
            <div>
                <div className={styles.logo}>
                    <Icon name="logo-white" color="#FFFFFF" width={130} height={40} />
                </div>
                <div className={styles["navigation-links"]}>
                    <div>
                        <Link to="/">
                            <Icon name={`sidebar-home${location === '/' ? '-active' : ''}`} color="#FFF" width={24} height={24} />
                            <span>Home</span>
                        </Link>
                    </div>
                    <div>
                        <Link to="/search">
                            <Icon name={`sidebar-search${location === '/search' ? '-active' : ''}`} color="#FFF" width={24} height={24} />
                            <span>Search</span>
                        </Link>
                    </div>
                    <div className={`${appCtx.isLoggedIn ? null : 'popover-wrapper'}`} tabIndex={0}>
                        <Icon name={`sidebar-library${location === '/collection/playlists' ? '-active' : ''}`} color="#FFF" width={ appCtx.isLoggedIn ? 28 : 24 } height={ appCtx.isLoggedIn ? 28 : 24 } />
                        {
                            appCtx.isLoggedIn ?
                            <Link to="/collection/playlists" className="popover-title">
                                <span>Your Library</span>
                            </Link> :
                            <div className="popover-title">
                                <span>Your Library</span>
                            </div>
                        }
                        <div className="popover-content">
                            <div className="popover-content-title">Enjoy Your Library</div>
                            <div className="popover-content-text">Log in to see saved songs, podcasts, artists, and playlists in Your Library.</div>
                            <div className="popover-content-actions">
                                <div onClick={resetFocus}>Not now</div>
                                <div onClick={appCtx.handleLogin}>Log in</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["navigation-links"]}>
                    <div className={`${appCtx.isLoggedIn ? null : 'popover-wrapper'}`} tabIndex={0}>
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
                                <div onClick={resetFocus}>Not now</div>
                                <div onClick={appCtx.handleLogin}>Log in</div>
                            </div>
                        </div>
                    </div>
                    <div className={`${appCtx.isLoggedIn ? null : 'popover-wrapper'}`} tabIndex={0}>
                        <div className={styles["liked-songs-icon"]}>
                            <Icon name="sidebar-liked-songs" color="#fff" width={24} height={12} />
                        </div>
                        {
                            appCtx.isLoggedIn ?
                            <Link to="/collection/tracks" className="popover-title">
                                <span>Liked Songs</span>
                            </Link> :
                            <div className="popover-title">
                                <span>Liked Songs</span>
                            </div>
                        }
                        <div className="popover-content">
                            <div className="popover-content-title">Enjoy your Liked Songs</div>
                            <div className="popover-content-text">Log in to see all the songs you've liked in one easy playlist.</div>
                            <div className="popover-content-actions">
                                <div onClick={resetFocus}>Not now</div>
                                <div onClick={appCtx.handleLogin}>Log in</div>
                            </div>
                        </div>
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