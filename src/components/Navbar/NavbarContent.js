import React from 'react';
import { useLocation } from 'react-router-dom';

import LibraryTabs from './LibraryTabs';
import SearchBox from './SearchBox';

const NavbarContent = () => {

    const isSearchPage = useLocation().pathname === '/search';
    const isLibraryPage = useLocation().pathname.startsWith('/collection/');

    return(
        <div>
            { isSearchPage && <SearchBox /> }
            { isLibraryPage && <LibraryTabs /> }
        </div>
    )
}

export default NavbarContent;