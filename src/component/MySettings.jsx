
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAppContext } from '../store';
import { useEffect, useState } from 'react';
import { supabase } from '../service/auth';

export default function MySettings() {

    const { auth: { session }, showAlert } = useAppContext();
    const [title, setTitle] = useState('');
    const [choices, setChoices] = useState('');

    useEffect(() => {
        (async function () {
            let { data: scrummage, error } = await supabase
                .from('tbl_scrummage')
                .select('*')
                .eq('organizer_email', session?.user.email);

            if (error) {
                showAlert({ message: error.message, severity: 'error' })
            }
            else {
                if (scrummage) {
                    const [{ scrum_title, scrum_choices }] = scrummage; //consider the first item in list
                    setTitle(scrum_title);
                    setChoices(scrum_choices);
                }
            }
        })();
    }, [session])

    async function handleUpdate() {
        const { data, error } = await supabase
            .from('tbl_scrummage')
            .update({ scrum_title: title, scrum_choices: choices })
            .eq('organizer_email', session?.user.email)
            .select()

        if (error) {
            showAlert({ message: error.message, severity: 'error' })
        }
        else {
            console.log(data);
            showAlert({ message: "Settings were successfully updated", severity: 'success', autoClose: true })
        }
    }

    function handleReset() {
        setTitle('');
        setChoices('')
    }


    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Scrum Settings
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Customize your scrum settings
                        </Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    error={false}
                                    id="scrum-title"
                                    label="Scrum Title"
                                    placeholder="Title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                                <TextField
                                    error={false}
                                    id="scrum-choices"
                                    label="Scrum Choices"
                                    placeholder="comma-seperated options"
                                    value={choices}
                                    helperText={"use comma-seperated values for the choices"}
                                    onChange={e => setChoices(e.target.value)}
                                />
                            </div>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ display: 'flex', flexFlow: 'row-reverse' }}>
                        <Stack spacing={2} direction="row">
                            <Button variant="text" onClick={handleReset}>Cancel</Button>
                            <Button variant="contained" onClick={handleUpdate}>Save</Button>
                        </Stack>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
}