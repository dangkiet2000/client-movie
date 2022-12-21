import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
    dark: "dark",
    light: "light",
};

const darkCustomPalette = {
    primary: {
        main: "#ff0000",
        contrastText: "#ffffff",
    },
    secondary: {
        main: "#f44336",
        contrastText: "#ffffff",
    },
    background: {
        default: "#000000",
        paper: "#131313",
    },
};

const lightCustomPalette = {
    primary: {
        main: "#ff0000",
    },
    secondary: {
        main: "#f44336",
    },
    background: {
        default: colors.grey["100"],
    },
};

const themeConfigs = {
    custom: ({ mode }) => {
        const customPalette =
            mode === themeModes.dark ? darkCustomPalette : lightCustomPalette;

        return createTheme({
            palette: {
                mode,
                ...customPalette,
            },
            components: {
                MuiButton: {
                    defaultProps: { disableElevation: true },
                },
            },
        });
    },
};

export default themeConfigs;
