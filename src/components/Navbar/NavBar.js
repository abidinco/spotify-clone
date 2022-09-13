import React, { useEffect, useRef, useCallback } from 'react'; 
import { useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import NavbarNavigation from './NavbarNavigation';
import NavbarLinks from './NavbarLinks';
import SearchBox from './SearchBox';

const Navbar = (props) => {

    let isSearchPage = useLocation().pathname === '/search';

    const navbarElement = useRef(null);
    
    const changeNavbarBackgroundOpacity = useCallback(() => {
        if(props.scrollFromTop >= 160) {
            navbarElement.current.style.backgroundColor = 'rgba(7, 7, 7, 1)';
        } else if (props.scrollFromTop >= 100) {
            navbarElement.current.style.backgroundColor = 'rgba(7, 7, 7, 0.75)';
        } else {
            navbarElement.current.style.backgroundColor = 'rgba(7, 7, 7, 0.5)';
        }
    }, [props.scrollFromTop])

    useEffect(() => {
        changeNavbarBackgroundOpacity();
    }, [changeNavbarBackgroundOpacity]);

    return(
        <div className={styles.navbar} ref={navbarElement}>
            <div className={styles['navbar-left-area']}>
                <NavbarNavigation />
                { isSearchPage && <SearchBox /> }
            </div>
            <NavbarLinks />
        </div>
    )
}

export default Navbar;