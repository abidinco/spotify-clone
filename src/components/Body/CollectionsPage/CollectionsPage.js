import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./CollectionsPage.module.css";

import PlaylistsTab from "./PlaylistsTab";
import PodcastsTab from "./PodcastsTab";
import ArtistsTab from "./ArtistsTab";
import AlbumsTab from "./AlbumsTab";

const CollectionsPage = ({ tab }) => {
  const { pathname } = useLocation();
  const isPlaylistsTab = pathname === "/collection/playlists";
  const isPodcastsTab = pathname === "/collection/podcasts";
  const isArtistsTab = pathname === "/collection/artists";
  const isAlbumsTab = pathname === "/collection/albums";

  return (
    <div className={styles.wrapper}>
      <div>{tab}</div>
      <div className={styles["cards-container"]}>
        {isPlaylistsTab && <PlaylistsTab />}
        {isPodcastsTab && <PodcastsTab />}
        {isArtistsTab && <ArtistsTab />}
        {isAlbumsTab && <AlbumsTab />}
      </div>
    </div>
  );
};

export default CollectionsPage;
