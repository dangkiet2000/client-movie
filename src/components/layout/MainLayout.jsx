import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";

/*
 * main component: The component used for the root node. Either a string to use a HTML element or a component.
 * flexGrow: Chia component theo tỉ lệ (Tổng số grow của 1 element có display là flex)
 * Ví dụ về flexGrow: Nếu mà cái element có 2 Box, 1 Box ko có flexGrow, 1 Box flexGrow là 1 => Nào có flexGrow là 1 lấy độ rộng còn lạ<i className=""></i>
 * Outlet nên đc sử dụng trong parent route elements to render their child route elements
 */

/*
 ? Why do we use Outlet???
    * Trong phần main component đang sẽ render nhiều cái routes khác nhau tùy người dùng.
 */

const MainLayout = () => {
    return (
        <>
            {/* loading global*/}
            <GlobalLoading />
            {/* loading global*/}

            {/*login modal */}
            {/*login modal */}

            <Box display="flex">
                {/*header */}
                {/*header */}

                {/*main */}
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh"
                >
                    <Outlet />
                </Box>
                {/*main */}
            </Box>

            {/* Footer */}
            {/* Footer */}
        </>
    );
};

export default MainLayout;
