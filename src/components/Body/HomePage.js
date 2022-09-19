import React from "react";
import TopItem from "../UI/TopItem";
import PlayCard from "../UI/PlayCard";

import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.wrapper}>
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
        </div>
    )
}

export default HomePage;