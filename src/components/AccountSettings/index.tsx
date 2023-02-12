
import React, { useState, useRef, useEffect } from "react";
import { Button, TextField, Box, Stack, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-location";


interface AccountSettingsProps {}

export const AccountSettings: React.FC<AccountSettingsProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const { currentUser, updateUserEmail, updateUserPassword, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setEmail(currentUser?.email)
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate({ to: "../login" });
    } catch {
      setError("Failed to log out");
    }
  }

  

  function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    const promises: Promise<any>[] = [];
    setLoading(true);
    setError('');
    if (emailRef?.current?.value !== currentUser?.email) {
      promises.push(updateUserEmail(emailRef?.current?.value));
    }
    if (passwordRef?.current?.value) {
      promises.push(updateUserPassword(passwordRef?.current?.value));
    }

    Promise.all(promises).then(() => {
        navigate({ to: '../'})
    }).catch(() => {
        setError("Failed to update account")

    }).finally(() => {
        setLoading(false)
    }
    )}

  return (
    <div>
      <Container>
        <Box sx={{ width: "80%", height: "90%" }}>
          <form onSubmit={handleSignUp}>
            <h2>Update Profile</h2>
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
                label="Update password (leave blank to keep the same)"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                margin="normal"
                inputRef={passwordRef}
                
              />
              <TextField
                id="password-confirm"
                label="Confirm updated password (leave blank to keep the same)"
                type="password"
                value={passwordConfirm}
                onChange={(event) =>
                  setPasswordConfirm(event.currentTarget.value)
                }
                margin="normal"
                inputRef={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
              <Button disabled={loading} type="submit" variant="contained" color="primary">
                Update
              </Button>
            </Stack>
          </form>
        </Box>
        <Box>
          <Link to='/'>Cancel</Link>
        </Box>
        <Button variant="contained" onClick={handleLogout}>
        Log Out
      </Button>
      </Container>
    </div>
  );
};
