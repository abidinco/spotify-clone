import React, { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarNavigation from './NavbarNavigation';
import NavbarContent from './NavbarContent';
import NavbarLinks from './NavbarLinks';
import styles from './Navbar.module.css';

const Navbar = (props) => {
    const location = useLocation().pathname;
    const navbarElement = useRef(null);
    // if page is playlist page (liked-songs-page or any other playlist-page) we'll change navbar background and navbar opacity breakpoints
    const isPlaylistPage = location.startsWith('/playlist') || (location === '/collection/tracks') || location.startsWith('/artist');
    // we'll define navbarBackgroundColor for decide which color we'll use navbar-background
    // when we decide which color to use, setting it with custom property (line 67)
    // let's decide which navbar-background-color we'll use
    let navbarBackgroundColor;
    if (location === '/collection/tracks') {
        // liked-songs-page's navbar background color is purple
        navbarBackgroundColor = '80, 56, 160'
    } else if (location.startsWith('/playlist')) {
        // any other playlist page's navbar background color
        // TODO: change background color with playlist-cover-image's dominant color
        navbarBackgroundColor = '200, 48, 64'
    } else {
        // other pages' navbar background color is blackish
        navbarBackgroundColor = '7, 7, 7'
    }

    const changeNavbarOpacity = useCallback(() => {
        // if page is playlist-page (liked-songs-page or any other playlist-page), navbar-background-opacity changes like this:
        // scrollPosition >= 250 opacity 1
        // scrollPosition >= 230 opacity .5
        // scrollPosition >= 200 opacity .25
        if (isPlaylistPage) {
            if (props.scrollFromTop >= 330) {
                // <NowPlaying /> component is for: shows play-button and playlist-name at navbar-content-area
                // it's visible when scrollPosition >= 330
                navbarElement.current.classList.add("display-now-playing");
                // .display-now-playing css styles written in "/index.css"
            } else if (props.scrollFromTop >= 250) {
                navbarElement.current.style.backgroundColor = 'rgba(var(--background), 1)';
                // <NowPlaying /> component is invisible when scroll <= 250
                navbarElement.current.classList.remove("display-now-playing");
            } else if (props.scrollFromTop >= 230) {
                navbarElement.current.style.backgroundColor = 'rgba(var(--background), .5)';
            } else if (props.scrollFromTop >= 200) {
                navbarElement.current.style.backgroundColor = 'rgba(var(--background), .25)';
            } else {
                navbarElement.current.style.backgroundColor = 'transparent';
                // fallback if <NowPlaying /> is not invisible, change to invisible
                navbarElement.current.classList.remove("display-now-playing");
            }
        } else {
            // if page isn't playlist-page, navbar-background-opacity changes like this:
            if (props.scrollFromTop >= 160) {
                navbarElement.current.style.backgroundColor = 'rgba(var(--background), 1)';
            } else if (props.scrollFromTop >= 100) {
                navbarElement.current.style.backgroundColor = 'rgba(var(--background), 0.75)';
            } else {
                navbarElement.current.style.backgroundColor = 'rgba(var(--background), 0)';
            }
        }
    }, [props.scrollFromTop])

    useEffect(() => {
        changeNavbarOpacity();
        // implementing background color with computed property
        navbarElement.current.style.setProperty('--background', navbarBackgroundColor);
    }, [changeNavbarOpacity]);

    return (
        <div className={styles.navbar} ref={navbarElement} id="navbar-root">
            <NavbarNavigation />
            <NavbarContent />
            <NavbarLinks />
        </div>
    )
}

export default Navbar;