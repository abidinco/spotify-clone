import React from 'react';
import styles from './SearchBox.module.css';
import Icon from '../UI/Icon';

const SearchBox = () => {
  return (
    <div className={styles.box}>
        <span>
            <Icon name="navbar-search" color="#000" width={24} height={24} />
        </span>
        <input className={styles.input} autoCorrect='off' autoCapitalize='off' spellCheck='false' placeholder='What do you want to listen to?' />
        <span>
            <Icon name="navbar-search-clear" color="#000" width={24} height={24} />
        </span>
    </div>
  )
}

export default SearchBox;