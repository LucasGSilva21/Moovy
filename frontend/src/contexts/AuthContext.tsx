import { createContext, useEffect, useState, ReactNode } from "react";
import Cookies from 'js-cookie';

interface AuthContextData {
    token: string;
    userId: string;
    login: (token: string, userId: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState(Cookies.get('token') ?? '');
    const [userId, setUserId] = useState(Cookies.get('userId') ?? '');

    useEffect(() => {
		Cookies.set('token', String(token));
        Cookies.set('userId', String(userId));
	}, [token, userId]);

    function login(token: string, userId: string) {
        setToken(token);
        setUserId(userId);
    }

    function logout() {
        setToken('');
        setUserId('');
    }

    return (
        <AuthContext.Provider value={{
            token,
            userId,
            login,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}
