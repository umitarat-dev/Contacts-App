import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//MUI FONTS
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Toastify CSS
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
