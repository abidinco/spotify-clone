import React, {
  // useContext,
  useRef,
} from "react";
// import AppContext from "../../store";
import Icon from "../UI/Icon";
import styles from "./SearchBox.module.css";
import { useDispatch } from "react-redux";
import { search, clearSearch } from "../../store/reducers/searchReducer";

function debounce(fn, time) {
  let timeoutId;
  return wrapper;
  function wrapper(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }
}

const SearchBox = () => {
  // const appCtx = useContext(AppContext);
  const dispatch = useDispatch();
  const inputRef = useRef("");

  const api = (val) => {
    dispatch(search(val));
    // appCtx.handleSearch(val);
  };

  const func = debounce((string) => api(string), 1000);

  const changeHandler = (e) => {
    if (e.target.value.trim() === "") {
      api(e.target.value);
    } else {
      func(e.target.value);
    }
  };

  const resetHandler = () => {
    dispatch(clearSearch());
    // appCtx.handleSearchClear();
    inputRef.current.value = "";
  };

  return (
    <div className={styles.box}>
      <span>
        <Icon name="navbar-search" color="#000" width={24} height={24} />
      </span>
      <input
        className={styles.input}
        ref={inputRef}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder="What do you want to listen to?"
        onChange={changeHandler}
      />
      <div onClick={resetHandler}>
        {inputRef.current.value !== "" && (
          <Icon
            name="navbar-search-clear"
            color="#000"
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBox;
