import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    // if (!currentUser) {
    //     // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir
    //     return <Navigate to="/login" replace />;
    // }

    // Kullanıcı giriş yapmışsa, korumalı içeriği render et
    return currentUser ? children : <Navigate to="/login"/>;
};

export { ProtectedRoute };