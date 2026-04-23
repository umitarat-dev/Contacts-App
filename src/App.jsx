import './App.css'
import Contacts from './components/contacts/Contacts.jsx';
import FormComponent from './components/form/FormComponent.jsx';
import { useState, useEffect } from 'react';

import firebase from "./utils/firebase.js";
import { getDatabase, ref, onValue } from "firebase/database";

import { ToastContainer } from "react-toastify";

import { useAuth } from './context/AuthContext.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx'; 

import Landing from './pages/Landing'

import { Breadcrumbs, Typography, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { ThemeContextProvider } from './theme/ThemeContext.jsx';


function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit/Update;
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);

  const { currentUser } = useAuth();

  // Read - Veri Okuma;
  useEffect(() => {
    if (!currentUser) return; // Kullanıcı yoksa veri okumayı atla

    const db = getDatabase(firebase);
    // const userRef = ref(db, "users/"); // Tüm kullanıcılar için veri okuma
    const userRef = ref(db, `users/${currentUser.uid}`); // Kullanıcı bazlı veri okuma

    const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
            const usersArray = Object.entries(data).map(([id, value]) => ({
              id, 
              ...value,
            }));
            setUsers(usersArray);
        } else {
            setUsers([]);
        }

        setLoading(false);
        
        // Document Title - Sayfa/Sekme Başlığı
        document.title = "FireContact | Contacts";

    });

    return () => unsubscribe(); // 🔥 MEMORY LEAK ÖNLENDİ
  }, [currentUser]);

  // Edit/Update;
  const handleEdit = (user) => {
    setEditId(user.id);
    setEditData(user);
    console.log(user);
  };


  return (
    <ThemeContextProvider>
    <BrowserRouter>
      <ToastContainer />
      <Navbar />

      <Routes>
        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>

              <>

                {/* 🎯 BREADCRUMB */}
                <Box 
                  sx={{
                    width: "100%",
                    // borderBottom: "1px solid #e0e0e0",
                    // backgroundColor: "#fafafa",
                  }}
                >
                  <Box 
                    sx={{
                      maxWidth: 1000,
                      mx: "auto",
                      px: 2,
                      py: 1,
                      display: "flex",
                      justifyContent: "center",   // 👈 YATAY MERKEZ
                    }}
                  >
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                    >
                      <Typography color="text.secondary">
                        Home
                      </Typography>

                      <Typography color="text.primary">
                        {editId ? "Edit Contact" : "Contacts"}
                      </Typography>
                    </Breadcrumbs>
                  </Box>
                </Box>
                
                {/* 📦 PAGE CONTENT */}
                <div className="layout">
                <FormComponent
                  editId={editId}
                  editData={editData}
                  users={users}
                  clearEdit={() => {
                    setEditId(null);
                    setEditData(null);
                  }}
                />
                <Contacts
                  users={users}
                  loading={loading}
                  onEdit={handleEdit}
                  editId={editId}
                />
                </div>
              </>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
    </ThemeContextProvider>
  )
}

export default App;
