import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../../store";

import SearchNavigation from "./SearchNavigation";
import CardsGrid from "./CardsGrid";
import TracksList from "./TracksList";
import SearchAll from "./SearchAll";

const SearchPage = () => {
  const appCtx = useContext(AppContext);
  const { searchType } = useParams();
  return (
    <React.Fragment>
      {appCtx.isSearching && (
        <div className="padding-0-32">
          <SearchNavigation />
          {searchType === undefined && <SearchAll />}
          {searchType === "tracks" && <TracksList />}
          {searchType !== "tracks" && searchType !== undefined && <CardsGrid />}
        </div>
      )}
      {!appCtx.isSearching && <CardsGrid genres />}
    </React.Fragment>
  );
};

export default SearchPage;
