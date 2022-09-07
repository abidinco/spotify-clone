import React, { useState } from 'react';
import styles from './Body.module.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from '../Navbar/NavBar';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import LikedSongsPage from './LikedSongsPage';

const Body = () => {
    const [scrollFromTop, setScrollFromTop] = useState(0);
    const handleScroll = e => {
        setScrollFromTop(e.currentTarget.scrollTop);
    };

    return (
        <div className={styles.body} onScroll={handleScroll}>
            <NavBar scrollFromTop={scrollFromTop} />
            <Routes className={styles.main}>
                <Route path="/*" element={ <HomePage /> } />
                <Route path="/search" element={ <SearchPage /> } />
                <Route path="/collection/tracks" element={ <LikedSongsPage /> } />
            </Routes>
        </div>
    )
}

export default Body;