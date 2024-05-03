import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { supabase } from '../service/auth';
import { useAppContext } from '../store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { validatePassword } from '../service/validate';
import { useState } from 'react';

export default function PasswordReset() {

    const [resetForm, setResetForm] = useState({
        password: { value: '', error: false, message: '' },
        cpassword: { value: '', error: false, message: '' }
    });
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
        const inputs = new FormData(event.currentTarget);
        const formData = {
            password: inputs.get('password'),
            cpassword: inputs.get('cpassword'),
        };

        const { password, cpassword } = formData;

        //validate inputs
        validatePassword(password, (err) => {
            if (err) {
                setResetForm(form => ({
                    ...form,
                    password: { ...form.password, value: password, error: true, message: err }
                }));
            } else {
                //all clear
                setResetForm(form => ({
                    ...form,
                    password: { ...form.password, value: password, error: false, message: '' }
                }));
            }
        });

        validatePassword(cpassword, (err) => {
            if (err) {
                setResetForm(form => ({
                    ...form,
                    cpassword: { ...form.cpassword, value: cpassword, error: true, message: err }
                }));
            } else {
                //all clear
                setResetForm(form => ({
                    ...form,
                    cpassword: { ...form.cpassword, value: cpassword, error: false, message: '' }
                }));
            }
        });

        //proceed after values have been validated
        if (cpassword?.length === 0 || password?.length === 0) {
            showAlert({ message: 'Both passwords should have a value', severity: 'error', autoClose: true })
        }
        else if (cpassword !== password) {
            showAlert({ message: 'Passwords do not match. Please try again', severity: 'error', autoClose: true })
        }
        else if (!resetForm.password.error && !resetForm.cpassword.error) {
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
                    <LockResetIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm New Password"
                        type="password"
                        id="cpassword"
                        autoComplete="confirm-current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reset Now
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}