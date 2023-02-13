import React, { useState, useRef, useEffect } from "react";
import { Button, TextField, Box, Stack, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-location";
import { createUser } from "../../firestore";
import { NorthWest } from "@mui/icons-material";

interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("123456");
  const [passwordConfirm, setPasswordConfirm] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const { signup, currentUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const createUserWithCurrentUser = async () => {
      if (currentUser) {
        try {
          await createUser(currentUser.uid, currentUser.email);
        } catch (error) {
          console.log({ error });
        }
      }
    };

    createUserWithCurrentUser();
  }, [currentUser]);

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    if (emailRef.current && passwordRef.current && passwordConfirmRef.current) {
      try {
        setError("");
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        navigate({ to: "../" });
      } catch {
        setError("Failed to create an account");
      }
      setLoading(false);
    }
  }

  return (
    <div>
      <Container>
        <Box sx={{ width: "80%", height: "90%" }}>
          <form onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
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
              <TextField
                id="password-confirm"
                label="Confirm Password"
                type="password"
                value={passwordConfirm}
                onChange={(event) =>
                  setPasswordConfirm(event.currentTarget.value)
                }
                margin="normal"
                inputRef={passwordConfirmRef}
                required
              />
              <Button
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
        <Box>
          Already have a login? <Link to="/login">Log In</Link>
        </Box>
      </Container>
    </div>
  );
};
