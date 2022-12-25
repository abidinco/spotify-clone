import React, { useState, useCallback, useEffect } from "react";
import PlayCard from "../../UI/PlayCard";

import Spotify from "../../../spotify/api";

const ArtistsTab = () => {
  const [artists, setArtists] = useState();
  const getCurrentUserFollowedArtists = useCallback(async () => {
    let listOfArtists = await Spotify.getCurrentUserFollowedArtists();
    setArtists(listOfArtists);
  }, []);
  useEffect(() => {
    getCurrentUserFollowedArtists();
  }, [getCurrentUserFollowedArtists]);

  return (
    <React.Fragment>
      {artists
        ? artists.artists.items.map((artist, i) => (
            <PlayCard
              className="not-allowed"
              key={i}
              href=""
              cover={artist.images[0] ? artist.images[0].url : "/blank.jpg"}
              rounded
              title={artist.name}
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default ArtistsTab;
