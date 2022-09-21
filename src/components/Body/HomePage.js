import React, { useContext } from "react";
import TopItem from "../UI/TopItem";
import PlayCard from "../UI/PlayCard";

import { Link } from 'react-router-dom';
import AppContext from '../../store';
import styles from './HomePage.module.css';

const HomePage = () => {
    const appCtx = useContext(AppContext);
    return (
        <div className={styles.wrapper}>
            {appCtx.isLoggedIn &&
                <React.Fragment>
                    <div className={styles.message}>Good evening</div>
                    <div className={styles['top-items']}>
                        <TopItem image="/playlist-cover-liked-songs.png" name="Liked Songs" />
                        <TopItem image="/discover-weekly.jfif" name="Discover Weekly" />
                        <TopItem image="/playlist-cover-liked-songs.png" name="arkada çalması düşünülsün" />
                        <TopItem image="/discover-weekly.jfif" name="All Out 2010s" />
                    </div>
                    <div className={styles.title}>Your playlists</div>
                    <div className={styles['cards-container']}>
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya, Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                    </div>
                    <div className={styles.title}>Episodes for you</div>
                    <div className={styles['cards-container']}>
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                    </div>
                    <div className={styles.title}>Recently played</div>
                    <div className={styles['cards-container']}>
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                    </div>
                </React.Fragment>}
            {!appCtx.isLoggedIn &&
                <React.Fragment>
                    <div className={styles.title}>Your playlists</div>
                    <div className={styles['cards-container']}>
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya, Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                    </div>
                    <div className={styles.title}><div>Focus</div><Link to="#">SEE ALL</Link></div>
                    <div className={styles['cards-container']}>
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya, Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                    </div>
                    <div className={styles.title}>Sleep</div>
                    <div className={styles['cards-container']}>
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya, Ebru Gündeş, Ahmet Kaya" />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default HomePage;