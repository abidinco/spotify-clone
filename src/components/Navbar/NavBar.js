import React, { useEffect, useRef, useCallback } from 'react'; 
import styles from './NavBar.module.css';
import NavBarButtons from './NavBarButtons';
import NavBarLinks from './NavBarLinks';
import SearchBox from './SearchBox';

const NavBar = (props) => {

    const navBarElement = useRef(null);
    
    const changeNavbarBackgroundOpacity = useCallback(() => {
        if(props.scrollFromTop >= 160) {
            navBarElement.current.style.backgroundColor = 'rgba(7, 7, 7, 1)';
        } else if (props.scrollFromTop >= 100) {
            navBarElement.current.style.backgroundColor = 'rgba(7, 7, 7, 0.75)';
        } else {
            navBarElement.current.style.backgroundColor = 'rgba(7, 7, 7, 0.5)';
        }
    }, [props.scrollFromTop])

    useEffect(() => {
        changeNavbarBackgroundOpacity();
    }, [changeNavbarBackgroundOpacity]);

    return(
        <div className={styles.navbar} ref={navBarElement}>
            <div className={styles['navbar-left-area']}>
                <NavBarButtons />
                <SearchBox />
            </div>
            <NavBarLinks />
        </div>
    )
}

export default NavBar;