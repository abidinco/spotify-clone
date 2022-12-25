import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavbarNavigation from "./NavbarNavigation";
import NavbarContent from "./NavbarContent";
import NavbarLinks from "./NavbarLinks";
import styles from "./Navbar.module.css";

const Navbar = () => {
  // our navbar element is pretty neat (check line: 112)
  // but... spotify has 2 different navbar opacity breakpoints based on pages

  // GROUP 1: home, search, library(/collection/playlists|podcasts|artists|albums) pages
  // if scrollPos <= 100 navbar-background 7,7,7,0 (transparent)
  // if scrollPos 100 to 160 navbar-background 7,7,7,.5
  // if scrollPos >= 160 navbar-background 7,7,7,1

  // GROUP 2: artist, playlist, liked-songs(/collection/tracks) pages
  // if scrollPos < 200 opacity 0
  // if scrollPos 200 to 230 opacity .25
  // if scrollPos 230 to 250 opacity .5
  // if scrollPos > 250 opacity 1
  // ... and also if scrollPos >= 330 display-now-playing button at the navbar

  // up to this line, i explained opacity breakpoints
  // spotify also has different navbar-background-colors based on pages:
  // if it's liked-songs-page, navbar-background is purple 80,56,160
  // if it's playlist-page, navbar-background is playlist-cover-image's dominant color (temporarily using '200, 48, 64'. TODO)
  // any other page's navbar-background is 7,7,7
  // let's decide which color to use and assign it to navbarBackgroundColor-variable
  let navbarBackgroundColor;

  // i'll use navbarBackgroundColor end of the logic, in the useEffect hook
  // end of the logic i'll use it like: navbar...setProperty('--background', navbarBackgroundColor)
  // when setting opacity breakpoints i'll just set it like:
  // if scrollPos > 100 navbar...backgroundColor = 'rgba(var(--background), .25)';

  // let's dive in! define selectors and helpers
  const navbarElement = useRef(null);

  const location = useLocation().pathname;
  const isArtistPage = location.startsWith("/artist");
  const isLikedSongsPage = location === "/collection/tracks";
  const isPlaylistPage = location.startsWith("/playlist");

  // considering which color to use for navbarBackgroundColor (explained at line 26 to 28)
  if (isLikedSongsPage) {
    navbarBackgroundColor = "80, 56, 160"; // purple for liked songs page
  } else if (isPlaylistPage) {
    // any other playlist page's navbar background color. temporarily using '200, 48, 64'
    // TODO: change background color with playlist-cover-image's dominant color
    navbarBackgroundColor = "200, 48, 64";
  } else {
    // other pages' navbarBackgroundColor is blackish
    navbarBackgroundColor = "7, 7, 7";
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeNavbarOpacity = () => {
    // <Body /> structure like this in Body.js:
    // <div>
    //      <Navbar />
    //      <Route for ... HomePage, SearchPage, CollectionPage and so on.. />
    // </div>
    // so if i select Navbar's next sibling's distance from top, i get what i want

    // i'll get scroll position by getBoundingClientRect API
    // for more info: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    let pageY = Math.abs(
      document
        .querySelector("#navbar-root")
        .nextElementSibling.getBoundingClientRect().top - 64
    );
    // ..nextElementSibling.getBoundingClientRect().top gives me minus value for distance from top
    // so, i am converting this value to positive by Math.abs()
    // also because of our navigation height is 64, scroll-pos value returning scroll-pos+64, so i use -64 (in line 68)

    // implement opacity breakpoints as i explained earlier (at line 17 to 22)
    if (isPlaylistPage || isArtistPage || isLikedSongsPage) {
      if (pageY >= 330) {
        // i have <NowPlaying /> module in <NavbarContent /> file
        // <NowPlaying /> component is for: shows play-button and playlist-name at navbar-content-area
        // if scrollPos >= 330 we'll set opacity to 1, otherwise opacity to 0
        // ... and setting opacity in '/index.css' at line 144 to 155
        navbarElement.current.classList.add("display-now-playing");
      } else if (pageY >= 250) {
        navbarElement.current.style.backgroundColor =
          "rgba(var(--background), 1)"; // opacity 1
        // <NowPlaying /> component is invisible if scrollPos <= 250
        navbarElement.current.classList.remove("display-now-playing");
      } else if (pageY >= 230) {
        // opacity .5
        navbarElement.current.style.backgroundColor =
          "rgba(var(--background), .5)";
      } else if (pageY >= 200) {
        // opacity .25
        navbarElement.current.style.backgroundColor =
          "rgba(var(--background), .25)";
      } else {
        navbarElement.current.style.backgroundColor =
          "rgba(var(--background), 0)"; // opacity 0
        // fallback for <NowPlaying />'s visibility
        navbarElement.current.classList.remove("display-now-playing");
      }
    } else {
      // implement breakpoints other page's, as i explained at line 12 to 15
      if (pageY >= 160) {
        navbarElement.current.style.backgroundColor =
          "rgba(var(--background), 1)";
      } else if (pageY >= 100) {
        navbarElement.current.style.backgroundColor =
          "rgba(var(--background), 0.5)";
      } else {
        navbarElement.current.style.backgroundColor =
          "rgba(var(--background), 0)";
      }
    }
  };

  useEffect(() => {
    changeNavbarOpacity();
    // computed navbar-background-color at line 44 to 54
    navbarElement.current.style.setProperty(
      "--background",
      navbarBackgroundColor
    );
  }, [changeNavbarOpacity, navbarBackgroundColor]);

  return (
    <div className={styles.navbar} ref={navbarElement} id="navbar-root">
      <NavbarNavigation />
      <NavbarContent />
      <NavbarLinks />
    </div>
  );
};

export default Navbar;
