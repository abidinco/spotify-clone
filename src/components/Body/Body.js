import React, { useState } from 'react';
import styles from './Body.module.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import PlaylistPage from './PlaylistPage';
import PlaylistsPage from './PlaylistsPage';
import PodcastsPage from './PodcastsPage';
import ArtistsPage from './ArtistsPage';
import AlbumsPage from './AlbumsPage';

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
                <Route path="/collection/tracks" element={ <PlaylistPage /> } />
                <Route path="/collection/playlists" element={ <PlaylistsPage /> } />
                <Route path="/collection/podcasts" element={ <PodcastsPage /> } />
                <Route path="/collection/artists" element={ <ArtistsPage /> } />
                <Route path="/collection/albums" element={ <AlbumsPage /> } />
            </Routes>
        </div>
    )
}

export default Body;