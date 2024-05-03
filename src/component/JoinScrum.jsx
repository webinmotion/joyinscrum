import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';
import { Typography } from '@mui/material';
import { useAppContext } from '../store';
import { Navigate } from 'react-router-dom';

const LINK_HREF_REGEX = /https?:\/\/(.+)/;
const ROUTE_REGEX = /\/scrum?\/(.+)?\/player\/(.+)/;

export default function JoinScrum() {

    const [scrumUrl, setScrumUrl] = useState({ value: '', error: false, message: '' });
    const [userHandle, setUserHandle] = useState({ value: '', error: false, message: '' });
    const [route, setRoute] = useState(null)
    const { showAlert } = useAppContext();

    function handleInvitation() {
        //reset values
        setScrumUrl(u => ({ ...u, error: false, message: '' }))
        setUserHandle(h => ({ ...h, error: false, message: '' }))

        //validate inputs
        if (!LINK_HREF_REGEX.test(scrumUrl.value)) {
            setScrumUrl(url => ({ ...url, error: true, message: 'url does not appear to be a valid a value' }))
        }

        //proceed after values have been validated
        if (scrumUrl.value?.length === 0 || userHandle.value?.length === 0) {
            showAlert({ message: 'scrum url and user handle should both have a value', severity: 'error', autoClose: true })
        }
        else if (scrumUrl.error) {
            showAlert({ message: scrumUrl.message, severity: "error", autoClose: true })
        }
        else {
            let pathInfo = scrumUrl.value.replace(location.origin, "");
            setRoute(`${pathInfo?.trim()}/player/${btoa(userHandle.value?.trim())}`);
        }
    }

    return ROUTE_REGEX.test(route) ?
        <Navigate to={route} replace />
        :
        <Container component="main" maxWidth="md">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <Stack spacing={2} sx={{ mb: 3 }}>
                    <Typography variant='h4'>Ask organizer to share the scrum URL</Typography>
                    <Typography variant='body2' color="green">A mobile client with QRCode scanning feature will be available in Google playstore soon</Typography>
                </Stack>
                <Stack spacing={2} direction="row" sx={{ border: '1px solid #eee', borderRadius: '10px', p: 3 }}>

                    <TextField
                        label="Put scrum url here"
                        id="scrum-url"
                        sx={{ m: 1, width: '40ch' }}
                        name={"scrumUrl"}
                        value={scrumUrl.value}
                        error={scrumUrl.error}
                        helperText={scrumUrl.message}
                        onChange={e => setScrumUrl(v => ({ ...v, value: e.target.value }))}
                    />
                    <FormControl fullWidth sx={{ m: 1, width: '30ch' }} variant="standard">
                        <InputLabel htmlFor="scrum-user-handle">Unique User Handle</InputLabel>
                        <Input
                            id="scrum-user-handle"
                            name={"userHandle"}
                            value={userHandle.value}
                            error={userHandle.error}
                            helperText={userHandle.message}
                            onChange={e => setUserHandle(v => ({ ...v, value: e.target.value }))}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="unique user handle for scrum"
                                        onClick={handleInvitation}
                                    >
                                        <ArrowCircleRight fontSize='large' color='primary' sx={{ mb: 2 }} />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Stack>
                <Typography variant='h4' sx={{ mt: 4 }}>{scrumUrl.value}/player/{userHandle.value}</Typography>
            </Box>
        </Container>



}