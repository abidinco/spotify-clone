import React from 'react';
import PlayCard from "../UI/PlayCard";
import HeroCard from "../UI/HeroCard";

import styles from './CollectionsPage.module.css';

const CollectionsPage = (props) => {
    return(
        <div className={styles.wrapper}>
            <div>{props.tab}</div>
            <div className={styles['cards-container']}>
                <HeroCard count={38} />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="laylaylom lay lay lom lay lay lom" subtitle="if you are here, good luck to you if you are here, good luck to you if you are here, good luck to you" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="laylaylom" subtitle="if you are here, good luck to you" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="laylaylom" subtitle="if you are here, good luck to you" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="laylaylom" subtitle="if you are here, good luck to you" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="laylaylom" subtitle="if you are here, good luck to you" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="laylaylom" subtitle="if you are here, good luck to you" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="laylaylom" subtitle="if you are here, good luck to you" />
                <PlayCard cover="/browse-card-images/new-releases.jfif" title="laylaylom" subtitle="if you are here, good luck to you" />
            </div>
        </div>
    )
}

export default CollectionsPage;