import styles from './SideBar.module.css';
import Icon from '../UI/Icon';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../store';
import SideBarLink from './SideBarLink';

const Sidebar = () => {
    const appCtx = useContext(AppContext);

    return (
        <div className={styles.sidebar}>
            <div className={styles.navigation}>
                <Link to="/" style={{ marginBottom: 20 }}>
                    <Icon name="logo-white" color="#FFFFFF" width={130} height={40} />
                </Link>
                <SideBarLink to="/" name="Home" icon="home" />
                <SideBarLink to="/search/" name="Search" icon="search" />
                <SideBarLink to="/collection/playlists" name="Your Library" icon="library" popoverContentTitle="Enjoy Your Library"
                    popoverContentText="Log in to see saved songs, podcasts, artists, and playlists in Your Library." />
                <div style={{ height: 24 }}></div>
                <SideBarLink to="#" name="Create Playlist" icon="create-playlist" popoverContentTitle="Create a playlist"
                    popoverContentText="Log in to create and share playlists." />
                <SideBarLink to="/collection/tracks" name="Liked Songs" icon="liked-songs" popoverContentTitle="Enjoy your Liked Songs"
                    popoverContentText="Log in to see all the songs you've liked in one easy playlist." />
            </div>
            {appCtx.isLoggedIn &&
                <div className={styles.playlists}>
                    <div></div>
                    <Link to="/playlist/1">arkada çalması düşünülsün</Link>
                    <Link to="/playlist/1">when u in 100's</Link>
                    <Link to="/playlist/1">laylaylom</Link>
                    <Link to="/playlist/1">pool</Link>
                    <Link to="/playlist/1">çözüm süreci</Link>
                    <Link to="/playlist/1">kumaş pantolonlu şarkılar</Link>
                    <Link to="/playlist/1">geç saatte yenen hamur işi</Link>
                    <Link to="/playlist/1">dış çekimden dönüyorum</Link>
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
