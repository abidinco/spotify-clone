import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Navbar.module.css';
import NavbarNavigation from './NavbarNavigation';
import NavbarContent from './NavbarContent';
import NavbarLinks from './NavbarLinks';

const Navbar = (props) => {
    const navbarElement = useRef(null);

    const changeNavbarBackgroundOpacity = useCallback(() => {
        if (props.scrollFromTop >= 160) {
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

    return (
        <div className={styles.navbar} ref={navbarElement}>
            <NavbarNavigation />
            <NavbarContent />
            <NavbarLinks />
        </div>
    )
}

export default Navbar;