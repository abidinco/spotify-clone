import React, { useState } from 'react';
import styles from './Body.module.css'
import NavBar from '../Navbar/NavBar';

const Body = () => {
    const [scrollFromTop, setScrollFromTop] = useState(0);
    const handleScroll = e => {
        setScrollFromTop(e.currentTarget.scrollTop);
    };

    return (
        <div className={styles.body} onScroll={handleScroll}>
            <NavBar scrollFromTop={scrollFromTop} />
            <div className={styles.main}>
                <div>Body</div>
            </div>
        </div>
    )
}

export default Body;