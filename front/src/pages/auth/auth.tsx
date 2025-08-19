import React, { useState } from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { sha256 } from "../../utils/hash";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<"user" | "admin">("user");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRoleChange = (
        event: React.MouseEvent<HTMLElement>,
        newRole: "user" | "admin" | null
    ) => {
        if (newRole !== null) setRole(newRole);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const clientHash = await sha256(password);

        try {
            const res = await fetch(
                `http://localhost:3000/auth/${isLogin ? "login" : "register"}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        password: clientHash,
                        name: isLogin ? undefined : name,
                        role: isLogin ? undefined : role,
                    }),
                }
            );

            if (!res.ok) throw new Error("Request failed");

            const data = await res.json();

            if (isLogin) {
                localStorage.setItem("token", data.access_token);
                alert("✅ Logged in successfully!");
            } else {
                alert("✅ Registered successfully! Please login.");
                setIsLogin(true);
            }
        } catch (err) {
            setError("❌ Something went wrong, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    {isLogin ? "Login" : "Register"}
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {!isLogin && (
                        <>
                            <TextField
                                fullWidth
                                label="Name"
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" gutterBottom>
                                    Select Role:
                                </Typography>
                                <ToggleButtonGroup
                                    value={role}
                                    exclusive
                                    onChange={handleRoleChange}
                                    aria-label="role selection"
                                >
                                    <ToggleButton value="user">User</ToggleButton>
                                    <ToggleButton value="admin">Admin</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                        </>
                    )}

                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2, py: 1.5 }}
                    >
                        {loading ? "Loading..." : isLogin ? "Login" : "Register"}
                    </Button>
                </Box>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{ mt: 2, cursor: "pointer" }}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Don't have an account? Register"
                        : "Already have an account? Login"}
                </Typography>
            </Paper>
        </Container>
    );
}