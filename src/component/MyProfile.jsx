
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CountrySelector from './CountrySelector';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAppContext } from '../store';
import { useEffect, useState } from 'react';
import { supabase } from '../service/auth';

export default function MyProfile() {

    const { auth: { session }, showAlert } = useAppContext();
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        (async function () {
            let { data: scrum_admin, error } = await supabase
                .from('tbl_scrum_admin')
                .select('*')
                .eq('email_address', session?.user.email);

            if (error) {
                showAlert({ message: error.message, severity: 'error' })
            }
            else {
                if (scrum_admin) {
                    const [{ phone_num, first_name, last_name, country }] = scrum_admin; //consider the first item in list
                    setFirst(first_name);
                    setLast(last_name);
                    setPhone(phone_num);
                    setCountry(country);
                }
            }
        })();
    }, [session])

    async function handleUpsert() {
        const { data, error } = await supabase
            .from('tbl_scrum_admin')
            .upsert({ email_address: session?.user.email, phone_num: phone, first_name: first, last_name: last, country })
            .select()

        if (error) {
            showAlert({ message: error.message, severity: 'error' })
        }
        else {
            console.log(data);
            showAlert({ message: "Profile was successfully updated", severity: 'success', autoClose: true })
        }
    }

    function handleReset() {
        setPhone('');
        setFirst('');
        setLast('')
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
                            Account Info
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Customize your profile information
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
                                    id="first-name"
                                    label="First Name"
                                    placeholder="First Name"
                                    value={first}
                                    onChange={e => setFirst(e.target.value)}
                                />
                                <TextField
                                    error={false}
                                    id="last-name"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    value={last}
                                    onChange={e => setLast(e.target.value)}
                                />
                            </div>
                            <div>
                                <TextField
                                    error={false}
                                    id="phone-num"
                                    label="Phone"
                                    type={"phone"}
                                    placeholder="Phone number"
                                    helperText=""
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment>,
                                    }}
                                />
                                <TextField
                                    id="email-addr"
                                    label="Email"
                                    defaultValue={session?.user.email}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                                    }}
                                />
                            </div>
                            <CountrySelector value={country} setValue={setCountry} />
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ display: 'flex', flexFlow: 'row-reverse' }}>
                        <Stack spacing={2} direction="row">
                            <Button variant="text" onClick={handleReset}>Cancel</Button>
                            <Button variant="contained" onClick={handleUpsert}>Save</Button>
                        </Stack>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
}