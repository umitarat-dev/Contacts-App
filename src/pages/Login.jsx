import { Button, TextField, Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toastify";
import GoogleIcon from '@mui/icons-material/Google';


const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toastError("Email and password required");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      toastSuccess("Login successful");
      navigate("/app");
    } catch (err) {
      console.error(err);
      toastError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Goodle account login sonrası /app redirect;
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      toastSuccess("Google login successful");
      navigate("/app");
    } catch (error) {
      console.error(error);
      toastError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // Document Title - Sayfa/Sekme Başlığı
  useEffect(() => {
  document.title = "FireContact | Login";
  }, []);


  return (
    
    <Stack 
      width={300} 
      mx="auto" 
      mt={5} 
      spacing={2}
      sx={{
        bgcolor: "background.paper",
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" mb={2}>
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          disabled={loading}
        >
          {loading ? "Loading in..." : "Login"}  
        </Button>
      </form>
      
      <Button
        variant="outlined"
        startIcon={<GoogleIcon />}
        // onClick={loginWithGoogle}
        onClick={handleGoogleLogin}
        fullWidth
        disabled={loading}
      >
        Sign in with Google
      </Button>

      </Stack>
  );
};

export default Login;
