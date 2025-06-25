import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            const storedAdmin = JSON.parse(localStorage.getItem('adminData'));
            if (storedAdmin) setAdmin(storedAdmin);
        }
    }, [token]);

    const login = (data) => {
        setToken(data.token);
        setAdmin(data.admin);
        localStorage.setItem('token', data.token); 
        localStorage.setItem('adminData', JSON.stringify(data.admin));
    };

    const logout = () => {
        setToken('');
        setAdmin(null);
        localStorage.removeItem('token');
        localStorage.removeItem('adminData');
    };

    return (
        <AuthContext.Provider value={{ admin, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
