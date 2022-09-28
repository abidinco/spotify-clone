import React from 'react';
import styles from './CardsGrid.module.css';
import BrowseCard from "../../UI/BrowseCard";
import { useParams } from 'react-router-dom';
import PlayCard from '../../UI/PlayCard';

const Genres = (props) => {
    const { searchType } = useParams();
    const isCoverRounded = (searchType === 'artists') || (searchType === 'users');
    const dontShowPlayButton = (searchType === 'podcastAndEpisodes' || searchType === 'users');
    return (
        <div className={props.genres ? styles['padding-genres'] : styles['padding-others']}>
            {props.genres && <div className={styles['text-browse']}>Browse all</div>}
            <div className={styles['cards-container']}>
                {props.genres &&
                    <React.Fragment>
                        <BrowseCard name="Podcasts" color="rgb(39, 133, 106)" image={'podcasts.jfif'} />
                        <BrowseCard name="Made For You" color="rgb(30, 50, 100)" image={'pop-mix.png'} />
                        <BrowseCard name="Charts" color="rgb(141, 103, 171)" image={'charts.jpg'} />
                        <BrowseCard name="New Releases" color="rgb(232, 17, 91)" image={'new-releases.jfif'} />
                    </React.Fragment>
                }
                {!props.genres &&
                    <React.Fragment>
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" rounded={isCoverRounded} dontShowPlayButton={dontShowPlayButton} />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" rounded={isCoverRounded} dontShowPlayButton={dontShowPlayButton} />
                        <PlayCard cover="/browse-card-images/new-releases.jfif" title="Daily Mix 1" subtitle="Ebru Gündeş, Ahmet Kaya" rounded={isCoverRounded} dontShowPlayButton={dontShowPlayButton} />
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default Genres;