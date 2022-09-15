import React from 'react';
import { useLocation } from 'react-router-dom';

import LibraryTabs from './LibraryTabs';
import SearchBox from './SearchBox';
import NowPlaying from './NowPlaying';

const NavbarContent = () => {
    const location = useLocation().pathname;
    const isSearchPage = location === '/search';
    const isLibraryPage = location.startsWith('/collection/') && (location !== '/collection/tracks');
    const isPlayingPage = location.startsWith('/playlist') || location === '/collection/tracks';

    return(
        <div>
            { isSearchPage && <SearchBox /> }
            { isLibraryPage && <LibraryTabs /> }
            { isPlayingPage && <NowPlaying />}
        </div>
    )
}

export default NavbarContent;