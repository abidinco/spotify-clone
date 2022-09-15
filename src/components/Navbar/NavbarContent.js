import React from 'react';
import { useLocation } from 'react-router-dom';

import SearchBox from './SearchBox';

const NavbarContent = () => {

    let isSearchPage = useLocation().pathname === '/search';

    return(
        <div>
            { isSearchPage && <SearchBox /> }
        </div>
    )
}

export default NavbarContent;