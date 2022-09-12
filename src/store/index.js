import React, { createContext, useState } from "react";

const initialState = {
    isLoggedIn: false,
}

const AppContext = createContext(initialState);

export const AppContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
    }

    return(
        <AppContext.Provider value={{ isLoggedIn: isLoggedIn, handleLogin: handleLogin, handleLogout: handleLogout }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;