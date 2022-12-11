import React, { useState } from 'react';
import styles from './Body.module.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import HomePage from './HomePage';
import SearchPage from './SearchPage/SearchPage';
import PlaylistPage from './PlaylistPage';
import CollectionsPage from './CollectionsPage';
import CallbackPage from '../CallbackPage';
import NotFoundPage from '../NotFoundPage';

const Body = () => {
    const [scrollFromTop, setScrollFromTop] = useState(0);
    const handleScroll = e => {
        setScrollFromTop(e.currentTarget.scrollTop);
    };

    return (
        <div className={styles.body} onScroll={handleScroll}>
            <Navbar />
            <Routes className={styles.main}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />}>
                    <Route path=":searchTerm" element={<SearchPage />} />
                    <Route path=":searchTerm/:searchType" element={<SearchPage />} />
                </Route>
                <Route path="/collection/tracks" element={<PlaylistPage />} />
                <Route path="/collection/playlists" element={<CollectionsPage tab="playlists" />} />
                <Route path="/collection/podcasts" element={<CollectionsPage tab="podcasts" />} />
                <Route path="/collection/artists" element={<CollectionsPage tab="artists" />} />
                <Route path="/collection/albums" element={<CollectionsPage tab="albums" />} />

                <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
                <Route path="/artist/:artistId" element={<PlaylistPage />} />
                <Route path="/callback" element={< CallbackPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}

export default Body;