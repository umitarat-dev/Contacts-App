import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    
    return (
        <AppBar position="static">
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    // onClick={() => navigate("/")}
                    onClick={() => navigate(currentUser ? "/app" : "/")}
                >
                    UmitDev-FireContact App
                </Typography>
                <Box>
                    {!currentUser ? (
                        <>
                        <Button 
                            color="inherit"
                            onClick={() => navigate('/login')}
                        >Login
                        </Button>
                        <Button 
                            color="inherit"
                            onClick={() => navigate('/register')}
                        >Register
                        </Button>
                        </>
                    ) : (
                        <>
                            <Typography 
                                component='span'
                                sx={{ mr:2 }}>
                                Welcome, {currentUser.email}
                            </Typography>
                            <Button 
                                color="inherit" 
                                onClick={async () => {
                                    await logout();
                                    navigate('/login');
                                }}
                            >Logout
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;