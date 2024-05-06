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
import { validateEmailAddress, validatePassword } from '../service/validate';
import { useState } from 'react';

export default function SignUp() {

  const [signUpForm, setSignUpForm] = useState({
    email: { value: '', error: false, message: '' },
    password: { value: '', error: false, message: '' },
    cpassword: { value: '', error: false, message: '' }
  });
  const { showAlert } = useAppContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputs = new FormData(event.currentTarget);
    const formData = {
      email: inputs.get('email'),
      password: inputs.get('password'),
      cpassword: inputs.get('cpassword'),
    };

    const { email, password, cpassword } = formData;

    //validate inputs
    validateEmailAddress(email, (err) => {
      if (err) {
        setSignUpForm(form => ({
          ...form,
          email: { ...form.email, value: email, error: true, message: err }
        }))
      } else {
        //all clear
        setSignUpForm(form => ({
          ...form,
          email: { ...form.email, value: email, error: false, message: '' }
        }));
      }
    });

    validatePassword(password, (err) => {
      if (err) {
        setSignUpForm(form => ({
          ...form,
          password: { ...form.password, value: password, error: true, message: err }
        }));
      } else {
        //all clear
        setSignUpForm(form => ({
          ...form,
          password: { ...form.password, value: password, error: false, message: '' }
        }));
      }
    });

    validatePassword(cpassword, (err) => {
      if (err) {
        setSignUpForm(form => ({
          ...form,
          cpassword: { ...form.cpassword, value: cpassword, error: true, message: err }
        }));
      } else {
        //all clear
        setSignUpForm(form => ({
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
    else if (!signUpForm.email.error && !signUpForm.password.error && !signUpForm.cpassword.error) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}`,
        },
      });

      if (error) {
        showAlert({ message: error.message, severity: 'error' })
      }
      else {
        showAlert({ message: "Verify email before you can proceed", severity: "info" });
        console.log(data);
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={signUpForm.email.error}
                helperText={signUpForm.email.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={signUpForm.password.error}
                helperText={signUpForm.password.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="confirm-password"
                error={signUpForm.cpassword.error}
                helperText={signUpForm.cpassword.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to={"/signin"} style={{ fontSize: 13 }}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
