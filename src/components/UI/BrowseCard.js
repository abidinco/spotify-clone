import React from 'react';
import styles from './BrowseCard.module.css';

const BrowseCard = (props) => {
    return(
        <div className={styles.wrapper} style={{ backgroundColor: props.color }}>
            <div>{props.name}</div>
            <img loading='lazy' src={`/browse-card-images/${props.image}`} alt={props.name} />
        </div>
    )
}

export default BrowseCard;