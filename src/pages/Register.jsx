import { Button, TextField, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toastify";


const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toastError("Email and password required");
      return;
    }

    try {
      setLoading(true);
      await register(email, password);
      toastSuccess("Registered successful");
      navigate('/app'); // 🔥 REGISTER sonrası yönlendirme
    } catch (err) {
      console.error(err);
      toastError("Registered failed");
      // alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Document Title - Sayfa/Sekme Başlığı
  useEffect(() => {
  document.title = "FireContact | Register";
  }, []);



  return (
    <Box 
      width={300} 
      mx="auto" 
      mt={5}
      sx={{
        bgcolor: "background.paper",
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
      }}

    >
      <Typography variant="h5" mb={2}>
        Register
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
          fullWidth disabled={loading} 
          sx={{ mt: 2 }}
        >
          {loading ? "Loading..." : "Register"}
        </Button>
      </form>
    </Box>
  );
};

export default Register;
