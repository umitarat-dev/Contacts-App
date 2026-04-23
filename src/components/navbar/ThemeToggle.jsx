
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {useThemeMode} from "../../theme/ThemeContext";

const ThemeToggle = () => {

    const { mode, toggleTheme } = useThemeMode();
    
    return (
        <Tooltip title="Toggle theme">
            <IconButton color="inherit" onClick={toggleTheme}>
                {mode === "dark" ? <LightModeIcon/> :<DarkModeIcon/>}
            </IconButton>
        </Tooltip>

    );
};

export default ThemeToggle;