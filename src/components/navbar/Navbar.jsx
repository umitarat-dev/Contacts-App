import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await logout();
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LOGO */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          UmitDev-FireContact
        </Typography>

        {/* DESKTOP */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {/* Dark-Light Theme */}
          <ThemeToggle />
          {!currentUser ? (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          ) : (
            <>
              <Avatar
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                sx={{ mr: 1 }}
              />
              <Typography sx={{ mr: 2 }}>
                {currentUser.displayName || currentUser.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>

        {/* MOBILE */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            keepMounted
          >
            {!currentUser ? (
              <>
                <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                <MenuItem onClick={() => navigate("/register")}>
                  Register
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem disabled>
                  <Avatar
                    src={currentUser.photoURL}
                    sx={{ mr: 1, width: 28, height: 28 }}
                  />
                  {currentUser.displayName || currentUser.email}
                </MenuItem>
                <Divider />
                <MenuItem 
                  onClick={handleLogout} 
                  sx={{ 
                    justifyContent: "center", 
                    alignItems: "center", 
                  }}
                >Logout
                </MenuItem>
              </>
            )}
            <Box sx={{ textAlign:"center", mt:1 }}>
              {/* Dark-Light Theme */}
              <ThemeToggle />
            </Box>
          </Menu>

        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
