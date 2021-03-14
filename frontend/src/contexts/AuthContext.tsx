import { createContext, useEffect, useState, ReactNode } from "react";

interface AuthContextData {
    token: string;
    userId: string;
    login: (token: string, userId: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');

    const TOKEN_KEY = "@Token";
    const USER_ID = "@UserId";

    useEffect(() => {
		const localToken = localStorage.getItem(TOKEN_KEY);
        const localUserId = localStorage.getItem(USER_ID);

        localToken && setToken(localToken);
        localUserId && setUserId(localUserId);
	}, []);

    function login(token: string, userId: string) {
        setToken(token);
        setUserId(userId);
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_ID, userId);
    }

    function logout() {
        setToken('');
        setUserId('');
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_ID);
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
