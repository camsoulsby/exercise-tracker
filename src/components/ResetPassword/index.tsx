import React, { useState, useRef } from "react";
import { Button, TextField, Box, Stack, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-location";

interface ResetPasswordProps {}

export const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);

  const { resetPassword, currentUser } = useAuth();

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (emailRef.current) {
      try {
        setMessage("");
        setError("");
        setLoading(true);
        await resetPassword(emailRef.current.value);
        setMessage("Check your inbox for futher instructions");
      } catch {
        setError("Failed to rest password");
      }
      setLoading(false);
    }
  }

  return (
    <div>
      <Container>
        <Box sx={{ width: "80%", height: "90%" }}>
          <form onSubmit={handleResetPassword}>
            <h2>Reset Password</h2>
            <p>{`Current user: ${currentUser?.email}`}</p>
            <p>{`Message: ${message}`}</p>
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

              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Reset Password
              </Button>
            </Stack>
          </form>
        </Box>
        <Box>
          Need an account? <Link to="/signup">Sign Up</Link>
        </Box>
        <Box>
          Log in? <Link to="/login">Log In</Link>
        </Box>
      </Container>
    </div>
  );
};
