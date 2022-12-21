import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.configs";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes";
import PageWrapper from "./components/common/PageWrapper";

/*  
    ! Note: Là Muốn inside cái Route MainLayout có thể render các Routes khác thì phải có Outlet ở MainLayout Component
    * Tại sao cái Route có element là MainLayout inside nó lại render các route khác được => Vì trong component MainLayout ta có <Outlet />
    ? Cách mà Project này config các Routes. 
    TODO: Ở App component này chỉ cần làm route cho cái MainLayout thôi, và render các Routes child của MainLayout => Phải có Outlet ở MainLayout mới được

*/
function App() {
    const { themeMode } = useSelector((state) => state.themeMode);

    return (
        <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
            {/*config toastify*/}
            <ToastContainer
                position="bottom"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme={themeMode}
            />
            {/*config toastify*/}

            {/* Mui css reset */}

            {/* App routes */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {routes.map((route, index) =>
                            route.index ? (
                                <Route
                                    index
                                    key={index}
                                    element={
                                        route.state ? (
                                            <PageWrapper state={route.state}>
                                                {route.element}
                                            </PageWrapper>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            ) : (
                                <Route
                                    path={route.path}
                                    key={index}
                                    element={
                                        route.state ? (
                                            <PageWrapper state={route.state}>
                                                {route.element}
                                            </PageWrapper>
                                        ) : (
                                            route.element
                                        )
                                    }
                                />
                            )
                        )}
                    </Route>
                </Routes>
            </BrowserRouter>
            {/* App routes */}

            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
