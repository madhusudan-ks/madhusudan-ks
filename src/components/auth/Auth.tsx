import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Collapse,
    IconButton,
    Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";

import styles from "./auth.module.scss";
import { socialProviders } from "./socialProviders";

const Auth: React.FC = () => {
    const [open, setOpen] = useState(true);

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.content}>
                <Typography className={styles.title}>Welcome</Typography>

                <Typography className={styles.subtitle}>
                    Welcome! Please enter your details.
                </Typography>

                <Paper elevation={0} className={styles.socialCard}>
                    <Box
                        className={styles.header}
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <Typography className={styles.headerTitle}>
                            Sign up with your social account
                        </Typography>

                        <IconButton size="small">
                            <Icon
                                icon={
                                    open
                                        ? "mdi:chevron-up"
                                        : "mdi:chevron-down"
                                }
                                width={22}
                            />
                        </IconButton>
                    </Box>

                    <Collapse in={open}>
                        {socialProviders.map((provider, index) => (
                            <React.Fragment key={provider.id}>
                                <Box
                                    className={styles.socialItem}
                                    onClick={() => handleSocialLogin(provider.id)}
                                >
                                    <Box className={styles.iconWrapper}>
                                        <Icon icon={provider.icon} width={28} />
                                    </Box>

                                    <Typography className={styles.socialText}>
                                        {provider.label}
                                    </Typography>
                                </Box>

                                {index !== socialProviders.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </Collapse>
                </Paper>
            </Box>
        </Box>
    );
};

export default Auth;