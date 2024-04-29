import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { supabase } from '../service/auth';
import { useAppContext } from '../store';
import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export default function PasswordReset() {

    const { showAlert, setSession } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("onAuthStateChange", event)
            switch (event) {
                case "PASSWORD_RECOVERY": {
                    console.log("resetting password", session);
                    break;
                }
                case "SIGNED_IN": {
                    console.log("user is signed in", session);
                    break;
                }
                default: {
                    //do nothing
                    break;
                }
            }
            setSession(session)
        })

        return () => {
            // call unsubscribe to remove the callback
            subscription.unsubscribe()
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const password = form.get('password');
        const cpassword = form.get('cpassword');
        if (password === cpassword) {
            const { data, error } = await supabase.auth.updateUser({
                password
            })

            if (error) {
                console.log(error);
                showAlert({ message: error.message, severity: "error" })
            }
            else {
                const { user, session } = data;
                console.log(user, session);
                setSession(session);
                navigate("/", { replace: true });
            }
        }
        else {
            showAlert({ message: "Passwords do not match. PLease try again", severity: "error", autoClose: true })
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
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
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
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
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