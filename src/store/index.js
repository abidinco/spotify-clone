import React, { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

const initialState = {
    isLoggedIn: false,
}

const AppContext = createContext(initialState);

export const AppContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoggedIn(true);
        setTimeout(() => {
            navigate('/');
        }, 100);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setTimeout(() => {
            navigate('/');
        }, 100);
    }

    return (
        <AppContext.Provider value={{ isLoggedIn: isLoggedIn, handleLogin: handleLogin, handleLogout: handleLogout }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;