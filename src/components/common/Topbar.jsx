import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Stack,
    Toolbar,
    useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

/* 
  ? useScrollTrigger hooks của MUI là gi??
    * https://mui.com/material-ui/react-app-bar/#usescrolltrigger-options-trigger
    * useScrollTrigger({disableHysteresis, target, threshold})
    * Nhận vào 1 object (Kiểu như dựa vào đó để check xem mình scroll bao nhiêu thì true, bao nhiều thì false) => Chắc dựa vào window.scrollX
    * Nó trả về 1 giá trị boolean (Khi scroll thì nó trả về true, ko scroll thì nó trả về false)
*/

/*
  ? cloneElement là gì? Tại sao phải dùng nó, hay là dùng nó khi cần làm gì?
    * https://beta.reactjs.org/apis/react/cloneElement
    * cloneElement lets you create a new React element using another element as a starting point.
    * cloneElement(children,{}): Nó sẽ nhận vào 1 cái children và clone nó lại, và sửa một số thuộc tính mặc định của element đó
*/

/*
  ? ScrollAppBar này để làm gì???
    * Làm sao khi chưa scroll thì màu Appbar trùng với màu nền, khi sroll 1 xí thì màu App mới thay đổi => UX rất đẹp 
*/

const ScrollAppBar = ({ children, window }) => {
    const { themeMode } = useSelector((state) => state.themeMode);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50, // * Mặc định thì nó là 100, scroll xuống lớn hơn giá trị này thì trigger === true
        target: window ? window() : undefined, // * Default là window
    });
    /**
     * * Dùng cloneElement vì: ở đây cần truyền cái sx xuống thằng children, mà thằng sx có color,backgroundColor lại còn phụ thuộc vào thằng trigger
     * * Nên dùng cloneElement này easy
     * * Ta muốn thêm thuộc tính sx cho AppBar, nhưng mà sx đc set color ntn thì còn tùy vào trigger => Cách cloneElement này là cách nhanh và hiệu quả nhất.
     */
    return cloneElement(children, {
        sx: {
            color: trigger
                ? "text.primary"
                : themeMode === themeModes.dark
                ? "primary.contrastText"
                : "text.primary",
            backgroundColor: trigger
                ? "background.paper"
                : themeMode === themeModes.dark
                ? "transparent"
                : "background.paper",
        },
    });
};
const Topbar = () => {
    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);
    const { themeMode } = useSelector((state) => state.themeMode);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();

    const onSwithTheme = () => {
        dispatch(
            setThemeMode(
                themeMode === themeModes.dark
                    ? themeModes.light
                    : themeModes.dark
            )
        );
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            <ScrollAppBar>
                <AppBar elevation={0} sx={{ zIndex: 9999 }}>
                    <Toolbar
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton
                                color="inherit"
                                sx={{
                                    mr: 2,
                                    display: { md: "none", sx: "block" },
                                }}
                                onClick={toggleSidebar}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box
                                sx={{
                                    display: { xs: "inline-block", md: "none" },
                                }}
                            >
                                <Logo />
                            </Box>
                        </Stack>
                        {/* main menu */}
                        <Box
                            flexGrow={1}
                            alignItems="center"
                            display={{ xs: "none", md: "flex" }}
                        >
                            <Box sx={{ marginRight: "30px" }}>
                                <Logo />
                            </Box>
                            {menuConfigs.main.map((item, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                        color: `${
                                            appState.includes(item.state)
                                                ? "primary.contrastText"
                                                : "inherit"
                                        }`,
                                        mr: 2,
                                    }}
                                    component={Link}
                                    to={item.path}
                                    variant={`${
                                        appState.includes(item.state)
                                            ? "contained"
                                            : "text"
                                    }`}
                                >
                                    {item.display}
                                </Button>
                            ))}
                            <IconButton
                                sx={{ color: "inherit" }}
                                onClick={onSwithTheme}
                            >
                                {themeMode === themeModes.dark && (
                                    <DarkModeOutlinedIcon />
                                )}
                                {themeMode === themeModes.light && (
                                    <WbSunnyOutlinedIcon />
                                )}
                            </IconButton>
                        </Box>
                        {/* main menu */}
                        {/* user menu */}
                        <Stack spacing={3} direction="row" alignItems="center">
                            {!user && (
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        dispatch(setAuthModalOpen(true))
                                    }
                                >
                                    sign in
                                </Button>
                            )}
                        </Stack>
                        {user && <UserMenu />}
                        {/* user menu */}
                    </Toolbar>
                </AppBar>
            </ScrollAppBar>
        </>
    );
};

export default Topbar;
