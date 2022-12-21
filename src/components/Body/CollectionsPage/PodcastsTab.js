import React, { useEffect, useCallback, useState } from "react";
import PlayCard from "../../UI/PlayCard";
import HeroCard from "../../UI/HeroCard";

import Spotify from "../../../spotify/api";

const PodcastsTab = () => {
  const [podcasts, setPodcasts] = useState();
  const getCurrentUsersPodcasts = useCallback(async () => {
    let listOfShows = await Spotify.getCurrentUserSavedShows();
    setPodcasts(listOfShows);
  }, []);
  useEffect(() => {
    getCurrentUsersPodcasts();
  }, [getCurrentUsersPodcasts]);

  return (
    <React.Fragment>
      <HeroCard
        className="not-allowed"
        to=""
        title="Your episodes"
        count={podcasts ? podcasts.total : "..."}
        countSuffix=" episodes"
      />
      {podcasts
        ? podcasts.items.map((podcast) => (
            <PlayCard
              key={podcast.show.id}
              href={null}
              className="not-allowed"
              cover={
                podcast.show.images[0]
                  ? podcast.show.images[0].url
                  : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2"
              }
              title={podcast.show.name}
              subtitle={
                podcast.show.description
                  ? podcast.show.description
                  : `By ${podcast.show.publisher}`
              }
            />
          ))
        : null}
    </React.Fragment>
  );
};

export default PodcastsTab;
