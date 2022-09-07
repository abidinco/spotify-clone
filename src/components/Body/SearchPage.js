import React from "react";
import styles from './SearchPage.module.css';
import BrowseCard from '../UI/BrowseCard';

const SearchPage = () => {
    return(
        <div className={styles.wrapper}>
            <div>Browse all</div>
            <div className={styles['cards-container']}>
                <BrowseCard />
            </div>
        </div>
    )
}

export default SearchPage;