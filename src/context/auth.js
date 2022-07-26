import { createContext, useContext, useState } from "react";
import { getLocalStorageItem } from "utils";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getLocalStorageItem('retro-tube-token'));
	const updateUser = (user) => setUser(user);
    return (
        <AuthContext.Provider value={{ user, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };