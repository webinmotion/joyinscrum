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
import { NavLink } from 'react-router-dom';

export default function PasswordRecover() {

    const { showAlert } = useAppContext();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const email = form.get('email');
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${location.origin}/reset`,
        });

        if (error) {
            console.log(error);
            showAlert({ message: error.message, severity: "error" })
        }
        else {
            showAlert({ message: "If the email is valid, you will find in your inbox an email with additional password recovery steps", severity: "info", autoClose: true });
            console.log(data)
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
                    Recover Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Typography variant='div' component="h4" sx={{mt: 3, mb: 2}} >What email is associated with your account?</Typography>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Recover
                    </Button>
                    <Grid container>
                        <Grid item>
                            <NavLink to={"/signin"} style={{ fontSize: 13 }}>
                                {"Never mind. I want to Sign In"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}