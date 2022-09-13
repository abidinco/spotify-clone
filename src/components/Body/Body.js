import React, { useState } from 'react';
import styles from './Body.module.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import LikedSongsPage from './LikedSongsPage';
import PlaylistsPage from './PlaylistsPage';

const Body = () => {
    const [scrollFromTop, setScrollFromTop] = useState(0);
    const handleScroll = e => {
        setScrollFromTop(e.currentTarget.scrollTop);
    };

    return (
        <div className={styles.body} onScroll={handleScroll}>
            <Navbar scrollFromTop={scrollFromTop} />
            <Routes className={styles.main}>
                <Route path="/*" element={ <HomePage /> } />
                <Route path="/search" element={ <SearchPage /> } />
                <Route path="/collection/tracks" element={ <LikedSongsPage /> } />
                <Route path="/collection/playlists" element={ <PlaylistsPage /> } />
            </Routes>
        </div>
    )
}

export default Body;