import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
 } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

// Register - Kullanıcı Kayıt;
export const register = (email, password)  =>
    createUserWithEmailAndPassword(auth, email, password);

// Login - Kullanıcı Giriş;
export const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

// Login GoogleAccount - Kullanıcı Giriş Google;
//* => Authentication => sign-in-method => enable Google
//! Google ile girişi enable yap
//* => Authentication => sign-in-method => Authorized domains => add domain
//! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle (firebase->app->build->authentication->settings->authorized domain kısmında add domain..)
export const loginWithGoogle = () =>
    signInWithPopup(auth, googleProvider);

// Logout - Kullanıcı Çıkış;
export const logout = () => signOut(auth);