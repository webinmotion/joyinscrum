import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';
import { Typography } from '@mui/material';
import { useAppContext } from '../store';

export default function JoinScrum() {

    const { showAlert } = useAppContext();
    const [scrumUrl, setScrumUrl] = useState('');
    const [userHandle, setUserHandle] = useState('');

    function handleInvitation() {
        if (scrumUrl && userHandle) {
            location.href = `${scrumUrl.trim()}/player/${btoa(userHandle.trim())}`;
        }
        else {
            showAlert({ mesage: "scrum url or user handle information is missing", severity: "error", autoClose: true })
        }
    }

    return (
        <Container component="main" maxWidth="md">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        label="Put scrum url here"
                        id="scrum-url"
                        sx={{ m: 1, width: '40ch' }}
                        value={scrumUrl}
                        onChange={e => setScrumUrl(e.target.value)}
                    />
                    <FormControl fullWidth sx={{ m: 1, width: '30ch' }} variant="standard">
                        <InputLabel htmlFor="scrum-user-handle">Unique User Handle</InputLabel>
                        <Input
                            id="scrum-user-handle"
                            value={userHandle}
                            onChange={e => setUserHandle(e.target.value)}
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
                </div>
                {scrumUrl && userHandle && <Typography variant='h4' sx={{ mt: 4 }}>{scrumUrl}/player/{userHandle}</Typography>}
            </Box>
        </Container>
    )
}