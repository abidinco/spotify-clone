import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavbarNavigation from "./NavbarNavigation";
import NavbarContent from "./NavbarContent";
import NavbarLinks from "./NavbarLinks";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navbarElement = useRef(null);

  const location = useLocation().pathname;
  const isLikedSongsPage = location === "/collection/tracks";
  const isPlaylistPage = location.startsWith("/playlist");

  let navbarBackgroundColor = isLikedSongsPage
    ? "80, 56, 160" // purple for liked songs page
    : isPlaylistPage
    ? "200, 48, 64" // any other playlist page's navbar background color
    : "7, 7, 7"; // other pages' navbarBackgroundColor is blackish

  useEffect(() => {
    navbarElement.current.style.setProperty(
      "--background",
      navbarBackgroundColor
    );
  });

  return (
    <div className={styles.navbar} ref={navbarElement} id="navbar-root">
      <NavbarNavigation />
      <NavbarContent />
      <NavbarLinks />
    </div>
  );
};

export default Navbar;
