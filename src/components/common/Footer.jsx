import { Paper, Stack, Button, Box } from "@mui/material";
import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";
/*
 * Default thi Paper no co borderRadius, dung square = true => disable borderRadius
 * md: Nó chỉ apply khi mà màn hình lớn hơn 900px (Còn lại nếu ko set breakpoint thì nó sẽ là default)
 * sm: >600px mới apply
 * xs: 0
 * lg: > 1200 mới apply
 * xl: > 1536 mới apply
 */

const Footer = () => {
    return (
        <Container>
            <Paper
                square={true}
                sx={{
                    backgroundImage: "unset",
                    padding: "2rem",
                }}
            >
                <Stack
                    direction={{ md: "row", xs: "column" }}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ height: "max-content" }}
                >
                    <Logo />
                    <Box>
                        {menuConfigs.main.map((item, index) => (
                            <Button
                                key={index}
                                sx={{ color: "inherit" }}
                                component={Link}
                                to={item.path}
                            >
                                {item.display}
                            </Button>
                        ))}
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Footer;
