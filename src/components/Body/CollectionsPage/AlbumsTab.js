import React, { useEffect, useState, useCallback } from "react";
import PlayCard from "../../UI/PlayCard";

import Spotify from "../../../spotify/api";

const AlbumsTab = () => {
  const [albums, setAlbums] = useState();
  const getCurrentUserSavedAlbums = useCallback(async () => {
    let listOfAlbums = await Spotify.getCurrentUserSavedAlbums();
    setAlbums(listOfAlbums);
  }, []);
  useEffect(() => {
    getCurrentUserSavedAlbums();
  }, [getCurrentUserSavedAlbums]);

  return (
    <React.Fragment>
      {albums
        ? albums.items.map((album, i) => (
            <PlayCard
              key={i}
              className="not-allowed"
              href=""
              cover={
                album.album.images[0]
                  ? album.album.images[0].url
                  : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2"
              }
              title={album.album.name}
              subtitle={album.album.artists[0].name}
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default AlbumsTab;
