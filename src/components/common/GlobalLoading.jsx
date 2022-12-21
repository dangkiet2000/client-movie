import { LinearProgress, Box, Paper, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from "./Logo";

/*
 * Show cái trạng thái loading trong khi data từ BE chưa trả về kịp. UX => Để người dùng biết là page đang loading.
 * Cho cái này có width và height full là vì: Nó đang show full luôn.
 * Nó zIndex = 999, là khi mà isLoading === true thì cái globalLoading này nó thành lớp phủ lên all màn hình luôn.
 * À we using transition cho đến khi nó loading xong thì cái globalLoading đc tắt 1 cách smooth hơn.
 * transform(translate(-50%, -50%)) + top,left: 50% => Making a element nằm chính giữa 1 element, nhớ là cái parent nó phải có width, height là 100vh,vw và phải là position relative or fixed
 */

const GlobalLoading = () => {
    const { globalLoading } = useSelector((state) => state.globalLoading);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (globalLoading === true) {
            setIsLoading(true);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [globalLoading]);
    return (
        <Paper
            sx={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                opacity: isLoading ? 1 : 0,
                transition: "all .6s ease",
            }}
        >
            <Toolbar />
            <LinearProgress />
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <Logo />
            </Box>
        </Paper>
    );
};
export default GlobalLoading;
