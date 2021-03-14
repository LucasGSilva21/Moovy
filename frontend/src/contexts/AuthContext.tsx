import { createContext, useState, ReactNode } from "react";

interface AuthContextData {
    token: string;
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState('');
    const TOKEN_KEY = "@Token";

    function login(token: string) {
        setToken(token);
        localStorage.setItem(TOKEN_KEY, token);
    }

    function logout() {
        setToken('');
        localStorage.removeItem(TOKEN_KEY);
    }

    return (
        <AuthContext.Provider value={{
            token,
            login,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}
