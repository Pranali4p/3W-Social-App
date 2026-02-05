import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert, Link, CircularProgress } from "@mui/material";
import { Email, Lock, Login as LoginIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          width={400}
          p={4}
          boxShadow={5}
          borderRadius={3}
          sx={{
            bgcolor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Typography variant="h4" mb={2} textAlign="center" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LoginIcon sx={{ mr: 1 }} /> Login to 3W Social
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: "white" }} />,
              }}
              sx={{
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#ff6b6b" },
                  "&.Mui-focused fieldset": { borderColor: "#ff6b6b" },
                },
                input: { color: "white" },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1, color: "white" }} />,
              }}
              sx={{
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#ff6b6b" },
                  "&.Mui-focused fieldset": { borderColor: "#ff6b6b" },
                },
                input: { color: "white" },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                bgcolor: "#ff6b6b",
                "&:hover": { bgcolor: "#ff5252" },
                fontWeight: "bold",
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </form>

          <Box textAlign="center" mt={2}>
            <Link href="#" color="inherit" sx={{ display: "block", mb: 1 }}>
              Forgot Password?
            </Link>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/register" color="#ff6b6b" sx={{ fontWeight: "bold" }}>
                Register here
              </Link>
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

export default Login;