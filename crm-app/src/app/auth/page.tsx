"use client";

import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Tab,
    Tabs,
    TextField,
    Typography,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import {supabase} from "@/app/lib/supabase";

export default function AuthPage() {
    const [tab, setTab] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<"user" | "admin" | "">("");
    const [message, setMessage] = useState("");

    const handleAuth = async () => {
        setMessage("");

        if (tab === "login") {
            // LOGIN
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setMessage(error.message);
            else setMessage("✅ Logged in successfully!");
        } else {
            // REGISTER
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                setMessage(error.message);
                return;
            }

            if (data.user) {
                const { error: profileError } = await supabase.from("profiles").insert([
                    {
                        id: data.user.id,
                        name,
                        role,
                    },
                ]);

                if (profileError) {
                    setMessage(profileError.message);
                    return;
                }

                setMessage("✅ Registered successfully! Check your email.");
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    {tab === "login" ? "Login" : "Register"}
                </Typography>

                <Tabs
                    value={tab}
                    onChange={(_, newValue) => setTab(newValue)}
                    variant="fullWidth"
                    sx={{ mb: 3 }}
                >
                    <Tab label="Login" value="login" />
                    <Tab label="Register" value="register" />
                </Tabs>

                <Box>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {tab === "register" && (
                        <>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                Select Role
                            </Typography>

                            <ToggleButtonGroup
                                value={role}
                                exclusive
                                onChange={(_, newRole) => setRole(newRole)}
                                fullWidth
                            >
                                <ToggleButton value="user" sx={{ flex: 1 }}>
                                    User
                                </ToggleButton>
                                <ToggleButton value="admin" sx={{ flex: 1 }}>
                                    Admin
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </>
                    )}

                    {message && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {message}
                        </Typography>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, borderRadius: 2, py: 1.2 }}
                        onClick={handleAuth}
                        disabled={tab === "register" && (!role || !name)}
                    >
                        {tab === "login" ? "Login" : "Register"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
