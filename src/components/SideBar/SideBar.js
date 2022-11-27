import styles from './SideBar.module.css';
import Icon from '../UI/Icon';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../store';

import SidebarLink from './SidebarLink';


const Sidebar = () => {
    const appCtx = useContext(AppContext);

    return (
        <div className={styles.sidebar}>
            <div className={styles.navigation}>
                <Link to="/" style={{ marginBottom: 20 }}>
                    <Icon name="logo-white" color="#FFFFFF" width={130} height={40} />
                </Link>
                <SidebarLink to="/" name="Home" icon="home" />
                <SidebarLink to="/search/" name="Search" icon="search" />
                <SidebarLink to="/collection/playlists" name="Your Library" icon="library" popoverContentTitle="Enjoy Your Library"
                    popoverContentText="Log in to see saved songs, podcasts, artists, and playlists in Your Library." />
                <div style={{ height: 24 }}></div>
                <SidebarLink to="#" name="Create Playlist" icon="create-playlist" popoverContentTitle="Create a playlist"
                    popoverContentText="Log in to create and share playlists." />
                <SidebarLink to="/collection/tracks" name="Liked Songs" icon="liked-songs" popoverContentTitle="Enjoy your Liked Songs"
                    popoverContentText="Log in to see all the songs you've liked in one easy playlist." />
            </div>
            {appCtx.isLoggedIn &&
                <div className={styles.playlists}>
                    <div></div>
                    <Link to="#">arkada çalması düşünülsün</Link>
                    <Link to="#">when u in 100's</Link>
                    <Link to="#">laylaylom</Link>
                    <Link to="#">pool</Link>
                    <Link to="#">çözüm süreci</Link>
                    <Link to="#">kumaş pantolonlu şarkılar</Link>
                    <Link to="#">geç saatte yenen hamur işi</Link>
                    <Link to="#">dış çekimden dönüyorum</Link>
                </div>
            }
            {!appCtx.isLoggedIn &&
                <div className={styles.footer}>
                    <span>Cookies</span>
                    <span>Privacy</span>
                </div>
            }
        </div>
    )
}

export default Sidebar;