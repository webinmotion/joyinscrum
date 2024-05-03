import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { supabase } from '../service/auth';
import { useAppContext } from '../store';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {

    const [signInForm, setSignInForm] = useState({
        email: { value: '', error: false, message: '' },
        password: { value: '', error: false, message: '' }
    });
    const { showAlert, setSession } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (event) => {
        event.preventDefault();
        const inputs = new FormData(event.currentTarget);
        const formData = {
            email: inputs.get('email'),
            password: inputs.get('password'),
        };

        const { email, password } = formData;

        //validate inputs 
        setSignInForm(form => ({
            ...form,
            email: { ...form.email, value: email, error: !email, message: !email ? 'email is a required field' : '' },
            password: { ...form.password, value: password, error: !password, message: !password ? 'password is a required field' : '' }
        }));

        //proceed if inputs are present
        if (email?.length == 0 || password?.length == 0) {
            showAlert({ message: 'Email and password should both have a value', severity: 'error', autoClose: true })
        }
        else if (!signInForm.email.error && !signInForm.password.error) {
            const { data, error } = await supabase.auth.signInWithPassword(formData);

            if (error) {
                console.log(error);
                showAlert({ message: error.message, severity: "error" })
            }
            else {
                const { user, session } = data;
                console.log(user, session);
                setSession(session);
                navigate(from, { replace: true });
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={signInForm.email.error}
                        helperText={signInForm.email.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={signInForm.password.error}
                        helperText={signInForm.password.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <NavLink to={"/recover"} style={{ fontSize: 13 }}>
                                Forgot password?
                            </NavLink>
                        </Grid>
                        <Grid item>
                            <NavLink to={"/signup"} style={{ fontSize: 13 }}>
                                {"Don't have an account? Sign Up"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}