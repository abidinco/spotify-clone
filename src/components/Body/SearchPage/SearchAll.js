import React from "react";
import styles from './SearchAll.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Icon from "../../UI/Icon";
import PlayCard from "../../UI/PlayCard";

const SearchAll = () => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <div className={styles.grid}>
                <div className={styles['top-result']}>
                    <div>Top result</div>
                    <Link to="/" className={styles.card}>
                        <img src="/discover-weekly.jfif" alt="Top Result" />
                        <div>Top result name</div>
                        <div className={styles.row}>
                            <div onClick={() => navigate('')} className={styles['meta-link']}>Bottom meta</div>
                            <div className={styles.chip}>Song</div>
                        </div>
                        <div className={styles['button-wrapper']}>
                            <Icon name="player-play" color="black" width={18} height={18} />
                        </div>
                    </Link>
                </div>
                <div className={styles.songs}>
                    <div>Songs</div>
                    <div className={styles.item}>
                        <div className={styles.meta}>
                            <div className={styles.icon}><Icon name="player-play" color="white" width={16} height={16} /></div>
                            <img src="/discover-weekly.jfif" alt="Top Result" />
                            <div className={styles['meta-infos']}>
                                <div>Aşk</div>
                                <Link to="" className={styles.artist}>Tolga Çebi</Link>
                            </div>
                        </div>
                        <div>2:11</div>
                    </div>
                </div>
            </div>
            <div className={styles.header}>Albums</div>
            <div className={styles.tiles}>
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" />
            </div>
        </React.Fragment>
    )
}

export default SearchAll;