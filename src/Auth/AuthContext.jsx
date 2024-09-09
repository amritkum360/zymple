import React, { useState, useEffect, useContext } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [hasToken, setHasToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setHasToken(token);
    }, []);

    const setToken = (token) => {
        localStorage.setItem('token', token);
        setHasToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setHasToken(null);
    };

    const value = {
        hasToken,
        setToken,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
