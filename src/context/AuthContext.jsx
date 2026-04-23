/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import {
  register as registerUser,
  login as loginUser,
  logout as logoutUser,
  loginWithGoogle,
} from "../utils/auth.js";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const[currentUser, setCurrentUser] = useState(null);
    const[authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setAuthLoading(false);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount - 🔥 memory leak yok

    }, []);

    const value = {
        currentUser,
        authLoading,
        register: registerUser,
        login: loginUser,
        loginWithGoogle,
        logout: logoutUser,
    };

    // 🔐 Auth durumu netleşmeden app render edilmez
    if (authLoading) {
      return (
        <div style={{ textAlign: "center", marginTop: "30vh" }}>
          Loading authentication...
        </div>
      );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context; 
};


