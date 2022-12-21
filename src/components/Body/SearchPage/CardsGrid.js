import React from 'react';
import styles from './CardsGrid.module.css';
import BrowseCard from "../../UI/BrowseCard";
import { useParams } from 'react-router-dom';
import PlayCard from '../../UI/PlayCard';
import GENRES from './Genres';

const Genres = (props) => {
    const { searchType } = useParams();
    const isCoverRounded = (searchType === 'artists') || (searchType === 'users');
    const dontShowPlayButton = (searchType === 'podcastAndEpisodes' || searchType === 'users');
    // TODO: getBackground func renders every scroll :d
    const getBackground = (max) => {
        return `rgb(${Math.floor(Math.random()*max)},${Math.floor(Math.random()*max)},${Math.floor(Math.random()*max)})`;
    };
    return (
        <div className={props.genres ? styles['padding-genres'] : styles['padding-others']}>
            {props.genres && <div className={styles['text-browse']}>Browse all</div>}
            <div className={styles['cards-container']}>
                {props.genres &&
                    <React.Fragment>
                        { GENRES
                            ? GENRES.map((genre, i) => (
                                <BrowseCard key={i} name={genre.name} color={getBackground(255)} image={genre.image} />
                            ))
                            : null
                        }
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