import React, { useCallback, useContext, useState, useEffect } from 'react';
import styles from './SearchBox.module.css';
import Icon from '../UI/Icon';
import AppContext from '../../store';

function debounce(fn, time) {
  let timeoutId
  return wrapper
  function wrapper(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
}

const SearchBox = () => {
  const appCtx = useContext(AppContext);
  const [search, setSearch] = useState('');

  const api = val => {
    appCtx.handleSearch(val);
  }

  const func = useCallback(debounce(string => api(string), 1000), []);

  useEffect(() => {
    func(search)
  }, [search]);

  const changeHandler = e => {
    if(e.target.value.trim() === '') api(e.target.value);
    setSearch(e.target.value);
  }

  const resetHandler = () => {
    appCtx.resetSearch();
    setSearch('');
  }

  return (
    <div className={styles.box}>
      <span>
        <Icon name="navbar-search" color="#000" width={24} height={24} />
      </span>
      <input className={styles.input}
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        placeholder='What do you want to listen to?'
        value={search}
        onChange={changeHandler}
      />
      <div onClick={resetHandler}>
        {(search.trim() === '') ? null : <Icon name="navbar-search-clear" color="#000" width={24} height={24} />}
      </div>
    </div>
  )
}

export default SearchBox;