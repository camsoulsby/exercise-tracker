import React, { useState, useRef } from "react";
import { Button, TextField, Box, Stack, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-location";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const { login, currentUser } = useAuth();

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (emailRef.current && passwordRef.current) {
      try {
        setError("");
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        navigate({ to: "../" });
      } catch {
        setError("Failed to sign in");
      }
      setLoading(false);
    }
  }

  return (
    <div>
      <Container>
        <Box sx={{ width: "80%", height: "90%" }}>
          <form onSubmit={handleSignUp}>
            <h2>Log In</h2>
            <p>{`Current user: ${currentUser?.email}`}</p>

            <Stack>
              {error ? <p>{error}</p> : null}
              <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                margin="normal"
                inputRef={emailRef}
                required
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                margin="normal"
                inputRef={passwordRef}
                required
              />

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Log In
              </Button>
            </Stack>
          </form>
        </Box>
        <Box>
          Need an account? <Link to="/signup">Sign Up</Link>
        </Box>
        <Box>
          Forgot password? <Link to="/reset-password">Reset Password</Link>
        </Box>
      </Container>
    </div>
  );
};
